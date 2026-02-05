import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Search, User, Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CartDrawer } from "./CartDrawer";
import { BrandHeart } from "@/components/BrandHeart";
import logoImage from "@/assets/logo.png";

const navLinks = [
  { name: "INICIO", href: "/" },
  { 
    name: "CAMISETAS", 
    href: "/productos",
    submenu: [
      { name: "Ediciones Riscales", href: "/productos?collection=ediciones-riscales" },
      { name: "Leyendas del Asfalto", href: "/productos?collection=coches" },
      { name: "Espíritu Dos Ruedas", href: "/productos?collection=motos" },
      { name: "Ver Todas", href: "/productos" },
    ]
  },
  { name: "SUDADERAS", href: "/proximamente/sudaderas" },
  { name: "ACCESORIOS", href: "/proximamente/accesorios" },
  { name: "SOBRE RISCALES", href: "/sobre-riscales" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const totalItems = useCartStore(state => state.getTotalItems());
  const location = useLocation();
  
  // Only apply transparent header on homepage
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerBg = isHomePage && !isScrolled 
    ? "bg-transparent" 
    : "bg-background";

  return (
    <header className={`sticky top-0 z-50 transition-colors duration-300 ${headerBg}`}>
      {/* Main Header */}
      <div className={`${isScrolled || !isHomePage ? 'border-b' : 'border-b border-transparent'}`}>
        <div className="container py-4">
          {/* Mobile Header */}
          <div className="flex lg:hidden items-center justify-between">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] p-0">
                <div className="p-6">
                  <Link to="/" className="block mb-8" onClick={() => setMobileMenuOpen(false)}>
                    <img 
                      src={logoImage} 
                      alt="Riscales Motor Co. - Camisetas Artesanales de Vehículos Clásicos" 
                      className="h-16 w-auto"
                    />
                  </Link>
                  <nav className="space-y-4">
                    {navLinks.map((link) => (
                      <div key={link.name}>
                        <Link 
                          to={link.href} 
                          className="block py-2 font-body font-medium hover:text-accent transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {link.name}
                        </Link>
                        {link.submenu && (
                          <div className="pl-4 space-y-2 mt-2">
                            {link.submenu.map((sub) => (
                              <Link
                                key={sub.name}
                                to={sub.href}
                                className="block py-1 text-sm text-muted-foreground hover:text-accent transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>

            <Link to="/" className="flex items-center">
              <img 
                src={logoImage} 
                alt="Riscales Motor Co." 
                className="h-16 w-auto"
              />
            </Link>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" asChild>
                <Link to="/favoritos">
                  <BrandHeart size="md" />
                </Link>
              </Button>
              <CartDrawer />
            </div>
          </div>

          {/* Desktop Header - Single Line */}
          <div className="hidden lg:flex items-center justify-between">
            {/* Logo Left */}
            <Link to="/" className="flex-shrink-0">
              <img 
                src={logoImage} 
                alt="Riscales Motor Co." 
                className="h-[72px] w-auto"
              />
            </Link>

            {/* Navigation - Center */}
            <nav className="flex-1 flex justify-center">
              <ul className="flex items-center gap-6">
                {navLinks.map((link) => (
                  <li key={link.name} className="relative group mega-menu-trigger">
                    <Link 
                      to={link.href} 
                      className="flex items-center gap-1 font-body text-sm font-medium tracking-wide hover:text-accent transition-colors link-underline py-2"
                    >
                      {link.name}
                      {link.submenu && <ChevronDown className="h-3 w-3" />}
                    </Link>
                    
                    {/* Mega Menu */}
                    {link.submenu && (
                      <div className="mega-menu absolute top-full left-1/2 -translate-x-1/2 pt-2">
                        <div className="bg-background border shadow-lg rounded-lg p-4 min-w-[240px]">
                          <div className="space-y-2">
                            {link.submenu.map((sub) => (
                              <Link
                                key={sub.name}
                                to={sub.href}
                                className="block py-2 px-3 text-sm rounded hover:bg-secondary transition-colors"
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* Icons - Right */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" asChild>
                <Link to="/cuenta">
                  <User className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" className="relative hover-heartbeat" asChild>
                <Link to="/favoritos">
                  <BrandHeart size="md" />
                </Link>
              </Button>
              <CartDrawer />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
