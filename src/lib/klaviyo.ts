// Klaviyo integration via edge function (avoids CORS issues)
import { supabase } from "@/integrations/supabase/client";

export async function subscribeToKlaviyo(
  email: string,
  source: string = 'website'
): Promise<{ success?: boolean; error?: string }> {
  try {
    const { data, error } = await supabase.functions.invoke('klaviyo-subscribe', {
      body: { email, source },
    });

    if (error) {
      console.error('Klaviyo subscribe error:', error);
      return { error: 'Error al suscribirse' };
    }

    if (data?.error) {
      console.error('Klaviyo API error:', data.error);
      return { error: data.error };
    }

    return { success: true };
  } catch (e) {
    console.error('Klaviyo subscribe error:', e);
    return { error: 'Error de conexión con Klaviyo' };
  }
}

export function isKlaviyoConfigured(): boolean {
  return true; // Always configured via edge function
}
