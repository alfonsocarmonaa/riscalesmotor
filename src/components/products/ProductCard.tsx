import { Link } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import { ShopifyProduct, formatPrice } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { useWishlist } from "@/hooks/useWishlist";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ProductCardProps {
  product: ShopifyProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const { node } = product;
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);
  const { isFavorite, toggleItem } = useWishlist();

  const firstVariant = node.variants.edges[0]?.node;
  const mainImage = node.images.edges[0]?.node;
  const secondImage = node.images.edges[1]?.node;
  
  const currentPrice = firstVariant?.price;
  const compareAtPrice = firstVariant?.compareAtPrice;
  const hasDiscount = compareAtPrice && parseFloat(compareAtPrice.amount) > parseFloat(currentPrice?.amount || '0');
  
  const discountPercentage = hasDiscount 
    ? Math.round((1 - parseFloat(currentPrice?.amount || '0') / parseFloat(compareAtPrice.amount)) * 100)
    : 0;

  // Get color options
  const colorOption = node.options.find(opt => opt.name.toLowerCase() === 'color');
  const colors = colorOption?.values || [];

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!firstVariant) return;
    
    await addItem({
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions || []
    });
    
    toast.success("Añadido al carrito", {
      description: node.title,
    });
  };

  const getHeartColor = (color: string) => {
    const c = color.toLowerCase();
    if (c.includes('blanco') || c.includes('white')) return { type: 'white' };
    if (c.includes('gris') || c.includes('grey') || c.includes('gray')) return { type: 'gray' };
    if (c.includes('verde') || c.includes('green') || c.includes('militar')) return { type: 'green' };
    if (c.includes('negro') || c.includes('black')) return { type: 'skip' };
    return { type: 'default' };
  };

  const isWishlisted = isFavorite(node.id);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem({
      productId: node.id,
      handle: node.handle,
      title: node.title,
      image: mainImage?.url,
      price: currentPrice?.amount,
      currencyCode: currentPrice?.currencyCode,
    });
  };

  return (
    <Link to={`/producto/${node.handle}`} className="group product-card block touch-manipulation">
      <div className="relative overflow-hidden rounded-lg bg-secondary aspect-[4/5]">
        {/* Discount Badge */}
        {hasDiscount && (
          <span className="badge-discount z-10">
            -{discountPercentage}%
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className={`absolute top-2 right-2 z-10 p-2.5 sm:p-2 rounded-full transition-all duration-200 touch-manipulation ${
            isWishlisted 
              ? 'bg-accent text-accent-foreground' 
              : 'bg-background/90 hover:bg-accent hover:text-accent-foreground active:bg-accent active:text-accent-foreground'
          }`}
        >
          <Heart className={`h-5 w-5 sm:h-4 sm:w-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Product Images */}
        <div className="relative w-full h-full">
          {mainImage && (
            <img
              src={mainImage.url}
              alt={mainImage.altText || node.title}
              className="product-image absolute inset-0 w-full h-full object-cover transition-all duration-500"
              loading="lazy"
            />
          )}
          {secondImage && (
            <img
              src={secondImage.url}
              alt={secondImage.altText || node.title}
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden sm:block"
              loading="lazy"
            />
          )}
        </div>

        {/* Quick Add Button - Always visible on mobile, hover on desktop */}
        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
          <Button 
            onClick={handleAddToCart}
            disabled={isLoading || !firstVariant?.availableForSale}
            className="w-full bg-accent hover:bg-accent/90 active:bg-accent/80 text-accent-foreground font-bold uppercase text-xs tracking-wide py-2.5 sm:py-2 touch-manipulation"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {!firstVariant?.availableForSale ? "Agotado" : "Añadir al carrito"}
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="mt-4 space-y-2">
        <h3 className="font-body font-medium text-foreground line-clamp-2 group-hover:text-accent transition-colors">
          {node.title}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2">
          {hasDiscount ? (
            <>
              <span className="price-sale">{formatPrice(currentPrice?.amount || '0', currentPrice?.currencyCode)}</span>
              <span className="price-original">{formatPrice(compareAtPrice.amount, compareAtPrice.currencyCode)}</span>
            </>
          ) : (
            <span className="font-bold">{formatPrice(currentPrice?.amount || '0', currentPrice?.currencyCode)}</span>
          )}
        </div>

        {/* Color Options as Hearts */}
        {colors.length > 1 && (
          <div className="flex items-center gap-1.5">
            {colors.map((color) => {
              const colorInfo = getHeartColor(color);
              if (colorInfo.type === 'skip') return null;
              return (
                <span key={color} title={color}>
                  {colorInfo.type === 'white' ? (
                    <Heart 
                      className="h-5 w-5"
                      fill="white"
                      stroke="#d4d4d4"
                      strokeWidth={1.5}
                    />
                  ) : colorInfo.type === 'gray' ? (
                    <Heart 
                      className="h-5 w-5"
                      fill="#9ca3af"
                      stroke="#9ca3af"
                      strokeWidth={0}
                    />
                  ) : colorInfo.type === 'green' ? (
                    <Heart 
                      className="h-5 w-5"
                      fill="#16a34a"
                      stroke="#16a34a"
                      strokeWidth={0}
                    />
                  ) : (
                    <Heart 
                      className="h-5 w-5"
                      fill="#a3a3a3"
                      stroke="#a3a3a3"
                      strokeWidth={0}
                    />
                  )}
                </span>
              );
            })}
          </div>
        )}
      </div>
    </Link>
  );
}
