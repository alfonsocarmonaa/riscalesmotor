import { Link } from "react-router-dom";
import { Instagram, Facebook, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { BrandHeart } from "@/components/BrandHeart";
import { useNewsletterSubscribe } from "@/hooks/useNewsletterSubscribe";

export function Footer() {
  const [email, setEmail] = useState("");
  const { subscribe, isSubmitting } = useNewsletterSubscribe();

  const footerLinks = {
    shop: [
      { name: "Camisetas", href: "/productos" },
      { name: "Sudaderas", href: "/proximamente/sudaderas" },
      { name: "Accesorios", href: "/proximamente/accesorios" },
      { name: "Guía de Tallas", href: "/guia-tallas" },
    ],
    support: [
      { name: "Contacto", href: "/contacto" },
      { name: "Envíos", href: "/envios" },
      { name: "Devoluciones", href: "/devoluciones" },
      { name: "Guía de Tallas", href: "/guia-tallas" },
      { name: "Política de Privacidad", href: "/privacidad" },
      { name: "Términos y Condiciones", href: "/terminos" },
      { name: "Política de Cookies", href: "/cookies" },
    ],
    about: [
      { name: "Sobre Riscales", href: "/sobre-riscales" },
      { name: "Compromiso Sostenible", href: "/sostenibilidad" },
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
    
    const result = await subscribe(email, "footer");
    
    if (result?.alreadySubscribed) {
      toast.info("Ya estás suscrito", { description: "Este email ya está en nuestra lista." });
    } else if (result?.error) {
      toast.error("Error al suscribirse", { description: result.error });
    } else {
      toast.success("¡Bienvenido a la familia Riscales!", {
        description: "Recibirás un 10% de descuento en tu primera compra.",
      });
    }
    setEmail("");
  };

  return (
    <footer className="bg-neutral-dark text-sidebar-foreground pb-16 sm:pb-0">
      {/* Newsletter Section */}
      <div className="border-b border-sidebar-border">
        <div className="container py-10 sm:py-12">
          <div className="max-w-xl mx-auto text-center px-2">
            <h3 className="font-display text-2xl sm:text-3xl mb-2">Únete a la familia Riscales</h3>
            <p className="text-sidebar-foreground/80 mb-5 sm:mb-6 text-sm sm:text-base">
              Suscríbete y recibe un 10% de descuento en tu primera compra
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-2">
              <Input
                type="email"
                placeholder="Tu email"
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
                {isSubmitting ? "..." : "Suscribir"}
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
            <h4 className="font-body font-bold uppercase tracking-wide text-sm mb-3 sm:mb-4">Tienda</h4>
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
            <h4 className="font-body font-bold uppercase tracking-wide text-sm mb-3 sm:mb-4">Soporte</h4>
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
            <h4 className="font-body font-bold uppercase tracking-wide text-sm mb-3 sm:mb-4">Sobre Nosotros</h4>
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
            <h4 className="font-body font-bold uppercase tracking-wide text-sm mb-3 sm:mb-4">Síguenos</h4>
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
              <span className="text-xs sm:text-sm">Métodos de pago:</span>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="px-2.5 py-1.5 sm:px-2 sm:py-1 border border-sidebar-border rounded text-xs">VISA</span>
                <span className="px-2.5 py-1.5 sm:px-2 sm:py-1 border border-sidebar-border rounded text-xs">Mastercard</span>
                <span className="px-2.5 py-1.5 sm:px-2 sm:py-1 border border-sidebar-border rounded text-xs">PayPal</span>
                <span className="px-2.5 py-1.5 sm:px-2 sm:py-1 border border-sidebar-border rounded text-xs">Bizum</span>
              </div>
            </div>
            <div className="text-sidebar-foreground/60 text-xs sm:text-sm">
              Envíos a España y Europa
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-sidebar-border mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-sidebar-foreground/60">
          <p className="inline-flex items-center gap-1 flex-wrap justify-center">© 2026 Riscales Motor Co. | Hecho con <BrandHeart size="xs" className="text-accent" /> en España</p>
        </div>
      </div>
    </footer>
  );
}
