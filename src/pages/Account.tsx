import { useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { SEOHead } from "@/components/SEOHead";
import { Footer } from "@/components/layout/Footer";
import { Loader2 } from "lucide-react";
import { SHOPIFY_ACCOUNT_URL } from "@/lib/shopify";

export default function Account() {
  useEffect(() => {
    window.location.href = SHOPIFY_ACCOUNT_URL;
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead title="Mi Cuenta" description="Redirigiendo a tu cuenta..." noIndex />
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-accent" />
          <p className="text-muted-foreground">Redirigiendo a tu cuenta...</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
