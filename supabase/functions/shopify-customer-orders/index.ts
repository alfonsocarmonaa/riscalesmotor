import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SHOPIFY_STORE = "3hxjb2-ht.myshopify.com";
const SHOPIFY_ADMIN_API_VERSION = "2025-01";
const SHOPIFY_ADMIN_URL = `https://${SHOPIFY_STORE}/admin/api/${SHOPIFY_ADMIN_API_VERSION}/graphql.json`;

const ORDERS_QUERY = `
  query GetCustomerOrders($query: String!) {
    orders(first: 20, query: $query, sortKey: CREATED_AT, reverse: true) {
      edges {
        node {
          id
          name
          createdAt
          totalPriceSet {
            shopMoney {
              amount
              currencyCode
            }
          }
          displayFulfillmentStatus
          displayFinancialStatus
          lineItems(first: 5) {
            edges {
              node {
                title
                quantity
                originalTotalSet {
                  shopMoney {
                    amount
                    currencyCode
                  }
                }
                image {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  }
`;

// Simple in-memory rate limiter per user
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 60_000;

function isRateLimited(userId: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(userId);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(userId, { count: 1, resetAt: now + RATE_WINDOW_MS });
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
    // Authenticate user
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

    // Rate limit by user ID
    if (isRateLimited(user.id)) {
      return new Response(
        JSON.stringify({ error: "Demasiadas solicitudes. Inténtalo de nuevo en un minuto." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Fetch orders from Shopify Admin API
    const shopifyToken = Deno.env.get("SHOPIFY_ACCESS_TOKEN");
    if (!shopifyToken) {
      return new Response(
        JSON.stringify({ error: "Shopify no configurado" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const shopifyResponse = await fetch(SHOPIFY_ADMIN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": shopifyToken,
      },
      body: JSON.stringify({
        query: ORDERS_QUERY,
        variables: { query: `email:${user.email}` },
      }),
    });

    if (!shopifyResponse.ok) {
      const errorText = await shopifyResponse.text();
      console.error("Shopify Admin API error:", shopifyResponse.status, errorText);
      return new Response(
        JSON.stringify({ error: "Error al consultar pedidos" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const shopifyData = await shopifyResponse.json();

    if (shopifyData.errors) {
      console.error("Shopify GraphQL errors:", shopifyData.errors);
      return new Response(
        JSON.stringify({ error: "Error en la consulta de pedidos" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const orders = shopifyData.data?.orders?.edges?.map((edge: any) => ({
      id: edge.node.id,
      name: edge.node.name,
      createdAt: edge.node.createdAt,
      total: edge.node.totalPriceSet?.shopMoney,
      fulfillmentStatus: edge.node.displayFulfillmentStatus,
      financialStatus: edge.node.displayFinancialStatus,
      lineItems: edge.node.lineItems?.edges?.map((li: any) => ({
        title: li.node.title,
        quantity: li.node.quantity,
        total: li.node.originalTotalSet?.shopMoney,
        image: li.node.image,
      })) || [],
    })) || [];

    return new Response(
      JSON.stringify({ orders }),
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
