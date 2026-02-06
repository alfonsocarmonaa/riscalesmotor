

# Auditoria Completa: Arquitectura Web y SEO - Riscales Motor Co.

## Resumen de Hallazgos

He analizado los 25+ archivos de la web. Hay **problemas criticos** que afectan al posicionamiento SEO y varios puntos de mejora que van a elevar la calidad tecnica del sitio.

---

## 1. PROBLEMAS CRITICOS

### 1.1 Sin titulos de pagina dinamicos (document.title)
**Gravedad: ALTA** - Todas las paginas comparten el mismo `<title>` del `index.html`. Google ve el mismo titulo en TODAS las URLs.

Paginas afectadas: `/productos`, `/producto/:handle`, `/sobre-riscales`, `/contacto`, `/envios`, `/devoluciones`, `/guia-tallas`, `/sostenibilidad`, `/privacidad`, `/terminos`, `/cookies`.

**Solucion:** Crear un componente `SEOHead` que actualice `document.title` y meta description por pagina.

### 1.2 Sin meta descriptions dinamicas
**Gravedad: ALTA** - Solo existe una meta description global. Las paginas de producto (las mas importantes para SEO) no tienen meta description propia.

### 1.3 No existe sitemap.xml
**Gravedad: ALTA** - Google no tiene un mapa del sitio para indexar correctamente todas las URLs.

**Solucion:** Crear `/public/sitemap.xml` con todas las rutas estaticas.

### 1.4 Sin canonical URLs
**Gravedad: ALTA** - No hay `<link rel="canonical">` en ninguna pagina. Riesgo de contenido duplicado, especialmente en URLs con parametros como `/productos?collection=leyendas`.

### 1.5 OG:image con ruta relativa
**Gravedad: MEDIA** - Las meta tags `og:image` y `twitter:image` usan `/logo.png` (ruta relativa). Las redes sociales necesitan URL absoluta para mostrar la imagen correctamente.

### 1.6 robots.txt incompleto
**Gravedad: MEDIA** - Falta la referencia al sitemap. El fichero actual no lo incluye.

---

## 2. PROBLEMAS DE ALT TEXT E IMAGENES

### 2.1 Hero: imagen como background sin alt text
La imagen principal del Hero usa `background-image` CSS, que es invisible para buscadores. No tiene texto alternativo accesible.

**Solucion:** Agregar un `<img>` oculto con alt descriptivo o un `role="img"` con `aria-label`.

### 2.2 Colecciones (ShopByCollection): imagenes como background sin alt
Las 3 imagenes de coleccion usan `background-image` CSS sin alt text.

### 2.3 ComingSoon: imagen background sin alt
La imagen de fondo de la pagina "Proximamente" no tiene alt text.

### 2.4 About: imagen hero como background sin alt
La imagen del hero de "Sobre Riscales" usa `background-image` sin texto alternativo.

### 2.5 Imagenes de producto: alt text parcial
Las imagenes de Shopify usan `mainImage.altText || node.title` como fallback, lo cual es correcto. Pero los thumbnails de ProductDetail usan alt genericos como `"${product.title} 1"`.

### 2.6 Logo en Header: alt text inconsistente
El logo del movil dice `"Riscales Motor Co. - Camisetas Artesanales de Vehiculos Clasicos"` (bien) pero el de desktop dice solo `"Riscales Motor Co."` (menos descriptivo).

---

## 3. ESTRUCTURA SEMANTICA (HTML)

### 3.1 Breadcrumbs sin schema markup
Las migas de pan en Products y ProductDetail usan `<nav>` pero no implementan datos estructurados JSON-LD para que Google las muestre en resultados.

### 3.2 Pagina de producto sin JSON-LD Product schema
**Gravedad: ALTA** - Las paginas de producto no tienen schema.org `Product` markup. Google no puede mostrar rich snippets (precio, disponibilidad, imagen).

### 3.3 FAQPage schema ausente
La pagina de Contacto tiene un FAQ section, y la de Devoluciones tambien. Ninguna implementa el schema `FAQPage` para rich snippets.

### 3.4 Organization schema ausente
No hay datos estructurados de tipo `Organization` para la marca.

### 3.5 Pagina 404 en ingles
La pagina NotFound dice "Oops! Page not found" y "Return to Home" en ingles. Debe estar en espanol y tener la estructura de layout consistente (Header/Footer).

---

## 4. ESTRUCTURA DE URLS

### 4.1 URLs bien configuradas
Las rutas estan en espanol y son descriptivas: `/productos`, `/producto/:handle`, `/sobre-riscales`, `/contacto`, `/envios`, `/devoluciones`, `/guia-tallas`, `/sostenibilidad`, etc. Esto es correcto.

### 4.2 Parametros de filtro en URL
Los filtros usan query params (`?collection=leyendas`, `?sort=best-selling`). Esto es correcto, pero necesitan canonical URL para evitar duplicados.

---

## 5. OPTIMIZACION DE RENDIMIENTO

