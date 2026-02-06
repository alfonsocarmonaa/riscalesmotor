import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { SEOHead } from "@/components/SEOHead";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import comingSoonBg from "@/assets/coming-soon-bg.jpg";

export default function ComingSoonPage() {
  const { category } = useParams<{ category: string }>();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const title = category === 'sudaderas' ? 'Sudaderas' : 'Accesorios';
  const description = category === 'sudaderas' 
    ? 'Sudaderas premium con nuestros diseños artesanales de motor clásico'
    : 'Accesorios exclusivos para los amantes del motor vintage';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success("¡Te avisaremos!", {
      description: `Serás el primero en conocer nuestros nuevos ${title.toLowerCase()}.`,
    });
    setEmail("");
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center relative">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${comingSoonBg})` }}
        >
          <div className="absolute inset-0 bg-foreground/70" />
        </div>

        <div className="container py-16 relative z-10">
          <div className="max-w-2xl mx-auto text-center text-background">
            {/* Content */}
            <h1 className="font-display text-5xl md:text-7xl mb-4">¡Próximamente!</h1>
            <h2 className="font-display text-3xl md:text-4xl text-accent mb-6">{title}</h2>
            
            <p className="text-lg text-background/80 mb-8 max-w-lg mx-auto">
              {description}. Estamos preparando algo especial para ti.
            </p>

            <div className="space-y-6">
              <Button 
                asChild 
                size="lg"
                className="bg-background text-foreground hover:bg-background/90 font-bold uppercase tracking-wide"
              >
                <Link to="/productos">
                  Ver Camisetas
                </Link>
              </Button>

              <div className="pt-8 border-t border-background/30 max-w-md mx-auto">
                <p className="text-sm text-background/70 mb-4">
                  Suscríbete para ser el primero en saberlo
                </p>
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Tu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-background/10 border-background/30 text-background placeholder:text-background/50"
                    required
                  />
                  <Button 
                    type="submit" 
                    className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold uppercase"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "..." : "Suscribir"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
