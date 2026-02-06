import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { formatPrice } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Loader2, Package, LogOut, User, MapPin, Save } from "lucide-react";
import { toast } from "sonner";

interface ShopifyOrder {
  id: string;
  name: string;
  createdAt: string;
  total: { amount: string; currencyCode: string } | null;
  fulfillmentStatus: string;
  financialStatus: string;
  lineItems: Array<{
    title: string;
    quantity: number;
    total: { amount: string; currencyCode: string } | null;
    image: { url: string; altText: string | null } | null;
  }>;
}

interface Profile {
  full_name: string | null;
  phone: string | null;
  address_line1: string | null;
  address_line2: string | null;
  city: string | null;
  postal_code: string | null;
  province: string | null;
  country: string | null;
}

const STATUS_LABELS: Record<string, string> = {
  FULFILLED: "Enviado",
  UNFULFILLED: "Pendiente",
  PARTIALLY_FULFILLED: "Parcialmente enviado",
  PAID: "Pagado",
  PENDING: "Pago pendiente",
  REFUNDED: "Reembolsado",
  PARTIALLY_REFUNDED: "Parcialmente reembolsado",
};

function getStatusLabel(status: string): string {
  return STATUS_LABELS[status] || status;
}

function getStatusColor(status: string): string {
  switch (status) {
    case "FULFILLED": return "bg-green-100 text-green-800";
    case "PAID": return "bg-green-100 text-green-800";
    case "UNFULFILLED": return "bg-yellow-100 text-yellow-800";
    case "PENDING": return "bg-yellow-100 text-yellow-800";
    case "REFUNDED": return "bg-red-100 text-red-800";
    default: return "bg-secondary text-muted-foreground";
  }
}

