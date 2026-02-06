import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { storefrontApiRequest } from "@/lib/shopify";

// --- Types ---
export interface ShopifyCustomer {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  phone: string | null;
  defaultAddress: {
    id: string;
    address1: string | null;
    address2: string | null;
    city: string | null;
    province: string | null;
    zip: string | null;
    country: string | null;
  } | null;
}

interface ShopifyAuthState {
  accessToken: string | null;
  customer: ShopifyCustomer | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  register: (input: { firstName: string; lastName: string; email: string; password: string }) => Promise<{ error?: string }>;
  logout: () => void;
  fetchCustomer: () => Promise<void>;
  updateCustomer: (input: Record<string, string | null>) => Promise<{ error?: string }>;
}

// --- GraphQL ---
const CUSTOMER_ACCESS_TOKEN_CREATE = `
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken { accessToken expiresAt }
      customerUserErrors { code field message }
    }
  }
`;

const CUSTOMER_CREATE = `
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer { id email firstName lastName }
      customerUserErrors { code field message }
    }
  }
`;

const CUSTOMER_QUERY = `
  query customer($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id firstName lastName email phone
      defaultAddress {
        id address1 address2 city province zip country
      }
    }
  }
`;

const CUSTOMER_UPDATE = `
  mutation customerUpdate($customerAccessToken: String!, $customer: CustomerUpdateInput!) {
    customerUpdate(customerAccessToken: $customerAccessToken, customer: $customer) {
      customer { id firstName lastName email phone }
      customerUserErrors { code field message }
    }
  }
`;

const CUSTOMER_ADDRESS_CREATE = `
  mutation customerAddressCreate($customerAccessToken: String!, $address: MailingAddressInput!) {
    customerAddressCreate(customerAccessToken: $customerAccessToken, address: $address) {
      customerAddress { id }
      customerUserErrors { code field message }
    }
  }
`;

const CUSTOMER_ADDRESS_UPDATE = `
  mutation customerAddressUpdate($customerAccessToken: String!, $id: ID!, $address: MailingAddressInput!) {
    customerAddressUpdate(customerAccessToken: $customerAccessToken, id: $id, address: $address) {
      customerAddress { id }
      customerUserErrors { code field message }
    }
  }
`;

// --- Store ---
export const useShopifyAuth = create<ShopifyAuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      customer: null,
      loading: false,

      login: async (email, password) => {
        set({ loading: true });
        try {
          const data = await storefrontApiRequest(CUSTOMER_ACCESS_TOKEN_CREATE, {
            input: { email, password },
          });

          const errors = data?.data?.customerAccessTokenCreate?.customerUserErrors || [];
          if (errors.length > 0) {
            set({ loading: false });
            return { error: errors[0].message };
          }

          const token = data?.data?.customerAccessTokenCreate?.customerAccessToken?.accessToken;
          if (!token) {
            set({ loading: false });
            return { error: "No se pudo iniciar sesión" };
          }

          set({ accessToken: token });
          await get().fetchCustomer();
          set({ loading: false });
          return {};
        } catch (e) {
          set({ loading: false });
          return { error: "Error de conexión" };
        }
      },

      register: async (input) => {
        set({ loading: true });
        try {
          const data = await storefrontApiRequest(CUSTOMER_CREATE, {
            input: {
              firstName: input.firstName,
              lastName: input.lastName,
              email: input.email,
              password: input.password,
              acceptsMarketing: true,
            },
          });

          const errors = data?.data?.customerCreate?.customerUserErrors || [];
          if (errors.length > 0) {
            set({ loading: false });
            const msg = errors[0].code === "TAKEN"
              ? "Este email ya está registrado"
              : errors[0].message;
            return { error: msg };
          }

          // Auto-login after register
          set({ loading: false });
          return await get().login(input.email, input.password);
        } catch (e) {
          set({ loading: false });
          return { error: "Error de conexión" };
        }
      },

      logout: () => {
        set({ accessToken: null, customer: null });
      },

      fetchCustomer: async () => {
        const { accessToken } = get();
        if (!accessToken) return;

        try {
          const data = await storefrontApiRequest(CUSTOMER_QUERY, {
            customerAccessToken: accessToken,
          });

          const customer = data?.data?.customer;
          if (!customer) {
            // Token expired
            set({ accessToken: null, customer: null });
            return;
          }

          set({ customer });
        } catch {
          set({ accessToken: null, customer: null });
        }
      },

      updateCustomer: async (input) => {
        const { accessToken } = get();
        if (!accessToken) return { error: "No autenticado" };

        try {
          const data = await storefrontApiRequest(CUSTOMER_UPDATE, {
            customerAccessToken: accessToken,
            customer: input,
          });

          const errors = data?.data?.customerUpdate?.customerUserErrors || [];
          if (errors.length > 0) {
            return { error: errors[0].message };
          }

          await get().fetchCustomer();
          return {};
        } catch {
          return { error: "Error de conexión" };
        }
      },
    }),
    {
      name: "shopify-customer",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        accessToken: state.accessToken,
        customer: state.customer,
      }),
    }
  )
);
