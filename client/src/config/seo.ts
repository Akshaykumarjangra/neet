// SEO Configuration for NEET Platform
// Centralized metadata for all pages

export interface SEOConfig {
    title: string;
    description: string;
    keywords: string[];
    canonical?: string;
    ogImage?: string;
    structuredData?: any;
}

export const SITE_CONFIG = {
    name: "ZeroPage NEET",
    url: "https://neet.zeropage.in", // Update with actual domain
    description: "India's leading NEET preparation platform with free mock tests, study materials, and expert mentorship",
    ogImage: "/og-image.jpg",
    twitterHandle: "@ZeroPageNEET",
};

export const SEO_PAGES: Record<string, SEOConfig> = {
    home: {
        title: "NEET Preparation 2026 | Free Mock Tests, Study Material & Online Coaching",
        description: "Ace NEET 2026 with India's best free online preparation platform. 10,000+ practice questions, mock tests, video lectures, and expert mentorship for Biology, Physics & Chemistry.",
        keywords: [
            "NEET preparation",
            "NEET 2026",
            "NEET online coaching",
            "free NEET mock test",
            "NEET study material",
            "NEET practice questions",
            "NEET biology notes",
            "NEET physics formulas",
            "NEET chemistry notes"
        ],
    },

    practice: {
        title: "NEET Practice Questions 2026 | 10,000+ Chapter-wise MCQs for Biology, Physics, Chemistry",
        description: "Practice NEET questions chapter-wise with detailed solutions. Free MCQs for Biology (Botany & Zoology), Physics, and Chemistry. Track your progress and improve accuracy.",
        keywords: [
            "NEET practice questions",
            "NEET MCQs",
            "NEET biology questions",
            "NEET physics questions",
            "NEET chemistry questions",
            "chapter wise NEET questions",
            "NEET question bank"
        ],
    },

    mockTests: {
        title: "Free NEET Mock Test 2026 | Online Test Series with Solutions",
        description: "Take free NEET mock tests online. Full-length test series matching NEET exam pattern. Get instant results, detailed analysis, and all-India rank. Practice like the real exam.",
        keywords: [
            "NEET mock test",
            "free NEET test series",
            "NEET online test",
            "NEET practice test",
            "NEET mock exam",
            "NEET test series 2026",
            "NEET previous year papers"
        ],
    },

    library: {
        title: "NEET Study Material 2026 | Free Notes, PDFs, Videos & Formula Sheets",
        description: "Download free NEET study material including chapter-wise notes, formula sheets, revision notes, and video lectures for Biology, Physics, and Chemistry. Updated for NEET 2026.",
        keywords: [
            "NEET study material",
            "NEET notes PDF",
            "NEET biology notes",
            "NEET physics formulas",
            "NEET chemistry notes",
            "NEET revision notes",
            "free NEET study material"
        ],
    },

    dashboard: {
        title: "NEET Preparation Dashboard | Track Progress, Performance & Study Analytics",
        description: "Monitor your NEET preparation with detailed analytics. Track chapter-wise progress, mock test scores, weak areas, and study streaks. Get personalized recommendations.",
        keywords: [
            "NEET preparation tracker",
            "NEET study planner",
            "NEET performance analysis",
            "NEET progress tracker"
        ],
    },

    flashcards: {
        title: "NEET Flashcards | Spaced Repetition for Biology, Physics, Chemistry",
        description: "Master NEET concepts with smart flashcards using spaced repetition. Quick revision for important formulas, reactions, diagrams, and key points.",
        keywords: [
            "NEET flashcards",
            "NEET revision cards",
            "NEET quick revision",
            "NEET formulas"
        ],
    },

    mentors: {
        title: "NEET Online Coaching | Expert Mentors & Doubt Solving",
        description: "Get personalized NEET coaching from expert mentors. Book 1-on-1 sessions, clear doubts instantly, and get study guidance from NEET toppers and experienced teachers.",
        keywords: [
            "NEET online coaching",
            "NEET mentors",
            "NEET doubt solving",
            "NEET online classes",
            "NEET tutors"
        ],
    },

    biology: {
        title: "NEET Biology Preparation | Botany & Zoology Notes, MCQs, Videos",
        description: "Complete NEET Biology preparation with chapter-wise notes, diagrams, practice questions, and video lectures for Botany and Zoology. Cover all NCERT topics.",
        keywords: [
            "NEET biology preparation",
            "NEET botany notes",
            "NEET zoology notes",
            "NEET biology MCQs",
            "NEET biology syllabus"
        ],
    },

    physics: {
        title: "NEET Physics Preparation | Formulas, Numerical Problems & Concepts",
        description: "Master NEET Physics with comprehensive formula sheets, solved numerical problems, concept videos, and practice questions. Cover mechanics, optics, thermodynamics & more.",
        keywords: [
            "NEET physics preparation",
            "NEET physics formulas",
            "NEET physics numerical",
            "NEET physics MCQs",
            "NEET physics syllabus"
        ],
    },

    chemistry: {
        title: "NEET Chemistry Preparation | Organic, Inorganic & Physical Chemistry",
        description: "Complete NEET Chemistry preparation covering organic, inorganic, and physical chemistry. Reaction mechanisms, name reactions, periodic table, and practice questions.",
        keywords: [
            "NEET chemistry preparation",
            "NEET organic chemistry",
            "NEET inorganic chemistry",
            "NEET physical chemistry",
            "NEET chemistry reactions"
        ],
    },

    pricing: {
        title: "NEET Premium Plans | Affordable Online Coaching Subscription",
        description: "Unlock premium NEET preparation features. Get unlimited mock tests, advanced analytics, mentor support, and ad-free experience. Plans starting at ₹99/month.",
        keywords: [
            "NEET online coaching fees",
            "NEET preparation cost",
            "affordable NEET coaching",
            "NEET premium subscription"
        ],
    },

    comparePW: {
        title: "ZeroPage vs PhysicsWallah (PW) | Best NEET Online Coaching Comparison",
        description: "Compare ZeroPage vs PhysicsWallah for NEET 2026. See why students are switching to ZeroPage for personalized analytics, higher quality mock tests, and 1-on-1 mentorship.",
        keywords: [
            "PhysicsWallah alternative",
            "ZeroPage vs PW",
            "better than physics wallah",
            "physics wallah vs zeropage",
            "online neet coaching comparison"
        ]
    },

    compareAllen: {
        title: "ZeroPage vs Allen Career Institute | NEET Online vs Offline Coaching",
        description: "Detailed comparison: ZeroPage Online vs Allen Offline/Online. Save lakhs in fees while getting superior analytics, doubt solving, and flexible learning.",
        keywords: [
            "Allen alternative",
            "ZeroPage vs Allen",
            "Allen online test series vs ZeroPage",
            "Allen kota vs online coaching"
        ]
    },

    compareAakash: {
        title: "ZeroPage vs Aakash Institute | NEET Preparation Platform Review",
        description: "Aakash vs ZeroPage: Which is better for NEET? Compare test series quality, faculty mentorship, and pricing. Get the best value for your medical preparation.",
        keywords: [
            "Aakash alternative",
            "ZeroPage vs Aakash",
            "Aakash iTutor vs ZeroPage",
            "best neet test series comparison"
        ]
    },

    doctorRoadmap: {
        title: "How to Become a Doctor in India | Complete Step-by-Step Roadmap",
        description: "The ultimate guide to becoming a doctor in India. From Class 11 subject selection to clearing NEET, MBBS admission, and specialization. Start your medical journey here.",
        keywords: [
            "how to become a doctor",
            "NEET roadmap",
            "MBBS journey",
            "medical student pathway",
            "career in medicine india"
        ]
    }
};

