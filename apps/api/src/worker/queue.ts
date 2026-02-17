import { Queue, Worker } from 'bullmq';
import IORedis from 'ioredis';
import { renderSocialPost } from './renderer';

const connection = new IORedis('redis://localhost:6379', {
    maxRetriesPerRequest: null,
});

export const renderQueue = new Queue('render-queue', { connection });

export const startWorker = () => {
    const worker = new Worker('render-queue', async job => {
        console.log(`Processing job ${job.id}...`);
        const { templateId, data, format } = job.data;

        // For MVP, we only support SocialPost
        if (templateId !== 'SocialPost') {
            throw new Error('Template not supported');
        }

        await renderSocialPost(data, `job-${job.id}`, format);

    }, { connection });

    worker.on('completed', job => {
        console.log(`Job ${job.id} has completed!`);
    });

    worker.on('failed', (job, err) => {
        console.log(`Job ${job!.id} has failed with ${err.message}`);
    });

    console.log('Worker started...');
};
