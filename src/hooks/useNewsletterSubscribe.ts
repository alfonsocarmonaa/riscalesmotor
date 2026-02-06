import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { subscribeToKlaviyo, isKlaviyoConfigured } from "@/lib/klaviyo";

type SubscribeSource = "register" | "footer" | "coming_soon";

export function useNewsletterSubscribe() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subscribe = async (email: string, source: SubscribeSource) => {
    if (!email) return;

    setIsSubmitting(true);
    try {
      const normalizedEmail = email.trim().toLowerCase();

      // Save to database as backup/local record
      const { error: dbError } = await supabase
        .from("newsletter_subscribers" as any)
        .insert({ email: normalizedEmail, source } as any);

      const alreadySubscribed = dbError?.code === "23505";

      if (dbError && !alreadySubscribed) {
        console.error("Newsletter DB error:", dbError);
      }

      // Send to Klaviyo if configured
      if (isKlaviyoConfigured()) {
        const klaviyoResult = await subscribeToKlaviyo(normalizedEmail, source);
        if (klaviyoResult.error) {
          console.warn("Klaviyo warning:", klaviyoResult.error);
        }
      }

      if (alreadySubscribed) {
        return { alreadySubscribed: true };
      }

      return { success: true };
    } catch (e) {
      console.error("Newsletter subscribe error:", e);
      return { error: "Error de conexión" };
    } finally {
      setIsSubmitting(false);
    }
  };

  return { subscribe, isSubmitting };
}
