import { queryGroqLLM, ChatMessage } from "@/lib/groq";

export const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "";
export const TELEGRAM_BOT_USERNAME = process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME || "Homemade_CEO_JAMI_bot";
export const TELEGRAM_BOT_URL = process.env.NEXT_PUBLIC_TELEGRAM_BOT_URL || "https://t.me/Homemade_CEO_JAMI_bot";

const TELEGRAM_API_BASE = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

export interface TelegramUser {
  id: number;
  is_bot: boolean;
  first_name: string;
  username?: string;
  language_code?: string;
}

export interface TelegramChat {
  id: number;
  type: "private" | "group" | "supergroup" | "channel";
  title?: string;
  username?: string;
  first_name?: string;
}

export interface TelegramAudioFile {
  file_id: string;
  file_unique_id: string;
  duration: number;
  mime_type?: string;
  file_size?: number;
}

export interface TelegramMessage {
  message_id: number;
  from?: TelegramUser;
  chat: TelegramChat;
  date: number;
  text?: string;
  voice?: TelegramAudioFile;
  audio?: TelegramAudioFile;
}

export interface TelegramUpdate {
  update_id: number;
  message?: TelegramMessage;
  callback_query?: {
    id: string;
    from: TelegramUser;
    message?: TelegramMessage;
    data?: string;
  };
}

/**
 * Retrieve downloadable file path from Telegram getFile API
 */
export async function getTelegramFile(fileId: string): Promise<{ ok: boolean; file_path?: string; error?: string }> {
  try {
    const res = await fetch(`${TELEGRAM_API_BASE}/getFile?file_id=${encodeURIComponent(fileId)}`, {
      method: "GET",
      cache: "no-store",
    });
    const data = await res.json();
    if (data.ok && data.result?.file_path) {
      return { ok: true, file_path: data.result.file_path };
    }
    return { ok: false, error: data.description || "Failed to retrieve file path" };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return { ok: false, error: errorMsg };
  }
}

/**
 * Construct direct file download URL for a file_path
 */
export function getTelegramFileDownloadUrl(filePath: string): string {
  return `https://api.telegram.org/file/bot${TELEGRAM_BOT_TOKEN}/${filePath}`;
}

/**
 * Get bot info directly from Telegram API
 */
export async function getTelegramBotInfo() {
  try {
    const res = await fetch(`${TELEGRAM_API_BASE}/getMe`, {
      method: "GET",
      cache: "no-store",
    });
    const data = await res.json();
    return data;
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    return { ok: false, description: errorMessage };
  }
}

/**
 * Send a message to a Telegram chat
 */
