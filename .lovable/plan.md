
# Plan: Arreglar el Checkout de Shopify

## El Problema Real

Shopify tiene `riscalesmotor.com` configurado como dominio principal. Cada vez que alguien intenta hacer checkout, Shopify genera URLs que apuntan a `riscalesmotor.com`. Pero como ese dominio apunta a Lovable (tu web), el checkout nunca llega a Shopify. Se crea un bucle infinito de redirecciones.

## La Solucion (2 pasos)

### Paso 1: Quitar `riscalesmotor.com` de Shopify (accion manual tuya, 2 minutos)

1. Ve a [Shopify Admin > Dominios](https://admin.shopify.com/store/3hxjb2-ht/settings/domains)
2. En `riscalesmotor.com`, haz clic en "Eliminar" o "Remove"
3. Confirma la eliminacion

**Esto NO afecta a tu web.** Tu web sigue funcionando en `riscalesmotor.com` porque los DNS apuntan a Lovable. Lo unico que cambia es que Shopify deja de intentar usar ese dominio para el checkout.

Resultado: Shopify generara URLs de checkout en `3hxjb2-ht.myshopify.com` y el checkout funcionara sin bucles.

### Paso 2: Corregir bugs en el codigo (lo hago yo)

Hay dos bugs en el codigo que tambien necesitan arreglarse:

**Bug 1 - `formatCheckoutUrl` demasiado agresiva:**
La funcion reemplaza CUALQUIER hostname con el dominio permanente de Shopify. Si Shopify devuelve una URL en `checkout.shopify.com` (formato moderno), la funcion la rompe. La correccion: solo reemplazar el hostname si es `riscalesmotor.com`.

**Bug 2 - Cart corrupto en localStorage:**
El carrito guardado en el navegador tiene URLs antiguas y datos de sesiones rotas. Al corregir el codigo, se limpiara automaticamente al detectar un cart invalido.

## Cambios Tecnicos

### Archivo: `src/lib/shopify.ts`

Modificar `formatCheckoutUrl` para que solo reemplace el hostname cuando sea el dominio personalizado (el que causa el conflicto), no cualquier dominio:

```text
Antes:
  if (url.hostname !== SHOPIFY_STORE_PERMANENT_DOMAIN) {
    url.hostname = SHOPIFY_STORE_PERMANENT_DOMAIN;
  }

Despues:
  const CUSTOM_DOMAIN = 'riscalesmotor.com';
  if (url.hostname === CUSTOM_DOMAIN || url.hostname === 'www.riscalesmotor.com') {
    url.hostname = SHOPIFY_STORE_PERMANENT_DOMAIN;
  }
```

### Archivo: `src/components/ShopifyRedirect.tsx`

Actualizar el dominio a `3hxjb2-ht.myshopify.com` (confirmado como el dominio permanente real) y agregar proteccion anti-bucle:

- Agregar un parametro `?ref=lovable` al redirigir
- Si ese parametro ya esta presente, NO redirigir (rompe el bucle)
- Esto es una red de seguridad, no la solucion principal

### Archivo: `src/stores/cartStore.ts`

Agregar validacion en `syncCart` para limpiar carritos con URLs invalidas (que apunten a `riscalesmotor.com`).

## Resumen

| Accion | Quien | Resultado |
|---|---|---|
| Quitar `riscalesmotor.com` de Shopify Domains | Tu (2 min) | Shopify deja de redirigir al dominio equivocado |
| Corregir `formatCheckoutUrl` | Yo | URLs de checkout correctas |
| Proteccion anti-bucle en ShopifyRedirect | Yo | Red de seguridad contra loops |
| Limpiar cart corrupto | Yo | Sesiones de carrito limpias |

Tu web sigue en `riscalesmotor.com`. El checkout se abre en pestaña nueva en `3hxjb2-ht.myshopify.com`. El usuario ni lo nota porque es el flujo estandar de cualquier tienda headless con Shopify.
