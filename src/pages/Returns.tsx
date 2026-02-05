import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { RefreshCw, Package, Mail, Truck, CheckCircle, XCircle, Clock, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";

const returnSteps = [
  {
    step: 1,
    icon: Mail,
    title: "Contacta con nosotros",
    description: "Envíanos un email a riscalesmotors@gmail.com indicando tu número de pedido y el motivo de la devolución.",
  },
  {
    step: 2,
    icon: CheckCircle,
    title: "Recibe confirmación",
    description: "Te enviaremos un email con las instrucciones de devolución y la dirección de envío en un plazo de 24-48h.",
  },
  {
    step: 3,
    icon: Package,
    title: "Prepara tu paquete",
    description: "Empaqueta el producto en su embalaje original o similar. Asegúrate de que esté bien protegido.",
  },
  {
    step: 4,
    icon: Truck,
    title: "Envía el producto",
    description: "Envía el paquete a la dirección indicada. Guarda el comprobante de envío con el código de seguimiento.",
  },
  {
    step: 5,
    icon: RefreshCw,
    title: "Reembolso o cambio",
    description: "Una vez recibido y verificado el producto, procesaremos tu reembolso o cambio en un plazo de 5-7 días laborables.",
  },
];

const acceptedConditions = [
  "Producto sin usar y sin lavar",
  "Etiquetas originales intactas",
  "Dentro del plazo de 30 días desde la recepción",
  "Embalaje original o similar en buen estado",
  "Comprobante de compra (email de confirmación)",
];

const notAcceptedConditions = [
  "Productos usados, lavados o con signos de uso",
  "Productos sin etiquetas o con etiquetas dañadas",
  "Devoluciones fuera del plazo de 30 días",
  "Productos personalizados o ediciones limitadas bajo pedido",
  "Daños causados por mal uso del cliente",
];

export default function Returns() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-secondary py-12 md:py-16">
          <div className="container text-center">
            <RefreshCw className="h-12 w-12 mx-auto mb-4 text-accent" />
            <h1 className="font-display text-4xl md:text-5xl mb-4">Devoluciones y Cambios</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Tu satisfacción es nuestra prioridad. Si no estás contento con tu compra, 
              tienes 30 días para devolverla o cambiarla.
            </p>
          </div>
        </section>

        {/* Key Info Banner */}
        <section className="py-8 bg-foreground text-background">
          <div className="container">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-center">
              <div className="flex items-center gap-3">
                <Clock className="h-6 w-6 text-accent" />
                <span className="font-bold">30 días para devolver</span>
              </div>
              <div className="hidden md:block w-px h-8 bg-background/30" />
              <div className="flex items-center gap-3">
                <RefreshCw className="h-6 w-6 text-accent" />
                <span className="font-bold">Cambios de talla gratuitos*</span>
              </div>
              <div className="hidden md:block w-px h-8 bg-background/30" />
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-accent" />
                <span className="font-bold">Reembolso en 5-7 días</span>
              </div>
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-12 md:py-16">
          <div className="container">
            <h2 className="font-display text-3xl text-center mb-8">Proceso de Devolución</h2>
            
            <div className="max-w-3xl mx-auto">
              <div className="space-y-4">
                {returnSteps.map((step, index) => (
                  <Card key={step.step} className="relative overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-lg">
                            {step.step}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <step.icon className="h-5 w-5 text-accent" />
                            <h3 className="font-body font-bold text-lg">{step.title}</h3>
                          </div>
                          <p className="text-muted-foreground">{step.description}</p>
                        </div>
                      </div>
                    </CardContent>
                    {index < returnSteps.length - 1 && (
                      <div className="absolute left-10 bottom-0 w-0.5 h-4 bg-accent/30 translate-y-full" />
                    )}
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Conditions */}
        <section className="py-12 md:py-16 bg-secondary">
          <div className="container">
            <h2 className="font-display text-3xl text-center mb-8">Condiciones</h2>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* Accepted */}
              <Card className="border-accent/30">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle className="h-6 w-6 text-accent" />
                    <h3 className="font-body font-bold text-lg">Aceptamos devoluciones si:</h3>
                  </div>
                  <ul className="space-y-3">
                    {acceptedConditions.map((condition, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-accent mt-0.5">✓</span>
                        <span className="text-muted-foreground">{condition}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Not Accepted */}
              <Card className="border-destructive/30">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <XCircle className="h-6 w-6 text-destructive" />
                    <h3 className="font-body font-bold text-lg">No aceptamos devoluciones si:</h3>
                  </div>
                  <ul className="space-y-3">
                    {notAcceptedConditions.map((condition, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-destructive mt-0.5">✗</span>
                        <span className="text-muted-foreground">{condition}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Costs Info */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-body font-bold text-lg mb-4">💰 Costes de Devolución</h3>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      <strong className="text-foreground">Devolución por error nuestro:</strong> Si recibiste un producto 
                      equivocado o defectuoso, nos hacemos cargo del coste de envío de devolución.
                    </p>
                    <p>
                      <strong className="text-foreground">Devolución por preferencia del cliente:</strong> El coste del 
                      envío de devolución corre a cargo del cliente. Recomendamos utilizar un servicio con seguimiento.
                    </p>
                    <p>
                      <strong className="text-foreground">*Cambios de talla:</strong> El primer cambio de talla es gratuito 
                      (solo pagas el envío de devolución). Para cambios adicionales, se aplicará un coste de gestión de 3€.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-body font-bold text-lg mb-4">💳 Reembolsos</h3>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      Una vez recibamos y verifiquemos el producto devuelto, procesaremos tu reembolso 
                      en un plazo de <strong className="text-foreground">5-7 días laborables</strong>.
                    </p>
                    <p>
                      El reembolso se realizará en el mismo método de pago utilizado en la compra original. 
                      El tiempo que tarde en reflejarse en tu cuenta dependerá de tu banco o entidad financiera.
                    </p>
                    <p>
                      <strong className="text-foreground">Nota:</strong> Los gastos de envío originales no son reembolsables, 
                      excepto en caso de error por nuestra parte.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-body font-bold text-lg mb-4">📦 Productos Defectuosos</h3>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      Si recibes un producto defectuoso o dañado, por favor contacta con nosotros 
                      inmediatamente incluyendo fotos del defecto.
                    </p>
                    <p>
                      Te enviaremos un producto nuevo sin coste adicional y nos haremos cargo 
                      del envío de devolución del producto defectuoso.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 md:py-16 bg-secondary">
          <div className="container">
            <h2 className="font-display text-3xl text-center mb-8">Preguntas Frecuentes</h2>
            
            <div className="max-w-3xl mx-auto space-y-4">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-body font-bold mb-2">¿Puedo cambiar la talla de mi camiseta?</h3>
                  <p className="text-muted-foreground">
                    Sí, puedes solicitar un cambio de talla dentro del plazo de 30 días. 
                    El primer cambio es gratuito (solo pagas el envío de devolución).
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-body font-bold mb-2">¿Cuánto tarda el proceso de devolución?</h3>
                  <p className="text-muted-foreground">
                    Desde que recibimos el producto hasta que procesamos el reembolso, 
                    el proceso completo tarda entre 5-10 días laborables.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-body font-bold mb-2">¿Puedo devolver un producto en oferta?</h3>
                  <p className="text-muted-foreground">
                    Sí, los productos en oferta tienen las mismas condiciones de devolución 
                    que los productos a precio regular.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-body font-bold mb-2">¿Qué pasa si no tengo el embalaje original?</h3>
                  <p className="text-muted-foreground">
                    No es imprescindible, pero te pedimos que uses un embalaje similar 
                    que proteja bien el producto durante el transporte.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 bg-foreground text-background">
          <div className="container text-center">
            <HelpCircle className="h-10 w-10 mx-auto mb-4 text-accent" />
            <h3 className="font-display text-2xl mb-4">¿Necesitas ayuda con tu devolución?</h3>
            <p className="text-background/80 mb-6 max-w-xl mx-auto">
              Nuestro equipo está aquí para ayudarte. Contáctanos y resolveremos 
              cualquier duda sobre tu devolución o cambio.
            </p>
            <Link 
              to="/contacto" 
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-md font-bold hover:bg-accent/90 transition-colors"
            >
              Contactar con Soporte →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
