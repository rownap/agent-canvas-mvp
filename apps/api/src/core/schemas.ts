import { z } from 'zod';

export const brandKitSchema = z.object({
    colors: z.object({
        primary: z.string(),
        secondary: z.string(),
        background: z.string(),
        accent: z.string().optional(),
    }),
    typography: z.object({
        headingFont: z.string(),
        bodyFont: z.string(),
    }),
    logo: z.object({
        url: z.string().url(),
        position: z.enum(['top-left', 'top-right', 'bottom-left', 'bottom-right', 'center']).default('top-right'),
    }).optional(),
});

export const socialPostSchema = z.object({
    topic: z.string().optional(),
    title: z.string().optional(),
    subtitle: z.string().optional(),
    image: z.string().url().optional(),
    content: z.string().optional(),
    cta: z.string().optional(),
    brandKit: brandKitSchema,
});

export type BrandKit = z.infer<typeof brandKitSchema>;
export type SocialPostProps = z.infer<typeof socialPostSchema>;
