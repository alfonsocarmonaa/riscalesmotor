import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type SubscribeSource = "register" | "footer" | "coming_soon";

export function useNewsletterSubscribe() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subscribe = async (email: string, source: SubscribeSource) => {
    if (!email) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from("newsletter_subscribers" as any)
        .insert({ email: email.trim().toLowerCase(), source } as any);

      if (error) {
        // Duplicate = already subscribed, treat as success
        if (error.code === "23505") {
          return { alreadySubscribed: true };
        }
        console.error("Newsletter subscribe error:", error);
        return { error: error.message };
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
