/**
 * Analytics module – handles GA4 events, Meta Pixel, and UTM tracking.
 *
 * GA4 ID: G-7ZNHBTFH4B (loaded in index.html)
 * Meta Pixel: set META_PIXEL_ID below when ready.
 *
 * All tracking respects cookie consent stored in localStorage
 * under the key `riscales-cookie-consent`.
 */

// ─── Configuration ───────────────────────────────────────────────
const GA4_ID = 'G-7ZNHBTFH4B';
const META_PIXEL_ID = ''; // TODO: Add your Meta Pixel ID here
const UTM_STORAGE_KEY = 'riscales-utm-params';
const COOKIE_CONSENT_KEY = 'riscales-cookie-consent';

// ─── Types ───────────────────────────────────────────────────────
interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
}

interface ProductEventData {
  id: string;
  name: string;
  price: string;
  currency: string;
  variant?: string;
  category?: string;
  quantity?: number;
}

// ─── Consent helpers ─────────────────────────────────────────────
export function getCookieConsent(): CookiePreferences | null {
  try {
    const raw = localStorage.getItem(COOKIE_CONSENT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function hasAnalyticsConsent(): boolean {
  return getCookieConsent()?.analytics === true;
}

function hasMarketingConsent(): boolean {
  return getCookieConsent()?.marketing === true;
}

// ─── GA4 helpers ─────────────────────────────────────────────────
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
    fbq: (...args: unknown[]) => void;
    _fbq: (...args: unknown[]) => void;
  }
}

function gtag(...args: unknown[]) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag(...args);
  }
}

/**
 * Initialise (or re-initialise) GA4 after the user grants consent.
 * Safe to call multiple times – gtag handles deduplication.
 */
export function initGA4() {
  if (!hasAnalyticsConsent()) return;
  gtag('js', new Date());
  gtag('config', GA4_ID, {
    linker: {
      domains: ['3hxjb2-ht.myshopify.com'],
      accept_incoming: true,
    },
  });
}

/** Disable GA4 tracking (on consent revoke). */
export function disableGA4() {
  // Setting the window property tells gtag.js to stop collecting
  (window as Record<string, unknown>)[`ga-disable-${GA4_ID}`] = true;
}

// ─── Meta Pixel helpers ──────────────────────────────────────────
let metaPixelLoaded = false;

/** Load the Meta Pixel script and initialise it. */
export function initMetaPixel() {
  if (!META_PIXEL_ID || !hasMarketingConsent() || metaPixelLoaded) return;

  // Standard Meta Pixel snippet (minified)
  /* eslint-disable */
  (function (f: Window, b: Document, e: string, v: string) {
    const n: any = (f.fbq = function (...args: unknown[]) {
      n.callMethod ? n.callMethod(...args) : n.queue.push(args);
    });
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = '2.0';
    n.queue = [];
    const t = b.createElement(e) as HTMLScriptElement;
    t.async = true;
    t.src = v;
    const s = b.getElementsByTagName(e)[0];
    s?.parentNode?.insertBefore(t, s);
  })(
    window as any,
    document,
    'script',
    'https://connect.facebook.net/en_US/fbevents.js'
  );
  /* eslint-enable */

  window.fbq('init', META_PIXEL_ID);
  window.fbq('track', 'PageView');
  metaPixelLoaded = true;
}

/** Fire a Meta Pixel event if consent is given and pixel is loaded. */
function fbEvent(eventName: string, data?: Record<string, unknown>) {
  if (!hasMarketingConsent() || !metaPixelLoaded || typeof window.fbq !== 'function') return;
  if (data) {
    window.fbq('track', eventName, data);
  } else {
    window.fbq('track', eventName);
  }
}

// ─── UTM parameter capture ──────────────────────────────────────
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const;

/**
 * Call once on app mount.  Captures UTM params from the URL and
 * persists them to sessionStorage so they survive internal navigation.
 */
export function captureUTMParams() {
  const params = new URLSearchParams(window.location.search);
  const utms: Record<string, string> = {};
  let hasAny = false;

  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) {
      utms[key] = value;
      hasAny = true;
    }
  }

  // Only overwrite if the current page actually has UTMs
  if (hasAny) {
    sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utms));
  }
}

