
# Plan: Integración de Multi-idioma y Multi-moneda

## Alcance

Implementar un sistema completo de internacionalización que permita:
- Cambiar entre español e inglés (expandible a más idiomas)
- Mostrar precios en la moneda local del usuario
- Productos traducidos desde Shopify
- UI traducida con un selector de idioma/país

---

## Fase 1: Infraestructura de Localización

### 1.1 Store de Localización (Zustand)
Crear `src/stores/localeStore.ts`:
- Estado persistido: `country` (ES, US, GB, DE...) y `language` (ES, EN)
- Detectar ubicación inicial del usuario (o usar ES por defecto)
- Métodos para cambiar país/idioma

### 1.2 Contexto de Localización
- Wrapper provider que inyecte el locale en toda la app
- Hook `useLocale()` para acceder al idioma/país actual

---

## Fase 2: Integración con Shopify API

### 2.1 Actualizar consultas GraphQL
Modificar `src/lib/shopify.ts`:

```graphql
query GetProducts($first: Int!, $query: String) @inContext(country: $country, language: $language) {
  products(first: $first, query: $query) {
    edges {
      node {
        title           # Traducido automáticamente
        description     # Traducido automáticamente
        priceRange {
          minVariantPrice {
            amount       # Precio localizado
            currencyCode # Moneda del país
          }
        }
        ...
      }
    }
  }
}
```

### 2.2 Query de localizaciones disponibles
Añadir query para obtener países/idiomas activos en la tienda:

```graphql
query Localization @inContext(language: ES) {
  localization {
    availableCountries {
      isoCode
      name
      currency { isoCode symbol }
      availableLanguages { isoCode endonymName }
    }
    country { isoCode name currency { isoCode } }
    language { isoCode endonymName }
  }
}
```

### 2.3 Actualizar funciones de productos
- `fetchProducts()` y `fetchProductByHandle()` recibirán `country` y `language` como parámetros
- El hook `useProducts()` leerá del store de localización

---

## Fase 3: Traducciones del Frontend (i18n)

### 3.1 Instalar react-i18next
```bash
npm install i18next react-i18next
```

### 3.2 Crear archivos de traducción
```
src/locales/
├── es/
│   └── translation.json   # Español (idioma base)
└── en/
    └── translation.json   # Inglés
```

### 3.3 Contenido a traducir
- Navegación (Inicio, Camisetas, Sobre Riscales...)
- Botones (Añadir al carrito, Comprar, Finalizar compra...)
- Footer completo
- Mensajes de toast
- Páginas estáticas (Envíos, Devoluciones, Sobre Nosotros...)

### 3.4 Configuración i18next
Crear `src/i18n.ts`:
- Detección automática de idioma del navegador
- Fallback a español
- Namespace para separar por secciones

---

## Fase 4: Selector de País/Idioma

### 4.1 Componente LocaleSelector
Ubicación: Header (desktop) y menú móvil
- Dropdown con bandera + idioma actual
- Al cambiar: actualiza store → recarga productos con nuevo contexto

### 4.2 Diseño visual
```
[🇪🇸 ES / EUR ▼]
  ├── 🇪🇸 España (EUR)
  ├── 🇬🇧 UK (GBP)
  ├── 🇺🇸 USA (USD)
  └── 🇩🇪 Germany (EUR)
```

---

## Fase 5: Actualización del Carrito

### 5.1 Crear carrito con contexto
Modificar `createShopifyCart()`:

```graphql
mutation cartCreate($input: CartInput!) @inContext(country: $country, language: $language) {
  cartCreate(input: $input) {
    cart {
      checkoutUrl  # URL ya localizada
      ...
    }
  }
}
```

### 5.2 Checkout localizado
El `checkoutUrl` que devuelve Shopify ya estará en el idioma/moneda correctos.

---

## Archivos a crear/modificar

| Archivo | Acción |
|---------|--------|
| `src/stores/localeStore.ts` | **Crear** - Store de localización |
| `src/i18n.ts` | **Crear** - Config i18next |
| `src/locales/es/translation.json` | **Crear** - Traducciones ES |
| `src/locales/en/translation.json` | **Crear** - Traducciones EN |
| `src/lib/shopify.ts` | **Modificar** - Añadir @inContext a queries |
| `src/hooks/useProducts.ts` | **Modificar** - Leer locale del store |
| `src/components/LocaleSelector.tsx` | **Crear** - Selector de país/idioma |
| `src/components/layout/Header.tsx` | **Modificar** - Añadir LocaleSelector |
| `src/App.tsx` | **Modificar** - Envolver con I18nextProvider |
| Todos los componentes con texto | **Modificar** - Usar `t('key')` |

---

## Dependencias de Shopify

Para que esto funcione necesitas:

1. **Shopify Markets configurado**: Admin → Settings → Markets
2. **Países habilitados**: España + otros países a los que vendas
3. **Traducciones de productos**: Admin → Products → editar traducciones (o usar app como Langify/Weglot)

Si no tienes traducciones en Shopify, los productos se mostrarán en el idioma original pero los precios sí cambiarán según el país.

---

## Consideraciones técnicas

- La primera carga detectará el país por IP o usará España por defecto
- El locale se persiste en localStorage para recordar preferencia
- Los hooks de productos se invalidan automáticamente al cambiar locale
- El carrito se resetea si cambia la moneda (comportamiento estándar de Shopify)

---

## Estimación

Esta implementación requiere cambios significativos en toda la aplicación. Es un proyecto de varias sesiones de trabajo.

¿Quieres que empiece por alguna fase específica o prefieres priorizar solo multi-moneda (más sencillo) o solo multi-idioma?
