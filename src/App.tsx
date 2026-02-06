import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useCartSync } from "@/hooks/useCartSync";
import { useAnalytics } from "@/hooks/useAnalytics";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { TickerBanner } from "@/components/layout/TickerBanner";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ShopifyRedirect } from "@/components/ShopifyRedirect";

// Pages
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import ComingSoon from "./pages/ComingSoon";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import SizeGuide from "./pages/SizeGuide";
import Shipping from "./pages/Shipping";
import Returns from "./pages/Returns";
import Sustainability from "./pages/Sustainability";
import Favorites from "./pages/Favorites";
import Account from "./pages/Account";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Legal Pages
import Privacy from "./pages/legal/Privacy";
import Terms from "./pages/legal/Terms";
import Cookies from "./pages/legal/Cookies";

const queryClient = new QueryClient();

// Cart sync wrapper component
function AppProviders({ children }: { children: React.ReactNode }) {
  useCartSync();
  useAnalytics();
  return <>{children}</>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppProviders>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/productos" element={<Products />} />
            <Route path="/producto/:handle" element={<ProductDetail />} />
            <Route path="/sobre-riscales" element={<About />} />
            <Route path="/sudaderas" element={<ComingSoon />} />
            <Route path="/accesorios" element={<ComingSoon />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/guia-tallas" element={<SizeGuide />} />
            <Route path="/envios" element={<Shipping />} />
            <Route path="/devoluciones" element={<Returns />} />
            <Route path="/sostenibilidad" element={<Sustainability />} />
            
            {/* Account Pages */}
            <Route path="/cuenta" element={<Account />} />
            <Route path="/favoritos" element={<Favorites />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Register />} />
            
            {/* Legal Pages */}
            <Route path="/privacidad" element={<Privacy />} />
            <Route path="/terminos" element={<Terms />} />
            <Route path="/cookies" element={<Cookies />} />
            
            {/* Shopify redirect routes — MUST be before the catch-all */}
            <Route path="/checkouts/*" element={<ShopifyRedirect />} />
            <Route path="/cart/*" element={<ShopifyRedirect />} />
            <Route path="/orders/*" element={<ShopifyRedirect />} />
            {/* Account routes from Shopify checkout → redirect to OUR pages */}
            <Route path="/account/*" element={<ShopifyRedirect />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          
          {/* Cookie Consent Banner */}
          <CookieBanner />
          
          {/* Bottom Ticker Banner */}
          <TickerBanner />
        </AppProviders>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
