import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title="Página no encontrada"
        description="La página que buscas no existe. Vuelve a la tienda de Riscales Motor Co."
        noIndex
      />
      <Header />

      <main className="flex-1 flex items-center justify-center py-16">
        <div className="text-center px-4">
          <h1 className="font-display text-6xl md:text-8xl text-accent mb-4">404</h1>
          <p className="font-display text-2xl md:text-3xl mb-4">Página no encontrada</p>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Lo sentimos, la página que buscas no existe o ha sido movida.
          </p>
          <Button asChild className="bg-foreground text-background hover:bg-foreground/90 font-bold uppercase tracking-wide">
            <Link to="/">Volver al Inicio</Link>
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
