import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { onConsentChange } from "@/lib/analytics";

const COOKIE_CONSENT_KEY = "riscales-cookie-consent";

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
}

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    timestamp: 0,
  });

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!stored) {
      // Small delay before showing banner
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(prefs));
    setIsVisible(false);
  };

  const acceptAll = () => {
    savePreferences({
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: Date.now(),
    });
  };

  const rejectAll = () => {
    savePreferences({
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: Date.now(),
    });
  };

  const saveCustom = () => {
    savePreferences({
      ...preferences,
      timestamp: Date.now(),
    });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-x-0 bottom-8 sm:bottom-0 z-[100] p-3 sm:p-6">
      <div className="container max-w-4xl">
        <div className="bg-background border rounded-xl sm:rounded-lg shadow-lg p-4 sm:p-6">
          {!showSettings ? (
            <>
              {/* Main Banner */}
              <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                <span className="text-xl sm:text-2xl">🍪</span>
                <div>
                  <h3 className="font-bold text-base sm:text-lg mb-1 sm:mb-2">Usamos cookies</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Utilizamos cookies para mejorar tu experiencia y analizar el tráfico.{" "}
                    <Link to="/cookies" className="text-accent hover:underline">
                      Más info
                    </Link>
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 sm:justify-end">
                <Button
                  variant="outline"
                  onClick={() => setShowSettings(true)}
                  className="order-3 sm:order-1 h-11 sm:h-10 text-sm touch-manipulation"
                >
                  Configurar
                </Button>
                <Button
                  variant="outline"
                  onClick={rejectAll}
                  className="order-2 h-11 sm:h-10 text-sm touch-manipulation"
                >
                  Rechazar
                </Button>
                <Button
                  onClick={acceptAll}
                  className="bg-foreground text-background hover:bg-foreground/90 active:bg-foreground/80 font-bold order-1 sm:order-3 h-11 sm:h-10 text-sm touch-manipulation"
                >
                  Aceptar Todas
                </Button>
              </div>
            </>
          ) : (
            <>
              {/* Settings Panel */}
              <div className="mb-6">
                <h3 className="font-bold text-lg mb-4">Configurar Cookies</h3>
                
                <div className="space-y-4">
                  {/* Necessary */}
                  <div className="flex items-start justify-between gap-4 p-4 bg-secondary rounded-lg">
                    <div>
                      <h4 className="font-medium">Cookies estrictamente necesarias</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Esenciales para el funcionamiento del sitio web. Incluyen carrito de compra y sesión de usuario.
                      </p>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={true}
                        disabled
                        className="h-5 w-5 accent-accent"
                      />
                      <span className="ml-2 text-xs text-muted-foreground">Siempre activo</span>
                    </div>
                  </div>

                  {/* Analytics */}
                  <div className="flex items-start justify-between gap-4 p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Cookies analíticas</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Nos ayudan a entender cómo usas el sitio para mejorarlo (Google Analytics).
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                      className="h-5 w-5 accent-accent mt-1"
                    />
                  </div>

                  {/* Marketing */}
                  <div className="flex items-start justify-between gap-4 p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Cookies de marketing</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Permiten mostrarte anuncios personalizados (Facebook Pixel, etc.).
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                      className="h-5 w-5 accent-accent mt-1"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setShowSettings(false)}
                >
                  Volver
                </Button>
                <Button
                  onClick={saveCustom}
                  className="bg-foreground text-background hover:bg-foreground/90 font-bold"
                >
                  Guardar Preferencias
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
