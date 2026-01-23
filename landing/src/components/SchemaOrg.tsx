import React from 'react';

export function SchemaOrg() {
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "NP: NEET Prep",
        "url": "https://neetprep.ai",
        "logo": "https://neetprep.ai/logo.png",
        "sameAs": [
            "https://twitter.com/neetprep_ai",
            "https://youtube.com/c/neetprep_ai"
        ],
        "description": "India's most advanced AI-powered NEET preparation platform."
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "How does NP use AI for NEET preparation?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "NP uses adaptive learning algorithms to analyze your performance and recommend specific topics, questions, and practice tests tailored to your weak areas, ensuring maximum efficiency in your NEET prep."
                }
            },
            {
                "@type": "Question",
                "name": "Are the mock tests based on the latest NTA pattern?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, all mock tests on NP are designed by expert faculty following the latest NTA exam pattern, including multi-statement questions, assertion-reasoning, and deep analytics from 10+ years of trends."
                }
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
        </>
    );
}
