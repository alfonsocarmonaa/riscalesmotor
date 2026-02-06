import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

/**
 * Creates a Shopify customer record via the Admin API edge function.
 * Called on login/register to ensure the customer exists natively in Shopify.
 * Non-blocking — errors are logged but don't affect the auth flow.
 */
async function ensureShopifyCustomer(fullName?: string) {
  try {
    await supabase.functions.invoke("shopify-create-customer", {
      body: { fullName: fullName || "" },
    });
  } catch (e) {
    console.warn("Shopify customer sync (non-blocking):", e);
  }
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const shopifySyncedRef = useRef(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);

        // Ensure Shopify customer exists when user signs in
        if (session?.user && !shopifySyncedRef.current) {
          shopifySyncedRef.current = true;
          const name = session.user.user_metadata?.full_name || "";
          ensureShopifyCustomer(name);
        }
        if (!session?.user) {
          shopifySyncedRef.current = false;
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);

      if (session?.user && !shopifySyncedRef.current) {
        shopifySyncedRef.current = true;
        const name = session.user.user_metadata?.full_name || "";
        ensureShopifyCustomer(name);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      const msg =
        error.message === "Invalid login credentials"
          ? "Email o contraseña incorrectos"
          : error.message === "Email not confirmed"
          ? "Debes verificar tu email antes de iniciar sesión"
          : error.message;
      return { error: msg };
    }
    return {};
  }, []);

  const register = useCallback(async (email: string, password: string, fullName: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
        data: { full_name: fullName },
      },
    });
    if (error) {
      const msg =
        error.message.includes("already registered")
          ? "Este email ya está registrado"
          : error.message.includes("Password should be")
          ? "La contraseña debe tener al menos 6 caracteres"
          : error.message;
      return { error: msg };
    }
    return {};
  }, []);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  return { user, loading, login, register, logout };
}