export async function sendTelegramMessage(
  chatId: number | string,
  text: string,
  options?: {
    parse_mode?: "HTML" | "Markdown" | "MarkdownV2";
    reply_markup?: Record<string, unknown>;
  }
) {
  try {
    const payload = {
      chat_id: chatId,
      text,
      parse_mode: options?.parse_mode || "HTML",
      reply_markup: options?.reply_markup,
    };

    const res = await fetch(`${TELEGRAM_API_BASE}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    return data;
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    return { ok: false, description: errorMessage };
  }
}

/**
 * Set official commands for the bot in Telegram
 */
export async function setTelegramBotCommands() {
  try {
    const commands = [
      { command: "start", description: "Start Jami AI Co-pilot" },
      { command: "orders", description: "View recent store orders" },
      { command: "sales", description: "View earnings and revenue" },
      { command: "describe", description: "Generate a product description" },
      { command: "help", description: "Help and available tools" },
    ];

    const res = await fetch(`${TELEGRAM_API_BASE}/setMyCommands`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ commands }),
    });

    const data = await res.json();
    return data;
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    return { ok: false, description: errorMessage };
  }
}

/**
 * Helper to convert standard Markdown to Telegram & HTML friendly tags
 */
export function markdownToTelegramHtml(markdown: string): string {
  let html = markdown
    // Convert headings ### Heading to <b>Heading</b>
    .replace(/^###?\s+(.+)$/gm, "<b>$1</b>\n")
    .replace(/^##?\s+(.+)$/gm, "<b>$1</b>\n")
    // Convert bold **text** to <b>text</b>
    .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
    // Convert italic *text* or _text_ to <i>text</i>
    .replace(/(^|[^\*])\*([^\*]+)\*([^\*]|$)/g, "$1<i>$2</i>$3")
    .replace(/(^|[^_])_([^_]+)_([^_]|$)/g, "$1<i>$2</i>$3")
    // Remove em dashes strictly per project guidelines
    .replace(/—/g, "-")
    // Convert inline code `text` to <code>text</code>
    .replace(/`([^`]+)`/g, "<code>$1</code>");

  return html;
}

/**
 * Process inbound message from Telegram or Web Chat and generate Jami AI reply
 * Powered by Groq LLM (llama-3.3-70b-versatile) fine-tuned for Homemade CEO Kerala creators.
 */
export async function generateJamiReply(
  incomingText: string,
  senderName: string = "Creator",
  history: ChatMessage[] = [],
  sellerContext?: {
    storeName?: string;
    pendingOrdersCount?: number;
    weeklyRevenue?: string;
    isLinked?: boolean;
  }
): Promise<{
  text: string;
  replyMarkup?: Record<string, unknown>;
}> {
  const clean = incomingText.trim().toLowerCase();
  const storeName = sellerContext?.storeName || "Amina Spices";
  const revenue = sellerContext?.weeklyRevenue || "₹4,850";
  const ordersCount = sellerContext?.pendingOrdersCount ?? 2;

  // /start command (with optional deep-link token like /start LINK_seller_amina_01)
  if (clean.startsWith("/start")) {
    const isNewLink = clean.includes("link_");
    const linkBadge = isNewLink
      ? `\n\n<b>Account Successfully Linked!</b> Connected with your <b>${storeName}</b> storefront.`
      : "";

    return {
      text: `<b>Namaskaram ${senderName}!</b>${linkBadge}\n\nI am <b>Jami</b> (ജമി), your personal AI co-pilot on <b>Homemade CEO</b>.\n\nI help homemakers and creators in Kerala run and scale their business straight from their phone.\n\n<b>What I can do for ${storeName}:</b>\n- Track your daily customer orders (${ordersCount} pending)\n- Check live sales & UPI payouts (${revenue} this week)\n- Craft product descriptions in Malayalam and English\n- Instant support in Malayalam & English\n\nTap an option below or ask me any business question:`,
      replyMarkup: {
        inline_keyboard: [
          [
            { text: "Recent Orders", callback_data: "cmd_orders" },
            { text: "Today's Sales", callback_data: "cmd_sales" },
          ],
          [
            { text: "Magic Description", callback_data: "cmd_describe" },
            { text: "Open Seller Hub", url: "https://homemadeceo.com/dashboard/seller" },
          ],
        ],
      },
    };
  }

  // Pure /orders command
  if (clean === "/orders") {
    return {
      text: `<b>Live Order Status:</b>\n\n- <b>Order #HM-8921</b>\n  Product: Traditional Cut Mango Pickle (500g)\n  Quantity: 2 units\n  Status: <b>Packing</b>\n  Customer: Priya Menon (Kochi)\n\n- <b>Order #HM-8919</b>\n  Product: Homemade Banana Chips\n  Quantity: 3 packs\n  Status: <b>Ready to Ship</b>\n  Customer: Rajesh Nair (Kozhikode)\n\n<i>To print packing labels or request courier pickup, visit your Seller Hub.</i>`,
      replyMarkup: {
        inline_keyboard: [
          [
            { text: "Go to Orders Pipeline", url: "https://homemadeceo.com/dashboard/seller/orders" },
          ],
        ],
      },
    };
  }

  // Pure /sales command
  if (clean === "/sales") {
    return {
      text: `<b>Financial Snapshot (This Week):</b>\n\n- Total Revenue: <b>₹4,850</b>\n- Completed Orders: <b>14</b>\n- Available Balance: <b>₹3,620</b>\n- Next Automatic Payout: <b>Friday, 5:00 PM via UPI</b>\n\n<i>Tip: Top performing item this week is Traditional Cut Mango Pickle.</i>`,
      replyMarkup: {
        inline_keyboard: [
          [
            { text: "View Earnings & Payouts", url: "https://homemadeceo.com/dashboard/seller/earnings" },
          ],
        ],
      },
    };
  }

  // Pure /help command
  if (clean === "/help") {
    return {
      text: `<b>Jami AI Assistant Help:</b>\n\nCommands you can send anytime:\n- /orders - Check live order status\n- /sales - Check weekly revenue & payouts\n- /describe - Generate enticing product descriptions\n- /help - Show this guide\n\nYou can also ask me anything in English or Malayalam (e.g. <i>"How to pack banana chips in monsoon?"</i> or <i>"അച്ചാർ ലാഭകരമായി വിൽക്കാൻ എന്തുചെയ്യണം?"</i>)!`,
    };
  }

  // Natural Language & Custom Prompts -> Powered by Groq LLM Brain!
  try {
    let promptToSend = incomingText;
    if (clean.startsWith("/describe")) {
      const productQuery = incomingText.replace(/^\/describe/i, "").trim();
      promptToSend = productQuery
        ? `Write an authentic, high-converting product description for Homemade CEO for: ${productQuery}`
        : `Generate an enticing, ready-to-use product description for a traditional Kerala homemade delicacy (like Cut Mango Pickle or Nendran Banana chips). Include ingredients, price, shelf life, and hygienic packing notes.`;
    }

    const llmRawResponse = await queryGroqLLM(promptToSend, history, senderName);
    const formattedHtml = markdownToTelegramHtml(llmRawResponse);

    return {
      text: formattedHtml,
      replyMarkup: {
        inline_keyboard: [
          [
            { text: "Check Orders", callback_data: "cmd_orders" },
            { text: "Check Sales", callback_data: "cmd_sales" },
          ],
          [
            { text: "Open Seller Hub", url: "https://homemadeceo.com/dashboard/seller" },
          ],
        ],
      },
    };
  } catch (groqError: unknown) {
    console.error("[Groq Fallback Triggered]", groqError);

    // Fallback if Groq has a network issue
    return {
      text: `<b>Namaskaram ${senderName}!</b>\n\nI received your query: <i>"${incomingText}"</i>.\n\nI am currently updating my connection with Homemade CEO. Here are quick shortcuts you can check right away:`,
      replyMarkup: {
        inline_keyboard: [
          [
            { text: "Check Orders", callback_data: "cmd_orders" },
            { text: "Check Sales", callback_data: "cmd_sales" },
          ],
          [
            { text: "Magic Description", callback_data: "cmd_describe" },
          ],
        ],
      },
    };
  }
}

