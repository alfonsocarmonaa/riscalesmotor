import { lazy, Suspense } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { BestSellers } from "@/components/home/BestSellers";
import { SEOHead } from "@/components/SEOHead";
import { OrganizationSchema } from "@/components/JsonLd";

const ShopByCollection = lazy(() => import("@/components/home/ShopByCollection").then(m => ({ default: m.ShopByCollection })));
const USPBanner = lazy(() => import("@/components/home/USPBanner").then(m => ({ default: m.USPBanner })));
const Manifesto = lazy(() => import("@/components/home/Manifesto").then(m => ({ default: m.Manifesto })));

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead 
        title="Riscales Motor Co. | Camisetas Artesanales de Vehículos Clásicos"
        description="Camisetas artesanales ilustradas con vehículos clásicos. Diseños únicos, algodón premium, fabricación responsable. Hecho con amor en España."
      />
      <OrganizationSchema />
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* Best Sellers */}
        <BestSellers />

        {/* Below-fold: lazy loaded for faster initial render */}
        <Suspense fallback={null}>
          <ShopByCollection />
        </Suspense>

        <Suspense fallback={null}>
          <USPBanner />
        </Suspense>

        <Suspense fallback={null}>
          <Manifesto />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
