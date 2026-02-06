import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SHOPIFY_STORE_PERMANENT_DOMAIN = "3hxjb2-ht.myshopify.com";

/**
 * Full-page redirect component rendered as a <Route element>.
 *
 * Handles Shopify paths that land on our domain when Shopify redirects
 * back to the custom domain (e.g. after checkout, account actions).
 *
 * - /checkouts/*, /cart/*, /orders/* → Shopify permanent domain
 * - /account/* → home
 *
 * Because this is a Route element (not a side-effect), it renders a
 * loading spinner INSTEAD of the 404 page — eliminating the flash.
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

    // --- Checkout / cart / order paths → Shopify permanent domain ---
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

    // --- Auth / Account paths → home ---
    if (path.startsWith("/account")) {
      navigate("/", { replace: true });
      return;
    }

    // Fallback — shouldn't happen, but just go home
    navigate("/", { replace: true });
  }, [location, navigate]);

  // Show a simple loading state while the redirect is in flight
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-muted-foreground text-sm">Redirigiendo...</p>
      </div>
    </div>
  );
};
