
# Plan: Tracking y Checkout de Shopify – Estado Actual

## ✅ COMPLETADO (Código)

### Checkout
- `formatCheckoutUrl` corregida: solo reescribe hostname si es `riscalesmotor.com`
- `ShopifyRedirect` con protección anti-bucle (`ref=lovable`)
- Limpieza automática de carritos corruptos en `syncCart`

### Tracking (Google Analytics GA4)
- Cross-domain linker configurado para `3hxjb2-ht.myshopify.com`
- Eventos GA4: `view_item`, `add_to_cart`, `begin_checkout`, `page_view`
- UTMs capturados al llegar y reenviados en la URL de checkout
- GA4 client ID (`_ga`) reenviado en la URL de checkout
- Todo respeta el consentimiento de cookies

### Tracking (Meta Pixel)
- Infraestructura lista: `ViewContent`, `AddToCart`, `InitiateCheckout`
- **Pendiente**: Añadir el Pixel ID en `src/lib/analytics.ts` línea 4 (`META_PIXEL_ID`)
- Respeta el consentimiento de cookies de marketing

## ⚠️ PENDIENTE (Configuración manual – 15 minutos total)

### 1. Quitar `riscalesmotor.com` de Shopify Domains (CRÍTICO)

1. Ve a https://admin.shopify.com/store/3hxjb2-ht/settings/domains
2. En `riscalesmotor.com`, haz clic en "Eliminar" / "Remove"
3. Confirma

> Tu web NO se ve afectada. Solo evita que Shopify use ese dominio para checkout.

### 2. Añadir GA4 en Shopify (para tracking de compras)

1. Ve a https://admin.shopify.com/store/3hxjb2-ht/settings/customer_events
2. Haz clic en "Add custom pixel" (o "Añadir pixel personalizado")
3. Nombre: `Google Analytics 4`
4. Pega este código:

```javascript
// GA4 Tracking for Shopify Checkout
const GA4_ID = 'G-7ZNHBTFH4B';

const script = document.createElement('script');
script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
script.async = true;
document.head.appendChild(script);

script.onload = function() {
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', GA4_ID, {
    linker: { accept_incoming: true }
  });

  analytics.subscribe('checkout_completed', (event) => {
    const checkout = event.data.checkout;
    gtag('event', 'purchase', {
      transaction_id: checkout.order?.id || checkout.token,
      value: parseFloat(checkout.totalPrice?.amount || 0),
      currency: checkout.currencyCode,
      items: checkout.lineItems.map(item => ({
        item_name: item.title,
        item_variant: item.variant?.title,
        price: parseFloat(item.variant?.price?.amount || 0),
        quantity: item.quantity
      }))
    });
  });
};
```

5. Haz clic en "Save" y luego "Connect"

### 3. Configurar cross-domain en GA4 Admin

1. Ve a https://analytics.google.com
2. Admin (⚙️) → Data Streams → tu stream web
3. Configure tag settings → Configure your domains
4. Añade: `3hxjb2-ht.myshopify.com`
5. Guarda

### 4. Meta Pixel (cuando lo tengas)

1. Crea un Pixel en https://business.facebook.com/events_manager
2. Copia el Pixel ID (número tipo `123456789012345`)
3. Abre `src/lib/analytics.ts` y pon el ID en la línea 4:
   ```
   const META_PIXEL_ID = 'TU_PIXEL_ID';
   ```
4. En Shopify Admin: Canales de venta → Facebook & Instagram → Instalar
   (esto trackea `Purchase` automáticamente desde el checkout)
