import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SHOPIFY_STORE_PERMANENT_DOMAIN = "3hxjb2-ht.myshopify.com";

/**
 * Full-page redirect component rendered as a <Route element>.
 *
 * Handles Shopify paths that land on our domain when Shopify redirects
 * back to the custom domain (e.g. after checkout, account actions).
 *
 * - /checkouts/*, /cart/*, /orders/* → Shopify permanent domain (same path)
 * - /account/*                      → Shopify permanent domain (same path)
 *     This is critical: Shopify checkout's "Iniciar sesión" link points to
 *     /account/login on the custom domain. We must forward it to Shopify's
 *     native account login, NOT to our home page.
 *
 * Because this is a Route element (not a side-effect), it renders a
 * loading spinner INSTEAD of the 404 page — eliminating the flash.
 */
export const ShopifyRedirect = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const path = location.pathname;
    const search = location.search;

    // Anti-loop: if we already redirected once, go home
    const params = new URLSearchParams(search);
    if (params.get("ref") === "lovable") {
      navigate("/", { replace: true });
      return;
    }

    // All Shopify paths get forwarded to the permanent domain
    // preserving the original path and query string.
    params.set("ref", "lovable");
    const shopifyUrl = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}${path}?${params.toString()}`;
    window.location.replace(shopifyUrl);
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
