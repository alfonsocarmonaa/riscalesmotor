import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SHOPIFY_STORE_PERMANENT_DOMAIN = "3hxjb2-ht.myshopify.com";

/**
 * Full-page redirect component rendered as a <Route element>.
 *
 * Handles two categories of paths:
 *
 * 1. ACCOUNT paths (/account/*):
 *    Shopify checkout's "Iniciar sesión" link points to /account/login on the
 *    custom domain. Since our users authenticate via Lovable Cloud (not Shopify
 *    native accounts), we redirect these to OUR internal pages:
 *      /account/login    → /login
 *      /account/register → /registro
 *      /account/*        → /cuenta
 *
 * 2. CHECKOUT / CART / ORDER paths:
 *    These are forwarded to Shopify's permanent domain preserving path + query.
 */
export const ShopifyRedirect = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const path = location.pathname;
    const search = location.search;

    // ── ACCOUNT ROUTES → redirect to our internal pages ──
    if (path.startsWith("/account")) {
      if (path.startsWith("/account/login")) {
        navigate("/login", { replace: true });
      } else if (path.startsWith("/account/register")) {
        navigate("/registro", { replace: true });
      } else {
        navigate("/cuenta", { replace: true });
      }
      return;
    }

    // ── SHOPIFY ROUTES (checkout, cart, orders) → forward to Shopify ──
    const params = new URLSearchParams(search);

    // Anti-loop: if we already redirected once, go home
    if (params.get("ref") === "lovable") {
      navigate("/", { replace: true });
      return;
    }

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
