import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "sonner";

export interface WishlistItem {
  productId: string;
  handle: string;
  title: string;
  image?: string;
  price?: string;
  currencyCode?: string;
  addedAt: string;
}

interface WishlistStore {
  items: WishlistItem[];
  addItem: (item: Omit<WishlistItem, "addedAt">) => void;
  removeItem: (productId: string) => void;
  toggleItem: (item: Omit<WishlistItem, "addedAt">) => void;
  isFavorite: (productId: string) => boolean;
  clearAll: () => void;
}

export const useWishlist = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const { items } = get();
        if (items.some((i) => i.productId === item.productId)) {
          toast.info("Ya está en tus favoritos");
          return;
        }
        set({ items: [...items, { ...item, addedAt: new Date().toISOString() }] });
        toast.success("Añadido a favoritos ♥");
      },

      removeItem: (productId) => {
        set({ items: get().items.filter((i) => i.productId !== productId) });
        toast.success("Eliminado de favoritos");
      },

      toggleItem: (item) => {
        const { isFavorite, addItem, removeItem } = get();
        if (isFavorite(item.productId)) {
          removeItem(item.productId);
        } else {
          addItem(item);
        }
      },

      isFavorite: (productId) => {
        return get().items.some((i) => i.productId === productId);
      },

      clearAll: () => set({ items: [] }),
    }),
    {
      name: "riscales-wishlist",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
