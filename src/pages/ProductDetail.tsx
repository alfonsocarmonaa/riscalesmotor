import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { SEOHead } from "@/components/SEOHead";
import { ProductSchema, BreadcrumbSchema } from "@/components/JsonLd";
import { Footer } from "@/components/layout/Footer";
import { useProductByHandle, useProducts } from "@/hooks/useProducts";
import { formatPrice } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Heart, Minus, Plus, Truck, Package, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductCard } from "@/components/products/ProductCard";
import { StickyAddToCart } from "@/components/products/StickyAddToCart";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function ProductDetail() {
  const { handle } = useParams<{ handle: string }>();
  const { data: product, isLoading } = useProductByHandle(handle || '');
  const { data: relatedProducts } = useProducts(4);
  const addItem = useCartStore(state => state.addItem);
  const isAddingToCart = useCartStore(state => state.isLoading);

  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showStickyCart, setShowStickyCart] = useState(false);
  const addToCartRef = useRef<HTMLDivElement>(null);

  // Set default variant
  useEffect(() => {
    if (product?.variants.edges.length) {
      setSelectedVariantId(product.variants.edges[0].node.id);
    }
  }, [product]);

  // Show sticky cart when main button scrolls out of view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowStickyCart(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: '-100px 0px 0px 0px' }
    );

    if (addToCartRef.current) {
      observer.observe(addToCartRef.current);
    }

    return () => observer.disconnect();
  }, [product]);

  const selectedVariant = product?.variants.edges.find(v => v.node.id === selectedVariantId)?.node;
  const images = product?.images.edges || [];
  const hasDiscount = selectedVariant?.compareAtPrice && 
    parseFloat(selectedVariant.compareAtPrice.amount) > parseFloat(selectedVariant.price.amount);


  const handleAddToCart = async () => {
    if (!product || !selectedVariant) return;

    await addItem({
      product: { node: product },
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity,
      selectedOptions: selectedVariant.selectedOptions || []
    });

    toast.success("¡Añadido al carrito!", {
      description: product.title,
    });
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? "Eliminado de favoritos" : "Añadido a favoritos ♥");
  };


  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container py-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <Skeleton className="aspect-[4/5] rounded-lg" />
            <div className="space-y-6">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-8 w-1/4" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-4xl mb-4">Producto no encontrado</h1>
            <Button asChild>
              <Link to="/productos">Ver todos los productos</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-secondary py-4">
          <div className="container">
            <nav className="text-sm text-muted-foreground">
              <Link to="/" className="hover:text-accent transition-colors">Inicio</Link>
              <span className="mx-2">/</span>
              <Link to="/productos" className="hover:text-accent transition-colors">Camisetas</Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">{product.title}</span>
            </nav>
          </div>
        </div>

        {/* Product Section */}
        <div className="container py-8 md:py-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-secondary">
                {images[selectedImage] && (
                  <img
                    src={images[selectedImage].node.url}
                    alt={images[selectedImage].node.altText || product.title}
                    className="w-full h-full object-cover"
                  />
                )}
                
                {/* Navigation Arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImage(i => i === 0 ? images.length - 1 : i - 1)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-background/80 rounded-full hover:bg-background transition-colors"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setSelectedImage(i => i === images.length - 1 ? 0 : i + 1)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-background/80 rounded-full hover:bg-background transition-colors"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        i === selectedImage ? 'border-accent' : 'border-transparent'
                      }`}
                    >
                      <img
                        src={img.node.url}
                        alt={img.node.altText || `${product.title} ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="font-display text-3xl md:text-4xl mb-2">{product.title}</h1>
                
                {/* Price */}
                <div className="flex items-center gap-3 mb-4">
                  {hasDiscount ? (
                    <>
                      <span className="text-2xl font-bold">
                        {formatPrice(selectedVariant?.price.amount || '0', selectedVariant?.price.currencyCode)}
                      </span>
                      <span className="price-original text-lg">
                        {formatPrice(selectedVariant?.compareAtPrice?.amount || '0', selectedVariant?.compareAtPrice?.currencyCode)}
                      </span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold">
                      {formatPrice(selectedVariant?.price.amount || '0', selectedVariant?.price.currencyCode)}
                    </span>
                  )}
                </div>

              </div>

              {/* Short Description */}
              <p className="text-muted-foreground">
                {product.description.slice(0, 200)}
                {product.description.length > 200 && '...'}
              </p>

              {/* Options */}
              {product.options.map((option) => (
                <div key={option.name}>
                  <h4 className="font-body font-bold uppercase tracking-wide text-sm mb-3">
                    {option.name}:
                  </h4>
                  
                  {option.name.toLowerCase() === 'color' ? (
                    <div className="flex gap-3">
                      {option.values.map((value) => {
                        const isSelected = selectedVariant?.selectedOptions.some(o => o.name === option.name && o.value === value);
                        const colorLower = value.toLowerCase();
                        const isWhite = colorLower.includes('blanco') || colorLower.includes('white');
                        const isGray = colorLower.includes('gris') || colorLower.includes('grey') || colorLower.includes('gray');
                        const isGreen = colorLower.includes('verde') || colorLower.includes('green') || colorLower.includes('militar');
                        
                        // Skip black/negro colors
                        if (colorLower === 'negro' || colorLower === 'black') return null;
                        
                        return (
                          <button
                            key={value}
                            className="relative group"
                            title={value}
                            onClick={() => {
                              const variant = product.variants.edges.find(v =>
                                v.node.selectedOptions.some(o => o.name === option.name && o.value === value)
                              );
                              if (variant) setSelectedVariantId(variant.node.id);
                            }}
                          >
                            {isWhite ? (
                              <Heart 
                                className="h-10 w-10"
                                fill="white"
                                stroke={isSelected ? 'black' : '#d4d4d4'}
                                strokeWidth={isSelected ? 3 : 1.5}
                              />
                            ) : isGray ? (
                              <Heart 
                                className="h-10 w-10"
                                fill="#9ca3af"
                                stroke={isSelected ? 'black' : '#9ca3af'}
                                strokeWidth={isSelected ? 3 : 1}
                              />
                            ) : isGreen ? (
                              <Heart 
                                className="h-10 w-10"
                                fill="#16a34a"
                                stroke={isSelected ? 'black' : '#16a34a'}
                                strokeWidth={isSelected ? 3 : 1}
                              />
                            ) : (
                              <Heart 
                                className="h-10 w-10"
                                fill="#a3a3a3"
                                stroke={isSelected ? 'black' : '#a3a3a3'}
                                strokeWidth={isSelected ? 3 : 1}
                              />
                            )}
                            <span className="sr-only">{value}</span>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {option.values.map((value) => {
                        const isSelected = selectedVariant?.selectedOptions.some(
                          o => o.name === option.name && o.value === value
                        );
                        return (
                          <button
                            key={value}
                            onClick={() => {
                              const variant = product.variants.edges.find(v =>
                                v.node.selectedOptions.some(o => o.name === option.name && o.value === value)
                              );
                              if (variant) setSelectedVariantId(variant.node.id);
                            }}
                            className={`px-4 py-2 border rounded transition-colors ${
                              isSelected 
                                ? 'border-foreground bg-foreground text-background' 
                                : 'border-border hover:border-foreground'
                            }`}
                          >
                            {value}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}

              {/* Size Guide */}
              <Dialog>
                <DialogTrigger asChild>
                  <button className="text-sm font-bold text-foreground hover:text-accent transition-colors underline">
                    Guía de tallas
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                  <DialogHeader>
                    <DialogTitle className="font-display text-2xl">Guía de Tallas</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Medidas en centímetros. Medir de sisa a sisa (ancho) y desde hombro hasta bajo (alto).
                    </p>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="py-2 text-left font-bold">Talla</th>
                          <th className="py-2 text-center font-bold">Ancho</th>
                          <th className="py-2 text-center font-bold">Alto</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { size: 'XS', width: 46, height: 66 },
                          { size: 'S', width: 49, height: 69 },
                          { size: 'M', width: 52, height: 72 },
                          { size: 'L', width: 55, height: 74 },
                          { size: 'XL', width: 58, height: 76 },
                          { size: '2XL', width: 61, height: 78 },
                          { size: '3XL', width: 64, height: 80 },
                        ].map((row) => (
                          <tr key={row.size} className="border-b border-border">
                            <td className="py-2">{row.size}</td>
                            <td className="py-2 text-center">{row.width} cm</td>
                            <td className="py-2 text-center">{row.height} cm</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <p className="text-sm text-muted-foreground">
                      💡 <strong>Ajuste:</strong> Regular Fit (unisex). Si buscas ajuste más holgado, elige una talla más.
                    </p>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Stock Status */}
              <div className="text-sm font-bold">
                {selectedVariant?.availableForSale ? (
                  <span className="text-foreground">En stock</span>
                ) : (
                  <span className="text-foreground">Agotado</span>
                )}
              </div>

              {/* Quantity */}
              <div>
                <h4 className="font-body font-bold uppercase tracking-wide text-sm mb-3">Cantidad:</h4>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(q => q + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Add to Cart & Wishlist */}
              <div ref={addToCartRef} className="flex gap-3">
                <Button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart || !selectedVariant?.availableForSale}
                  className="flex-1 bg-accent text-white hover:bg-accent/90 active:bg-accent/80 font-bold uppercase tracking-wide py-5 sm:py-6 text-sm sm:text-base touch-manipulation"
                >
                  {isAddingToCart ? 'Añadiendo...' : 'Añadir al Carrito'}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleWishlist}
                  className={`h-12 w-12 sm:h-14 sm:w-14 touch-manipulation ${isWishlisted ? 'text-accent border-accent' : ''}`}
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </Button>
              </div>

              {/* Shipping Info */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-4 border-t text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4" />
                  <span>Envío gratis en +50€</span>
                </div>
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  <span>Envío: 48-72h</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="h-4 w-4" />
                  <span>Devoluciones 30 días</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Tabs */}
          <div className="mt-16">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0">
                <TabsTrigger 
                  value="description" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent px-6 py-3"
                >
                  Descripción
                </TabsTrigger>
                <TabsTrigger 
                  value="details" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent px-6 py-3"
                >
                  Características
                </TabsTrigger>
                <TabsTrigger 
                  value="shipping" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent px-6 py-3"
                >
                  Envíos
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="pt-8">
                <div className="max-w-3xl space-y-6">
                  <h3 className="font-display text-2xl">La Historia Detrás del Diseño</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {product.description || 
                      `Esta camiseta captura la esencia de los vehículos clásicos que marcaron época. 
                      Con una ilustración detallada hecha a mano, combinamos precisión histórica 
                      con un toque artístico contemporáneo.`}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    La frase "Nuestras miradas taparon nuestros secretos..." evoca esos momentos
                    donde las palabras sobran y solo queda la pasión por lo auténtico.
                    Cada camiseta es única, impresa bajo pedido con la máxima calidad.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="details" className="pt-8">
                <div className="max-w-3xl">
                  <table className="w-full">
                    <tbody>
                      {[
                        { label: 'Composición', value: '100% Algodón' },
                        { label: 'Gramaje', value: '180 gr/m²' },
                        { label: 'Ajuste', value: 'Unisex Regular Fit' },
                        { label: 'Origen', value: 'Diseño España' },
                        { label: 'Fabricación', value: 'Print-on-Demand' },
                        { label: 'Tiempo entrega', value: '5-7 días laborables' },
                      ].map((row) => (
                        <tr key={row.label} className="border-b">
                          <td className="py-3 font-medium">{row.label}</td>
                          <td className="py-3 text-muted-foreground">{row.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
              
              <TabsContent value="shipping" className="pt-8">
                <div className="max-w-3xl space-y-6">
                  <div>
                    <h4 className="font-bold mb-2">🚚 España Península</h4>
                    <ul className="text-muted-foreground space-y-1">
                      <li>Envío estándar: 4,95€</li>
                      <li>Envío GRATIS en pedidos +50€</li>
                      <li>Tiempo: 48-72 horas laborables</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">🌍 Europa</h4>
                    <ul className="text-muted-foreground space-y-1">
                      <li>Disponible: Francia, Italia, Portugal, Alemania</li>
                      <li>Coste: Calculado en checkout</li>
                      <li>Tiempo: 5-7 días laborables</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">🔁 Devoluciones</h4>
                    <p className="text-muted-foreground">
                      30 días para cambios/devoluciones. Producto sin usar, etiquetas intactas.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Related Products */}
          {relatedProducts && relatedProducts.length > 0 && (
            <div className="mt-16 pt-16 border-t">
              <h2 className="font-display text-3xl mb-8 text-center">También te puede gustar</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {relatedProducts.slice(0, 4).map((product) => (
                  <ProductCard key={product.node.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* Sticky Add to Cart for Mobile */}
      {product && selectedVariant && (
        <StickyAddToCart
          productTitle={product.title}
          price={selectedVariant.price}
          isLoading={isAddingToCart}
          isAvailable={selectedVariant.availableForSale}
          onAddToCart={handleAddToCart}
          isVisible={showStickyCart}
        />
      )}
    </div>
  );
}
