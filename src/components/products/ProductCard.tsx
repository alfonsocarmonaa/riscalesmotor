import { Link } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import { ShopifyProduct, formatPrice } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";

interface ProductCardProps {
  product: ShopifyProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const { node } = product;
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);
  const [isWishlisted, setIsWishlisted] = useState(false);

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
    
    toast.success("¡Añadido al carrito!", {
      description: node.title,
    });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? "Eliminado de favoritos" : "Añadido a favoritos ♥");
  };

  const getColorClass = (color: string) => {
    const colorMap: Record<string, string> = {
      'blanco': 'bg-product-white border',
      'white': 'bg-product-white border',
      'gris': 'bg-product-grey',
      'grey': 'bg-product-grey',
      'gray': 'bg-product-grey',
      'verde': 'bg-product-green',
      'green': 'bg-product-green',
    };
    return colorMap[color.toLowerCase()] || 'bg-neutral';
  };

  return (
    <Link to={`/producto/${node.handle}`} className="group product-card block">
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
          className={`absolute top-2 right-2 z-10 p-2 rounded-full transition-all duration-200 ${
            isWishlisted 
              ? 'bg-accent text-accent-foreground' 
              : 'bg-background/80 hover:bg-accent hover:text-accent-foreground'
          }`}
        >
          <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Product Images */}
        <div className="relative w-full h-full">
          {mainImage && (
            <img
              src={mainImage.url}
              alt={mainImage.altText || node.title}
              className="product-image absolute inset-0 w-full h-full object-cover transition-all duration-500"
            />
          )}
          {secondImage && (
            <img
              src={secondImage.url}
              alt={secondImage.altText || node.title}
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
          )}
        </div>

        {/* Quick Add Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button 
            onClick={handleAddToCart}
            disabled={isLoading || !firstVariant?.availableForSale}
            className="w-full bg-foreground hover:bg-foreground/90 text-background font-bold uppercase text-xs tracking-wide"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {!firstVariant?.availableForSale ? 'Agotado' : 'Añadir al Carrito'}
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
          <div className="flex items-center gap-2">
            {colors.map((color) => (
              <button
                key={color}
                className={`heart-selector w-5 h-5 rounded-full ${getColorClass(color)}`}
                title={color}
                onClick={(e) => e.preventDefault()}
              >
                <span className="sr-only">{color}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
