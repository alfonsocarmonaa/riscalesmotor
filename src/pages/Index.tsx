import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { BestSellers } from "@/components/home/BestSellers";
import { ShopByCollection } from "@/components/home/ShopByCollection";
import { Manifesto } from "@/components/home/Manifesto";
import { USPBanner } from "@/components/home/USPBanner";
import { SEOHead } from "@/components/SEOHead";
import { OrganizationSchema } from "@/components/JsonLd";

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

        {/* Shop by Collection */}
        <ShopByCollection />

        {/* USP Banner */}
        <USPBanner />

        {/* Manifesto / Lifestyle Section */}
        <Manifesto />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
