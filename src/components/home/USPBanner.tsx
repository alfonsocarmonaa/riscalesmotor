import { Truck, Palette, Leaf, Heart } from "lucide-react";

const usps = [
  {
    icon: Truck,
    title: "Envío Gratis",
    description: "+50€",
  },
  {
    icon: Palette,
    title: "Diseño Único",
    description: "A Mano",
  },
  {
    icon: Leaf,
    title: "Fabricación Responsable",
    description: "Planeta",
  },
  {
    icon: Heart,
    title: "Hecho con Amor",
    description: "España",
  },
];

export function USPBanner() {
  return (
    <section className="py-12 bg-secondary">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {usps.map((usp) => (
            <div 
              key={usp.title} 
              className="text-center group cursor-default"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 mb-4 transition-colors group-hover:text-accent">
                <usp.icon className="w-8 h-8" strokeWidth={1.5} />
              </div>
              <h3 className="font-body font-bold text-sm md:text-base mb-1">
                {usp.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {usp.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
