// AEO & GEO Configuration
// Optimized for AI-powered search engines (ChatGPT, Perplexity, Gemini, Claude)

export interface FAQItem {
    question: string;
    answer: string;
    category?: string;
}

export interface StatItem {
    value: string;
    description: string;
    source: string;
    year: number;
}

// Comprehensive NEET FAQ Database
export const NEET_FAQ_DATABASE: Record<string, FAQItem[]> = {
    general: [
        {
            question: "What is NEET exam?",
            answer: "NEET (National Eligibility cum Entrance Test) is the single entrance examination for admission to MBBS, BDS, AYUSH, and veterinary courses in India. It is conducted by the National Testing Agency (NTA) and is mandatory for admission to all medical colleges in India.",
            category: "basics"
        },
        {
            question: "When is NEET 2026 exam?",
            answer: "NEET 2026 is expected to be held in the first week of May 2026. The exact date will be announced by NTA approximately 3-4 months before the exam. Historically, NEET is conducted on the first Sunday of May.",
            category: "exam-dates"
        },
        {
            question: "How many questions are in NEET?",
            answer: "NEET consists of 180 multiple-choice questions out of 200 questions provided. The distribution is: 45 questions from Physics (50 given), 45 from Chemistry (50 given), and 90 from Biology - 45 Botany (50 given) + 45 Zoology (50 given). Total marks: 720.",
            category: "exam-pattern"
        },
        {
            question: "What is the NEET exam duration?",
            answer: "NEET exam duration is 3 hours and 20 minutes (200 minutes). The exam is conducted in a single session from 2:00 PM to 5:20 PM IST.",
            category: "exam-pattern"
        },
        {
            question: "What is the NEET marking scheme?",
            answer: "NEET marking scheme: +4 marks for each correct answer, -1 mark for each incorrect answer, and 0 marks for unattempted questions. Maximum marks: 720 (180 questions × 4 marks).",
            category: "exam-pattern"
        }
    ],

    preparation: [
        {
            question: "How to prepare for NEET in 6 months?",
            answer: "For 6-month NEET preparation: 1) Complete NCERT thoroughly (2 months), 2) Solve previous year papers (ongoing), 3) Take weekly mock tests, 4) Focus on weak areas identified in tests, 5) Daily revision of completed topics. Dedicate 8-10 hours daily with proper breaks.",
            category: "study-plan"
        },
        {
            question: "Which books are best for NEET preparation?",
            answer: "Best NEET books: NCERT (Physics, Chemistry, Biology - most important), HC Verma for Physics concepts, OP Tandon for Physical Chemistry, Trueman's Biology for detailed study. Remember: 80% of NEET questions come directly from NCERT, so master NCERT first.",
            category: "resources"
        },
        {
            question: "How many hours should I study for NEET?",
            answer: "For NEET preparation, study 8-10 hours daily if starting 1-2 years before exam, or 10-12 hours if preparing in 6 months. Include: 4-5 hours for new topics, 2-3 hours for revision, 1-2 hours for practice questions, and 1 hour for mock tests/analysis.",
            category: "study-plan"
        },
        {
            question: "Is NCERT enough for NEET?",
            answer: "NCERT is the foundation for NEET - approximately 80-85% of questions come from NCERT. For Biology, NCERT is sufficient. For Physics and Chemistry, supplement NCERT with reference books for numerical practice and concept clarity. Always complete NCERT 2-3 times before moving to other books.",
            category: "resources"
        }
    ],

    scoring: [
        {
            question: "What is a good NEET score?",
            answer: "A good NEET score is 600+ out of 720 for government medical colleges. For top colleges like AIIMS Delhi or MAMC, aim for 650+. The qualifying percentile varies: General category (50th percentile ~137 marks), OBC/SC/ST (40th percentile ~107 marks), PwD (45th percentile).",
            category: "cutoff"
        },
        {
            question: "What is the NEET cutoff for government colleges?",
            answer: "NEET cutoff for government medical colleges varies by state and category. Generally: General category needs 600+, OBC needs 550+, SC/ST needs 450+ for state quota seats. For All India Quota in top colleges, General category needs 650+ marks.",
            category: "cutoff"
        },
        {
            question: "How many marks required for NEET to get MBBS?",
            answer: "To get MBBS in government colleges through NEET: General category needs 600-650 marks, OBC needs 550-600 marks, SC/ST needs 450-550 marks. For private colleges, the cutoff is lower: 450-500 for General category. State quotas have different cutoffs for each state.",
            category: "cutoff"
        }
    ],

    strategy: [
        {
            question: "How to score 650+ in NEET?",
            answer: "To score 650+ in NEET: 1) Master NCERT completely (read 3 times), 2) Solve 10,000+ practice questions, 3) Take 50+ full-length mock tests, 4) Analyze every mistake, 5) Focus on accuracy over speed, 6) Revise weak topics daily. Target: Biology 350+/360, Chemistry 170+/180, Physics 130+/180.",
            category: "high-score"
        },
        {
            question: "Which subject to focus more in NEET?",
            answer: "Focus on Biology first as it carries 50% weightage (360/720 marks) and is the easiest to score. Biology questions are mostly NCERT-based. Then Chemistry (moderate difficulty, 180 marks), and finally Physics (most difficult, 180 marks). Ideal score distribution: Biology 85-90%, Chemistry 80-85%, Physics 70-75%.",
            category: "subject-strategy"
        }
    ]
};

