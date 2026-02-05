import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Heart, Leaf, Pencil, Flag } from "lucide-react";
import aboutClassicCar from "@/assets/about-classic-car.jpg";
import aboutDesignProcess from "@/assets/about-design-process.jpg";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero */}
        <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-dark via-foreground to-neutral-dark" />
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full" style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.05) 10px, rgba(255,255,255,0.05) 20px)`
            }} />
          </div>
          
          <div className="relative z-10 text-center px-4">
            <h1 className="font-display text-5xl md:text-7xl text-background mb-4">
              RISCALES MOTOR CO.
            </h1>
            <p className="font-display text-2xl md:text-3xl text-background/90">
              Motores Clásicos, Emociones Reales
            </p>
            <div className="mt-6">
              <Heart className="h-12 w-12 text-accent mx-auto animate-heartbeat" fill="currentColor" />
            </div>
          </div>
        </section>

        {/* Manifesto Sections */}
        <section className="py-16 md:py-24">
          <div className="container">
            {/* Section 1 */}
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
              <div className="aspect-square rounded-lg overflow-hidden relative">
                <img 
                  src={aboutClassicCar} 
                  alt="Detalle de coche clásico vintage" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-6">
                <h2 className="font-display text-3xl md:text-4xl leading-tight">
                  En Riscales Motor Co. no solo rendimos homenaje a los vehículos clásicos.
                </h2>
                <div className="w-16 h-0.5 bg-accent" />
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Nuestra esencia va más allá del motor: es amor por lo que hacemos, 
                  es arte en cada trazo, es diseño con alma.
                </p>
              </div>
            </div>

            {/* Section 2 */}
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
              <div className="order-2 lg:order-1 space-y-6">
                <h2 className="font-display text-3xl md:text-4xl leading-tight">
                  Cada camiseta cuenta una historia.
                </h2>
                <div className="w-16 h-0.5 bg-accent" />
                <p className="text-lg text-muted-foreground leading-relaxed">
                  La historia de máquinas que marcaron época, de emociones que perduran, 
                  de pasión que se transmite de generación en generación.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Nuestros diseños nacen de la admiración por los clásicos, de noches 
                  dibujando cada curva, cada detalle, cada pieza que hizo legendarios 
                  a estos vehículos.
                </p>
              </div>
              <div className="order-1 lg:order-2 aspect-square rounded-lg overflow-hidden relative">
                <img 
                  src={aboutDesignProcess} 
                  alt="Proceso de diseño artesanal" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Values - Workshop Style */}
            <div className="py-16 border-t border-b border-dashed border-foreground/20">
              <div className="text-center mb-10">
                <span className="font-display text-2xl text-muted-foreground">Nuestros Valores</span>
              </div>
              <div className="grid md:grid-cols-4 gap-8">
                {[
                  { icon: Heart, title: 'Amor por el Detalle', desc: 'Cada trazo, pensado. Cada diseño, único.' },
                  { icon: Leaf, title: 'Fabricación Responsable', desc: 'Respetamos el planeta, producimos bajo demanda.' },
                  { icon: Pencil, title: 'Arte Auténtico', desc: 'Diseños originales hechos a mano.' },
                  { icon: Flag, title: 'Pasión Motor', desc: 'Celebramos la historia del automovilismo.' },
                ].map((value) => (
                  <div 
                    key={value.title} 
                    className="text-center group"
                  >
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full border-2 border-dashed border-foreground/30 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/5 transition-all duration-300">
                      <value.icon className="h-8 w-8 text-foreground/70 group-hover:text-accent transition-colors" strokeWidth={1} />
                    </div>
                    <h3 className="font-display text-xl mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{value.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Final Quote */}
            <div className="text-center py-24">
              <blockquote className="max-w-2xl mx-auto">
                <p className="font-display text-3xl md:text-4xl lg:text-5xl leading-tight mb-8">
                  "Porque cada camiseta que llevas<br />cuenta una historia.<br />
                  <span className="text-accent">La tuya.</span>"
                </p>
                <Heart className="h-8 w-8 text-accent mx-auto hover-heartbeat" fill="currentColor" />
              </blockquote>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
