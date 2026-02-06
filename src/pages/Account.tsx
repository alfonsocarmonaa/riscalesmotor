import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { SEOHead } from "@/components/SEOHead";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useShopifyAuth } from "@/hooks/useShopifyAuth";
import { useWishlist } from "@/hooks/useWishlist";
import { toast } from "sonner";
import { Loader2, User, Heart, LogOut, Package } from "lucide-react";

export default function Account() {
  const navigate = useNavigate();
  const customer = useShopifyAuth((s) => s.customer);
  const accessToken = useShopifyAuth((s) => s.accessToken);
  const fetchCustomer = useShopifyAuth((s) => s.fetchCustomer);
  const updateCustomer = useShopifyAuth((s) => s.updateCustomer);
  const logout = useShopifyAuth((s) => s.logout);
  const { items: favorites, removeItem } = useWishlist();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
  });
  const [saving, setSaving] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
      return;
    }
    fetchCustomer().finally(() => setInitialLoad(false));
  }, [accessToken, navigate, fetchCustomer]);

  useEffect(() => {
    if (customer) {
      setFormData({
        firstName: customer.firstName || "",
        lastName: customer.lastName || "",
        phone: customer.phone || "",
      });
    }
  }, [customer]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const { error } = await updateCustomer(formData);
    if (error) {
      toast.error("Error al guardar", { description: error });
    } else {
      toast.success("Perfil actualizado");
    }
    setSaving(false);
  };

  const handleSignOut = () => {
    logout();
    toast.success("Sesión cerrada");
    navigate("/");
  };

  if (initialLoad) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-accent" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!customer) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title="Mi Cuenta"
        description="Gestiona tu cuenta de Riscales Motor Co."
        noIndex
      />
      <Header />

      <main className="flex-1 py-12">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-4xl mb-2">Mi Cuenta</h1>
              <p className="text-muted-foreground">{customer.email}</p>
            </div>
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Cerrar Sesión
            </Button>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 max-w-md">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Perfil
              </TabsTrigger>
              <TabsTrigger value="favorites" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Favoritos
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Información Personal</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSaveProfile} className="space-y-4 max-w-md">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Nombre</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="Tu nombre"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Apellidos</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Tus apellidos"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        value={customer.email}
                        disabled
                        className="bg-muted"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Teléfono</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+34 600 000 000"
                      />
                    </div>
                    <Button type="submit" disabled={saving}>
                      {saving && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                      Guardar Cambios
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="favorites">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-accent" />
                    Mis Favoritos ({favorites.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {favorites.length === 0 ? (
                    <div className="text-center py-12">
                      <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground mb-4">
                        Aún no tienes productos favoritos
                      </p>
                      <Button asChild>
                        <Link to="/productos">Explorar Productos</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {favorites.map((fav) => (
                        <div key={fav.productId} className="group relative">
                          <Link to={`/producto/${fav.handle}`}>
                            <div className="aspect-[4/5] bg-secondary rounded-lg overflow-hidden mb-2">
                              {fav.image ? (
                                <img
                                  src={fav.image}
                                  alt={fav.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <Package className="h-8 w-8 text-muted-foreground" />
                                </div>
                              )}
                            </div>
                            <h3 className="font-medium text-sm truncate">{fav.title}</h3>
                            {fav.price && (
                              <p className="text-accent font-bold">
                                {parseFloat(fav.price).toFixed(2)}€
                              </p>
                            )}
                          </Link>
                          <button
                            onClick={() => removeItem(fav.productId)}
                            className="absolute top-2 right-2 p-1.5 bg-background/80 backdrop-blur-sm rounded-full hover:bg-destructive hover:text-destructive-foreground transition-colors"
                            title="Eliminar de favoritos"
                          >
                            <Heart className="h-4 w-4 fill-current text-accent" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
