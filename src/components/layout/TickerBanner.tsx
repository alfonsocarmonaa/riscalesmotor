import { Heart } from "lucide-react";

export function TickerBanner() {
  const messages = [
    "ENVÍOS GRATIS A PARTIR DE 50€",
    "ENVÍOS EN 48-72 HORAS",
    "10% EN TU PRIMER PEDIDO",
    "DISEÑO ARTESANAL",
  ];

  // Duplicate messages for seamless loop
  const tickerContent = [...messages, ...messages, ...messages, ...messages];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-background border-t py-1.5 sm:py-2 overflow-hidden">
      <div className="animate-ticker whitespace-nowrap inline-flex items-center">
        {tickerContent.map((msg, index) => (
          <span key={index} className="inline-flex items-center text-foreground text-xs sm:text-sm font-medium">
            <span className="mx-4 sm:mx-6">{msg}</span>
            <Heart className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-foreground" strokeWidth={1.5} />
          </span>
        ))}
      </div>
    </div>
  );
}
