import { ShieldCheck, Scale, FileText, Gavel, UserCheck, Lock } from "lucide-react";
import { Seo } from "@/components/Seo";

export default function Terms() {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      icon: Scale,
      content: "By accessing or using ZERO AI NEET platform, you agree to be bound by these Terms of Service. If you do not agree to all of these terms, you do not have permission to access the service."
    },
    {
      title: "2. Subscription & Payments",
      icon: FileText,
      content: "Subscriptions are billed in advance on a recurring basis. All fees are non-refundable except where required by law. Users are responsible for all taxes associated with their purchase."
    },
    {
      title: "3. User Conduct",
      icon: UserCheck,
      content: "You agree not to use the platform for any unlawful purpose or to interfere with the proper functioning of the site. Account sharing is strictly prohibited and may result in permanent suspension."
    },
    {
      title: "4. Intellectual Property",
      icon: ShieldCheck,
      content: "All content, features, and functionality on the platform, including but not limited to AI-generated explanations and mock tests, are owned by Zero Page Technologies."
    },
    {
      title: "5. Limitation of Liability",
      icon: Gavel,
      content: "ZERO AI shall not be liable for any indirect, incidental, special, consequential or punitive damages resulting from your access to or use of the service."
    },
    {
      title: "6. Data Privacy",
      icon: Lock,
      content: "Your use of the platform is also governed by our Privacy Policy. Please review it to understand how we collect, use, and protect your personal information."
    }
  ];

  return (
    <>
      <Seo
        title="Terms of Service | ZeroPage NEET Preparation"
        description="Read ZeroPage's terms of service for our AI-powered NEET preparation platform. Understand your rights and responsibilities as a user."
        keywords={["zeropage terms", "neet prep terms of service", "zeropage conditions"]}
        url="https://neet.zeroai.org.in/terms"
      />
      <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold italic mb-4">Terms of Service</h1>
          <p className="text-muted-foreground italic">Last Updated: May 1, 2026</p>
        </div>

        <div className="grid gap-8">
          {sections.map((section, index) => (
            <div key={index} className="flex gap-6 p-8 rounded-2xl bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors">
              <div className="shrink-0">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <section.icon className="h-6 w-6" />
                </div>
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-bold italic">{section.title}</h2>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {section.content}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 rounded-3xl bg-primary/5 text-center italic">
          <p className="text-sm text-muted-foreground">
            If you have any questions about these Terms, please contact us at{" "}
            <a href="mailto:legal@zeroai.org.in" className="text-primary font-bold hover:underline">
              legal@zeroai.org.in
            </a>
          </p>
        </div>
      </div>
    </div>
    </>
  );
}