/** Retrieve stored UTM params (empty object if none). */
export function getStoredUTMs(): Record<string, string> {
  try {
    const raw = sessionStorage.getItem(UTM_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

// ─── Checkout URL enrichment ─────────────────────────────────────
/**
 * Append UTM params and GA client-id to a checkout URL so that
 * attribution carries over to the Shopify domain.
 */
export function enrichCheckoutUrl(checkoutUrl: string): string {
  try {
    const url = new URL(checkoutUrl);

    // Forward UTM params
    const utms = getStoredUTMs();
    for (const [key, value] of Object.entries(utms)) {
      url.searchParams.set(key, value);
    }

    // Forward GA4 client ID for cross-domain linking
    const gaCookie = document.cookie
      .split('; ')
      .find(c => c.startsWith('_ga='));
    if (gaCookie) {
      // _ga cookie format: GA1.1.XXXXXXXXXX.XXXXXXXXXX
      const clientId = gaCookie.split('=').slice(1).join('=');
      url.searchParams.set('_ga', clientId);
    }

    return url.toString();
  } catch {
    return checkoutUrl;
  }
}

// ─── Tracking events ─────────────────────────────────────────────

/** Track product detail view. */
export function trackViewProduct(product: ProductEventData) {
  if (hasAnalyticsConsent()) {
    gtag('event', 'view_item', {
      currency: product.currency,
      value: parseFloat(product.price),
      items: [{
        item_id: product.id,
        item_name: product.name,
        item_variant: product.variant,
        item_category: product.category || 'Camisetas',
        price: parseFloat(product.price),
      }],
    });
  }

  fbEvent('ViewContent', {
    content_name: product.name,
    content_ids: [product.id],
    content_type: 'product',
    value: parseFloat(product.price),
    currency: product.currency,
  });
}

/** Track add to cart. */
export function trackAddToCart(product: ProductEventData) {
  const qty = product.quantity || 1;

  if (hasAnalyticsConsent()) {
    gtag('event', 'add_to_cart', {
      currency: product.currency,
      value: parseFloat(product.price) * qty,
      items: [{
        item_id: product.id,
        item_name: product.name,
        item_variant: product.variant,
        item_category: product.category || 'Camisetas',
        price: parseFloat(product.price),
        quantity: qty,
      }],
    });
  }

  fbEvent('AddToCart', {
    content_name: product.name,
    content_ids: [product.id],
    content_type: 'product',
    value: parseFloat(product.price) * qty,
    currency: product.currency,
  });
}

/** Track begin checkout. */
export function trackBeginCheckout(items: Array<{ name: string; id: string; price: string; quantity: number; currency: string }>) {
  const totalValue = items.reduce((sum, i) => sum + parseFloat(i.price) * i.quantity, 0);
  const currency = items[0]?.currency || 'EUR';

  if (hasAnalyticsConsent()) {
    gtag('event', 'begin_checkout', {
      currency,
      value: totalValue,
      items: items.map(i => ({
        item_id: i.id,
        item_name: i.name,
        price: parseFloat(i.price),
        quantity: i.quantity,
      })),
    });
  }

  fbEvent('InitiateCheckout', {
    content_ids: items.map(i => i.id),
    content_type: 'product',
    num_items: items.reduce((sum, i) => sum + i.quantity, 0),
    value: totalValue,
    currency,
  });
}

/** Track page view (for SPA navigation). */
export function trackPageView(path: string) {
  if (hasAnalyticsConsent()) {
    gtag('event', 'page_view', {
      page_path: path,
      page_location: window.location.href,
    });
  }

  // Meta Pixel tracks PageView automatically on init
}

// ─── Master init (call once on app mount) ────────────────────────
export function initAnalytics() {
  captureUTMParams();

  const consent = getCookieConsent();
  if (consent?.analytics) initGA4();
  if (consent?.marketing) initMetaPixel();
}

/**
 * Called when the user updates their cookie preferences.
 * Re-initialises or disables trackers accordingly.
 */
export function onConsentChange() {
  const consent = getCookieConsent();

  if (consent?.analytics) {
    // Remove the disable flag (if set previously)
    delete (window as Record<string, unknown>)[`ga-disable-${GA4_ID}`];
    initGA4();
  } else {
    disableGA4();
  }

  if (consent?.marketing) {
    initMetaPixel();
  }
  // Note: once Meta Pixel is loaded it can't be "unloaded" –
  // but fbEvent() checks consent before firing any events.
}
