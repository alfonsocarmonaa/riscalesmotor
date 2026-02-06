// Klaviyo Client API Configuration
// Public API key (company_id) - safe for client-side use
const KLAVIYO_PUBLIC_KEY = ''; // TODO: User needs to provide this
const KLAVIYO_LIST_ID = ''; // TODO: User needs to provide this

const KLAVIYO_API_REVISION = '2024-10-15';

export async function subscribeToKlaviyo(
  email: string,
  source: string = 'website'
): Promise<{ success?: boolean; error?: string }> {
  if (!KLAVIYO_PUBLIC_KEY || !KLAVIYO_LIST_ID) {
    console.warn('Klaviyo not configured: missing public key or list ID');
    return { error: 'Klaviyo no configurado' };
  }

  try {
    const response = await fetch(
      `https://a.klaviyo.com/client/subscriptions/?company_id=${KLAVIYO_PUBLIC_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          revision: KLAVIYO_API_REVISION,
        },
        body: JSON.stringify({
          data: {
            type: 'subscription',
            attributes: {
              custom_source: source,
              profile: {
                data: {
                  type: 'profile',
                  attributes: {
                    email: email.trim().toLowerCase(),
                  },
                },
              },
            },
            relationships: {
              list: {
                data: {
                  type: 'list',
                  id: KLAVIYO_LIST_ID,
                },
              },
            },
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error('Klaviyo subscribe error:', errorData);
      return { error: 'Error al suscribirse' };
    }

    return { success: true };
  } catch (e) {
    console.error('Klaviyo subscribe error:', e);
    return { error: 'Error de conexión con Klaviyo' };
  }
}

export function isKlaviyoConfigured(): boolean {
  return Boolean(KLAVIYO_PUBLIC_KEY && KLAVIYO_LIST_ID);
}
