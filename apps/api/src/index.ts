import Fastify from 'fastify';
import cors from '@fastify/cors';
import { z } from 'zod';
import { socialPostSchema } from './core/schemas';
import { renderQueue, startWorker } from './worker/queue';
import { stripe, createCheckoutSession } from './core/stripe';

const fastify = Fastify({ logger: true });

// Register content parser for raw body (needed for Stripe webhooks)
fastify.addContentTypeParser('application/json', { parseAs: 'string' }, function (req, body, done) {
    if (req.url === '/v1/webhooks/stripe') {
        done(null, body);
    } else {
        try {
            const json = JSON.parse(body as string);
            done(null, json);
        } catch (err: any) {
            err.statusCode = 400;
            done(err, undefined);
        }
    }
});

fastify.register(cors, {
    origin: '*',
});

const renderPayloadSchema = z.object({
    templateId: z.literal('SocialPost'),
    data: socialPostSchema,
    format: z.enum(['mp4', 'png']).default('png'),
});

const checkoutSchema = z.object({
    userId: z.string(),
    userEmail: z.string().email(),
    planId: z.enum(['starter', 'growth', 'scale']),
});

const PLANS = {
    starter: { priceId: process.env.STRIPE_PRICE_STARTER || 'price_123', credits: 1000 },
    growth: { priceId: process.env.STRIPE_PRICE_GROWTH || 'price_456', credits: 5000 },
    scale: { priceId: process.env.STRIPE_PRICE_SCALE || 'price_789', credits: 20000 },
};

fastify.post('/v1/checkout/create-session', async (request, reply) => {
    try {
        const { userId, userEmail, planId } = checkoutSchema.parse(request.body);
        const plan = PLANS[planId];

        const session = await createCheckoutSession({
            userId,
            userEmail,
            priceId: plan.priceId,
            credits: plan.credits,
        });

        reply.send({ url: session.url });
    } catch (error) {
        fastify.log.error(error);
        reply.status(400).send({ error: 'Checkout session creation failed' });
    }
});

fastify.post('/v1/webhooks/stripe', async (request, reply) => {
    const sig = request.headers['stripe-signature'] as string;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

    let event;

    try {
        event = stripe.webhooks.constructEvent(request.body as string, sig, webhookSecret);
    } catch (err: any) {
        fastify.log.error(`Webhook Error: ${err.message}`);
        return reply.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as any;
        const { userId, credits } = session.metadata;

        console.log(`💰 Payment successful for user ${userId}. Adding ${credits} credits.`);

        // TODO: Update user credits in Supabase
        // await supabase.from('profiles').update({ credits_balance: ... }).eq('id', userId)
    }

    reply.send({ received: true });
});

fastify.post('/v1/render', async (request, reply) => {
    try {
        const body = renderPayloadSchema.parse(request.body);

        // Add job to BullMQ
        const job = await renderQueue.add('render-job', body);

        reply.status(202).send({
            jobId: job.id,
            status: 'queued',
            message: 'Render job accepted',
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            reply.status(400).send({ error: 'Validation Error', details: error.errors });
        } else {
            reply.status(500).send({ error: 'Internal Server Error' });
        }
    }
});

fastify.get('/v1/jobs/:jobId', async (request, reply) => {
    const { jobId } = request.params as { jobId: string };
    const job = await renderQueue.getJob(jobId);

    if (!job) {
        return reply.status(404).send({ error: 'Job not found' });
    }

    const state = await job.getState();
    const progress = job.progress;

    reply.send({
        id: job.id,
        state,
        progress,
        outputUrl: state === 'completed' ? job.returnvalue?.url : null,
        error: state === 'failed' ? job.failedReason : null
    });
});

const start = async () => {
    try {
        // Start the worker processing in the same process for MVP simplicity
        // In production, this would be a separate microservice
        startWorker();

        await fastify.listen({ port: 3000, host: '0.0.0.0' });
        console.log('Server running on http://localhost:3000');
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
