import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Menu, ChevronDown, User, LogIn, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { useCartStore } from "@/stores/cartStore";
import { useAuth } from "@/hooks/useAuth";
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
  { name: "SUDADERAS", href: "/sudaderas" },
  { name: "ACCESORIOS", href: "/accesorios" },
  { name: "SOBRE RISCALES", href: "/sobre-riscales" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const totalItems = useCartStore(state => state.getTotalItems());
  const { user } = useAuth();
  
  const location = useLocation();
  
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerPosition = isHomePage ? "fixed inset-x-0 top-0" : "sticky top-0";
  const headerBg = isHomePage
    ? (isScrolled ? "bg-background" : "bg-transparent")
    : "bg-background";

  return (
    <header className={`${headerPosition} z-50 transition-all duration-300 ${headerBg}`}> 
      <div className={`${isScrolled || !isHomePage ? "border-b" : "border-b border-transparent"}`}>
        <div className="container py-4">
          {/* Mobile Header */}
            <div className="flex lg:hidden items-center">
             <div className="flex-1 flex justify-start">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10 touch-manipulation" aria-label="Abrir menú de navegación">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[85vw] max-w-[320px] p-0">
                <div className="p-6 pb-safe">
                  <Link to="/" className="block mb-8" onClick={() => setMobileMenuOpen(false)}>
                    <img 
                      src={logoImage} 
                      alt="Riscales Motor Co."
                      width={153}
                      height={84}
                      decoding="async"
                      className="h-14 w-auto"
                    />
                  </Link>
                  <nav className="space-y-1">
                    {navLinks.map((link) => (
                      <div key={link.name}>
                        <Link 
                          to={link.href} 
                          className="flex items-center py-3 px-2 -mx-2 font-body font-medium text-base hover:text-accent hover:bg-secondary/50 rounded-lg transition-colors touch-manipulation"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {link.name}
                        </Link>
                        {link.submenu && (
                          <div className="pl-4 space-y-1 mt-1 mb-2">
                            {link.submenu.map((sub) => (
                              <Link
                                key={sub.name}
                                to={sub.href}
                                className="block py-2.5 px-2 text-sm text-muted-foreground hover:text-accent hover:bg-secondary/50 rounded-lg transition-colors touch-manipulation"
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
                  
                  <div className="mt-8 pt-6 border-t">
                    <Link 
                      to={user ? "/cuenta" : "/login"}
                      className="flex items-center gap-3 py-3 px-2 -mx-2 font-body font-medium hover:text-accent hover:bg-secondary/50 rounded-lg transition-colors touch-manipulation"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {user ? <User className="h-5 w-5" /> : <LogIn className="h-5 w-5" />}
                      {user ? "Mi Cuenta" : "Iniciar Sesión"}
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
             </div>

            <Link to="/" className="flex items-center flex-shrink-0">
              <img 
                src={logoImage} 
                alt="Riscales Motor Co."
                width={153}
                height={84}
                decoding="async"
                className="h-12 sm:h-14 w-auto"
              />
            </Link>

            <div className="flex-1 flex justify-end items-center">
              <Button variant="ghost" size="icon" className="h-10 w-10 touch-manipulation" asChild aria-label="Favoritos">
                <Link to="/favoritos">
                  <BrandHeart size="md" />
                </Link>
              </Button>
              <CartDrawer />
            </div>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:flex items-center justify-between">
            <Link to="/" className="flex-shrink-0">
              <img 
                src={logoImage} 
                alt="Riscales Motor Co."
                width={131}
                height={72}
                decoding="async"
                className="h-[72px] w-auto"
              />
            </Link>

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
                    
                    {link.submenu && (
                      <div className="mega-menu absolute top-full left-1/2 -translate-x-1/2 pt-2">
                        <div className="bg-background border shadow-lg rounded-lg p-4 min-w-[240px]">
                          <div className="space-y-1">
                            {link.submenu.map((sub) => (
                              <Link
                                key={sub.name}
                                to={sub.href}
                                className="group/item flex items-center gap-0 py-2 px-3 text-sm rounded hover:bg-secondary transition-all duration-200"
                              >
                                <Heart className="h-3.5 w-3.5 text-accent fill-accent opacity-0 group-hover/item:opacity-100 transition-all duration-200 -ml-1 mr-0 group-hover/item:mr-2 w-0 group-hover/item:w-3.5 overflow-hidden flex-shrink-0" />
                                <span className="transition-transform duration-200">{sub.name}</span>
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

            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" asChild aria-label={user ? "Mi cuenta" : "Iniciar sesión"}>
                <Link to={user ? "/cuenta" : "/login"}>
                  <User className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" className="relative hover:bg-accent hover:text-accent-foreground transition-colors" asChild aria-label="Favoritos">
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
