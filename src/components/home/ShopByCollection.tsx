import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const collections = [
  {
    id: 'ediciones-riscales',
    name: 'Ediciones Riscales',
    description: 'Diseños exclusivos de la marca',
    href: '/productos?collection=ediciones-riscales',
    image: null, // Placeholder - will show gradient
  },
  {
    id: 'coches',
    name: 'Leyendas del Asfalto',
    description: 'Clásicos sobre cuatro ruedas',
    href: '/productos?collection=coches',
    image: null,
  },
  {
    id: 'motos',
    name: 'Espíritu Dos Ruedas',
    description: 'Iconos moteros históricos',
    href: '/productos?collection=motos',
    image: null,
  },
];

export function ShopByCollection() {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl mb-4">Explora por Colección</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Encuentra tu pasión por el motor en cada diseño
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {collections.map((collection, index) => (
            <Link 
              key={collection.id} 
              to={collection.href}
              className="collection-card group relative aspect-[3/4] rounded-lg overflow-hidden"
            >
              {/* Background */}
              <div 
                className={`absolute inset-0 collection-image transition-transform duration-500 ${
                  collection.image 
                    ? '' 
                    : index === 0 
                      ? 'bg-gradient-to-br from-neutral-dark via-neutral to-neutral-dark'
                      : index === 1
                        ? 'bg-gradient-to-br from-tertiary via-tertiary/80 to-tertiary'
                        : 'bg-gradient-to-br from-foreground via-neutral-dark to-foreground'
                }`}
                style={collection.image ? { backgroundImage: `url(${collection.image})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
              />
              
              {/* Overlay */}
              <div className="collection-overlay" />
              
              {/* Gradient Overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-background">
                <h3 className="font-display text-3xl md:text-4xl mb-2">{collection.name}</h3>
                <p className="text-background/80 mb-4">{collection.description}</p>
                <Button 
                  variant="outline" 
                  className="w-fit border-background text-background hover:bg-background hover:text-foreground transition-all"
                >
                  Explorar
                </Button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
