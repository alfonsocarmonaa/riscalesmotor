import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductGrid } from "@/components/products/ProductGrid";
import { useProducts } from "@/hooks/useProducts";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Filter, ChevronDown } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";

const collections = [
  { id: 'ediciones-riscales', name: 'Ediciones Riscales' },
  { id: 'leyendas', name: 'Leyendas del Motor' },
  { id: 'espiritu', name: 'Espíritu' },
];

const colors = [
  { id: 'blanco', name: 'Blanco', class: 'bg-product-white border' },
  { id: 'gris', name: 'Gris', class: 'bg-product-grey' },
  { id: 'verde', name: 'Verde', class: 'bg-product-green' },
];

const sizes = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'];

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const collection = searchParams.get('collection');
  const [sortBy, setSortBy] = useState('featured');
  const [filterOpen, setFilterOpen] = useState(false);

  // Build query based on collection
  let query: string | undefined;
  if (collection) {
    query = `tag:${collection}`;
  }

  const { data: products, isLoading } = useProducts(50, query);

  const getPageTitle = () => {
    if (collection === 'ediciones-riscales') return 'Ediciones Riscales';
    if (collection === 'leyendas') return 'Leyendas del Motor';
    if (collection === 'espiritu') return 'Espíritu';
    return 'Todas las Camisetas';
  };

  const getPageDescription = () => {
    if (collection === 'ediciones-riscales') return 'Diseños exclusivos creados por Riscales Motor Co.';
    if (collection === 'leyendas') return 'Homenaje a las máquinas legendarias que escribieron historia';
    if (collection === 'espiritu') return 'Camisetas para los que sienten la llamada del asfalto';
    return 'Explora nuestra colección completa de camisetas artesanales';
  };

  const FilterContent = () => (
    <div className="space-y-8">
      {/* Collections */}
      <div>
        <h4 className="font-body font-bold uppercase tracking-wide text-sm mb-4">Colecciones</h4>
        <div className="space-y-3">
          {collections.map((col) => (
            <label key={col.id} className="flex items-center gap-3 cursor-pointer group">
              <Checkbox 
                checked={collection === col.id}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSearchParams({ collection: col.id });
                  } else {
                    setSearchParams({});
                  }
                }}
              />
              <span className="text-sm group-hover:text-accent transition-colors">{col.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div>
        <h4 className="font-body font-bold uppercase tracking-wide text-sm mb-4">Color</h4>
        <div className="flex gap-3">
          {colors.map((color) => (
            <button
              key={color.id}
              className={`heart-selector w-8 h-8 rounded-full ${color.class} relative`}
              title={color.name}
            >
              <span className="sr-only">{color.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h4 className="font-body font-bold uppercase tracking-wide text-sm mb-4">Talla</h4>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              className="px-3 py-1.5 border rounded text-sm hover:border-accent hover:text-accent transition-colors"
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      <Button 
        variant="outline" 
        className="w-full"
        onClick={() => {
          setSearchParams({});
          setFilterOpen(false);
        }}
      >
        Limpiar Filtros
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-secondary py-4">
          <div className="container">
            <nav className="text-sm text-muted-foreground">
              <a href="/" className="hover:text-accent transition-colors">Inicio</a>
              <span className="mx-2">/</span>
              <span className="text-foreground">Camisetas</span>
              {collection && (
                <>
                  <span className="mx-2">/</span>
                  <span className="text-foreground">{getPageTitle()}</span>
                </>
              )}
            </nav>
          </div>
        </div>

        {/* Page Header */}
        <div className="container py-8 md:py-12">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="font-display text-4xl md:text-5xl mb-4">{getPageTitle()}</h1>
            <p className="text-muted-foreground text-lg">{getPageDescription()}</p>
          </div>
        </div>

        {/* Products Section */}
        <div className="container pb-16 md:pb-24">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters - Desktop */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-32">
                <h3 className="font-body font-bold uppercase tracking-wide mb-6">Filtrar por</h3>
                <FilterContent />
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b">
                {/* Mobile Filter Button */}
                <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden">
                      <Filter className="h-4 w-4 mr-2" />
                      Filtrar
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[300px]">
                    <SheetHeader>
                      <SheetTitle>Filtrar por</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterContent />
                    </div>
                  </SheetContent>
                </Sheet>

                <span className="text-sm text-muted-foreground hidden lg:block">
                  {products?.length || 0} productos
                </span>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground hidden sm:block">Ordenar por:</span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Destacados</SelectItem>
                      <SelectItem value="best-selling">Más vendidos</SelectItem>
                      <SelectItem value="price-asc">Precio: Menor a mayor</SelectItem>
                      <SelectItem value="price-desc">Precio: Mayor a menor</SelectItem>
                      <SelectItem value="newest">Novedades</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Product Grid */}
              <ProductGrid products={products || []} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
