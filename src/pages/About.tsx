import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Heart, Leaf, Pencil, Flag, Target, Eye } from "lucide-react";
import aboutClassicCar from "@/assets/about-classic-car.jpg";
import aboutDesignProcess from "@/assets/about-design-process.jpg";
import aboutHeroWorkshop from "@/assets/about-hero-workshop.jpg";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead 
        title="Sobre Riscales Motor Co."
        description="Conoce la historia de Riscales Motor Co. Arte, pasión y motor clásico en cada camiseta artesanal. Diseño español, fabricación responsable."
      />
      <Header />
      
      <main className="flex-1">
        {/* Hero */}
        <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
          <div 
            role="img"
            aria-label="Taller artesanal de Riscales Motor Co. con diseños de vehículos clásicos"
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${aboutHeroWorkshop})` }}
          />
          <div className="absolute inset-0 bg-foreground/60" />
          
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
                  loading="lazy"
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
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Mission & Vision Section */}
            <div className="mb-24">
              <div className="text-center mb-16">
                <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Lo que nos mueve</span>
                <h2 className="font-display text-4xl md:text-5xl mt-4">Nuestra Esencia</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                {/* Mission */}
                <div className="group perspective-1000">
                  <div className="relative transition-all duration-500 transform-style-3d group-hover:rotate-y-180">
                    {/* Front - White */}
                    <div className="p-8 md:p-12 bg-background border border-foreground/10 rounded-lg backface-hidden shadow-sm">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-full border border-foreground/30 flex items-center justify-center">
                          <Target className="h-6 w-6" strokeWidth={1} />
                        </div>
                        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Nuestra Misión</span>
                      </div>
                      <h3 className="font-display text-2xl md:text-3xl mb-6 leading-tight">
                        Vestir la pasión por el motor con arte y autenticidad
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        Creamos camisetas que son más que prendas: son lienzos donde plasmamos 
                        la belleza de los vehículos que marcaron historia. Cada diseño nace del 
                        respeto por la artesanía y el amor por los clásicos.
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        Nuestra misión es conectar a personas que comparten esta pasión, 
                        ofreciéndoles piezas únicas que cuentan historias y despiertan emociones.
                      </p>
                    </div>
                    {/* Back - Black */}
                    <div className="absolute inset-0 p-8 md:p-12 bg-foreground text-background rounded-lg backface-hidden rotate-y-180">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-full border border-background/30 flex items-center justify-center">
                          <Target className="h-6 w-6" strokeWidth={1} />
                        </div>
                        <span className="text-xs uppercase tracking-[0.2em] text-background/60">Nuestra Misión</span>
                      </div>
                      <h3 className="font-display text-2xl md:text-3xl mb-6 leading-tight">
                        Vestir la pasión por el motor con arte y autenticidad
                      </h3>
                      <p className="text-background/80 leading-relaxed mb-4">
                        Creamos camisetas que son más que prendas: son lienzos donde plasmamos 
                        la belleza de los vehículos que marcaron historia. Cada diseño nace del 
                        respeto por la artesanía y el amor por los clásicos.
                      </p>
                      <p className="text-background/80 leading-relaxed">
                        Nuestra misión es conectar a personas que comparten esta pasión, 
                        ofreciéndoles piezas únicas que cuentan historias y despiertan emociones.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Vision */}
                <div className="group perspective-1000">
                  <div className="relative transition-all duration-500 transform-style-3d group-hover:rotate-y-180">
                    {/* Front - White */}
                    <div className="p-8 md:p-12 bg-background border border-foreground/10 rounded-lg backface-hidden shadow-sm">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-full border border-foreground/30 flex items-center justify-center">
                          <Eye className="h-6 w-6" strokeWidth={1} />
                        </div>
                        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Nuestra Visión</span>
                      </div>
                      <h3 className="font-display text-2xl md:text-3xl mb-6 leading-tight">
                        Ser el referente mundial en moda artesanal del motor
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        Imaginamos un mundo donde la moda y la pasión por el motor se unen 
                        en armonía. Donde cada camiseta es una obra de arte que trasciende 
                        generaciones y fronteras.
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        Aspiramos a crear una comunidad global de amantes del motor que 
                        visten con orgullo su pasión, con piezas fabricadas con amor 
                        en nuestro taller artesanal español.
                      </p>
                    </div>
                    {/* Back - Black */}
                    <div className="absolute inset-0 p-8 md:p-12 bg-foreground text-background rounded-lg backface-hidden rotate-y-180">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-full border border-background/30 flex items-center justify-center">
                          <Eye className="h-6 w-6" strokeWidth={1} />
                        </div>
                        <span className="text-xs uppercase tracking-[0.2em] text-background/60">Nuestra Visión</span>
                      </div>
                      <h3 className="font-display text-2xl md:text-3xl mb-6 leading-tight">
                        Ser el referente mundial en moda artesanal del motor
                      </h3>
                      <p className="text-background/80 leading-relaxed mb-4">
                        Imaginamos un mundo donde la moda y la pasión por el motor se unen 
                        en armonía. Donde cada camiseta es una obra de arte que trasciende 
                        generaciones y fronteras.
                      </p>
                      <p className="text-background/80 leading-relaxed">
                        Aspiramos a crear una comunidad global de amantes del motor que 
                        visten con orgullo su pasión, con piezas fabricadas con amor 
                        en nuestro taller artesanal español.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Origin Story */}
              <div className="mt-16 text-center max-w-3xl mx-auto">
                <div className="inline-block mb-6">
                  <Heart className="h-6 w-6 text-accent mx-auto" strokeWidth={1.5} />
                </div>
                <p className="font-display text-xl md:text-2xl text-muted-foreground leading-relaxed">
                  Todo comenzó con un lápiz, un papel y la imagen de un Porsche 911 
                  que no salía de nuestra cabeza. Hoy, ese mismo espíritu sigue vivo 
                  en cada diseño que creamos desde nuestro pequeño taller en España.
                </p>
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
            <div className="text-center pt-16 pb-8">
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
