import { Search, BookOpen, CreditCard, User, Shield, MessageCircle, HelpCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Seo } from "@/components/Seo";

export default function Help() {
  const categories = [
    { icon: User, title: "Account & Profile", desc: "Login, password, and security" },
    { icon: CreditCard, title: "Billing & Plans", desc: "Subscriptions and payments" },
    { icon: BookOpen, title: "Course Content", desc: "Tests, chapters, and topics" },
    { icon: Shield, title: "Safety & Privacy", desc: "Data protection and rules" }
  ];

  const faqs = [
    {
      q: "How does the AI Doubt Solver work?",
      a: "Our AI uses advanced Large Language Models trained on medical content to provide step-by-step explanations. Just click 'Explain' on any question."
    },
    {
      q: "Can I use ZERO AI on multiple devices?",
      a: "You can log in from any device, but for security, we only allow one active session at a time."
    },
    {
      q: "How often are mock tests updated?",
      a: "We add fresh mock tests every week, following the latest NTA/NEET patterns."
    },
    {
      q: "What is your refund policy?",
      a: "We offer a 48-hour 'no questions asked' refund for first-time subscribers if you're not satisfied."
    }
  ];

  return (
    <>
      <Seo
        title="Help & Support | ZeroPage NEET Preparation"
        description="Find answers to common questions and get support for ZeroPage's NEET preparation platform. FAQs, guides, and contact options."
        keywords={["zeropage help", "neet prep support", "zeropage faq", "how to use zeropage"]}
        url="https://neet.zeropage.in/help"
      />
      <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold italic tracking-tight">How can we help?</h1>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input className="pl-10 h-12 text-lg shadow-xl border-none bg-muted/50" placeholder="Search for answers..." />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {categories.map((cat, i) => (
            <Card key={i} className="hover:border-primary transition-colors cursor-pointer group">
              <CardContent className="p-6 text-center space-y-3">
                <div className="mx-auto p-3 rounded-xl bg-primary/10 text-primary w-fit group-hover:scale-110 transition-transform">
                  <cat.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold italic">{cat.title}</h3>
                <p className="text-xs text-muted-foreground">{cat.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-2xl font-bold italic flex items-center gap-2">
              <HelpCircle className="h-6 w-6 text-primary" />
              Popular Questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left font-semibold italic">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground italic leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="space-y-6">
            <Card className="bg-primary text-primary-foreground border-none shadow-2xl">
              <CardHeader>
                <CardTitle className="italic flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Live Support
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm italic opacity-90">
                  Can't find what you're looking for? Chat with our student support team.
                </p>
                <button className="w-full bg-background text-foreground font-bold py-2 rounded-lg text-sm hover:opacity-90 transition-opacity">
                  Start Chat
                </button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
