import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="bg-secondary py-12">
          <div className="container max-w-4xl">
            <h1 className="font-display text-4xl md:text-5xl">Términos y Condiciones</h1>
            <p className="text-muted-foreground mt-2">Última actualización: Febrero 2026</p>
          </div>
        </div>

        <div className="container py-12 max-w-4xl">
          <div className="prose prose-lg max-w-none space-y-8">
            
            <section>
              <h2 className="font-display text-2xl mb-4">1. Información General</h2>
              <p className="text-muted-foreground leading-relaxed">
                Este sitio web es propiedad de RISCALES MOTOR CO. (en adelante, "la Empresa").<br /><br />
                <strong>Denominación social:</strong> [A completar por el propietario]<br />
                <strong>NIF/CIF:</strong> [A completar]<br />
                <strong>Domicilio:</strong> [Dirección a completar]<br />
                <strong>Email:</strong> riscalesmotors@gmail.com<br />
                <strong>Actividad:</strong> Comercio electrónico de prendas textiles
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl mb-4">2. Objeto</h2>
              <p className="text-muted-foreground leading-relaxed">
                Las presentes Condiciones Generales regulan la relación comercial que surge 
                entre la Empresa y el Usuario cuando este accede al sitio web y/o realiza 
                una compra a través del mismo.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl mb-4">3. Proceso de Compra</h2>
              <h3 className="font-bold text-lg mt-4 mb-2">3.1 Registro y pedido</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Para realizar una compra, el Usuario debe:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Seleccionar los productos deseados</li>
                <li>Añadirlos al carrito de compra</li>
                <li>Proporcionar datos de envío y facturación</li>
                <li>Seleccionar método de pago</li>
                <li>Confirmar y pagar el pedido</li>
              </ul>

              <h3 className="font-bold text-lg mt-4 mb-2">3.2 Confirmación</h3>
              <p className="text-muted-foreground leading-relaxed">
                Una vez completado el pago, el Usuario recibirá un email de confirmación 
                con los detalles del pedido y número de referencia.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl mb-4">4. Precios</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Todos los precios incluyen IVA (21%)</li>
                <li>Los gastos de envío se indican antes de confirmar el pedido</li>
                <li>Los precios pueden modificarse sin previo aviso</li>
                <li>El precio aplicable es el vigente en el momento de la compra</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl mb-4">5. Formas de Pago</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Aceptamos los siguientes métodos de pago:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Tarjeta de crédito/débito (Visa, Mastercard)</li>
                <li>PayPal</li>
                <li>Bizum</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Todos los pagos se procesan a través de pasarelas seguras con cifrado SSL.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl mb-4">6. Envíos</h2>
              <h3 className="font-bold text-lg mt-4 mb-2">6.1 Fabricación bajo demanda</h3>
              <p className="text-muted-foreground leading-relaxed">
                Nuestras camisetas se fabrican bajo pedido. El tiempo de fabricación 
                es de 2-3 días laborables.
              </p>

              <h3 className="font-bold text-lg mt-4 mb-2">6.2 Plazos de entrega</h3>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>España Península:</strong> 48-72 horas tras fabricación</li>
                <li><strong>Baleares:</strong> 5-7 días laborables</li>
                <li><strong>Canarias, Ceuta, Melilla:</strong> 7-10 días laborables</li>
                <li><strong>Europa:</strong> 5-10 días laborables</li>
              </ul>

              <h3 className="font-bold text-lg mt-4 mb-2">6.3 Gastos de envío</h3>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>España Península: 4,95€ (GRATIS en pedidos +50€)</li>
                <li>Otros destinos: calculados en checkout</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl mb-4">7. Derecho de Desistimiento</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Conforme a la legislación vigente, dispones de <strong>14 días naturales</strong> desde 
                la recepción del producto para ejercer tu derecho de desistimiento sin necesidad 
                de justificación.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                <strong>Condiciones:</strong>
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>El producto debe estar sin usar y en su embalaje original</li>
                <li>Conservar etiquetas y precintos intactos</li>
                <li>El coste del envío de devolución corre a cargo del cliente</li>
                <li>El reembolso se realizará en un plazo máximo de 14 días</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Para iniciar una devolución, contacta con: <strong>riscalesmotors@gmail.com</strong>
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl mb-4">8. Garantía</h2>
              <p className="text-muted-foreground leading-relaxed">
                Todos nuestros productos cuentan con la garantía legal de 3 años 
                conforme a la legislación española de consumo. Esta garantía cubre 
                defectos de fabricación, no el desgaste normal por uso.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl mb-4">9. Propiedad Intelectual</h2>
              <p className="text-muted-foreground leading-relaxed">
                Todos los contenidos del sitio web (textos, imágenes, diseños, logotipos, 
                ilustraciones) son propiedad de RISCALES MOTOR CO. o se usan con autorización. 
                Queda prohibida su reproducción, distribución o uso sin consentimiento expreso.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl mb-4">10. Responsabilidad</h2>
              <p className="text-muted-foreground leading-relaxed">
                La Empresa no será responsable de:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Retrasos en la entrega por causas ajenas a su control</li>
                <li>Uso incorrecto de los productos por parte del Usuario</li>
                <li>Diferencias menores de color debido a la configuración de pantallas</li>
                <li>Interrupciones del servicio por mantenimiento o causas técnicas</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl mb-4">11. Legislación Aplicable</h2>
              <p className="text-muted-foreground leading-relaxed">
                Estas condiciones se rigen por la legislación española. Para cualquier 
                controversia, las partes se someten a los Juzgados y Tribunales del 
                domicilio del consumidor.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl mb-4">12. Resolución de Litigios</h2>
              <p className="text-muted-foreground leading-relaxed">
                La Comisión Europea facilita una plataforma de resolución de litigios en línea: 
                <a 
                  href="https://ec.europa.eu/consumers/odr" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-accent hover:underline ml-1"
                >
                  https://ec.europa.eu/consumers/odr
                </a>
              </p>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
