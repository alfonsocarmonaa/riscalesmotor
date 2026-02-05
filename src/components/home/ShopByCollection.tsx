import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import collectionRiscales from "@/assets/collection-riscales.jpg";
import collectionCars from "@/assets/collection-cars.jpg";
import collectionMotos from "@/assets/collection-motos.jpg";

const collections = [
  {
    id: 'ediciones-riscales',
    name: 'Ediciones Riscales',
    description: 'Diseños exclusivos de la marca',
    href: '/productos?collection=ediciones-riscales',
    image: collectionRiscales,
  },
  {
    id: 'leyendas',
    name: 'Leyendas del Motor',
    description: 'Máquinas legendarias que hicieron historia',
    href: '/productos?collection=leyendas',
    image: collectionMotos,
  },
  {
    id: 'espiritu',
    name: 'Espíritu Viajero',
    description: 'Para los que sienten la llamada del asfalto',
    href: '/productos?collection=espiritu',
    image: collectionCars,
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
          {collections.map((collection) => (
            <Link 
              key={collection.id} 
              to={collection.href}
              className="collection-card group relative aspect-[3/4] rounded-lg overflow-hidden"
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 collection-image transition-transform duration-500 bg-cover bg-center"
                style={{ backgroundImage: `url(${collection.image})` }}
              />
              
              {/* Overlay */}
              <div className="collection-overlay" />
              
              {/* Gradient Overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/30 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-background">
                <h3 className="font-display text-3xl md:text-4xl mb-2">{collection.name}</h3>
                <p className="text-background/80 mb-4">{collection.description}</p>
              <Button 
                  className="w-fit bg-accent text-accent-foreground hover:bg-accent/90 transition-all"
                >
                  Comprar
                </Button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
