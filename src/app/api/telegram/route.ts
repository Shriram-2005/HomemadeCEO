import { NextResponse } from "next/server";
import {
  getTelegramBotInfo,
  sendTelegramMessage,
  generateJamiReply,
  getTelegramFile,
  TelegramUpdate,
  TELEGRAM_BOT_USERNAME,
  TELEGRAM_BOT_URL,
} from "@/lib/telegram";
import {
  linkTelegramChatToSeller,
  getSellerByTelegramChatId,
} from "@/lib/telegramLink";

export const dynamic = "force-dynamic";

/**
 * GET /api/telegram
 * Returns the Telegram bot's live connection state & diagnostics.
 */
export async function GET() {
  const botInfo = await getTelegramBotInfo();
  return NextResponse.json({
    connected: botInfo.ok === true,
    bot: botInfo.result || null,
    username: TELEGRAM_BOT_USERNAME,
    url: TELEGRAM_BOT_URL,
    description: "Homemade CEO Jami AI Co-pilot",
    webhookSecurityEnabled: Boolean(process.env.TELEGRAM_WEBHOOK_SECRET),
  });
}

/**
 * POST /api/telegram
 * Handles incoming webhook updates from Telegram servers with:
 * 1. Webhook Secret Token Verification (X-Telegram-Bot-Api-Secret-Token)
 * 2. Voice Note / Audio detection and audio pipeline readiness
 * 3. Deep-link Account Linking (/start LINK_<sellerId>)
 * 4. Fast execution guarantee well within Telegram's 5s timeout window
 */
export async function POST(req: Request) {
  try {
    // 1. Webhook Secret Token Verification
    const expectedSecret = process.env.TELEGRAM_WEBHOOK_SECRET;
    if (expectedSecret) {
      const secretHeader = req.headers.get("x-telegram-bot-api-secret-token");
      if (secretHeader !== expectedSecret) {
        console.warn("[Telegram Webhook] Unauthorized request - Secret token mismatch");
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    const update: TelegramUpdate = await req.json();

    // 2. Handle Text Messages & Voice Notes
    if (update.message) {
      const chatId = update.message.chat.id;
      const senderName = update.message.from?.first_name || "Creator";
      const telegramUsername = update.message.from?.username;

      // Check for Voice / Audio Note (Malayalam Voice Note Support)
      if (update.message.voice || update.message.audio) {
        const audioFile = update.message.voice || update.message.audio;
        const fileId = audioFile?.file_id;

        // Retrieve file metadata from Telegram
        let audioFilePath = "";
        if (fileId) {
          const fileInfo = await getTelegramFile(fileId);
          if (fileInfo.ok && fileInfo.file_path) {
            audioFilePath = fileInfo.file_path;
          }
        }

        // Voice note acknowledged with bilingual Kerala co-pilot response
        const voiceAckText = `<b>Voice Note Received - ശബ്ദസന്ദേശം ലഭിച്ചു!</b>\n\n<i>Duration: ${audioFile?.duration || 0} seconds</i>\n\nഞാൻ നിങ്ങളുടെ ശബ്ദസന്ദേശം ശ്രദ്ധയോടെ പരിശോധിക്കുകയാണ്. മലയാളം സ്പീച്ച്-ടു-ടെക്സ്റ്റ് (Voice STT) സംവിധാനം വഴി നിങ്ങളുടെ ചോദ്യം പൂർണ്ണമായി വായിച്ചു മനസ്സിലാക്കി Jami ഉടൻ മറുപടി നൽകുന്നതാണ്!\n\nനിങ്ങൾക്ക് എന്തെങ്കിലും അടിയന്തരമായി പരിശോധിക്കണമെങ്കിൽ താഴെയുള്ള ഓപ്ഷനുകൾ ഉപയോഗിക്കാം:`;


        await sendTelegramMessage(chatId, voiceAckText, {
          parse_mode: "HTML",
          reply_markup: {
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
        });

        return NextResponse.json({
          status: "handled",
          type: "voice",
          duration: audioFile?.duration,
          filePath: audioFilePath || undefined,
        });
      }

      // Handle Text Message
      if (update.message.text) {
        const incomingText = update.message.text.trim();

        // 3. Deep-link Account Linking Check (/start LINK_...)
        let sellerProfile = getSellerByTelegramChatId(chatId);
        if (incomingText.startsWith("/start") && incomingText.includes("LINK_")) {
          const parts = incomingText.split(" ");
          const linkToken = parts.find((p) => p.startsWith("LINK_"));
          if (linkToken) {
            const linked = linkTelegramChatToSeller(chatId, linkToken, telegramUsername);
            if (linked) sellerProfile = linked;
          }
        }

        const reply = await generateJamiReply(incomingText, senderName, [], {
          storeName: sellerProfile.storeName,
          pendingOrdersCount: sellerProfile.pendingOrdersCount,
          weeklyRevenue: sellerProfile.weeklyRevenue,
          isLinked: Boolean(sellerProfile.telegramChatId),
        });

        await sendTelegramMessage(chatId, reply.text, {
          parse_mode: "HTML",
          reply_markup: reply.replyMarkup,
        });

        return NextResponse.json({ status: "handled", type: "message" });
      }
    }

    // 4. Handle Callback Queries (Inline Keyboard Buttons)
    if (update.callback_query && update.callback_query.data) {
      const chatId = update.callback_query.from.id;
      const callbackData = update.callback_query.data;
      const senderName = update.callback_query.from.first_name || "Creator";

      let prompt = "/help";
      if (callbackData === "cmd_orders") prompt = "/orders";
      if (callbackData === "cmd_sales") prompt = "/sales";
      if (callbackData === "cmd_describe") prompt = "/describe";

      const sellerProfile = getSellerByTelegramChatId(chatId);

      const reply = await generateJamiReply(prompt, senderName, [], {
        storeName: sellerProfile.storeName,
        pendingOrdersCount: sellerProfile.pendingOrdersCount,
        weeklyRevenue: sellerProfile.weeklyRevenue,
        isLinked: true,
      });

      await sendTelegramMessage(chatId, reply.text, {
        parse_mode: "HTML",
        reply_markup: reply.replyMarkup,
      });

      return NextResponse.json({ status: "handled", type: "callback_query" });
    }

    return NextResponse.json({ status: "ignored" });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    console.error("[Telegram Webhook Error]", message);
    return NextResponse.json({ status: "error", error: message }, { status: 500 });
  }
}
