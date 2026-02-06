import { useEffect } from 'react';
import { useCartStore } from '@/stores/cartStore';
import { supabase } from '@/integrations/supabase/client';

/**
 * Syncs the Shopify cart on page load and tab focus.
 * Also auto-sets the buyer email when a Supabase user is logged in
 * so the customer arrives identified at Shopify checkout.
 */
export function useCartSync() {
  const syncCart = useCartStore(state => state.syncCart);
  const setBuyerEmail = useCartStore(state => state.setBuyerEmail);
  const cartId = useCartStore(state => state.cartId);

  // Cart freshness sync
  useEffect(() => {
    syncCart();

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') syncCart();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [syncCart]);

  // Auto-set buyer email when user is authenticated and cart exists
  useEffect(() => {
    if (!cartId) return;

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user?.email) {
          setBuyerEmail(session.user.email);
        }
      }
    );

    // Also check current session immediately
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user?.email) {
        setBuyerEmail(session.user.email);
      }
    });

    return () => subscription.unsubscribe();
  }, [cartId, setBuyerEmail]);
}
