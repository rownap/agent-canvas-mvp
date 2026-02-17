import React from 'react';
import { AbsoluteFill, Img, staticFile } from 'remotion';
import { SocialPostProps } from '../../core/schemas';

export const SocialPost: React.FC<SocialPostProps> = ({
    title,
    subtitle,
    image,
    content,
    cta,
    brandKit,
}) => {
    const { colors, typography } = brandKit;

    return (
        <AbsoluteFill
            style={{
                backgroundColor: colors.background,
                fontFamily: typography.bodyFont,
                color: colors.secondary,
                padding: 60,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {/* Background Image Overlay if provided */}
            {image && (
                <AbsoluteFill>
                    <Img
                        src={image}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            opacity: 0.3
                        }}
                    />
                </AbsoluteFill>
            )}

            {/* Content Container */}
            <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '80%' }}>

                {/* Logo Placeholder */}
                {brandKit.logo && (
                    <Img src={brandKit.logo.url} style={{ height: 80, marginBottom: 40 }} />
                )}

                <h1
                    style={{
                        fontFamily: typography.headingFont,
                        fontSize: 80,
                        fontWeight: 800,
                        color: colors.primary,
                        margin: '0 0 20px 0',
                        lineHeight: 1.1,
                    }}
                >
                    {title}
                </h1>

                {subtitle && (
                    <h2
                        style={{
                            fontSize: 40,
                            fontWeight: 600,
                            opacity: 0.8,
                            margin: '0 0 40px 0',
                        }}
                    >
                        {subtitle}
                    </h2>
                )}

                {content && (
                    <p
                        style={{
                            fontSize: 32,
                            lineHeight: 1.5,
                            opacity: 0.9,
                            whiteSpace: 'pre-wrap',
                        }}
                    >
                        {content}
                    </p>
                )}

                {cta && (
                    <div
                        style={{
                            marginTop: 60,
                            backgroundColor: colors.primary,
                            color: colors.background,
                            padding: '20px 60px',
                            borderRadius: 20,
                            fontSize: 36,
                            fontWeight: 'bold',
                            display: 'inline-block',
                        }}
                    >
                        {cta}
                    </div>
                )}
            </div>
        </AbsoluteFill>
    );
};