export default function Account() {
  const { user, loading: authLoading, logout } = useAuth();
  const navigate = useNavigate();
  const setBuyerEmail = useCartStore(state => state.setBuyerEmail);

  const [profile, setProfile] = useState<Profile | null>(null);
  const [orders, setOrders] = useState<ShopifyOrder[]>([]);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState<Profile>({
    full_name: "", phone: "", address_line1: "", address_line2: "",
    city: "", postal_code: "", province: "", country: "España",
  });

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login", { replace: true });
    }
  }, [user, authLoading, navigate]);

  // Set buyer email on cart for checkout pre-fill
  useEffect(() => {
    if (user?.email) {
      setBuyerEmail(user.email);
    }
  }, [user?.email, setBuyerEmail]);

  // Fetch profile
  useEffect(() => {
    if (!user) return;
    const fetchProfile = async () => {
      const { data } = await supabase
        .from("profiles")
        .select("full_name, phone, address_line1, address_line2, city, postal_code, province, country")
        .eq("user_id", user.id)
        .single();
      if (data) {
        setProfile(data);
        setEditData(data);
      }
      setLoadingProfile(false);
    };
    fetchProfile();
  }, [user]);

  // Fetch orders
  useEffect(() => {
    if (!user) return;
    const fetchOrders = async () => {
      try {
        const { data, error } = await supabase.functions.invoke("shopify-customer-orders");
        if (error) {
          console.error("Error fetching orders:", error);
        } else if (data?.orders) {
          setOrders(data.orders);
        }
      } catch (e) {
        console.error("Error fetching orders:", e);
      }
      setLoadingOrders(false);
    };
    fetchOrders();
  }, [user]);

  const handleSaveProfile = async () => {
    if (!user) return;
    setSavingProfile(true);
    const { error } = await supabase
      .from("profiles")
      .update(editData)
      .eq("user_id", user.id);
    if (error) {
      toast.error("Error al guardar el perfil");
    } else {
      setProfile(editData);
      setEditMode(false);
      toast.success("Perfil actualizado");
    }
    setSavingProfile(false);
  };

  const handleLogout = async () => {
    await logout();
    toast.success("Sesión cerrada");
    navigate("/");
  };

  if (authLoading) {
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

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead title="Mi Cuenta" description="Gestiona tu cuenta y consulta tus pedidos." noIndex />
      <Header />

      <main className="flex-1 py-12 px-4">
        <div className="container max-w-4xl">
          {/* Account Header */}
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="font-display text-3xl md:text-4xl">Mi Cuenta</h1>
              <p className="text-muted-foreground mt-1">{user.email}</p>
            </div>
            <Button variant="outline" onClick={handleLogout} className="gap-2">
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Cerrar Sesión</span>
            </Button>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Profile Section */}
            <div className="md:col-span-1 space-y-6">
              <div className="border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display text-xl flex items-center gap-2">
                    <User className="h-5 w-5" /> Perfil
                  </h2>
                  {!editMode && (
                    <Button variant="ghost" size="sm" onClick={() => setEditMode(true)}>
                      Editar
                    </Button>
                  )}
                </div>

                {loadingProfile ? (
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                ) : editMode ? (
                  <div className="space-y-3">
                    <div>
                      <Label className="text-xs">Nombre</Label>
                      <Input value={editData.full_name || ""} onChange={(e) => setEditData({ ...editData, full_name: e.target.value })} />
                    </div>
                    <div>
                      <Label className="text-xs">Teléfono</Label>
                      <Input value={editData.phone || ""} onChange={(e) => setEditData({ ...editData, phone: e.target.value })} />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleSaveProfile} disabled={savingProfile} size="sm" className="gap-1">
                        {savingProfile ? <Loader2 className="h-3 w-3 animate-spin" /> : <Save className="h-3 w-3" />}
                        Guardar
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => { setEditMode(false); setEditData(profile || editData); }}>
                        Cancelar
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 text-sm">
                    <p><strong>Nombre:</strong> {profile?.full_name || "—"}</p>
                    <p><strong>Teléfono:</strong> {profile?.phone || "—"}</p>
                  </div>
                )}
              </div>

              {/* Address Section */}
              <div className="border rounded-lg p-6">
                <h2 className="font-display text-xl flex items-center gap-2 mb-4">
                  <MapPin className="h-5 w-5" /> Dirección
                </h2>
                {loadingProfile ? (
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                ) : editMode ? (
                  <div className="space-y-3">
                    <div>
                      <Label className="text-xs">Dirección</Label>
                      <Input value={editData.address_line1 || ""} onChange={(e) => setEditData({ ...editData, address_line1: e.target.value })} />
                    </div>
                    <div>
                      <Label className="text-xs">Línea 2</Label>
                      <Input value={editData.address_line2 || ""} onChange={(e) => setEditData({ ...editData, address_line2: e.target.value })} />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label className="text-xs">Ciudad</Label>
                        <Input value={editData.city || ""} onChange={(e) => setEditData({ ...editData, city: e.target.value })} />
                      </div>
                      <div>
                        <Label className="text-xs">C.P.</Label>
                        <Input value={editData.postal_code || ""} onChange={(e) => setEditData({ ...editData, postal_code: e.target.value })} />
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs">Provincia</Label>
                      <Input value={editData.province || ""} onChange={(e) => setEditData({ ...editData, province: e.target.value })} />
                    </div>
                  </div>
                ) : (
                  <div className="text-sm">
                    {profile?.address_line1 ? (
                      <>
                        <p>{profile.address_line1}</p>
                        {profile.address_line2 && <p>{profile.address_line2}</p>}
                        <p>{profile.postal_code} {profile.city}</p>
                        <p>{profile.province}, {profile.country}</p>
                      </>
                    ) : (
                      <p className="text-muted-foreground">Sin dirección guardada</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Orders Section */}
            <div className="md:col-span-2">
              <div className="border rounded-lg p-6">
                <h2 className="font-display text-xl flex items-center gap-2 mb-6">
                  <Package className="h-5 w-5" /> Mis Pedidos
                </h2>

                {loadingOrders ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-2">Aún no tienes pedidos</p>
                    <p className="text-sm text-muted-foreground">Cuando realices tu primera compra, aparecerá aquí.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <p className="font-semibold">{order.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(order.createdAt).toLocaleDateString("es-ES", {
                                day: "numeric", month: "long", year: "numeric",
                              })}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">
                              {order.total ? formatPrice(order.total.amount, order.total.currencyCode) : "—"}
                            </p>
                            <div className="flex gap-1.5 mt-1 justify-end">
                              <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(order.financialStatus)}`}>
                                {getStatusLabel(order.financialStatus)}
                              </span>
                              <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(order.fulfillmentStatus)}`}>
                                {getStatusLabel(order.fulfillmentStatus)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          {order.lineItems.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                              {item.image?.url && (
                                <img
                                  src={item.image.url}
                                  alt={item.image.altText || item.title}
                                  className="w-12 h-12 rounded object-cover"
                                />
                              )}
                              <div className="flex-1 min-w-0">
                                <p className="text-sm truncate">{item.title}</p>
                                <p className="text-xs text-muted-foreground">x{item.quantity}</p>
                              </div>
                              {item.total && (
                                <p className="text-sm font-medium">{formatPrice(item.total.amount, item.total.currencyCode)}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
