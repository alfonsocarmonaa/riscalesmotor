import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { toast } from "sonner";
import { BrandHeart } from "@/components/BrandHeart";
import { useNewsletterSubscribe } from "@/hooks/useNewsletterSubscribe";

const STORAGE_KEY = "riscales-newsletter-popup";
const DISMISS_DURATION_MS = 3 * 24 * 60 * 60 * 1000; // 3 days
const SHOW_DELAY_MS = 5000; // 5 seconds after page load

interface PopupState {
  dismissed: boolean;
  subscribedOrDismissedAt: number | null;
}

function getPopupState(): PopupState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { dismissed: false, subscribedOrDismissedAt: null };
    const state = JSON.parse(raw) as PopupState;
    
    // If subscribed, never show again
    if (state.dismissed && state.subscribedOrDismissedAt === -1) {
      return state;
    }
    
    // If dismissed temporarily, check if enough time has passed
    if (state.dismissed && state.subscribedOrDismissedAt) {
      const elapsed = Date.now() - state.subscribedOrDismissedAt;
      if (elapsed < DISMISS_DURATION_MS) return state;
      // Time expired, show again
      return { dismissed: false, subscribedOrDismissedAt: null };
    }
    
    return state;
  } catch {
    return { dismissed: false, subscribedOrDismissedAt: null };
  }
}

function dismissPopup(permanent: boolean) {
  const state: PopupState = {
    dismissed: true,
    subscribedOrDismissedAt: permanent ? -1 : Date.now(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function NewsletterPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { subscribe, isSubmitting } = useNewsletterSubscribe();

  useEffect(() => {
    const state = getPopupState();
    if (state.dismissed) return;

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, SHOW_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    dismissPopup(false); // Temporary dismiss (3 days)
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const result = await subscribe(email, "popup");

    if (result?.alreadySubscribed) {
      toast.info("Ya estás suscrito", { description: "Este email ya está en nuestra lista." });
      dismissPopup(true);
      setIsVisible(false);
    } else if (result?.error) {
      toast.error("Error al suscribirse", { description: result.error });
    } else {
      setSubmitted(true);
      dismissPopup(true); // Permanent dismiss
      // Auto-close after showing confirmation
      setTimeout(() => setIsVisible(false), 6000);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in-up">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-background border border-border rounded-lg shadow-2xl w-full max-w-md overflow-hidden">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-background/80 hover:bg-secondary transition-colors touch-manipulation"
          aria-label="Cerrar"
        >
          <X className="h-4 w-4 text-foreground" />
        </button>

        {/* Top accent bar */}
        <div className="h-1 bg-accent w-full" />

        <div className="p-6 sm:p-8 text-center">
          {!submitted ? (
            <>
              {/* Heart icon */}
              <div className="mb-4 flex justify-center">
                <BrandHeart size="lg" className="text-accent hover-heartbeat" />
              </div>

              <h2 className="font-display text-3xl sm:text-4xl mb-2">
                Únete al Club
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base mb-1">
                Pasión por los clásicos, diseño artesanal.
              </p>
              <p className="text-foreground font-semibold text-sm sm:text-base mb-6">
                Suscríbete y llévate un <span className="text-accent">10% de descuento</span> en tu primera compra.
              </p>

              <form onSubmit={handleSubmit} className="space-y-3">
                <Input
                  type="email"
                  placeholder="Tu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 text-base text-center border-border"
                  required
                  autoFocus
                />
                <Button
                  type="submit"
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold uppercase tracking-wide h-12"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Enviando..." : "Quiero mi descuento"}
                </Button>
              </form>

              <button
                onClick={handleClose}
                className="mt-4 text-xs text-muted-foreground hover:text-foreground transition-colors touch-manipulation"
              >
                No, gracias. Prefiero pagar precio completo.
              </button>
            </>
          ) : (
            <>
              {/* Success state */}
              <div className="mb-4 flex justify-center">
                <BrandHeart size="lg" className="text-accent animate-heartbeat" />
              </div>

              <h2 className="font-display text-3xl sm:text-4xl mb-3">
                ¡Casi estás!
              </h2>
              <p className="text-foreground font-medium text-base mb-2">
                Revisa tu bandeja de entrada
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Te hemos enviado un email de confirmación. 
                <br />
                <strong className="text-foreground">Confirma tu suscripción</strong> para activar tu 10% de descuento.
              </p>
              <p className="text-xs text-muted-foreground mt-4">
                ¿No lo ves? Revisa tu carpeta de spam.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
