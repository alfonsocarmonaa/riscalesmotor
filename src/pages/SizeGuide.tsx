import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Card, CardContent } from "@/components/ui/card";
import { Ruler, ArrowDown, ArrowLeftRight } from "lucide-react";

const sizeData = [
  { size: "XS", width: 46, length: 66 },
  { size: "S", width: 49, length: 69 },
  { size: "M", width: 52, length: 72 },
  { size: "L", width: 55, length: 74 },
  { size: "XL", width: 58, length: 76 },
  { size: "2XL", width: 61, length: 78 },
  { size: "3XL", width: 64, length: 80 },
];

export default function SizeGuide() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-secondary py-12 md:py-16">
          <div className="container text-center">
            <Ruler className="h-12 w-12 mx-auto mb-4 text-accent" />
            <h1 className="font-display text-4xl md:text-5xl mb-4">Guía de Tallas</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Encuentra tu talla perfecta. Todas nuestras camisetas tienen un corte unisex regular fit, 
              cómodo y versátil para todos los cuerpos.
            </p>
          </div>
        </section>

        {/* How to Measure Section */}
        <section className="py-12 md:py-16">
          <div className="container">
            <h2 className="font-display text-3xl text-center mb-8">Cómo Medir</h2>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Width Illustration */}
              <Card className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="aspect-square bg-secondary rounded-lg mb-6 relative flex items-center justify-center">
                    {/* T-shirt illustration - realistic shape */}
                    <svg viewBox="0 0 200 200" className="w-full h-full max-w-[200px]">
                      {/* T-shirt shape with curves */}
                      <path
                        d="M100 35
                           C92 35 88 38 85 42
                           L75 42
                           C70 42 65 44 60 48
                           L35 68
                           C32 70 32 75 35 78
                           L50 88
                           C52 90 55 89 56 87
                           L60 78
                           L60 165
                           C60 168 62 170 65 170
                           L135 170
                           C138 170 140 168 140 165
                           L140 78
                           L144 87
                           C145 89 148 90 150 88
                           L165 78
                           C168 75 168 70 165 68
                           L140 48
                           C135 44 130 42 125 42
                           L115 42
                           C112 38 108 35 100 35
                           Z"
                        fill="hsl(var(--muted))"
                        stroke="hsl(var(--foreground))"
                        strokeWidth="2"
                        strokeLinejoin="round"
                      />
                      {/* Collar curve */}
                      <path
                        d="M85 42 C90 52 110 52 115 42"
                        fill="none"
                        stroke="hsl(var(--foreground))"
                        strokeWidth="1.5"
                      />
                      {/* Width measurement line */}
                      <line x1="60" y1="95" x2="140" y2="95" stroke="hsl(var(--accent))" strokeWidth="3" />
                      <line x1="60" y1="90" x2="60" y2="100" stroke="hsl(var(--accent))" strokeWidth="3" />
                      <line x1="140" y1="90" x2="140" y2="100" stroke="hsl(var(--accent))" strokeWidth="3" />
                      {/* Arrow heads */}
                      <polygon points="65,95 60,92 60,98" fill="hsl(var(--accent))" />
                      <polygon points="135,95 140,92 140,98" fill="hsl(var(--accent))" />
                    </svg>
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                      <ArrowLeftRight className="h-5 w-5 text-accent" />
                    </div>
                    <h3 className="font-body font-bold text-lg">Ancho (A)</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Mide de sisa a sisa, de un lado al otro de la camiseta en su punto más ancho, 
                    aproximadamente 2,5 cm por debajo de la axila.
                  </p>
                </CardContent>
              </Card>

              {/* Length Illustration */}
              <Card className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="aspect-square bg-secondary rounded-lg mb-6 relative flex items-center justify-center">
                    {/* T-shirt illustration - realistic shape */}
                    <svg viewBox="0 0 200 200" className="w-full h-full max-w-[200px]">
                      {/* T-shirt shape with curves */}
                      <path
                        d="M100 35
                           C92 35 88 38 85 42
                           L75 42
                           C70 42 65 44 60 48
                           L35 68
                           C32 70 32 75 35 78
                           L50 88
                           C52 90 55 89 56 87
                           L60 78
                           L60 165
                           C60 168 62 170 65 170
                           L135 170
                           C138 170 140 168 140 165
                           L140 78
                           L144 87
                           C145 89 148 90 150 88
                           L165 78
                           C168 75 168 70 165 68
                           L140 48
                           C135 44 130 42 125 42
                           L115 42
                           C112 38 108 35 100 35
                           Z"
                        fill="hsl(var(--muted))"
                        stroke="hsl(var(--foreground))"
                        strokeWidth="2"
                        strokeLinejoin="round"
                      />
                      {/* Collar curve */}
                      <path
                        d="M85 42 C90 52 110 52 115 42"
                        fill="none"
                        stroke="hsl(var(--foreground))"
                        strokeWidth="1.5"
                      />
                      {/* Length measurement line */}
                      <line x1="100" y1="50" x2="100" y2="170" stroke="hsl(var(--accent))" strokeWidth="3" />
                      <line x1="95" y1="50" x2="105" y2="50" stroke="hsl(var(--accent))" strokeWidth="3" />
                      <line x1="95" y1="170" x2="105" y2="170" stroke="hsl(var(--accent))" strokeWidth="3" />
                      {/* Arrow heads */}
                      <polygon points="100,55 97,50 103,50" fill="hsl(var(--accent))" />
                      <polygon points="100,165 97,170 103,170" fill="hsl(var(--accent))" />
                    </svg>
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                      <ArrowDown className="h-5 w-5 text-accent" />
                    </div>
                    <h3 className="font-body font-bold text-lg">Largo (B)</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Mide desde el punto más alto del hombro (junto al cuello) hasta el bajo de la camiseta.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Size Table */}
        <section className="py-12 md:py-16 bg-secondary">
          <div className="container">
            <h2 className="font-display text-3xl text-center mb-8">Tabla de Medidas</h2>
            <p className="text-center text-muted-foreground mb-8">
              Todas las medidas están en centímetros (cm)
            </p>
            
            <div className="max-w-2xl mx-auto">
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="text-left p-4 font-body font-bold">Talla</th>
                          <th className="text-center p-4 font-body font-bold">
                            <span className="flex items-center justify-center gap-2">
                              <ArrowLeftRight className="h-4 w-4 text-accent" />
                              Ancho (A)
                            </span>
                          </th>
                          <th className="text-center p-4 font-body font-bold">
                            <span className="flex items-center justify-center gap-2">
                              <ArrowDown className="h-4 w-4 text-accent" />
                              Largo (B)
                            </span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {sizeData.map((row, index) => (
                          <tr 
                            key={row.size} 
                            className={`border-b last:border-b-0 ${index % 2 === 0 ? 'bg-background' : 'bg-muted/20'}`}
                          >
                            <td className="p-4 font-bold">{row.size}</td>
                            <td className="p-4 text-center">{row.width} cm</td>
                            <td className="p-4 text-center">{row.length} cm</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Tips Section */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="max-w-2xl mx-auto">
              <h2 className="font-display text-3xl text-center mb-8">Consejos</h2>
              
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-body font-bold text-lg mb-2">💡 Ajuste Regular Fit</h3>
                    <p className="text-muted-foreground">
                      Nuestras camisetas tienen un corte unisex regular fit. Si prefieres un ajuste más holgado, 
                      te recomendamos elegir una talla más grande.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-body font-bold text-lg mb-2">📏 Compara con una camiseta que te quede bien</h3>
                    <p className="text-muted-foreground">
                      La mejor forma de acertar es medir una camiseta que ya tengas y que te quede como te gusta. 
                      Compara esas medidas con nuestra tabla.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-body font-bold text-lg mb-2">🔄 Cambios sin problema</h3>
                    <p className="text-muted-foreground">
                      Si la talla no es la correcta, tienes 30 días para hacer un cambio. 
                      Solo tienes que contactarnos y te ayudaremos encantados.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 bg-foreground text-background">
          <div className="container text-center">
            <p className="text-lg mb-4">¿Tienes alguna duda sobre las tallas?</p>
            <a 
              href="/contacto" 
              className="inline-flex items-center gap-2 text-accent hover:underline font-bold"
            >
              Contáctanos y te ayudamos →
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
