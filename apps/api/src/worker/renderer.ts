import { bundle } from '@remotion/bundler';
import { renderMedia, selectComposition } from '@remotion/renderer';
import path from 'path';
import fs from 'fs';
import { SocialPostProps } from '../core/schemas';

export const renderSocialPost = async (
    props: SocialPostProps,
    outputName: string,
    format: 'mp4' | 'png' = 'png'
) => {
    console.log(`Starting render for ${outputName}...`);

    // 1. Bundle the Remotion Project
    const entryPoint = path.join(process.cwd(), 'src', 'remotion', 'index.ts');
    console.log(`Bundling from ${entryPoint}...`);

    const bundleLocation = await bundle({
        entryPoint,
        webpackOverride: (config) => config, // Default config
    });

    // 2. Select Composition
    const compositionId = 'SocialPost';
    const composition = await selectComposition({
        serveUrl: bundleLocation,
        id: compositionId,
        inputProps: props,
    });

    // 3. Render
    const outputDir = path.join(process.cwd(), 'public', 'outputs');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const finalOutput = path.join(outputDir, `${outputName}.${format}`);

    await renderMedia({
        composition,
        serveUrl: bundleLocation,
        codec: 'h264',
        outputLocation: finalOutput,
        inputProps: props,
    });

    console.log(`Render complete: ${finalOutput}`);
    return finalOutput;
};
