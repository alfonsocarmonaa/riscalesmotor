
# Fix: Checkout Identity and Account Redirect System

## Problem Diagnosis

The app has two separate identity systems (Lovable Cloud auth and Shopify native accounts) that are NOT connected. When a user clicks "Iniciar sesion" in Shopify checkout, they get sent to Shopify's native `/account/login` page where they can't log in because they have no Shopify password. This creates a dead-end loop.

## Solution: Keep Users in Our Ecosystem

The fix is simple but critical: **never send users to Shopify's account pages**. Instead, intercept those routes and redirect to our own login/account pages. And ensure the cart always carries the buyer's email so checkout fields are pre-filled.

---

## Changes

### 1. Fix ShopifyRedirect to route `/account/*` to OUR pages

Currently, `/account/*` paths forward to Shopify's permanent domain. This must change:

- `/account/login` and `/account/register` --> redirect to our `/login` page
- `/account/*` (any other account path) --> redirect to our `/cuenta` page
- `/checkouts/*`, `/cart/*`, `/orders/*` --> continue forwarding to Shopify (unchanged)

This way, when Shopify checkout's "Iniciar sesion" link sends a user to `/account/login`, they land on OUR login page instead of Shopify's broken one.

**File: `src/components/ShopifyRedirect.tsx`**

### 2. Add "login before checkout" prompt in Cart Drawer

When a user clicks "Finalizar compra" and is NOT logged in, show a brief prompt suggesting they log in first (for order tracking, pre-filled info). They can still proceed as guest if they want.

This prevents the scenario where the user reaches Shopify checkout without identity and clicks "Iniciar sesion" there.

**File: `src/components/layout/CartDrawer.tsx`**

### 3. Ensure buyer email is set at checkout time (not just on page load)

Currently the email sync happens in `useCartSync` on page load. But if the user logs in AFTER adding items to cart, the email may not be synced to the Shopify cart. Add a check in the checkout handler itself to guarantee the email is set before opening checkout.

**File: `src/components/layout/CartDrawer.tsx`** (within `handleCheckout`)

### 4. Remove `/account/*` from Shopify redirect routes in App.tsx

Since `/account/*` will now route to our own pages (login/account), we need a different approach. We'll create two route groups:
- Keep `/checkouts/*`, `/cart/*`, `/orders/*` as `ShopifyRedirect` routes  
- Change `/account/*` to redirect to our pages via a small `AccountRedirect` component, or handle it inside the existing `ShopifyRedirect` logic

**File: `src/App.tsx`**

---

## Technical Details

### ShopifyRedirect.tsx (updated logic)
```text
/account/login    --> navigate("/login", { replace: true })
/account/register --> navigate("/registro", { replace: true })  
/account/*        --> navigate("/cuenta", { replace: true })
/checkouts/*      --> window.location.replace(shopify permanent domain)
/cart/*            --> window.location.replace(shopify permanent domain)
/orders/*         --> window.location.replace(shopify permanent domain)
```

### CartDrawer.tsx - Login prompt
When user clicks "Finalizar compra" without being logged in:
- Show a small inline section with two buttons:
  - "Iniciar sesion" (links to `/login`)
  - "Continuar como invitado" (proceeds to Shopify checkout)
- If already logged in, proceed directly to checkout

### CartDrawer.tsx - Email sync at checkout
Before opening checkout URL, check if user is logged in and if email has been synced to the Shopify cart. If not, call `setBuyerEmail` before proceeding.

---

## What This Fixes

1. **No more redirect loops**: `/account/login` from Shopify checkout goes to YOUR login, not Shopify's empty account page
2. **Pre-filled checkout**: Logged-in users will have their email already filled at Shopify checkout
3. **Login encouragement**: Users are gently prompted to log in before checkout, reducing friction at Shopify's end
4. **Order history works**: Since the customer is created in Shopify via `shopify-create-customer`, and the same email is used in both systems, the order history lookup in `/cuenta` will find their orders correctly
