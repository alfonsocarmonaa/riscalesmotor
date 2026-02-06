import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { SEOHead } from "@/components/SEOHead";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useWishlist } from "@/hooks/useWishlist";
import { Heart, Package, Trash2 } from "lucide-react";

export default function Favorites() {
  const { items: favorites, removeItem } = useWishlist();

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title="Mis Favoritos"
        description="Tu lista de camisetas favoritas de Riscales Motor Co."
        noIndex
      />
      <Header />

      <main className="flex-1 py-12">
        <div className="container">
          <div className="flex items-center gap-3 mb-8">
            <Heart className="h-8 w-8 text-accent" />
            <h1 className="font-display text-4xl">Mis Favoritos</h1>
          </div>

          {favorites.length === 0 ? (
            <Card>
              <CardContent className="py-16 text-center">
                <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-6" />
                <h2 className="font-display text-2xl mb-4">
                  Tu lista de favoritos está vacía
                </h2>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Explora nuestra colección y añade las camisetas que más te gusten.
                </p>
                <Button asChild>
                  <Link to="/productos">Explorar Productos</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {favorites.map((fav) => (
                <Card key={fav.productId} className="group overflow-hidden">
                  <div className="relative">
                    <Link to={`/producto/${fav.handle}`}>
                      <div className="aspect-[4/5] bg-secondary overflow-hidden">
                        {fav.image ? (
                          <img
                            src={fav.image}
                            alt={fav.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package className="h-12 w-12 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                    </Link>
                    <button
                      onClick={() => removeItem(fav.productId)}
                      className="absolute top-2 right-2 p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-destructive hover:text-destructive-foreground transition-colors"
                      title="Eliminar de favoritos"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <CardContent className="p-4">
                    <Link to={`/producto/${fav.handle}`}>
                      <h3 className="font-medium mb-1 hover:text-accent transition-colors line-clamp-2">
                        {fav.title}
                      </h3>
                    </Link>
                    {fav.price && (
                      <p className="text-accent font-bold text-lg">
                        {parseFloat(fav.price).toFixed(2)}€
                      </p>
                    )}
                    <Button className="w-full mt-3" size="sm" asChild>
                      <Link to={`/producto/${fav.handle}`}>Ver Producto</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
