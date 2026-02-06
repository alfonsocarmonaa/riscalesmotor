
# Plan: Integración de Multi-idioma y Multi-moneda ✅ COMPLETADO

## Estado: Implementado

Todas las fases han sido implementadas:

---

## ✅ Fase 1: Infraestructura de Localización

### 1.1 Store de Localización (Zustand)
- Creado `src/stores/localeStore.ts`
- Estado persistido: `country` (ES, US, GB, DE, FR, IT, PT) y `language` (ES, EN)
- Hook `useLocale()` para acceder al idioma/país actual

---

## ✅ Fase 2: Integración con Shopify API

### 2.1 Queries GraphQL actualizadas
Modificado `src/lib/shopify.ts`:
- Añadido `@inContext(country: $country, language: $language)` a todas las queries
- `fetchProducts()` y `fetchProductByHandle()` ahora aceptan locale context

### 2.2 Hooks actualizados
- `useProducts()` lee automáticamente del store de localización
- Las queries incluyen country/language en queryKey para refetch automático

---

## ✅ Fase 3: Traducciones del Frontend (i18n)

### 3.1 Instalado i18next + react-i18next
### 3.2 Archivos de traducción creados
- `src/locales/es/translation.json` (Español completo)
- `src/locales/en/translation.json` (Inglés completo)

### 3.3 Contenido traducido
- Navegación 
- Botones
- Footer
- Carrito
- Mensajes toast
- Componentes de producto

---

## ✅ Fase 4: Selector de País/Idioma

### 4.1 Componente LocaleSelector
- Creado `src/components/LocaleSelector.tsx`
- Integrado en Header (desktop y mobile)
- Dropdown con bandera + moneda

### 4.2 Diseño visual
```
[🇪🇸 ES / EUR ▼]
  ├── 🇪🇸 España (EUR)
  ├── 🇺🇸 USA (USD)
  ├── 🇬🇧 UK (GBP)
  └── 🇩🇪 Germany (EUR)
  └── 🇫🇷 France (EUR)
  └── 🇮🇹 Italia (EUR)
  └── 🇵🇹 Portugal (EUR)
```

---

## ✅ Fase 5: Actualización del Carrito

### 5.1 Carrito traducido
- `CartDrawer.tsx` usa traducciones
- Muestra moneda según país seleccionado

---

## Archivos creados/modificados

| Archivo | Estado |
|---------|--------|
| `src/stores/localeStore.ts` | ✅ Creado |
| `src/i18n.ts` | ✅ Creado |
| `src/locales/es/translation.json` | ✅ Creado |
| `src/locales/en/translation.json` | ✅ Creado |
| `src/lib/shopify.ts` | ✅ Modificado |
| `src/hooks/useProducts.ts` | ✅ Modificado |
| `src/components/LocaleSelector.tsx` | ✅ Creado |
| `src/components/layout/Header.tsx` | ✅ Modificado |
| `src/components/layout/Footer.tsx` | ✅ Modificado |
| `src/components/layout/CartDrawer.tsx` | ✅ Modificado |
| `src/components/products/ProductCard.tsx` | ✅ Modificado |
| `src/components/products/ProductGrid.tsx` | ✅ Modificado |
| `src/components/home/Hero.tsx` | ✅ Modificado |
| `src/components/home/BestSellers.tsx` | ✅ Modificado |
| `src/components/home/USPBanner.tsx` | ✅ Modificado |
| `src/App.tsx` | ✅ Modificado |

---

## Notas de implementación

- El locale se persiste en localStorage
- Al cambiar país, los productos se refetean automáticamente con el nuevo contexto
- Los precios cambian según el mercado configurado en Shopify Markets
- El idioma cambia toda la UI automáticamente

---

## Dependencias de Shopify necesarias

Para multi-moneda funcional:
1. **Shopify Markets configurado**: Admin → Settings → Markets
2. **Países habilitados**: España + otros países a los que vendas
3. **Traducciones de productos** (opcional): Admin → Products → editar traducciones

Si no tienes Shopify Markets configurado, los productos mostrarán siempre EUR pero la UI seguirá traducida.
