import React from 'react';
import { cn } from '@/lib/utils';

interface QuickAnswerProps {
    question: string;
    answer: string;
    details?: string;
    source?: string;
    className?: string;
}

export function QuickAnswer({
    question,
    answer,
    details,
    source,
    className
}: QuickAnswerProps) {
    return (
        <div className={cn(
            "quick-answer-box rounded-lg border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 p-6 my-6",
            className
        )}>
            <div className="question-header mb-4">
                <h2 className="text-2xl font-bold text-foreground flex items-start gap-2">
                    <span className="text-primary">Q:</span>
                    <span>{question}</span>
                </h2>
            </div>

            <div className="direct-answer mb-4 p-4 bg-white dark:bg-black/20 rounded-md border-l-4 border-primary">
                <div className="flex items-start gap-2">
                    <span className="text-primary font-bold text-lg">A:</span>
                    <p className="text-lg font-medium text-foreground">{answer}</p>
                </div>
            </div>

            {details && (
                <div className="detailed-explanation mt-4 pt-4 border-t border-border">
                    <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                        Detailed Explanation
                    </h3>
                    <p className="text-foreground leading-relaxed">{details}</p>
                </div>
            )}

            {source && (
                <div className="source-attribution mt-3 text-xs text-muted-foreground italic">
                    Source: {source}
                </div>
            )}
        </div>
    );
}

interface FAQSectionProps {
    faqs: Array<{
        question: string;
        answer: string;
        category?: string;
    }>;
    title?: string;
    className?: string;
}

export function FAQSection({ faqs, title = "Frequently Asked Questions", className }: FAQSectionProps) {
    return (
        <section className={cn("faq-section my-12", className)}>
            <h2 className="text-3xl font-bold mb-8 text-center">{title}</h2>

            <div className="space-y-6">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="faq-item p-6 rounded-lg border border-border bg-card hover:shadow-lg transition-shadow"
                    >
                        <h3 className="text-xl font-semibold mb-3 text-foreground flex items-start gap-2">
                            <span className="text-primary shrink-0">Q{index + 1}:</span>
                            <span>{faq.question}</span>
                        </h3>
                        <div className="pl-8">
                            <p className="text-foreground leading-relaxed">{faq.answer}</p>
                            {faq.category && (
                                <span className="inline-block mt-3 px-3 py-1 text-xs rounded-full bg-primary/10 text-primary">
                                    {faq.category}
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

interface StatCardProps {
    stat: string;
    description: string;
    source: string;
    year: number;
    className?: string;
}

export function StatCard({ stat, description, source, year, className }: StatCardProps) {
    return (
        <div className={cn(
            "stat-card p-6 rounded-xl border border-border bg-gradient-to-br from-card to-card/50 hover:shadow-xl transition-all hover:-translate-y-1",
            className
        )}>
            <div className="stat-number text-4xl font-bold bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent mb-2">
                {stat}
            </div>
            <div className="stat-description text-foreground font-medium mb-3">
                {description}
            </div>
            <div className="stat-source text-xs text-muted-foreground">
                <span className="font-semibold">Source:</span> {source} ({year})
            </div>
        </div>
    );
}

interface HowToStepProps {
    stepNumber: number;
    title: string;
    description: string;
    className?: string;
}

export function HowToStep({ stepNumber, title, description, className }: HowToStepProps) {
    return (
        <div className={cn("how-to-step flex gap-4 mb-6", className)}>
            <div className="step-number shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                {stepNumber}
            </div>
            <div className="step-content flex-1">
                <h3 className="text-xl font-semibold mb-2 text-foreground">{title}</h3>
                <p className="text-foreground leading-relaxed">{description}</p>
            </div>
        </div>
    );
}

interface HowToGuideProps {
    title: string;
    steps: Array<{
        name: string;
        text: string;
    }>;
    introduction?: string;
    className?: string;
}

export function HowToGuide({ title, steps, introduction, className }: HowToGuideProps) {
    return (
        <section className={cn("how-to-guide my-12", className)}>
            <h2 className="text-3xl font-bold mb-4">{title}</h2>

            {introduction && (
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    {introduction}
                </p>
            )}

            <div className="steps-container">
                {steps.map((step, index) => (
                    <HowToStep
                        key={index}
                        stepNumber={index + 1}
                        title={step.name}
                        description={step.text}
                    />
                ))}
            </div>
        </section>
    );
}