// Citation-Ready Statistics
export const NEET_STATISTICS: StatItem[] = [
    {
        value: "18.72 lakh",
        description: "Total NEET 2025 registrations",
        source: "National Testing Agency (NTA)",
        year: 2025
    },
    {
        value: "1,08,940",
        description: "MBBS seats in India (2024-25)",
        source: "Medical Counselling Committee (MCC)",
        year: 2024
    },
    {
        value: "720",
        description: "Maximum marks in NEET",
        source: "NEET Exam Pattern",
        year: 2024
    },
    {
        value: "180",
        description: "Total questions to attempt in NEET",
        source: "NEET Exam Pattern",
        year: 2024
    },
    {
        value: "80%",
        description: "Questions from NCERT in NEET",
        source: "NEET Analysis Reports",
        year: 2024
    }
];

// HowTo Structured Data Templates
export const NEET_HOWTO_GUIDES = {
    preparation: {
        title: "How to Prepare for NEET 2026",
        steps: [
            {
                name: "Understand the NEET Syllabus",
                text: "Download the official NEET syllabus from NTA website. It covers Class 11 and 12 Physics, Chemistry, and Biology (NCERT). Mark important chapters based on previous year weightage."
            },
            {
                name: "Create a Study Schedule",
                text: "Allocate time based on subject difficulty: Biology (40%), Chemistry (35%), Physics (25%). Include daily revision slots and weekly mock tests. Follow the 50-10 rule: 50 minutes study, 10 minutes break."
            },
            {
                name: "Master NCERT Textbooks",
                text: "Read NCERT thoroughly 2-3 times. Make notes of important points, diagrams, and tables. 80% of NEET questions come from NCERT, so this is your primary resource."
            },
            {
                name: "Practice with Previous Year Papers",
                text: "Solve last 10 years' NEET papers. Analyze question patterns, frequently asked topics, and difficulty levels. This helps understand exam trends and important areas."
            },
            {
                name: "Take Regular Mock Tests",
                text: "Attempt at least 50 full-length mock tests before NEET. Take tests in exam-like conditions (3 hours 20 minutes, no breaks). Analyze mistakes and weak areas after each test."
            },
            {
                name: "Focus on Weak Areas",
                text: "Identify weak topics from mock test analysis. Dedicate extra time to these areas. Solve additional practice questions and watch concept videos for difficult topics."
            },
            {
                name: "Revise Regularly",
                text: "Revise completed topics daily. Use flashcards for formulas, reactions, and diagrams. In the last month, focus only on revision and mock tests - no new topics."
            }
        ]
    },

    mockTest: {
        title: "How to Take NEET Mock Tests Effectively",
        steps: [
            {
                name: "Choose the Right Time",
                text: "Take mock tests at the same time as actual NEET (2:00 PM - 5:20 PM). This helps your body and mind adapt to the exam schedule."
            },
            {
                name: "Simulate Exam Conditions",
                text: "Sit in a quiet room, keep only pen and admit card (printout). No phone, no breaks, no water during test. Follow exact NEET rules."
            },
            {
                name: "Follow NEET Pattern",
                text: "Attempt 180 questions out of 200 given. Start with Biology (easier, more marks), then Chemistry, then Physics. Use OMR sheet for practice."
            },
            {
                name: "Analyze Your Performance",
                text: "After the test, check answers immediately. Note: 1) Silly mistakes, 2) Concept gaps, 3) Time management issues, 4) Guessed questions. Create a improvement plan."
            },
            {
                name: "Track Progress",
                text: "Maintain a mock test log with scores, accuracy, time taken per section. Track improvement over time. Aim for consistent 600+ scores before NEET."
            }
        ]
    }
};

// Entity Markup Generators
export const getQuestionEntity = (question: string, answer: string, category?: string) => ({
    "@context": "https://schema.org",
    "@type": "Question",
    "name": question,
    "acceptedAnswer": {
        "@type": "Answer",
        "text": answer
    },
    ...(category && { "about": category })
});

export const getHowToEntity = (title: string, steps: Array<{ name: string, text: string }>) => ({
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": title,
    "step": steps.map((step, index) => ({
        "@type": "HowToStep",
        "position": index + 1,
        "name": step.name,
        "text": step.text
    }))
});

export const getNEETExamEntity = () => ({
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "NEET 2026",
    "description": "National Eligibility cum Entrance Test for medical admissions in India",
    "eventStatus": "https://schema.org/EventScheduled",
    "organizer": {
        "@type": "Organization",
        "name": "National Testing Agency (NTA)",
        "url": "https://nta.ac.in"
    },
    "location": {
        "@type": "Place",
        "name": "Multiple exam centers across India",
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "IN"
        }
    }
});

// Generate FAQ Schema for any page
export function generateFAQSchema(faqs: FAQItem[]) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => getQuestionEntity(faq.question, faq.answer, faq.category))
    };
}
