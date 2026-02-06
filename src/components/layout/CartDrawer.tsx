import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingCart, Minus, Plus, Trash2, ExternalLink, Loader2, LogIn, UserX } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { formatPrice, getShopifyCheckoutUrl } from "@/lib/shopify";
import { enrichCheckoutUrl, trackBeginCheckout } from "@/lib/analytics";
import { supabase } from "@/integrations/supabase/client";

export const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const navigate = useNavigate();
  const { items, isLoading, isSyncing, updateQuantity, removeItem, getCheckoutUrl, syncCart, getTotalItems, getTotalPrice, setBuyerEmail } = useCartStore();
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();
  const FREE_SHIPPING_THRESHOLD = 50;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - totalPrice);

  // Check auth state when drawer opens
  useEffect(() => {
    if (isOpen) {
      syncCart();
      supabase.auth.getSession().then(({ data: { session } }) => {
        setUserEmail(session?.user?.email ?? null);
      });
    } else {
      setShowLoginPrompt(false);
    }
  }, [isOpen, syncCart]);

  const proceedToCheckout = async () => {
    const checkoutUrl = getCheckoutUrl();
    if (!checkoutUrl) return;

    // Ensure buyer email is set right before checkout
    if (userEmail) {
      await setBuyerEmail(userEmail);
    }

    // Track begin_checkout event
    trackBeginCheckout(
      items.map(i => ({
        name: i.product.node.title,
        id: i.variantId,
        price: i.price.amount,
        quantity: i.quantity,
        currency: i.price.currencyCode,
      }))
    );

    // Ensure correct domain + forward UTMs and GA4 client ID
    const safeUrl = getShopifyCheckoutUrl(checkoutUrl);
    const enrichedUrl = enrichCheckoutUrl(safeUrl);
    window.open(enrichedUrl, '_blank');
    setIsOpen(false);
    setShowLoginPrompt(false);
  };

  const handleCheckout = () => {
    // If user is logged in, go directly to checkout
    if (userEmail) {
      proceedToCheckout();
      return;
    }
    // If not logged in, show prompt
    setShowLoginPrompt(true);
  };

  const handleLoginRedirect = () => {
    setIsOpen(false);
    setShowLoginPrompt(false);
    navigate("/login");
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
          <SheetTitle className="font-display text-2xl">Carrito</SheetTitle>
          <SheetDescription>
            {totalItems === 0 ? "Tu carrito está vacío" : `${totalItems} artículo${totalItems > 1 ? 's' : ''}`}
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col flex-1 pt-6 min-h-0">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">Tu carrito está vacío</p>
                <p className="text-sm text-muted-foreground">Añade productos para empezar</p>
              </div>
            </div>
          ) : (
            <>
              {/* Free Shipping Progress */}
              <div className="mb-6 p-4 bg-secondary rounded-lg">
                {remainingForFreeShipping > 0 ? (
                  <>
                    <p className="text-sm mb-2">
                      Te faltan {formatPrice(remainingForFreeShipping.toString(), 'EUR')} para envío gratis
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
                    <strong>¡Tienes envío gratis!</strong>
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
                    <span>Subtotal</span>
                    <span>{formatPrice(totalPrice.toString(), 'EUR')}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Envío</span>
                    <span className={remainingForFreeShipping <= 0 ? "text-accent font-medium" : ""}>
                      {remainingForFreeShipping <= 0 ? "Envío gratis" : "Calculando..."}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-xl font-bold">{formatPrice(totalPrice.toString(), 'EUR')}</span>
                  </div>
                </div>

                {/* Login prompt for unauthenticated users */}
                {showLoginPrompt && !userEmail ? (
                  <div className="space-y-3 p-4 border border-accent/30 rounded-lg bg-accent/5">
                    <p className="text-sm font-medium text-center">
                      ¿Quieres iniciar sesión para guardar tu pedido y pre-rellenar tus datos?
                    </p>
                    <div className="flex gap-2">
                      <Button 
                        onClick={handleLoginRedirect}
                        variant="default"
                        className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
                        size="sm"
                      >
                        <LogIn className="w-4 h-4 mr-2" />
                        Iniciar sesión
                      </Button>
                      <Button 
                        onClick={proceedToCheckout}
                        variant="outline"
                        className="flex-1"
                        size="sm"
                      >
                        <UserX className="w-4 h-4 mr-2" />
                        Seguir como invitado
                      </Button>
                    </div>
                  </div>
                ) : (
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
                        Finalizar compra
                      </>
                    )}
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
