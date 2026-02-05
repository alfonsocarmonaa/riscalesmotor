import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { toast } from "sonner";

export interface Favorite {
  id: string;
  product_id: string;
  product_handle: string;
  product_title: string;
  product_image: string | null;
  product_price: string | null;
  created_at: string;
}

export function useFavorites() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = useCallback(async () => {
    if (!user) {
      setFavorites([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("favorites")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setFavorites(data || []);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const addFavorite = useCallback(
    async (product: {
      id: string;
      handle: string;
      title: string;
      image?: string;
      price?: string;
    }) => {
      if (!user) {
        toast.error("Inicia sesión para guardar favoritos");
        return false;
      }

      try {
        const { error } = await supabase.from("favorites").insert({
          user_id: user.id,
          product_id: product.id,
          product_handle: product.handle,
          product_title: product.title,
          product_image: product.image || null,
          product_price: product.price || null,
        });

        if (error) {
          if (error.code === "23505") {
            toast.info("Este producto ya está en tus favoritos");
            return false;
          }
          throw error;
        }

        await fetchFavorites();
        toast.success("Añadido a favoritos ♥");
        return true;
      } catch (error) {
        console.error("Error adding favorite:", error);
        toast.error("Error al añadir a favoritos");
        return false;
      }
    },
    [user, fetchFavorites]
  );

  const removeFavorite = useCallback(
    async (productId: string) => {
      if (!user) return false;

      try {
        const { error } = await supabase
          .from("favorites")
          .delete()
          .eq("user_id", user.id)
          .eq("product_id", productId);

        if (error) throw error;

        await fetchFavorites();
        toast.success("Eliminado de favoritos");
        return true;
      } catch (error) {
        console.error("Error removing favorite:", error);
        toast.error("Error al eliminar de favoritos");
        return false;
      }
    },
    [user, fetchFavorites]
  );

  const isFavorite = useCallback(
    (productId: string) => {
      return favorites.some((fav) => fav.product_id === productId);
    },
    [favorites]
  );

  const toggleFavorite = useCallback(
    async (product: {
      id: string;
      handle: string;
      title: string;
      image?: string;
      price?: string;
    }) => {
      if (isFavorite(product.id)) {
        return removeFavorite(product.id);
      } else {
        return addFavorite(product);
      }
    },
    [isFavorite, addFavorite, removeFavorite]
  );

  return {
    favorites,
    loading,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
    refetch: fetchFavorites,
  };
}
