import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingCart, Minus, Plus, Trash2, ExternalLink, Loader2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { formatPrice } from "@/lib/shopify";
import { useLocale } from "@/stores/localeStore";

export const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const { currency } = useLocale();
  const { items, isLoading, isSyncing, updateQuantity, removeItem, getCheckoutUrl, syncCart, getTotalItems, getTotalPrice } = useCartStore();
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();
  const FREE_SHIPPING_THRESHOLD = 50;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - totalPrice);

  useEffect(() => { 
    if (isOpen) syncCart(); 
  }, [isOpen, syncCart]);

  const handleCheckout = () => {
    const checkoutUrl = getCheckoutUrl();
    if (checkoutUrl) {
      window.open(checkoutUrl, '_blank');
      setIsOpen(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-10 w-10 hover:bg-accent hover:text-accent-foreground transition-colors group touch-manipulation">
          <ShoppingCart className="h-5 w-5 text-accent group-hover:text-accent-foreground" />
          {totalItems > 0 && (
            <Badge className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-accent text-accent-foreground border-0">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg flex flex-col h-full pb-safe">
        <SheetHeader className="flex-shrink-0">
          <SheetTitle className="font-display text-2xl">{t('cart.title')}</SheetTitle>
          <SheetDescription>
            {totalItems === 0 ? t('cart.empty') : t('cart.items', { count: totalItems })}
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col flex-1 pt-6 min-h-0">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">{t('cart.empty')}</p>
                <p className="text-sm text-muted-foreground">{t('cart.emptyDescription')}</p>
              </div>
            </div>
          ) : (
            <>
              {/* Free Shipping Progress */}
              <div className="mb-6 p-4 bg-secondary rounded-lg">
                {remainingForFreeShipping > 0 ? (
                  <>
                    <p className="text-sm mb-2">
                      {t('cart.freeShippingProgress', { 
                        amount: formatPrice(remainingForFreeShipping.toString(), currency.code) 
                      })}
                    </p>
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-accent h-2 rounded-full transition-all duration-300 relative animate-shimmer"
                        style={{ 
                          width: `${Math.min(100, (totalPrice / FREE_SHIPPING_THRESHOLD) * 100)}%`,
                          backgroundImage: 'linear-gradient(90deg, hsl(var(--accent)) 0%, hsl(var(--accent)) 40%, hsl(0 100% 65%) 50%, hsl(var(--accent)) 60%, hsl(var(--accent)) 100%)',
                          backgroundSize: '200% 100%',
                        }}
                      />
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-center">
                    <strong>{t('cart.freeShippingAchieved')}</strong>
                  </p>
                )}
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto pr-2 min-h-0">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.variantId} className="flex gap-4 p-3 border rounded-lg">
                      <div className="w-20 h-20 bg-secondary rounded-md overflow-hidden flex-shrink-0">
                        {item.product.node.images?.edges?.[0]?.node && (
                          <img 
                            src={item.product.node.images.edges[0].node.url} 
                            alt={item.product.node.title} 
                            className="w-full h-full object-cover" 
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate">{item.product.node.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {item.selectedOptions.map(option => option.value).join(' / ')}
                        </p>
                        <p className="font-semibold mt-1">{formatPrice(item.price.amount, item.price.currencyCode)}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6 text-muted-foreground hover:text-accent" 
                          onClick={() => removeItem(item.variantId)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                        <div className="flex items-center gap-1">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-7 w-7" 
                            onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-7 w-7" 
                            onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cart Summary */}
              <div className="flex-shrink-0 space-y-4 pt-4 border-t bg-background mt-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{t('common.subtotal')}</span>
                    <span>{formatPrice(totalPrice.toString(), currency.code)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>{t('common.shipping')}</span>
                    <span className={remainingForFreeShipping <= 0 ? "text-accent font-medium" : ""}>
                      {remainingForFreeShipping <= 0 ? t('common.freeShipping') : t('common.loading')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="text-lg font-semibold">{t('common.total')}</span>
                    <span className="text-xl font-bold">{formatPrice(totalPrice.toString(), currency.code)}</span>
                  </div>
                </div>
                <Button 
                  onClick={handleCheckout} 
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold uppercase tracking-wide" 
                  size="lg" 
                  disabled={items.length === 0 || isLoading || isSyncing}
                >
                  {isLoading || isSyncing ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <ExternalLink className="w-4 h-4 mr-2" />
                      {t('cart.checkoutWithShopify')}
                    </>
                  )}
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
