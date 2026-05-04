import { Link } from "wouter";
import { GraduationCap, Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    platform: [
      { name: "Dashboard", href: "/dashboard" },
      { name: "Practice", href: "/practice" },
      { name: "Mock Tests", href: "/mock-tests" },
      { name: "Mentors", href: "/mentors" },
      { name: "NEET Cutoff", href: "/neet-cutoff" },
      { name: "PYQ Analysis", href: "/pyq-analysis" },
      { name: "NEET Syllabus", href: "/syllabus" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Contact", href: "/contact" },
      { name: "Blog", href: "/blog/welcome-to-zero-ai" },
    ],
    legal: [
      { name: "Terms of Service", href: "/terms" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Refund Policy", href: "/terms" }, // Pointing to terms for now
    ],
    support: [
      { name: "Help Center", href: "/help" },
      { name: "NEET FAQ", href: "/neet-faq" },
      { name: "App Guide", href: "/guide" },
    ],
  };

  return (
    <footer className="bg-muted/30 border-t border-border/50 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-primary">
                <GraduationCap className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-black italic tracking-tighter">
                ZERO <span className="text-primary">AI</span>
              </span>
            </Link>
            <p className="text-muted-foreground max-w-sm italic leading-relaxed">
              Empowering the next generation of doctors with AI-driven 
              personalized learning. Master NEET with precision and speed.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 rounded-lg bg-background hover:text-primary transition-colors border border-border/50">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-background hover:text-primary transition-colors border border-border/50">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-background hover:text-primary transition-colors border border-border/50">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-background hover:text-primary transition-colors border border-border/50">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="space-y-6">
            <h3 className="font-bold italic text-sm uppercase tracking-widest text-primary">Platform</h3>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-foreground transition-colors text-sm italic">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="font-bold italic text-sm uppercase tracking-widest text-primary">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-foreground transition-colors text-sm italic">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="font-bold italic text-sm uppercase tracking-widest text-primary">Legal & Support</h3>
            <ul className="space-y-3">
              {footerLinks.legal.concat(footerLinks.support).map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-foreground transition-colors text-sm italic">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground italic">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              akshaykumar003@outlook.com
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              +91 97297 34752
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Bangalore, India
            </div>
          </div>
          <p className="text-sm text-muted-foreground italic">
            © {currentYear} Zero Page Technologies. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
