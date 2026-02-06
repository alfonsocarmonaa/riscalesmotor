import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { SEOHead } from "@/components/SEOHead";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useShopifyAuth } from "@/hooks/useShopifyAuth";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function Register() {
  const navigate = useNavigate();
  const register = useShopifyAuth((s) => s.register);
  const loading = useShopifyAuth((s) => s.loading);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!acceptTerms) {
      toast.error("Debes aceptar los términos y condiciones");
      return;
    }

    if (password.length < 5) {
      toast.error("La contraseña debe tener al menos 5 caracteres");
      return;
    }

    const { error } = await register({ firstName, lastName, email, password });

    if (error) {
      toast.error("Error al crear la cuenta", { description: error });
    } else {
      toast.success("¡Cuenta creada! Bienvenido a Riscales.");
      navigate("/cuenta");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title="Crear Cuenta"
        description="Crea tu cuenta en Riscales Motor Co."
        noIndex
      />
      <Header />

      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="font-display text-3xl">Crear Cuenta</CardTitle>
            <CardDescription>Únete a la familia Riscales Motor Co.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Nombre</Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="Tu nombre"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Apellidos</Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Tus apellidos"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
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
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Mínimo 5 caracteres"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={5}
                />
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-muted-foreground leading-tight"
                >
                  Acepto los{" "}
                  <Link to="/terminos" className="text-accent hover:underline">
                    términos y condiciones
                  </Link>{" "}
                  y la{" "}
                  <Link to="/privacidad" className="text-accent hover:underline">
                    política de privacidad
                  </Link>
                </label>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                Crear Cuenta
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground">
              ¿Ya tienes cuenta?{" "}
              <Link to="/login" className="text-accent hover:underline font-medium">
                Iniciar sesión
              </Link>
            </p>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