// Generate structured data for organization
export const getOrganizationSchema = () => ({
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": SITE_CONFIG.name,
    "description": SITE_CONFIG.description,
    "url": SITE_CONFIG.url,
    "logo": `${SITE_CONFIG.url}/logo.png`,
    "sameAs": [
        "https://www.facebook.com/ZeroPageNEET",
        "https://twitter.com/ZeroPageNEET",
        "https://www.instagram.com/ZeroPageNEET",
        "https://www.youtube.com/@ZeroPageNEET"
    ],
    "address": {
        "@type": "PostalAddress",
        "addressCountry": "IN"
    }
});

// Generate structured data for courses
export const getCourseSchema = (subject: string) => ({
    "@context": "https://schema.org",
    "@type": "Course",
    "name": `NEET ${subject} Preparation Course`,
    "description": `Comprehensive ${subject} preparation for NEET exam`,
    "provider": {
        "@type": "Organization",
        "name": SITE_CONFIG.name,
        "url": SITE_CONFIG.url
    },
    "educationalLevel": "Higher Secondary Education",
    "inLanguage": "en-IN",
    "availableLanguage": ["en", "hi"],
    "teaches": `${subject} for NEET`,
    "coursePrerequisites": "Class 11 and 12 NCERT syllabus",
    "hasCourseInstance": {
        "@type": "CourseInstance",
        "courseMode": "online",
        "courseWorkload": "PT100H"
    }
});

// Generate FAQ schema
export const getFAQSchema = (faqs: Array<{ question: string; answer: string }>) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
        }
    }))
});

// Generate breadcrumb schema
export const getBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": `${SITE_CONFIG.url}${item.url}`
    }))
});

// Generate structured data for articles
export function getArticleSchema(article: {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    url: article.url,
    datePublished: article.datePublished || "2025-01-01",
    dateModified: article.dateModified || new Date().toISOString().split('T')[0],
    author: {
      "@type": "Organization",
      name: article.author || "ZeroPage",
      url: "https://neet.zeropage.in",
    },
    publisher: {
      "@type": "Organization",
      name: "ZeroPage",
      url: "https://neet.zeropage.in",
      logo: {
        "@type": "ImageObject",
        url: "https://neet.zeropage.in/favicon.png",
      },
    },
    image: article.image || "https://neet.zeropage.in/og-image.png",
    mainEntityOfPage: { "@type": "WebPage", "@id": article.url },
  };
}

// Generate structured data for HowTo
export function getHowToSchema(howTo: {
  name: string;
  description: string;
  steps: Array<{ name: string; text: string }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: howTo.name,
    description: howTo.description,
    step: howTo.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

// Generate exam schema for mock tests
export const getExamSchema = (examName: string, description: string) => ({
    "@context": "https://schema.org",
    "@type": "Quiz",
    "name": examName,
    "description": description,
    "educationalLevel": "Higher Secondary Education",
    "assesses": "NEET preparation",
    "educationalUse": "assessment"
});
