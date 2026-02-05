import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

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
      
      <main className="flex-1 flex items-center justify-center">
        <div className="container py-16">
          <div className="max-w-2xl mx-auto text-center">
            {/* Background Pattern */}
            <div className="relative mb-12">
              <div className="aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-neutral-dark via-foreground to-neutral-dark relative">
                <div className="absolute inset-0 opacity-20">
                  <div className="w-full h-full" style={{
                    backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 20px)`
                  }} />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-6xl md:text-8xl text-background/20">
                    {title}
                  </span>
                </div>
              </div>
            </div>

            {/* Content */}
            <h1 className="font-display text-4xl md:text-5xl mb-4">¡Próximamente!</h1>
            <h2 className="font-display text-2xl md:text-3xl text-accent mb-6">{title}</h2>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto">
              {description}. Estamos preparando algo especial para ti.
            </p>

            <div className="space-y-6">
              <Button 
                asChild 
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/90 font-bold uppercase tracking-wide"
              >
                <Link to="/productos">
                  Ver Camisetas
                </Link>
              </Button>

              <div className="pt-8 border-t max-w-md mx-auto">
                <p className="text-sm text-muted-foreground mb-4">
                  Suscríbete para ser el primero en saberlo
                </p>
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Tu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
