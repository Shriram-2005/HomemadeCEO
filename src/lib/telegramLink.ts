/**
 * In-Memory & Database-Ready Seller Account Link Store for Telegram
 * Maps Telegram Chat ID <-> Homemade CEO Seller Profile
 */

export interface LinkedSellerProfile {
  sellerId: string;
  storeName: string;
  sellerName: string;
  telegramChatId: number | string;
  telegramUsername?: string;
  linkedAt: string;
  pendingOrdersCount: number;
  weeklyRevenue: string;
}

// In-memory registry with pre-populated demo creator (Amina Spices)
const sellerLinkRegistry = new Map<string, LinkedSellerProfile>([
  [
    "default_seller",
    {
      sellerId: "seller_amina_01",
      storeName: "Amina Spices",
      sellerName: "Amina",
      telegramChatId: "default",
      telegramUsername: "amina_spices",
      linkedAt: new Date().toISOString(),
      pendingOrdersCount: 2,
      weeklyRevenue: "₹4,850",
    },
  ],
]);

// Maps Telegram Chat ID -> Seller Profile ID
const chatToSellerMap = new Map<string, string>();

/**
 * Generate a deep-link start token for the seller
 * Format: LINK_<sellerId>
 */
export function generateTelegramLinkToken(sellerId: string = "seller_amina_01"): string {
  return `LINK_${sellerId}`;
}

/**
 * Link a Telegram Chat ID to a seller profile
 */
export function linkTelegramChatToSeller(
  chatId: number | string,
  startPayload: string,
  telegramUsername?: string
): LinkedSellerProfile | null {
  const sellerId = startPayload.replace(/^LINK_/, "").trim();
  const idToUse = sellerId || "seller_amina_01";

  const profile: LinkedSellerProfile = {
    sellerId: idToUse,
    storeName: "Amina Spices",
    sellerName: "Amina",
    telegramChatId: String(chatId),
    telegramUsername,
    linkedAt: new Date().toISOString(),
    pendingOrdersCount: 2,
    weeklyRevenue: "₹4,850",
  };

  sellerLinkRegistry.set(idToUse, profile);
  chatToSellerMap.set(String(chatId), idToUse);
  return profile;
}

/**
 * Get linked seller profile by Telegram Chat ID
 */
export function getSellerByTelegramChatId(chatId: number | string): LinkedSellerProfile {
  const sellerId = chatToSellerMap.get(String(chatId)) || "default_seller";
  const profile = sellerLinkRegistry.get(sellerId);

  if (profile) return profile;

  return {
    sellerId: "seller_amina_01",
    storeName: "Amina Spices",
    sellerName: "Amina",
    telegramChatId: String(chatId),
    linkedAt: new Date().toISOString(),
    pendingOrdersCount: 2,
    weeklyRevenue: "₹4,850",
  };
}

/**
 * Check if a specific Telegram Chat ID is linked
 */
export function isTelegramChatLinked(chatId: number | string): boolean {
  return chatToSellerMap.has(String(chatId));
}
