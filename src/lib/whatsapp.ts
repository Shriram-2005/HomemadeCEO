/**
 * WhatsApp Cloud API Client (Meta Graph API v21.0)
 * Status: Coming Soon - Ready for credentials rollout
 */

export interface WhatsAppConfig {
  phoneNumberId?: string;
  accessToken?: string;
  verifyToken?: string;
}

export const WHATSAPP_CONFIG: WhatsAppConfig = {
  phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID,
  accessToken: process.env.WHATSAPP_ACCESS_TOKEN,
  verifyToken: process.env.WHATSAPP_VERIFY_TOKEN,
};

export const IS_WHATSAPP_READY = Boolean(
  WHATSAPP_CONFIG.phoneNumberId && WHATSAPP_CONFIG.accessToken
);

export interface WhatsAppTemplatePayload {
  to: string;
  templateName: string;
  languageCode: string;
  components?: Array<Record<string, unknown>>;
}

/**
 * Send WhatsApp Template Message (Order updates, receipts)
 * Scheduled for rollout in upcoming update.
 */
export async function sendWhatsAppTemplate(payload: WhatsAppTemplatePayload) {
  if (!IS_WHATSAPP_READY) {
    return {
      status: "coming_soon",
      message: "WhatsApp Cloud API integration is coming soon in the next release.",
      payload,
    };
  }

  const endpoint = `https://graph.facebook.com/v21.0/${WHATSAPP_CONFIG.phoneNumberId}/messages`;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${WHATSAPP_CONFIG.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: payload.to,
      type: "template",
      template: {
        name: payload.templateName,
        language: { code: payload.languageCode },
        components: payload.components,
      },
    }),
  });

  return await res.json();
}