### 5.1 Lazy loading parcial
Solo las imagenes de ProductCard tienen `loading="lazy"`. Las imagenes de About, Manifesto, y la galeria de ProductDetail no lo implementan.

### 5.2 Google Fonts: bloqueo de render
La fuente se importa via `@import url(...)` en CSS, lo cual bloquea el renderizado. Deberia moverse a un `<link rel="preload">` en el HTML.

### 5.3 Sin preconnect a Shopify
No hay `<link rel="preconnect">` al dominio de Shopify, lo que anade latencia a las llamadas API.

---

## 6. PLAN DE IMPLEMENTACION

### Paso 1: Componente SEOHead
Crear un componente reutilizable que actualice:
- `document.title`
- `<meta name="description">`
- `<link rel="canonical">`
- `<meta property="og:*">`

Integrarlo en TODAS las paginas.

### Paso 2: Schema.org JSON-LD
- Agregar `Organization` schema en el layout principal
- Agregar `Product` schema en ProductDetail con precio, disponibilidad, imagen
- Agregar `BreadcrumbList` schema en las migas de pan
- Agregar `FAQPage` schema en Contacto y Devoluciones

### Paso 3: Sitemap y robots.txt
- Crear `public/sitemap.xml` con todas las rutas estaticas
- Actualizar `robots.txt` con referencia al sitemap

### Paso 4: Alt text y accesibilidad
- Convertir background-images criticas a `<img>` con alt descriptivos o anadir roles ARIA
- Unificar alt text del logo
- Anadir aria-labels a botones de iconos sin texto

### Paso 5: Pagina 404 en espanol
- Traducir la pagina 404 al espanol
- Anadir Header y Footer para mantener consistencia

### Paso 6: Optimizacion de rendimiento
- Anadir `loading="lazy"` a todas las imagenes debajo del fold
- Mover Google Fonts a `<link rel="preload">` en index.html
- Anadir `<link rel="preconnect">` para Shopify y Google Fonts
- Corregir OG:image con URL absoluta

### Paso 7: Meta descriptions por pagina
Textos optimizados para cada ruta:
- `/productos`: "Camisetas artesanales de coches y motos clasicos. Disenos unicos en algodon premium. Envio gratis +50EUR. Hecho en Espana."
- `/producto/:handle`: titulo + precio dinamico desde Shopify
- `/sobre-riscales`: "Conoce la historia de Riscales Motor Co. Arte, pasion y motor clasico en cada camiseta artesanal."
- `/contacto`: "Contacta con Riscales Motor Co. Atencion al cliente, dudas sobre pedidos, envios y devoluciones."
- Y asi para cada pagina...

---

## Detalle Tecnico

### Componente SEOHead (nuevo archivo)
Ubicacion: `src/components/SEOHead.tsx`
- Usa `useEffect` para actualizar `document.title`
- Crea/actualiza meta tags dynamicamente en el DOM
- Recibe props: `title`, `description`, `canonical`, `ogImage`, `ogType`
- URL base configurable para canonical y OG

### JSON-LD schemas (nuevo archivo)
Ubicacion: `src/components/JsonLd.tsx`
- Componentes para `OrganizationSchema`, `ProductSchema`, `BreadcrumbSchema`, `FAQSchema`
- Renderizan un `<script type="application/ld+json">` con los datos

### Archivos a modificar
- `index.html` - preconnect, preload fonts, OG absoluto
- `public/robots.txt` - agregar Sitemap
- `public/sitemap.xml` - crear nuevo
- `src/components/SEOHead.tsx` - crear nuevo
- `src/components/JsonLd.tsx` - crear nuevo
- `src/pages/Index.tsx` - agregar SEOHead
- `src/pages/Products.tsx` - agregar SEOHead con titulo dinamico
- `src/pages/ProductDetail.tsx` - agregar SEOHead + ProductSchema
- `src/pages/About.tsx` - agregar SEOHead + alt images
- `src/pages/Contact.tsx` - agregar SEOHead + FAQSchema
- `src/pages/Shipping.tsx` - agregar SEOHead
- `src/pages/Returns.tsx` - agregar SEOHead + FAQSchema
- `src/pages/SizeGuide.tsx` - agregar SEOHead
- `src/pages/Sustainability.tsx` - agregar SEOHead
- `src/pages/ComingSoon.tsx` - agregar SEOHead
- `src/pages/NotFound.tsx` - traducir al espanol, agregar layout
- `src/pages/legal/Privacy.tsx` - agregar SEOHead
- `src/pages/legal/Terms.tsx` - agregar SEOHead
- `src/pages/legal/Cookies.tsx` - agregar SEOHead
- `src/components/home/Hero.tsx` - agregar alt accesible
- `src/components/home/ShopByCollection.tsx` - agregar alt accesible
- `src/components/home/Manifesto.tsx` - agregar lazy loading
- `src/components/layout/Header.tsx` - unificar alt logo

Total: ~25 archivos modificados/creados.

