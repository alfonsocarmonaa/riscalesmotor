import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";

export default function CookiesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead 
        title="Política de Cookies"
        description="Política de cookies de Riscales Motor Co. Tipos de cookies, gestión de preferencias y configuración del navegador."
      />
      <Header />
      
      <main className="flex-1">
        <div className="bg-secondary py-12">
          <div className="container max-w-4xl">
            <h1 className="font-display text-4xl md:text-5xl">Política de Cookies</h1>
            <p className="text-muted-foreground mt-2">Última actualización: Febrero 2026</p>
          </div>
        </div>

        <div className="container py-12 max-w-4xl">
          <div className="prose prose-lg max-w-none space-y-8">
            
            <section>
              <h2 className="font-display text-2xl mb-4">1. ¿Qué son las Cookies?</h2>
              <p className="text-muted-foreground leading-relaxed">
                Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo 
                (ordenador, tablet, móvil) cuando visitas un sitio web. Sirven para recordar 
                tus preferencias, mejorar tu experiencia de navegación y recopilar información 
                estadística sobre el uso del sitio.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl mb-4">2. Tipos de Cookies que Utilizamos</h2>
              
              <h3 className="font-bold text-lg mt-6 mb-3">2.1 Cookies Estrictamente Necesarias</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Son esenciales para el funcionamiento del sitio web. Sin ellas, no podrías 
                utilizar funciones básicas como el carrito de compra.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 pr-4">Cookie</th>
                      <th className="text-left py-2 pr-4">Propósito</th>
                      <th className="text-left py-2">Duración</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-2 pr-4">riscales-cart</td>
                      <td className="py-2 pr-4">Almacena el carrito de compra</td>
                      <td className="py-2">Persistente</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 pr-4">riscales-cookie-consent</td>
                      <td className="py-2 pr-4">Recuerda tus preferencias de cookies</td>
                      <td className="py-2">1 año</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="font-bold text-lg mt-6 mb-3">2.2 Cookies Analíticas</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Nos ayudan a entender cómo los visitantes interactúan con el sitio web, 
                recopilando información de forma anónima.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 pr-4">Cookie</th>
                      <th className="text-left py-2 pr-4">Propósito</th>
                      <th className="text-left py-2">Duración</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-2 pr-4">_ga</td>
                      <td className="py-2 pr-4">Google Analytics - identifica usuarios</td>
                      <td className="py-2">2 años</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 pr-4">_gid</td>
                      <td className="py-2 pr-4">Google Analytics - identifica sesión</td>
                      <td className="py-2">24 horas</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="font-bold text-lg mt-6 mb-3">2.3 Cookies de Marketing</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Se utilizan para mostrar anuncios relevantes y medir la efectividad 
                de las campañas publicitarias.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 pr-4">Cookie</th>
                      <th className="text-left py-2 pr-4">Propósito</th>
                      <th className="text-left py-2">Duración</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-2 pr-4">_fbp</td>
                      <td className="py-2 pr-4">Facebook Pixel - seguimiento de conversiones</td>
                      <td className="py-2">3 meses</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl mb-4">3. Gestionar tus Preferencias</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Puedes gestionar tus preferencias de cookies de varias formas:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>
                  <strong>Banner de cookies:</strong> Al acceder al sitio, puedes aceptar, 
                  rechazar o configurar las cookies
                </li>
                <li>
                  <strong>Configuración del navegador:</strong> Puedes bloquear o eliminar 
                  cookies desde la configuración de tu navegador
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl mb-4">4. Configuración del Navegador</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Cada navegador permite gestionar las cookies de forma diferente:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>
                  <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                    Google Chrome
                  </a>
                </li>
                <li>
                  <a href="https://support.mozilla.org/es/kb/cookies-informacion-que-los-sitios-web-guardan-en-" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                    Mozilla Firefox
                  </a>
                </li>
                <li>
                  <a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                    Safari
                  </a>
                </li>
                <li>
                  <a href="https://support.microsoft.com/es-es/windows/eliminar-y-administrar-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                    Microsoft Edge
                  </a>
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                <strong>Nota:</strong> Si desactivas las cookies, algunas funciones del sitio 
                web podrían no funcionar correctamente.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl mb-4">5. Cookies de Terceros</h2>
              <p className="text-muted-foreground leading-relaxed">
                Algunas cookies son instaladas por servicios de terceros que aparecen en 
                nuestras páginas. No controlamos estas cookies, por lo que te recomendamos 
                consultar las políticas de privacidad de estos terceros:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-4">
                <li>
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                    Google (Analytics)
                  </a>
                </li>
                <li>
                  <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                    Meta/Facebook
                  </a>
                </li>
                <li>
                  <a href="https://www.shopify.com/legal/privacy" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                    Shopify
                  </a>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl mb-4">6. Actualizaciones</h2>
              <p className="text-muted-foreground leading-relaxed">
                Esta política puede actualizarse para reflejar cambios en las cookies 
                que utilizamos. Te recomendamos revisarla periódicamente.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl mb-4">7. Contacto</h2>
              <p className="text-muted-foreground leading-relaxed">
                Si tienes dudas sobre nuestra política de cookies, contacta con nosotros:
              </p>
              <p className="text-muted-foreground mt-2">
                <strong>Email:</strong> riscalesmotors@gmail.com
              </p>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
