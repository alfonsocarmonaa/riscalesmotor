import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const KLAVIYO_API_REVISION = "2024-10-15";

// Simple in-memory rate limiter (per isolate instance)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 3; // max requests
const RATE_WINDOW_MS = 60_000; // per minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limit by IP
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (isRateLimited(clientIp)) {
      return new Response(
        JSON.stringify({ error: "Demasiadas solicitudes. Inténtalo de nuevo en un minuto." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const KLAVIYO_PUBLIC_KEY = Deno.env.get("KLAVIYO_PUBLIC_KEY");
    const KLAVIYO_LIST_ID = Deno.env.get("KLAVIYO_LIST_ID");

    if (!KLAVIYO_PUBLIC_KEY || !KLAVIYO_LIST_ID) {
      console.error("Klaviyo credentials not configured");
      return new Response(
        JSON.stringify({ error: "Servicio de newsletter no configurado" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { email, source } = await req.json();

    if (!email || typeof email !== "string") {
      return new Response(
        JSON.stringify({ error: "Email es requerido" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Basic email validation
    if (normalizedEmail.length > 255 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      return new Response(
        JSON.stringify({ error: "Email no válido" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const response = await fetch(
      `https://a.klaviyo.com/client/subscriptions/?company_id=${KLAVIYO_PUBLIC_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "revision": KLAVIYO_API_REVISION,
        },
        body: JSON.stringify({
          data: {
            type: "subscription",
            attributes: {
              custom_source: source || "website",
              profile: {
                data: {
                  type: "profile",
                  attributes: {
                    email: normalizedEmail,
                  },
                },
              },
            },
            relationships: {
              list: {
                data: {
                  type: "list",
                  id: KLAVIYO_LIST_ID,
                },
              },
            },
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error");
      console.error("Klaviyo API error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "Error al suscribirse en Klaviyo", details: errorText }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Successfully subscribed ${normalizedEmail} to Klaviyo from source: ${source}`);

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Edge function error:", error);
    return new Response(
      JSON.stringify({ error: "Error interno del servidor" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
