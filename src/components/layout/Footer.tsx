import { Link } from "react-router-dom";
import { Instagram, Facebook, Youtube } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { BrandHeart } from "@/components/BrandHeart";

export function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useTranslation();

  const footerLinks = {
    shop: [
      { name: t('footer.links.tshirts'), href: "/productos" },
      { name: t('footer.links.hoodies'), href: "/proximamente/sudaderas" },
      { name: t('footer.links.accessories'), href: "/proximamente/accesorios" },
      { name: t('footer.links.sizeGuide'), href: "/guia-tallas" },
    ],
    support: [
      { name: t('footer.links.contact'), href: "/contacto" },
      { name: t('footer.links.shipping'), href: "/envios" },
      { name: t('footer.links.returns'), href: "/devoluciones" },
      { name: t('footer.links.sizeGuide'), href: "/guia-tallas" },
      { name: t('footer.links.privacy'), href: "/privacidad" },
      { name: t('footer.links.terms'), href: "/terminos" },
      { name: t('footer.links.cookies'), href: "/cookies" },
    ],
    about: [
      { name: t('footer.links.aboutRiscales'), href: "/sobre-riscales" },
      { name: t('footer.links.sustainability'), href: "/sostenibilidad" },
    ],
  };

  const socialLinks = [
    { name: "Instagram", icon: Instagram, href: "https://instagram.com/riscalesmotor" },
    { name: "Facebook", icon: Facebook, href: "https://facebook.com/riscalesmotor" },
    { name: "YouTube", icon: Youtube, href: "https://youtube.com/@riscalesmotor" },
  ];

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    // Simulate newsletter signup
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success(t('footer.newsletter.success'), {
      description: t('footer.newsletter.successDescription'),
    });
    setEmail("");
    setIsSubmitting(false);
  };

  return (
    <footer className="bg-neutral-dark text-sidebar-foreground pb-16 sm:pb-0">
      {/* Newsletter Section */}
      <div className="border-b border-sidebar-border">
        <div className="container py-10 sm:py-12">
          <div className="max-w-xl mx-auto text-center px-2">
            <h3 className="font-display text-2xl sm:text-3xl mb-2">{t('footer.newsletter.title')}</h3>
            <p className="text-sidebar-foreground/80 mb-5 sm:mb-6 text-sm sm:text-base">
              {t('footer.newsletter.description')}
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-2">
              <Input
                type="email"
                placeholder={t('footer.newsletter.placeholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-foreground/50 h-12 sm:h-10 text-base sm:text-sm"
                required
              />
              <Button 
                type="submit" 
                className="bg-accent hover:bg-accent/90 active:bg-accent/80 text-accent-foreground font-bold uppercase tracking-wide h-12 sm:h-10 px-6 touch-manipulation"
                disabled={isSubmitting}
              >
                {isSubmitting ? "..." : t('footer.newsletter.button')}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container py-10 sm:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {/* Shop */}
          <div>
            <h4 className="font-body font-bold uppercase tracking-wide text-sm mb-3 sm:mb-4">{t('footer.sections.shop')}</h4>
            <ul className="space-y-2.5 sm:space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="block py-1 text-sm text-sidebar-foreground/80 hover:text-sidebar-foreground active:text-accent transition-colors touch-manipulation"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-body font-bold uppercase tracking-wide text-sm mb-3 sm:mb-4">{t('footer.sections.support')}</h4>
            <ul className="space-y-2.5 sm:space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="block py-1 text-sm text-sidebar-foreground/80 hover:text-sidebar-foreground active:text-accent transition-colors touch-manipulation"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div className="col-span-1">
            <h4 className="font-body font-bold uppercase tracking-wide text-sm mb-3 sm:mb-4">{t('footer.sections.about')}</h4>
            <ul className="space-y-2.5 sm:space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="block py-1 text-sm text-sidebar-foreground/80 hover:text-sidebar-foreground active:text-accent transition-colors touch-manipulation"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="col-span-1">
            <h4 className="font-body font-bold uppercase tracking-wide text-sm mb-3 sm:mb-4">{t('footer.sections.social')}</h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon text-sidebar-foreground p-2.5 sm:p-2 touch-manipulation"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-sidebar-border mt-10 sm:mt-12 pt-6 sm:pt-8">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-sidebar-foreground/60 text-sm">
              <span className="text-xs sm:text-sm">{t('footer.payment')}</span>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="px-2.5 py-1.5 sm:px-2 sm:py-1 border border-sidebar-border rounded text-xs">VISA</span>
                <span className="px-2.5 py-1.5 sm:px-2 sm:py-1 border border-sidebar-border rounded text-xs">Mastercard</span>
                <span className="px-2.5 py-1.5 sm:px-2 sm:py-1 border border-sidebar-border rounded text-xs">PayPal</span>
                <span className="px-2.5 py-1.5 sm:px-2 sm:py-1 border border-sidebar-border rounded text-xs">Bizum</span>
              </div>
            </div>
            <div className="text-sidebar-foreground/60 text-xs sm:text-sm">
              {t('footer.shippingRegions')}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-sidebar-border mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-sidebar-foreground/60">
          <p className="inline-flex items-center gap-1 flex-wrap justify-center">{t('footer.copyright')} <BrandHeart size="xs" className="text-accent" /> {t('footer.inSpain')}</p>
        </div>
      </div>
    </footer>
  );
}
