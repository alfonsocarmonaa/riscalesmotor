import { useEffect, useRef } from 'react';
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
  const emailSyncedRef = useRef(false);

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
    if (!cartId) {
      emailSyncedRef.current = false;
      return;
    }
    if (emailSyncedRef.current) return;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user?.email && !emailSyncedRef.current) {
        emailSyncedRef.current = true;
        setBuyerEmail(session.user.email);
      }
    });
  }, [cartId, setBuyerEmail]);
}
