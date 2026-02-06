import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  // If already logged in, redirect to account
  if (user) {
    navigate("/cuenta", { replace: true });
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await login(email, password);

    if (result.error) {
      toast.error(result.error);
      setIsLoading(false);
    } else {
      toast.success("¡Bienvenido de vuelta!");
      navigate("/cuenta");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead title="Iniciar Sesión" description="Accede a tu cuenta de Riscales Motor Co." noIndex />
      <Header />

      <main className="flex-1 flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="font-display text-4xl mb-2">Iniciar Sesión</h1>
            <p className="text-muted-foreground">Accede a tu cuenta para ver tus pedidos</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
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
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 font-bold uppercase tracking-wide"
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Iniciar Sesión"}
            </Button>
          </form>

          <p className="text-center mt-6 text-sm text-muted-foreground">
            ¿No tienes cuenta?{" "}
            <Link to="/registro" className="text-accent font-medium hover:underline">
              Crear cuenta
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
