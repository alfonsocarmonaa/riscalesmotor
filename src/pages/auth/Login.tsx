import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { SEOHead } from "@/components/SEOHead";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useShopifyAuth } from "@/hooks/useShopifyAuth";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const login = useShopifyAuth((s) => s.login);
  const loading = useShopifyAuth((s) => s.loading);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await login(email, password);

    if (error) {
      toast.error("Error al iniciar sesión", { description: error });
    } else {
      toast.success("¡Bienvenido de nuevo!");
      navigate("/cuenta");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title="Iniciar Sesión"
        description="Inicia sesión en tu cuenta de Riscales Motor Co."
        noIndex
      />
      <Header />

      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="font-display text-3xl">Iniciar Sesión</CardTitle>
            <CardDescription>Accede a tu cuenta Riscales Motor Co.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
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
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                Iniciar Sesión
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground">
              ¿No tienes cuenta?{" "}
              <Link to="/registro" className="text-accent hover:underline font-medium">
                Crear cuenta
              </Link>
            </p>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
