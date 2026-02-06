import { Truck, Palette, Leaf } from "lucide-react";
import { useTranslation } from "react-i18next";
import { BrandHeart } from "@/components/BrandHeart";

export function USPBanner() {
  const { t } = useTranslation();

  const usps = [
    {
      icon: Truck,
      title: t('usp.freeShipping'),
      description: "+50€",
    },
    {
      icon: Palette,
      title: t('usp.quality'),
      description: t('usp.handmade'),
    },
    {
      icon: Leaf,
      title: t('usp.returns'),
      description: "",
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
              {t('usp.handmade')}
            </h3>
            <p className="text-muted-foreground text-xs">
              {t('footer.inSpain')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
