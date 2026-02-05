import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Recycle, Factory, Heart, Sparkles, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const commitments = [
  {
    icon: Recycle,
    title: "Cero Desperdicio",
    subtitle: "Print on Demand",
    description: "Cada camiseta se fabrica solo cuando tú la pides. No producimos stock que acabe en vertederos. Cero desperdicio, máximo respeto por el planeta.",
    stat: "0%",
    statLabel: "Desperdicio",
  },
  {
    icon: Leaf,
    title: "100% Algodón Natural",
    subtitle: "Materiales Premium",
    description: "Utilizamos algodón 100% natural de primera calidad. Transpirable, duradero y respetuoso con tu piel y con el medio ambiente.",
    stat: "100%",
    statLabel: "Algodón",
  },
  {
    icon: Factory,
    title: "Proveedores de Confianza",
    subtitle: "Calidad Certificada",
    description: "Trabajamos exclusivamente con proveedores de primera calidad que comparten nuestros valores de sostenibilidad y condiciones laborales.",
    stat: "1ª",
    statLabel: "Calidad",
  },
  {
    icon: Heart,
    title: "Hecho con Amor",
    subtitle: "Producción Local",
    description: "Diseñamos en España y producimos de forma responsable. Cada camiseta pasa por manos que aman lo que hacen.",
    stat: "♥",
    statLabel: "España",
  },
];

const impactNumbers = [
  { number: "0", label: "Camisetas desperdiciadas", suffix: "" },
  { number: "100", label: "Algodón natural", suffix: "%" },
  { number: "180", label: "Gramaje premium", suffix: "gr/m²" },
  { number: "30", label: "Días de garantía", suffix: "" },
];

export default function Sustainability() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-secondary py-16 md:py-24">
          <div className="container text-center">
            <Leaf className="h-16 w-16 mx-auto mb-6 text-accent" />
            <h1 className="font-display text-4xl md:text-6xl mb-4">Compromiso Sostenible</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              En Riscales Motor Co. creemos que la moda puede ser responsable. 
              Cada decisión que tomamos tiene en cuenta el impacto en nuestro planeta.
            </p>
            <div className="flex items-center justify-center gap-2 text-accent font-display text-2xl">
              <span>Motores Clásicos</span>
              <Heart className="h-6 w-6 fill-accent" />
              <span>Planeta Limpio</span>
            </div>
          </div>
        </section>

        {/* Impact Numbers */}
        <section className="py-12 bg-foreground text-background">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {impactNumbers.map((item) => (
                <div key={item.label}>
                  <div className="font-display text-4xl md:text-5xl text-accent mb-2">
                    {item.number}{item.suffix}
                  </div>
                  <div className="text-background/80 text-sm md:text-base">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Commitments */}
        <section className="py-16 md:py-24">
          <div className="container">
            <h2 className="font-display text-3xl md:text-4xl text-center mb-4">Nuestros Pilares</h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
              Cuatro compromisos que guían cada decisión en Riscales Motor Co.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {commitments.map((item) => (
                <Card key={item.title} className="overflow-hidden group hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                          <item.icon className="h-10 w-10 text-accent" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-bold text-accent uppercase tracking-wide mb-1">
                          {item.subtitle}
                        </div>
                        <h3 className="font-display text-2xl mb-3">{item.title}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                    <div className="mt-6 pt-6 border-t flex items-center justify-between">
                      <span className="text-muted-foreground text-sm">{item.statLabel}</span>
                      <span className="font-display text-3xl text-accent">{item.stat}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Print on Demand Explanation */}
        <section className="py-16 md:py-24 bg-secondary">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <Sparkles className="h-12 w-12 text-accent mb-6" />
                  <h2 className="font-display text-3xl md:text-4xl mb-6">
                    ¿Qué es Print on Demand?
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    A diferencia de la industria tradicional que produce miles de camisetas 
                    que pueden acabar en vertederos, nosotros <strong className="text-foreground">fabricamos cada 
                    camiseta solo cuando tú la pides</strong>.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    Esto significa que no hay exceso de inventario, no hay desperdicio, 
                    y cada prenda que creamos tiene un destino: tu armario.
                  </p>
                  <p className="text-muted-foreground">
                    Es una forma más lenta de hacer moda, pero es la correcta. 
                    Porque el planeta no puede esperar.
                  </p>
                </div>
                <div className="space-y-4">
                  <Card>
                    <CardContent className="p-6 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">1</span>
                      </div>
                      <div>
                        <h4 className="font-bold">Tú haces tu pedido</h4>
                        <p className="text-sm text-muted-foreground">Eliges tu diseño y talla favoritos</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">2</span>
                      </div>
                      <div>
                        <h4 className="font-bold">Fabricamos tu camiseta</h4>
                        <p className="text-sm text-muted-foreground">Imprimimos tu diseño con mimo (2-3 días)</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">3</span>
                      </div>
                      <div>
                        <h4 className="font-bold">Enviamos directo a ti</h4>
                        <p className="text-sm text-muted-foreground">Sin intermediarios, sin desperdicio</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quality Promise */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <Globe className="h-12 w-12 mx-auto text-accent mb-6" />
              <h2 className="font-display text-3xl md:text-4xl mb-6">
                Calidad que Perdura
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                La mejor forma de ser sostenible es crear productos que duren. Por eso utilizamos 
                algodón 100% de primera calidad con un gramaje de 180 gr/m², garantizando una 
                camiseta que mantendrá su forma, color y suavidad lavado tras lavado.
              </p>
              <div className="grid grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="font-display text-2xl text-accent mb-2">180 gr/m²</div>
                    <div className="text-sm text-muted-foreground">Gramaje Premium</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="font-display text-2xl text-accent mb-2">100%</div>
                    <div className="text-sm text-muted-foreground">Algodón Natural</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="font-display text-2xl text-accent mb-2">+50</div>
                    <div className="text-sm text-muted-foreground">Lavados Garantizados</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Quote Section */}
        <section className="py-16 bg-foreground text-background">
          <div className="container">
            <blockquote className="max-w-3xl mx-auto text-center">
              <p className="font-display text-2xl md:text-4xl mb-6">
                "No heredamos el planeta de nuestros padres, 
                lo tomamos prestado de nuestros hijos."
              </p>
              <footer className="text-background/70">
                — Proverbio que guía nuestra filosofía
              </footer>
            </blockquote>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24">
          <div className="container text-center">
            <h2 className="font-display text-3xl md:text-4xl mb-4">
              Únete al Cambio
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Cada camiseta Riscales es un pequeño paso hacia una moda más responsable. 
              Viste con orgullo, viste con conciencia.
            </p>
            <Link 
              to="/productos" 
              className="inline-flex items-center gap-2 bg-foreground text-background px-8 py-4 rounded-md font-bold hover:bg-foreground/90 transition-colors"
            >
              <Leaf className="h-5 w-5" />
              Descubrir Colección
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
