import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="bg-secondary py-12">
          <div className="container">
            <h1 className="font-display text-4xl md:text-5xl">Política de Privacidad</h1>
            <p className="text-muted-foreground mt-2">Última actualización: Febrero 2026</p>
          </div>
        </div>

        <div className="container py-12 max-w-4xl">
          <div className="prose prose-lg max-w-none space-y-8">
            
            <section>
              <h2 className="font-display text-2xl mb-4">1. Responsable del Tratamiento</h2>
              <p className="text-muted-foreground leading-relaxed">
                <strong>Identidad:</strong> RISCALES MOTOR CO.<br />
                <strong>NIF/CIF:</strong> [A completar por el propietario]<br />
                <strong>Dirección:</strong> [Dirección fiscal a completar]<br />
                <strong>Email:</strong> riscalesmotors@gmail.com<br />
                <strong>Actividad:</strong> Venta online de camisetas artesanales
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl mb-4">2. Datos que Recopilamos</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Recopilamos la siguiente información cuando realizas una compra o te registras:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Datos identificativos: nombre, apellidos, DNI/NIF</li>
                <li>Datos de contacto: email, teléfono, dirección de envío</li>
                <li>Datos de transacción: historial de pedidos, método de pago</li>
                <li>Datos de navegación: cookies, dirección IP, dispositivo utilizado</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl mb-4">3. Finalidad del Tratamiento</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Gestionar y procesar tus pedidos</li>
                <li>Enviar comunicaciones sobre el estado de tu pedido</li>
                <li>Atender consultas y reclamaciones</li>
                <li>Enviar newsletters y promociones (con tu consentimiento)</li>
                <li>Cumplir obligaciones legales y fiscales</li>
                <li>Mejorar nuestros servicios mediante análisis de uso</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl mb-4">4. Base Legal</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Ejecución contractual:</strong> para procesar pedidos y entregas</li>
                <li><strong>Consentimiento:</strong> para envío de comunicaciones comerciales</li>
                <li><strong>Interés legítimo:</strong> para mejorar nuestros servicios</li>
                <li><strong>Obligación legal:</strong> para cumplir normativa fiscal</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl mb-4">5. Destinatarios de los Datos</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Tus datos pueden ser comunicados a:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Empresas de transporte para la entrega de pedidos</li>
                <li>Pasarelas de pago para procesar transacciones</li>
                <li>Proveedores de servicios tecnológicos (hosting, email)</li>
                <li>Administraciones públicas cuando sea legalmente requerido</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                No vendemos ni compartimos tus datos con terceros con fines comerciales.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl mb-4">6. Transferencias Internacionales</h2>
              <p className="text-muted-foreground leading-relaxed">
                Algunos de nuestros proveedores pueden estar ubicados fuera del Espacio Económico Europeo. 
                En estos casos, garantizamos que existen las salvaguardas adecuadas según el RGPD 
                (cláusulas contractuales tipo, decisiones de adecuación, etc.).
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl mb-4">7. Conservación de Datos</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Datos de clientes: durante la relación comercial y 5 años adicionales</li>
                <li>Facturas y documentos fiscales: 4 años (obligación legal)</li>
                <li>Datos de navegación: máximo 2 años</li>
                <li>Consentimientos de marketing: hasta que retires tu consentimiento</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl mb-4">8. Tus Derechos</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Conforme al RGPD, tienes derecho a:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Acceso:</strong> conocer qué datos tenemos sobre ti</li>
                <li><strong>Rectificación:</strong> corregir datos inexactos</li>
                <li><strong>Supresión:</strong> solicitar la eliminación de tus datos</li>
                <li><strong>Oposición:</strong> oponerte a determinados tratamientos</li>
                <li><strong>Limitación:</strong> restringir el uso de tus datos</li>
                <li><strong>Portabilidad:</strong> recibir tus datos en formato electrónico</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Para ejercer estos derechos, contacta con nosotros en: <strong>riscalesmotors@gmail.com</strong>
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                También puedes presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD): 
                <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline ml-1">
                  www.aepd.es
                </a>
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl mb-4">9. Seguridad</h2>
              <p className="text-muted-foreground leading-relaxed">
                Implementamos medidas técnicas y organizativas para proteger tus datos: 
                conexiones cifradas (SSL/TLS), acceso restringido, copias de seguridad 
                y protocolos de seguridad actualizados.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl mb-4">10. Modificaciones</h2>
              <p className="text-muted-foreground leading-relaxed">
                Nos reservamos el derecho de modificar esta política. Cualquier cambio 
                será publicado en esta página con la fecha de actualización.
              </p>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
