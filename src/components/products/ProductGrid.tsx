import { useTranslation } from "react-i18next";
import { ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "./ProductCard";
import { ProductGridSkeleton } from "./ProductCardSkeleton";

interface ProductGridProps {
  products: ShopifyProduct[];
  isLoading?: boolean;
}

export function ProductGrid({ products, isLoading }: ProductGridProps) {
  const { t } = useTranslation();

  if (isLoading) {
    return <ProductGridSkeleton />;
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground text-lg mb-4">
          {t('product.noProducts')}
        </p>
        <p className="text-sm text-muted-foreground">
          {t('product.noProductsDescription')}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.node.id} product={product} />
      ))}
    </div>
  );
}
