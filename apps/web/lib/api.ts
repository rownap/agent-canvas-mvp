export const renderAsset = async (
    templateId: string,
    title: string,
    image?: string
) => {
    const response = await fetch('http://localhost:3000/v1/render', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            templateId: 'SocialPost', // Hardcoded for MVP
            data: {
                title,
                image,
                brandKit: {
                    colors: {
                        primary: '#000000',
                        secondary: '#333333',
                        background: '#ffffff',
                        accent: '#0070f3'
                    },
                    typography: {
                        headingFont: 'Arial',
                        bodyFont: 'Arial'
                    }
                }
            },
            format: 'png'
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to render asset');
    }

    return response.json();
};
