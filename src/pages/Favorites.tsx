import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useFavorites } from "@/hooks/useFavorites";
import { Heart, Loader2, Package, Trash2 } from "lucide-react";

export default function Favorites() {
  const { user, loading: authLoading } = useAuth();
  const { favorites, loading: favLoading, removeFavorite } = useFavorites();

  const loading = authLoading || favLoading;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="container">
          <div className="flex items-center gap-3 mb-8">
            <Heart className="h-8 w-8 text-accent" />
            <h1 className="font-display text-4xl">Mis Favoritos</h1>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-24">
              <Loader2 className="h-8 w-8 animate-spin text-accent" />
            </div>
          ) : !user ? (
            <Card>
              <CardContent className="py-16 text-center">
                <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-6" />
                <h2 className="font-display text-2xl mb-4">
                  Inicia sesión para ver tus favoritos
                </h2>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Guarda tus camisetas favoritas y accede a ellas desde cualquier dispositivo.
                </p>
                <div className="flex items-center justify-center gap-4">
                  <Button asChild>
                    <Link to="/login">Iniciar Sesión</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/registro">Crear Cuenta</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : favorites.length === 0 ? (
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
                <Card key={fav.id} className="group overflow-hidden">
                  <div className="relative">
                    <Link to={`/producto/${fav.product_handle}`}>
                      <div className="aspect-[4/5] bg-secondary overflow-hidden">
                        {fav.product_image ? (
                          <img
                            src={fav.product_image}
                            alt={fav.product_title}
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
                      onClick={() => removeFavorite(fav.product_id)}
                      className="absolute top-2 right-2 p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-destructive hover:text-destructive-foreground transition-colors"
                      title="Eliminar de favoritos"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <CardContent className="p-4">
                    <Link to={`/producto/${fav.product_handle}`}>
                      <h3 className="font-medium mb-1 hover:text-accent transition-colors line-clamp-2">
                        {fav.product_title}
                      </h3>
                    </Link>
                    {fav.product_price && (
                      <p className="text-accent font-bold text-lg">{fav.product_price}€</p>
                    )}
                    <Button className="w-full mt-3" size="sm" asChild>
                      <Link to={`/producto/${fav.product_handle}`}>Ver Producto</Link>
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
