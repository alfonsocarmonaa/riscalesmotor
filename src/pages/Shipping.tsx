import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, Clock, Package, MapPin, RefreshCw, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";

const shippingZones = [
  {
    zone: "España Península",
    flag: "🇪🇸",
    options: [
      { method: "Envío Estándar", cost: "4,95€", time: "48-72 horas laborables" },
      { method: "Envío Gratis", cost: "0€", time: "48-72 horas laborables", condition: "Pedidos +50€" },
    ],
  },
  {
    zone: "Islas Baleares",
    flag: "🏝️",
    options: [
      { method: "Envío Estándar", cost: "8,95€", time: "5-7 días laborables" },
    ],
  },
  {
    zone: "Canarias, Ceuta y Melilla",
    flag: "🌴",
    options: [
      { method: "Envío Estándar", cost: "Calculado en checkout", time: "7-10 días laborables" },
    ],
    note: "Los envíos a estas zonas pueden estar sujetos a tasas aduaneras e impuestos locales.",
  },
  {
    zone: "Europa (FR, IT, PT, DE)",
    flag: "🇪🇺",
    options: [
      { method: "Envío Internacional", cost: "Calculado en checkout", time: "7-10 días laborables" },
    ],
  },
];

const processSteps = [
  {
    icon: Package,
    title: "Fabricación",
    time: "2-3 días",
    description: "Tu camiseta se fabrica bajo pedido con el máximo cuidado y atención al detalle.",
  },
  {
    icon: Truck,
    title: "Envío",
    time: "48-72h",
    description: "Una vez fabricada, enviamos tu pedido con seguimiento incluido.",
  },
  {
    icon: MapPin,
    title: "Entrega",
    time: "Total: 5-7 días",
    description: "Recibes tu camiseta en casa con nuestro packaging exclusivo Riscales.",
  },
];

export default function Shipping() {
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead 
        title="Envíos"
        description="Información de envíos de Riscales Motor Co. Envío gratis en pedidos +50€. España Península 48-72h. Seguimiento incluido."
      />
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-secondary py-12 md:py-16">
          <div className="container text-center">
            <Truck className="h-12 w-12 mx-auto mb-4 text-accent" />
            <h1 className="font-display text-4xl md:text-5xl mb-4">Envíos</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Enviamos desde España con amor y cuidado. Cada pedido incluye seguimiento 
              y nuestro packaging exclusivo Riscales Motor Co.
            </p>
          </div>
        </section>

        {/* Process Timeline */}
        <section className="py-12 md:py-16">
          <div className="container">
            <h2 className="font-display text-3xl text-center mb-8">Proceso de Envío</h2>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {processSteps.map((step, index) => (
                <div key={step.title} className="relative">
                  <Card className="h-full text-center">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                        <step.icon className="h-8 w-8 text-accent" />
                      </div>
                      <div className="text-sm font-bold text-accent mb-1">Paso {index + 1}</div>
                      <h3 className="font-body font-bold text-xl mb-1">{step.title}</h3>
                      <div className="text-lg font-display text-accent mb-3">{step.time}</div>
                      <p className="text-muted-foreground text-sm">{step.description}</p>
                    </CardContent>
                  </Card>
                  {index < processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-muted-foreground">
                      →
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Shipping Zones */}
        <section className="py-12 md:py-16 bg-secondary">
          <div className="container">
            <h2 className="font-display text-3xl text-center mb-8">Zonas y Tarifas</h2>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {shippingZones.map((zone) => (
                <Card key={zone.zone}>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <span className="text-2xl">{zone.flag}</span>
                      {zone.zone}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {zone.options.map((option, idx) => (
                        <div 
                          key={idx} 
                          className="flex justify-between items-start p-3 bg-secondary/50 rounded-lg"
                        >
                          <div>
                            <div className="font-bold">{option.method}</div>
                            <div className="text-sm text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {option.time}
                            </div>
                            {option.condition && (
                              <div className="text-sm text-accent font-medium mt-1">
                                ✓ {option.condition}
                              </div>
                            )}
                          </div>
                          <div className="font-bold text-lg">{option.cost}</div>
                        </div>
                      ))}
                    </div>
                    {zone.note && (
                      <p className="text-sm text-muted-foreground mt-3 italic">
                        ⚠️ {zone.note}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Free Shipping Banner */}
        <section className="py-12 bg-foreground text-background">
          <div className="container text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Truck className="h-8 w-8 text-accent" />
              <span className="font-display text-3xl">¡Envío Gratis!</span>
            </div>
            <p className="text-lg mb-2">En todos los pedidos superiores a 50€ para España Península</p>
            <p className="text-background/70">Sin código necesario. Se aplica automáticamente en el checkout.</p>
          </div>
        </section>

        {/* Additional Info */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Package className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-body font-bold text-lg mb-2">Packaging Riscales</h3>
                      <p className="text-muted-foreground">
                        Cada pedido se envía en nuestro packaging exclusivo con el diseño Riscales Motor Co. 
                        Cuidamos cada detalle para que la experiencia de unboxing sea especial.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-body font-bold text-lg mb-2">Seguimiento de Pedido</h3>
                      <p className="text-muted-foreground">
                        Una vez enviado tu pedido, recibirás un email con el código de seguimiento 
                        para que puedas rastrear tu paquete en todo momento.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <RefreshCw className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-body font-bold text-lg mb-2">Devoluciones</h3>
                      <p className="text-muted-foreground">
                        Tienes 30 días para devolver o cambiar tu producto si no estás satisfecho. 
                        El producto debe estar sin usar y con etiquetas intactas. 
                        El coste del envío de devolución corre a cargo del cliente.
                      </p>
                      <Link to="/devoluciones" className="text-accent hover:underline font-medium mt-2 inline-block">
                        Ver política de devoluciones →
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <HelpCircle className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-body font-bold text-lg mb-2">¿Tienes dudas?</h3>
                      <p className="text-muted-foreground">
                        Si tienes cualquier pregunta sobre tu pedido o envío, no dudes en contactarnos. 
                        Estamos aquí para ayudarte.
                      </p>
                      <Link to="/contacto" className="text-accent hover:underline font-medium mt-2 inline-block">
                        Contactar con nosotros →
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
