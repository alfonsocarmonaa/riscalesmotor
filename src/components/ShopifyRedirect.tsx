import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SHOPIFY_STORE_PERMANENT_DOMAIN = "3hxjb2-ht.myshopify.com";

/**
 * Intercepts Shopify checkout/cart paths that land on our domain
 * (because Shopify redirects to the custom domain) and sends the
 * user to the Shopify permanent domain instead.
 *
 * Includes anti-loop protection: if `ref=lovable` is already present
 * in the query string, we skip the redirect to break infinite loops.
 */
export const ShopifyRedirect = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    const params = new URLSearchParams(location.search);

    // Anti-loop: if we already redirected once, don't do it again
    if (params.get("ref") === "lovable") return;

    // Match Shopify checkout and cart paths
    const isShopifyPath =
      path.startsWith("/checkouts/") ||
      path.startsWith("/cart/") ||
      path.startsWith("/orders/") ||
      (path.startsWith("/account/") && path.includes("orders"));

    if (isShopifyPath) {
      params.set("ref", "lovable");
      const shopifyUrl = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}${path}?${params.toString()}`;
      window.location.replace(shopifyUrl);
    }
  }, [location]);

  return null;
};
