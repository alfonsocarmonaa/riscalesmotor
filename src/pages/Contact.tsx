import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success("¡Mensaje enviado!", {
      description: "Te responderemos en menos de 24 horas.",
    });
    
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Header */}
        <div className="bg-secondary py-12">
          <div className="container text-center">
            <h1 className="font-display text-4xl md:text-5xl mb-4">Contacto</h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              ¿Tienes alguna duda? Estamos aquí para ayudarte
            </p>
          </div>
        </div>

        <div className="container py-12 md:py-16">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Nombre *
                  </label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Asunto *
                  </label>
                  <Select 
                    value={formData.subject} 
                    onValueChange={(value) => setFormData({ ...formData, subject: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un asunto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">Consulta general</SelectItem>
                      <SelectItem value="order">Sobre mi pedido</SelectItem>
                      <SelectItem value="return">Devolución</SelectItem>
                      <SelectItem value="product">Producto</SelectItem>
                      <SelectItem value="other">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Mensaje *
                  </label>
                  <Textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-foreground text-background hover:bg-foreground/90 font-bold uppercase tracking-wide"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="font-body font-bold uppercase tracking-wide mb-4">
                  📧 Email
                </h3>
                <a 
                  href="mailto:riscalesmotors@gmail.com" 
                  className="text-lg hover:text-accent transition-colors"
                >
                  riscalesmotors@gmail.com
                </a>
              </div>

              <div>
                <h3 className="font-body font-bold uppercase tracking-wide mb-4">
                  ⏰ Horario de atención
                </h3>
                <p className="text-muted-foreground">
                  Lunes a Viernes: 9:00 - 18:00h<br />
                  Sábados: 10:00 - 14:00h
                </p>
              </div>

              <div>
                <h3 className="font-body font-bold uppercase tracking-wide mb-4">
                  📱 Redes Sociales
                </h3>
                <div className="space-y-2">
                  <a href="https://instagram.com/riscalesmotor" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-accent transition-colors">
                    Instagram: @riscalesmotor
                  </a>
                  <a href="https://facebook.com/riscalesmotor" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-accent transition-colors">
                    Facebook: /riscalesmotor
                  </a>
                </div>
              </div>

              {/* FAQ */}
              <div className="pt-8 border-t">
                <h3 className="font-body font-bold uppercase tracking-wide mb-4">
                  Preguntas Frecuentes
                </h3>
                <div className="space-y-4">
                  {[
                    { q: '¿Cuánto tarda mi pedido?', a: '3-4 días laborables (fabricación + envío)' },
                    { q: '¿Envíos internacionales?', a: 'Sí, consulta tarifas en checkout' },
                    { q: '¿Cómo lavar las camisetas?', a: 'Máx. 30°C, del revés, sin lejía' },
                  ].map((faq) => (
                    <details key={faq.q} className="group">
                      <summary className="cursor-pointer list-none flex items-center justify-between py-2 font-medium hover:text-accent transition-colors">
                        {faq.q}
                        <span className="ml-2 transition-transform group-open:rotate-180">▼</span>
                      </summary>
                      <p className="text-muted-foreground pl-4 pb-2">{faq.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
