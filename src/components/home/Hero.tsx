import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BrandHeart } from "@/components/BrandHeart";
import heroBg from "@/assets/hero-bg.jpg";

export function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-end sm:items-center justify-center overflow-hidden">
      {/* Background - Using <img> for LCP discoverability */}
      <img
        src={heroBg}
        alt="Coche clásico vintage en carretera - Riscales Motor Co."
        fetchPriority="high"
        loading="eager"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover object-[center_30%] sm:object-center"
        width={1440}
        height={960}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20 sm:bg-gradient-hero" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 sm:px-8 max-w-4xl mx-auto animate-fade-in-up pb-20 sm:pb-12 pt-24 sm:py-12">
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-background mb-4 sm:mb-6 leading-tight text-balance">
          Nuestras miradas taparon<br className="hidden sm:block" /><span className="sm:hidden"> </span>nuestros secretos...
        </h1>
        <p className="font-display text-xl sm:text-2xl md:text-3xl text-background/90 mb-2 inline-flex items-center justify-center gap-2">
          Riscales Motor Co. <BrandHeart size="lg" className="text-accent" />
        </p>
        <p className="font-body text-background/80 text-base sm:text-lg md:text-xl mb-8 sm:mb-10 max-w-2xl mx-auto px-2">
          Camisetas artesanales que celebran la cultura del motor clásico
        </p>
        <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-body font-bold uppercase tracking-wide px-8 sm:px-10 py-5 sm:py-6 text-base sm:text-lg btn-cta touch-manipulation">
          <Link to="/productos">
            Explorar colección
          </Link>
        </Button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        
      </div>
    </section>
  );
}
