import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2 } from "lucide-react";
import { formatPrice } from "@/lib/shopify";

interface StickyAddToCartProps {
  productTitle: string;
  price: { amount: string; currencyCode: string };
  isLoading: boolean;
  isAvailable: boolean;
  onAddToCart: () => void;
  isVisible: boolean;
}

export function StickyAddToCart({
  productTitle,
  price,
  isLoading,
  isAvailable,
  onAddToCart,
  isVisible,
}: StickyAddToCartProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 left-0 right-0 z-50 p-3 sm:hidden animate-fade-in-up">
      <div className="container">
        <div className="bg-background border rounded-xl shadow-xl p-3 flex items-center gap-3">
          {/* Product info */}
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">{productTitle}</p>
            <p className="text-accent font-bold">{formatPrice(price.amount, price.currencyCode)}</p>
          </div>
          
          {/* Add to cart button */}
          <Button
            onClick={onAddToCart}
            disabled={isLoading || !isAvailable}
            className="bg-accent hover:bg-accent/90 active:bg-accent/80 text-accent-foreground font-bold uppercase tracking-wide px-5 py-3 h-auto text-sm flex-shrink-0 touch-manipulation"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <ShoppingCart className="h-4 w-4 mr-2" />
                {!isAvailable ? "Agotado" : "Añadir"}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
