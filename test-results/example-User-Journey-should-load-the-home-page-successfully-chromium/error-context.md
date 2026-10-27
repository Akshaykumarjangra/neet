# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: example.spec.ts >> User Journey >> should load the home page successfully
- Location: tests/e2e/example.spec.ts:9:5

# Error details

```
Error: expect(page).toHaveTitle(expected) failed

Expected pattern: /NEET Prep/
Received string:  "NEET 2026 Preparation — AI-Powered Learning Platform | ZERO AI"
Timeout: 5000ms

Call log:
  - Expect "toHaveTitle" with timeout 5000ms
    3 × locator resolved to <html lang="en" class="dark">…</html>
      - unexpected value "NEET 2026 Prep | Free Mock Tests & Online Coaching"
    10 × locator resolved to <html lang="en" class="dark">…</html>
       - unexpected value "NEET 2026 Preparation — AI-Powered Learning Platform | ZERO AI"

```

```yaml
- region "Notifications (F8)":
  - list:
    - listitem:
      - text: "Error 500: Internal Server Error"
      - button:
        - img
    - listitem:
      - text: "Error 500: Internal Server Error"
      - button:
        - img
- banner:
  - text: NP NEET Prep
  - navigation:
    - link "Explore":
      - /url: /pricing
    - link "Find Mentors":
      - /url: /mentors
    - link "Simulations":
      - /url: /simulations
    - link "Pricing":
      - /url: /pricing
    - link "Features":
      - /url: "#features"
    - link "Syllabus":
      - /url: "#syllabus"
    - link "Testimonials":
      - /url: "#testimonials"
  - button:
    - img
  - link "Log In":
    - /url: /login
    - button "Log In"
  - link "Sign Up Free":
    - /url: /signup
    - button "Sign Up Free"
- main:
  - img
  - text: 48,392 Questions Solved Today
  - img
  - text: India's Most Advanced NEET Prep Platform
  - heading "Crack NEET with AI-Powered Learning" [level=1]
  - paragraph: Experience personalized learning with adaptive AI, expert mentors, gamified progress tracking, and 50,000+ practice questions. Join 10,000+ aspirants achieving their medical dreams.
  - link "Start Learning Free":
    - /url: /signup
    - button "Start Learning Free":
      - img
      - text: Start Learning Free
      - img
  - link "Explore Content":
    - /url: /pricing
    - button "Explore Content":
      - img
      - text: Explore Content
  - img
  - text: 50K+ Questions
  - img
  - text: 100+ Mock Tests
  - img
  - text: 500+ Video Lessons
  - img
  - text: 3D Visualizations
  - img
  - text: Features
  - heading "Everything You Need to Succeed" [level=2]
  - paragraph: Our comprehensive platform combines cutting-edge AI technology with proven teaching methods to maximize your NEET preparation.
  - img
  - text: AI-Powered Learning
  - paragraph: Adaptive question recommendations based on your performance and learning patterns
  - img
  - text: Expert Mentors
  - paragraph: Book 1-on-1 sessions with NEET toppers and experienced faculty
  - img
  - text: 50,000+ Questions
  - paragraph: Comprehensive question bank covering the entire NEET syllabus with detailed solutions
  - img
  - text: Mock Tests
  - paragraph: NEET pattern tests with real-time analytics and detailed performance reports
  - img
  - text: Gamified Learning
  - paragraph: Earn XP, maintain streaks, compete on leaderboards and unlock achievements
  - img
  - text: Video Lessons
  - paragraph: Chapter-wise video content with 3D visualizations and interactive simulations
  - paragraph: NEET Blast
  - heading "50,000+ QA, 10 Years of Trends, One Deep Analytics Desk" [level=2]
  - paragraph: Dive into the NEET Blast experience to measure your mock-test momentum, unlock decade-long question insights, and track subject streaks with precision-grade analytics.
  - link "Explore NEET Blast":
    - /url: /neet-blast
    - button "Explore NEET Blast":
      - img
      - text: Explore NEET Blast
  - link "Start Mock Test":
    - /url: /mock-tests
    - button "Start Mock Test":
      - img
      - text: Start Mock Test
  - img
  - text: Complete Syllabus
  - heading "Comprehensive NEET Coverage" [level=2]
  - paragraph: Complete coverage of Class 11 and Class 12 syllabus as per the latest NTA guidelines. Every chapter, every concept, every question type covered.
  - img
  - text: Physics
  - img
  - text: Chapters Available 23/23
  - progressbar
  - text: Class 11 Class 12 PYQs
  - img
  - text: Chemistry
  - img
  - text: Chapters Available 44/44
  - progressbar
  - text: Class 11 Class 12 PYQs
  - img
  - text: Botany
  - img
  - text: Chapters Available 19/19
  - progressbar
  - text: Class 11 Class 12 PYQs
  - img
  - text: Zoology
  - img
  - text: Chapters Available 19/19
  - progressbar
  - text: Class 11 Class 12 PYQs
  - link "View Complete Syllabus":
    - /url: /pricing
    - button "View Complete Syllabus":
      - text: View Complete Syllabus
      - img
  - img
  - text: Our Impact
  - heading "Trusted by Thousands" [level=2]
  - paragraph: Join the community of successful NEET aspirants who achieved their dreams with our platform.
  - img
  - text: 10,000+ Active Students
  - img
  - text: 95% Success Rate
  - img
  - text: 500+ Expert Mentors
  - img
  - text: 50,000+ Practice Questions
  - img
  - text: Success Stories
  - heading "What Our Toppers Say" [level=2]
  - paragraph: Real stories from students who cracked NEET with our platform.
  - img
  - paragraph: "\"The AI-powered practice sessions helped me identify my weak areas. The mock tests were exactly like the real exam!\""
  - text: PS Priya Sharma NEET 2024 - AIR 156
  - img
  - img
  - img
  - img
  - img
  - img
  - paragraph: "\"The gamification kept me motivated throughout my preparation. Competing on leaderboards made studying fun!\""
  - text: RV Rahul Verma NEET 2024 - AIR 342
  - img
  - img
  - img
  - img
  - img
  - img
  - paragraph: "\"1-on-1 mentor sessions cleared all my doubts. The video lessons with 3D visualizations made concepts crystal clear.\""
  - text: AP Ananya Patel NEET 2024 - AIR 89
  - img
  - img
  - img
  - img
  - img
  - text: New • Public preview
  - heading "Explainer Chatbot (English/Hindi)" [level=2]
  - paragraph: Ask any topic, keyword, or formula. Get simple answers, quick notes, and formulas with an optional deep dive—no login required.
  - text: Formulas Hindi + English Examples
  - link "Try the Explainer":
    - /url: /explain
    - button "Try the Explainer":
      - text: Try the Explainer
      - img
  - link "See all features":
    - /url: /pricing
    - button "See all features"
  - img
  - text: Live preview You Explain Doppler effect in Hindi with one example Explainer डॉप्लर प्रभाव वह परिवर्तन है जो तरंग के स्रोत और प्रेक्षक के सापेक्ष गतिमान होने पर आवृत्ति में दिखता है... Formula f' = f (c ± vₒ) / (c ∓ vₛ)
  - heading "Everything You Need to Know About NEET 2026" [level=2]
  - paragraph:
    - text: The
    - strong: National Eligibility cum Entrance Test (NEET)
    - text: is India's single largest medical entrance examination, conducted by the
    - strong: National Testing Agency (NTA)
    - text: . Over 24 lakh aspirants register for
    - strong: NEET UG
    - text: every year to secure admission in MBBS, BDS, and AYUSH courses across government and private medical colleges. The
    - strong: NEET 2026 registration
    - text: process is expected to begin early 2026 on the official NTA portal at nta.ac.in.
  - paragraph:
    - text: ZERO AI is built specifically for
    - strong: NEET preparation
    - text: . Our platform combines adaptive AI technology with expert-curated content to provide a comprehensive preparation experience. Whether you're studying for
    - strong: NEET UG
    - text: or preparing for
    - strong: NEET PG
    - text: ", our 50,000+ question bank covers the entire"
    - strong: NEET syllabus
    - text: as per NTA guidelines — including Physics, Chemistry, Botany, and Zoology.
  - paragraph:
    - text: Stay updated with the latest
    - strong: NEET 2026 exam date
    - text: ","
    - strong: NEET admit card
    - text: download instructions,
    - strong: NEET application form
    - text: guidelines, and
    - strong: NEET result
    - text: analysis right here. Our AI engine analyzes 15 years of
    - strong: NEET previous year questions (PYQs)
    - text: to predict high-yield topics and personalize your study plan.
  - link "NEET Cutoff 2026":
    - /url: /neet-cutoff
    - img
    - text: NEET Cutoff 2026
  - link "NEET Syllabus":
    - /url: /syllabus
    - img
    - text: NEET Syllabus
  - link "PYQ Analysis":
    - /url: /pyq-analysis
    - img
    - text: PYQ Analysis
  - link "Rank Predictor":
    - /url: /rank-predictor
    - img
    - text: Rank Predictor
  - link "Medical Colleges":
    - /url: /medical-colleges
    - img
    - text: Medical Colleges
  - link "Syllabus Weightage":
    - /url: /syllabus-weightage
    - img
    - text: Syllabus Weightage
  - link "NEET Exam Pattern":
    - /url: /neet-exam-pattern
    - img
    - text: NEET Exam Pattern
  - link "Best Books for NEET":
    - /url: /best-books-neet
    - img
    - text: Best Books for NEET
  - link "NEET Eligibility":
    - /url: /neet-eligibility-criteria
    - img
    - text: NEET Eligibility
  - link "NEET Application Form":
    - /url: /neet-application-form
    - img
    - text: NEET Application Form
  - link "NEET Counselling":
    - /url: /neet-counselling
    - img
    - text: NEET Counselling
  - link "NEET Admit Card":
    - /url: /neet-admit-card
    - img
    - text: NEET Admit Card
  - link "MBBS Roadmap":
    - /url: /mbbs-roadmap
    - img
    - text: MBBS Roadmap
  - link "NEET FAQ":
    - /url: /neet-faq
    - img
    - text: NEET FAQ
  - link "Mock Tests":
    - /url: /mock-tests
    - img
    - text: Mock Tests
  - link "Find Mentors":
    - /url: /mentors
    - img
    - text: Find Mentors
  - img
  - text: Start Today
  - heading "Ready to Begin Your NEET Journey?" [level=2]
  - paragraph: Join thousands of students already preparing for NEET with our AI-powered platform. Start free today and see the difference.
  - link "Create Free Account":
    - /url: /signup
    - button "Create Free Account":
      - img
      - text: Create Free Account
      - img
  - link "Find a Mentor":
    - /url: /mentors
    - button "Find a Mentor":
      - img
      - text: Find a Mentor
  - paragraph:
    - img
    - text: No credit card required • Free forever plan available
- contentinfo:
  - link "ZERO AI":
    - /url: /
    - img
    - text: ZERO AI
  - paragraph: Empowering the next generation of doctors with AI-driven personalized learning. Master NEET with precision and speed.
  - link:
    - /url: "#"
    - img
  - link:
    - /url: "#"
    - img
  - link:
    - /url: "#"
    - img
  - link:
    - /url: "#"
    - img
  - heading "Platform" [level=3]
  - list:
    - listitem:
      - link "Pricing":
        - /url: /pricing
    - listitem:
      - link "Mock Tests":
        - /url: /mock-tests
    - listitem:
      - link "Mentors":
        - /url: /mentors
    - listitem:
      - link "NEET Cutoff":
        - /url: /neet-cutoff
    - listitem:
      - link "PYQ Analysis":
        - /url: /pyq-analysis
    - listitem:
      - link "NEET Syllabus":
        - /url: /syllabus
    - listitem:
      - link "Medical Colleges":
        - /url: /medical-colleges
  - heading "Company" [level=3]
  - list:
    - listitem:
      - link "About Us":
        - /url: /about
    - listitem:
      - link "Contact":
        - /url: /contact
    - listitem:
      - link "NEET FAQ":
        - /url: /neet-faq
  - heading "Legal & Support" [level=3]
  - list:
    - listitem:
      - link "Terms of Service":
        - /url: /terms
    - listitem:
      - link "Privacy Policy":
        - /url: /privacy
    - listitem:
      - link "Refund Policy":
        - /url: /terms
    - listitem:
      - link "Help Center":
        - /url: /help
    - listitem:
      - link "App Guide":
        - /url: /guide
    - listitem:
      - link "Best Books":
        - /url: /best-books-neet
  - img
  - text: akshaykumar003@outlook.com
  - img
  - text: +91 97297 34752
  - img
  - text: Bangalore, India
  - paragraph: © 2026 Zero Page Technologies. All rights reserved.
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  |
  3  | test.describe('User Journey', () => {
  4  |     // We can't easily test login without a real user or a seeded db in this environment,
  5  |     // so we'll test valid public routes first to ensure the app is healthy.
  6  |     // If we have a standardized seed, we could test login.
  7  |     // For now, let's verify the Landing Page and Public Pages load correctly.
  8  |
  9  |     test('should load the home page successfully', async ({ page }) => {
  10 |         await page.goto('/');
> 11 |         await expect(page).toHaveTitle(/NEET Prep/);
     |                            ^ Error: expect(page).toHaveTitle(expected) failed
  12 |
  13 |         // Check for Hero Section
  14 |         await expect(page.getByText('Master NEET with AI')).toBeVisible();
  15 |         await expect(page.getByTestId('button-cta-signup')).toBeVisible();
  16 |     });
  17 |
  18 |     test('should navigate to pricing', async ({ page }) => {
  19 |         await page.goto('/');
  20 |         // Click the Pricing link in the navigation bar (desktop or mobile, picking first visible)
  21 |         await page.getByRole('link', { name: 'Pricing' }).first().click();
  22 |
  23 |         await expect(page).toHaveURL(/.*pricing/);
  24 |         // Relax strict text check or ensure exact match with the pricing page header
  25 |         await expect(page.locator('h1, h2').filter({ hasText: 'Pricing' }).first()).toBeVisible();
  26 |     });
  27 |
  28 |     // We can try to sign up a temp user if we wanted deep testing,
  29 |     // but for now let's verify the Mock Test route handles unauthenticated access gracefully
  30 |     test('should redirect unauthenticated access to mock test', async ({ page }) => {
  31 |         await page.goto('/mock-test/1');
  32 |         // Likely redirects to login or shows auth error
  33 |         // Let's check if we end up on login or see a login prompt
  34 |         await expect(page.getByText('Sign in to your account')).toBeVisible({ timeout: 10000 }).catch(() => {
  35 |             // Or maybe it redirects to /questions and shows "Please log in"
  36 |             // This assertion depends on exact behavior, let's keep it loose or remove if flaky
  37 |             console.log("Redirect behavior varied, skipping strict assertion");
  38 |         });
  39 |     });
  40 | });
  41 |
```