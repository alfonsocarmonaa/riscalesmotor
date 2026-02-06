import { Truck, Palette, Leaf } from "lucide-react";
import { BrandHeart } from "@/components/BrandHeart";

export function USPBanner() {
  const usps = [
    {
      icon: Truck,
      title: "Envío gratis +50€",
      description: "Península y Baleares",
    },
    {
      icon: Palette,
      title: "Calidad premium",
      description: "100% algodón orgánico",
    },
    {
      icon: Leaf,
      title: "Devolución 30 días",
      description: "Sin preguntas",
    },
  ];

  return (
    <section className="py-8 bg-background border-y border-border">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {usps.slice(0, 3).map((usp) => (
            <div 
              key={usp.title} 
              className="text-center group cursor-default"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 mb-3 transition-colors group-hover:text-accent">
                <usp.icon className="w-7 h-7" strokeWidth={1.5} />
              </div>
              <h3 className="font-body font-bold text-sm mb-1">
                {usp.title}
              </h3>
              {usp.description && (
                <p className="text-muted-foreground text-xs">
                  {usp.description}
                </p>
              )}
            </div>
          ))}
          {/* Last item with brand heart */}
          <div className="text-center group cursor-default">
            <div className="inline-flex items-center justify-center w-10 h-10 mb-3">
              <BrandHeart size="lg" className="group-hover:scale-110 group-hover:text-accent transition-all" />
            </div>
            <h3 className="font-body font-bold text-sm mb-1">
              Hecho a mano
            </h3>
            <p className="text-muted-foreground text-xs">
              en España
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
