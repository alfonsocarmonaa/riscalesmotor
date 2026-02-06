import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

export function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative h-screen min-h-[600px] max-h-[900px] flex items-center justify-center overflow-hidden">
      {/* Background with Parallax Effect */}
      <div className="absolute inset-0 parallax-bg" style={{
        backgroundImage: `url(${heroBg})`
      }}>
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in-up">
        <h1 className="font-display text-4xl sm:text-5xl md:text-7xl text-background mb-6 leading-tight">
          Nuestras miradas taparon<br />nuestros secretos...
        </h1>
        <p className="font-display text-2xl sm:text-3xl text-background/90 mb-2">
          Riscales Motor Co. <span className="text-accent">♥</span>
        </p>
        <p className="font-body text-background/80 text-lg sm:text-xl mb-10 max-w-2xl mx-auto">
          {t('hero.subtitle')}
        </p>
        <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-body font-bold uppercase tracking-wide px-10 py-6 text-lg btn-cta">
          <Link to="/productos">
            {t('hero.cta')}
          </Link>
        </Button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        
      </div>
    </section>
  );
}
