import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SHOPIFY_STORE_PERMANENT_DOMAIN = "3hxjb2-ht.myshopify.com";

/**
 * Intercepts Shopify checkout/cart paths that land on our domain
 * (because Shopify redirects to the custom domain) and sends the
 * user to the Shopify permanent domain instead.
 */
export const ShopifyRedirect = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    // Match Shopify checkout and cart paths
    if (
      path.startsWith("/checkouts/") ||
      path.startsWith("/cart/") ||
      path.startsWith("/orders/") ||
      path.startsWith("/account/") && path.includes("orders")
    ) {
      const shopifyUrl = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}${path}${location.search}`;
      window.location.replace(shopifyUrl);
    }
  }, [location]);

  return null;
};
