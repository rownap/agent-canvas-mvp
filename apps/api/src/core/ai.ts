import OpenAI from 'openai';
import Replicate from 'replicate';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || '',
});

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN || '',
});

export const generatePostContent = async (topic: string) => {
    console.log(`Generating AI content for topic: ${topic}`);

    const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
            {
                role: 'system',
                content: `You are a creative social media director. 
                Given a topic, generate:
                1. A punchy headline (title).
                2. A supporting subtitle.
                3. A visual prompt for an image generation AI (Flux/Stable Diffusion).
                Return as JSON: { "title": "...", "subtitle": "...", "imagePrompt": "..." }`,
            },
            {
                role: 'user',
                content: `Topic: ${topic}`,
            },
        ],
        response_format: { type: 'json_object' },
    });

    const content = JSON.parse(response.choices[0].message.content || '{}');
    return content;
};

export const generatePostImage = async (prompt: string) => {
    console.log(`Generating AI image for prompt: ${prompt}`);

    // Using Flux.1 [schnell] for speed and quality
    const output = await replicate.run(
        "black-forest-labs/flux-schnell",
        {
            input: {
                prompt: prompt,
                aspect_ratio: "1:1",
                output_format: "webp",
                output_quality: 90
            }
        }
    );

    // Replicate returns an array of URLs for flux
    return (output as string[])[0];
};
