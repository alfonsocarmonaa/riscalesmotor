import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SHOPIFY_STORE_PERMANENT_DOMAIN = "3hxjb2-ht.myshopify.com";
const SHOPIFY_ACCOUNT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/account`;

/**
 * Unified redirect handler for all Shopify-related paths that land on our domain.
 * 
 * Architecture:
 * - Our React app runs on riscalesmotor.com / lovable.app
 * - Shopify store runs on 3hxjb2-ht.myshopify.com
 * - When Shopify redirects back to the custom domain, we intercept and route correctly
 * 
 * Handled paths:
 * - /checkouts/*, /cart/*, /orders/* → Shopify permanent domain (checkout flow)
 * - /account/*, /login, /registro, /cuenta → Shopify account or home (auth flow)
 */
export const ShopifyRedirect = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const path = location.pathname;
    const params = new URLSearchParams(location.search);

    // Anti-loop: if we already redirected once, go home
    if (params.get("ref") === "lovable") {
      navigate("/", { replace: true });
      return;
    }

    // --- Checkout paths → Shopify permanent domain ---
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

    // --- Auth/Account paths → redirect to home ---
    // These paths arrive when Shopify redirects back after login/logout/register
    // or when the user navigates to old internal auth routes
    const isAuthPath =
      path.startsWith("/account") ||
      path === "/login" ||
      path === "/registro" ||
      path === "/cuenta";

    // Don't intercept our own app routes
    const isOwnRoute = path === "/favoritos";

    if (isAuthPath && !isOwnRoute) {
      navigate("/", { replace: true });
      return;
    }
  }, [location, navigate]);

  return null;
};
