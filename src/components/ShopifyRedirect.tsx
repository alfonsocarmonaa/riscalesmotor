import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SHOPIFY_STORE_PERMANENT_DOMAIN = "3hxjb2-ht.myshopify.com";

/**
 * Intercepts Shopify checkout/cart/account paths that land on our domain
 * (because Shopify redirects to the custom domain) and sends the
 * user to the Shopify permanent domain or back to the landing page.
 */
export const ShopifyRedirect = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const path = location.pathname;
    const params = new URLSearchParams(location.search);

    // Anti-loop: if we already redirected once, don't do it again
    if (params.get("ref") === "lovable") return;

    // Shopify checkout/cart/orders paths → redirect to Shopify
    const isShopifyCheckoutPath =
      path.startsWith("/checkouts/") ||
      path.startsWith("/cart/") ||
      path.startsWith("/orders/");

    if (isShopifyCheckoutPath) {
      params.set("ref", "lovable");
      const shopifyUrl = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}${path}?${params.toString()}`;
      window.location.replace(shopifyUrl);
      return;
    }

    // Shopify account paths (login, logout, register, reset, activate, etc.)
    // → redirect to landing page instead of showing 404
    const isShopifyAccountPath =
      path.startsWith("/account/") ||
      path === "/account";

    // Exclude our own known account routes
    const isOurRoute =
      path === "/cuenta" ||
      path === "/login" ||
      path === "/registro" ||
      path === "/favoritos";

    if (isShopifyAccountPath && !isOurRoute) {
      navigate("/", { replace: true });
      return;
    }
  }, [location, navigate]);

  return null;
};
