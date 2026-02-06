import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/hooks/useAuth";
import { useNewsletterSubscribe } from "@/hooks/useNewsletterSubscribe";
import { Loader2, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { register, user } = useAuth();
  const { subscribe } = useNewsletterSubscribe();

  if (user && !success) {
    window.location.href = "/cuenta";
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await register(email, password, fullName);

    if (result.error) {
      toast.error(result.error);
      setIsLoading(false);
      return;
    }

    // Subscribe to newsletter if opted in
    if (newsletter) {
      await subscribe(email, "register");
    }

    setSuccess(true);
    setIsLoading(false);
  };

  if (success) {
    return (
      <div className="min-h-screen flex flex-col">
        <SEOHead title="Verifica tu Email" description="Confirma tu email para acceder a tu cuenta." noIndex />
        <Header />
        <main className="flex-1 flex items-center justify-center py-16 px-4">
          <div className="w-full max-w-md text-center">
            <CheckCircle className="h-16 w-16 text-accent mx-auto mb-6" />
            <h1 className="font-display text-3xl mb-3">¡Revisa tu email!</h1>
            <p className="text-muted-foreground mb-6">
              Hemos enviado un enlace de verificación a <strong className="text-foreground">{email}</strong>.
              Haz clic en el enlace para activar tu cuenta.
            </p>
            <Button asChild variant="outline" className="font-bold uppercase tracking-wide">
              <Link to="/login">Ir a Iniciar Sesión</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead title="Crear Cuenta" description="Crea tu cuenta en Riscales Motor Co." noIndex />
      <Header />

      <main className="flex-1 flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="font-display text-4xl mb-2">Crear Cuenta</h1>
            <p className="text-muted-foreground">Únete a la familia Riscales</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="fullName">Nombre completo</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Tu nombre"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="Mínimo 6 caracteres"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="h-12"
              />
            </div>

            <div className="flex items-start gap-3">
              <Checkbox
                id="newsletter"
                checked={newsletter}
                onCheckedChange={(checked) => setNewsletter(checked === true)}
                className="mt-0.5"
              />
              <Label htmlFor="newsletter" className="text-sm text-muted-foreground font-normal cursor-pointer leading-tight">
                Quiero recibir novedades, ofertas exclusivas y un 10% de descuento en mi primera compra
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 font-bold uppercase tracking-wide"
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Crear Cuenta"}
            </Button>
          </form>

          <p className="text-center mt-6 text-sm text-muted-foreground">
            ¿Ya tienes cuenta?{" "}
            <Link to="/login" className="text-accent font-medium hover:underline">
              Iniciar sesión
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
