import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SHOPIFY_STORE = "3hxjb2-ht.myshopify.com";
const SHOPIFY_ADMIN_API_VERSION = "2025-01";
const SHOPIFY_ADMIN_URL = `https://${SHOPIFY_STORE}/admin/api/${SHOPIFY_ADMIN_API_VERSION}/graphql.json`;

const CUSTOMER_CREATE_MUTATION = `
  mutation customerCreate($input: CustomerInput!) {
    customerCreate(input: $input) {
      customer {
        id
        email
      }
      userErrors {
        field
        message
      }
    }
  }
`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Authenticate user via Supabase
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ error: "No autorizado" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") || Deno.env.get("SUPABASE_PUBLISHABLE_KEY")!;

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user?.email) {
      return new Response(
        JSON.stringify({ error: "No autorizado" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { fullName } = await req.json().catch(() => ({ fullName: "" }));

    // Parse name into first/last
    const nameParts = (fullName || "").trim().split(/\s+/);
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    // Check Shopify access token
    const shopifyToken = Deno.env.get("SHOPIFY_ACCESS_TOKEN");
    if (!shopifyToken) {
      return new Response(
        JSON.stringify({ error: "Shopify no configurado" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create customer in Shopify via Admin API
    const shopifyResponse = await fetch(SHOPIFY_ADMIN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": shopifyToken,
      },
      body: JSON.stringify({
        query: CUSTOMER_CREATE_MUTATION,
        variables: {
          input: {
            email: user.email,
            firstName,
            lastName,
            emailMarketingConsent: {
              marketingState: "SUBSCRIBED",
              marketingOptInLevel: "SINGLE_OPT_IN",
            },
          },
        },
      }),
    });

    if (!shopifyResponse.ok) {
      const errorText = await shopifyResponse.text();
      console.error("Shopify Admin API error:", shopifyResponse.status, errorText);
      return new Response(
        JSON.stringify({ error: "Error al crear cliente en Shopify" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const shopifyData = await shopifyResponse.json();

    if (shopifyData.errors) {
      console.error("Shopify GraphQL errors:", shopifyData.errors);
      return new Response(
        JSON.stringify({ error: "Error en la creación de cliente" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const userErrors = shopifyData.data?.customerCreate?.userErrors || [];
    
    // If customer already exists, that's fine — not an error
    const alreadyExists = userErrors.some(
      (e: { message: string }) => e.message.toLowerCase().includes("has already been taken")
    );

    if (userErrors.length > 0 && !alreadyExists) {
      console.error("Shopify customer create errors:", userErrors);
      return new Response(
        JSON.stringify({ error: "Error al crear cliente", details: userErrors }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const customerId = shopifyData.data?.customerCreate?.customer?.id;
    console.log(
      alreadyExists
        ? `Customer already exists for ${user.email}`
        : `Created Shopify customer ${customerId} for ${user.email}`
    );

    return new Response(
      JSON.stringify({ success: true, alreadyExists }),
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
