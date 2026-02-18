import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs';
import path from 'path';

const s3Client = new S3Client({
    region: process.env.AWS_REGION || 'auto',
    endpoint: process.env.S3_ENDPOINT, // For R2/Cloudflare
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    },
});

export const uploadFile = async (filePath: string, bucketName: string) => {
    const fileContent = fs.readFileSync(filePath);
    const fileName = path.basename(filePath);

    // Determine content type based on extension
    const ext = path.extname(fileName).toLowerCase();
    const contentType = ext === '.mp4' ? 'video/mp4' : 'image/png';

    const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: fileName,
        Body: fileContent,
        ACL: 'public-read',
        ContentType: contentType,
    });

    try {
        await s3Client.send(command);

        // Construct the public URL
        // If using standard S3: https://BUCKET.s3.REGION.amazonaws.com/KEY
        // If using R2: https://PUB_BUCKET_URL/KEY
        const publicUrl = process.env.S3_PUBLIC_URL
            ? `${process.env.S3_PUBLIC_URL}/${fileName}`
            : `https://${bucketName}.s3.amazonaws.com/${fileName}`;

        console.log(`🚀 File uploaded successfully: ${publicUrl}`);
        return publicUrl;
    } catch (error) {
        console.error('Error uploading to storage:', error);
        throw error;
    }
};
