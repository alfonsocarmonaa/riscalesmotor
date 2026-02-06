import { Link } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductCardSkeleton } from "@/components/products/ProductCardSkeleton";

export function BestSellers() {
  const { data: products, isLoading } = useProducts(8);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl mb-4">Más vendidos</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Diseños que enamoran
          </p>
        </div>

        {/* Products Carousel */}
        <div className="relative">
          {/* Navigation Arrows */}
          <Button
            variant="outline"
            size="icon"
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex bg-background shadow-lg"
            onClick={() => scroll('left')}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex bg-background shadow-lg"
            onClick={() => scroll('right')}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          {/* Scrollable Container */}
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
          >
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex-shrink-0 w-[280px] snap-start">
                  <ProductCardSkeleton />
                </div>
              ))
            ) : products && products.length > 0 ? (
              products.map((product) => (
                <div key={product.node.id} className="flex-shrink-0 w-[280px] snap-start">
                  <ProductCard product={product} />
                </div>
              ))
            ) : (
              <div className="w-full text-center py-12">
                <p className="text-muted-foreground mb-4">
                  No se encontraron productos
                </p>
                <p className="text-sm text-muted-foreground">
                  Prueba con otros filtros o explora todas nuestras camisetas
                </p>
              </div>
            )}
          </div>
        </div>

        {/* View All CTA */}
        {products && products.length > 0 && (
          <div className="text-center mt-10">
            <Link 
              to="/productos?sort=best-selling" 
              className="inline-block bg-accent text-accent-foreground px-8 py-3 font-body font-bold uppercase tracking-wide text-sm hover:bg-accent/90 transition-colors"
            >
              Ver Todas
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
