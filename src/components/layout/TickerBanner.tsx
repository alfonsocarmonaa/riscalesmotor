import { Heart } from "lucide-react";

export function TickerBanner() {
  const messages = [
    "ENVÍOS GRATIS A PARTIR DE 50€",
    "ENVÍOS EN 48-72 HORAS",
    "REGÍSTRATE PARA UN 10% DE DESCUENTO EN PRIMER PEDIDO",
    "FABRICACIÓN Y DISEÑO ARTESANAL",
  ];

  // Duplicate messages for seamless loop
  const tickerContent = [...messages, ...messages, ...messages, ...messages];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t py-2 overflow-hidden">
      <div className="animate-ticker whitespace-nowrap inline-flex items-center">
        {tickerContent.map((msg, index) => (
          <span key={index} className="inline-flex items-center text-foreground text-sm font-medium">
            <span className="mx-6">{msg}</span>
            <Heart className="w-3 h-3 text-foreground" strokeWidth={1.5} />
          </span>
        ))}
      </div>
    </div>
  );
}
