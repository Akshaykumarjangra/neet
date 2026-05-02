import { Lock, Eye, Database, Share2, ShieldAlert, Bell } from "lucide-react";
import { Seo } from "@/components/Seo";

export default function Privacy() {
  const sections = [
    {
      title: "Data We Collect",
      icon: Database,
      content: "We collect information you provide directly to us (name, email, school) and data generated through your use of the platform, including test results, study habits, and device information like IP addresses and fingerprints for security purposes."
    },
    {
      title: "How We Use Data",
      icon: Eye,
      content: "Your data is used to personalize your learning experience, provide AI-driven insights, process payments, and improve our platform's algorithms. We also use it to communicate important updates and promotional offers."
    },
    {
      title: "Data Protection",
      icon: ShieldAlert,
      content: "We implement robust security measures including end-to-end encryption for sensitive data and regular security audits. Your personal data is stored on secure servers located in compliant data centers."
    },
    {
      title: "Third-Party Sharing",
      icon: Share2,
      content: "We do not sell your personal data. We only share information with trusted partners (like Stripe/Razorpay for billing) necessary to provide our services, or when required by law."
    },
    {
      title: "Your Rights",
      icon: Lock,
      content: "You have the right to access, correct, or delete your personal data. You can manage your communication preferences through your account settings or by contacting our support team."
    },
    {
      title: "Updates to Policy",
      icon: Bell,
      content: "We may update this policy from time to time. We will notify you of any significant changes via email or by placing a prominent notice on our website."
    }
  ];

  return (
    <>
      <Seo
        title="Privacy Policy | ZeroPage NEET Preparation"
        description="Learn how ZeroPage collects, uses, and protects your personal data. Our commitment to student privacy and data security in NEET preparation."
        keywords={["zeropage privacy", "neet prep data security", "student data privacy"]}
        url="https://neet.zeropage.in/privacy"
      />
      <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold italic mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground italic">Last Updated: May 1, 2026</p>
        </div>

        <div className="space-y-12">
          {sections.map((section, index) => (
            <div key={index} className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <section.icon className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-bold italic">{section.title}</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed pl-12">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 border-t pt-12 text-center text-sm text-muted-foreground italic">
          <p>
            For privacy-related inquiries, please contact our Data Protection Officer at{" "}
            <a href="mailto:privacy@zeropage.in" className="text-primary font-bold hover:underline">
              privacy@zeropage.in
            </a>
          </p>
        </div>
      </div>
    </div>
    </>
  );
}
