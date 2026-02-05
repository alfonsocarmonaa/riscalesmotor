import { Link } from "react-router-dom";
import { Instagram, Facebook, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { BrandHeart } from "@/components/BrandHeart";
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

export function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    // Simulate newsletter signup
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success("¡Bienvenido a la familia Riscales!", {
      description: "Recibirás un 10% de descuento en tu primera compra.",
    });
    setEmail("");
    setIsSubmitting(false);
  };

  return (
    <footer className="bg-neutral-dark text-sidebar-foreground">
      {/* Newsletter Section */}
      <div className="border-b border-sidebar-border">
        <div className="container py-12">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="font-display text-3xl mb-2">Únete a la familia Riscales</h3>
            <p className="text-sidebar-foreground/80 mb-6">
              Suscríbete y recibe un 10% de descuento en tu primera compra
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <Input
                type="email"
                placeholder="Tu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-foreground/50"
                required
              />
              <Button 
                type="submit" 
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold uppercase tracking-wide"
                disabled={isSubmitting}
              >
                {isSubmitting ? "..." : "Suscribir"}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Shop */}
          <div>
            <h4 className="font-body font-bold uppercase tracking-wide mb-4">Shop</h4>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="group inline-flex items-center gap-0 text-sidebar-foreground/80 hover:text-sidebar-foreground transition-all duration-300"
                  >
                    <BrandHeart size="xs" className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-body font-bold uppercase tracking-wide mb-4">Soporte</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="group inline-flex items-center gap-0 text-sidebar-foreground/80 hover:text-sidebar-foreground transition-all duration-300"
                  >
                    <BrandHeart size="xs" className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-body font-bold uppercase tracking-wide mb-4">Sobre Nosotros</h4>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="group inline-flex items-center gap-0 text-sidebar-foreground/80 hover:text-sidebar-foreground transition-all duration-300"
                  >
                    <BrandHeart size="xs" className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-body font-bold uppercase tracking-wide mb-4">Síguenos</h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon text-sidebar-foreground"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-sidebar-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-sidebar-foreground/60 text-sm">
              <span>Métodos de pago:</span>
              <div className="flex gap-2">
                <span className="px-2 py-1 border border-sidebar-border rounded text-xs">VISA</span>
                <span className="px-2 py-1 border border-sidebar-border rounded text-xs">Mastercard</span>
                <span className="px-2 py-1 border border-sidebar-border rounded text-xs">PayPal</span>
                <span className="px-2 py-1 border border-sidebar-border rounded text-xs">Bizum</span>
              </div>
            </div>
            <div className="text-sidebar-foreground/60 text-sm">
              Envíos a España y Europa
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-sidebar-border mt-8 pt-8 text-center text-sm text-sidebar-foreground/60">
          <p className="inline-flex items-center gap-1">© 2026 Riscales Motor Co. | Hecho con <BrandHeart size="xs" /> en España</p>
        </div>
      </div>
    </footer>
  );
}
