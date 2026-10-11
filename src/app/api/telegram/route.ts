import { NextResponse } from "next/server";
import {
  getTelegramBotInfo,
  sendTelegramMessage,
  generateJamiReply,
  TelegramUpdate,
  TELEGRAM_BOT_USERNAME,
  TELEGRAM_BOT_URL,
} from "@/lib/telegram";

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
  });
}

/**
 * POST /api/telegram
 * Handles incoming webhook updates from Telegram servers.
 */
export async function POST(req: Request) {
  try {
    const update: TelegramUpdate = await req.json();

    if (update.message && update.message.text) {
      const chatId = update.message.chat.id;
      const incomingText = update.message.text;
      const senderName = update.message.from?.first_name || "Creator";

      const reply = generateJamiReply(incomingText, senderName);

      await sendTelegramMessage(chatId, reply.text, {
        parse_mode: "HTML",
        reply_markup: reply.replyMarkup,
      });

      return NextResponse.json({ status: "handled", type: "message" });
    }

    if (update.callback_query && update.callback_query.data) {
      const chatId = update.callback_query.from.id;
      const callbackData = update.callback_query.data;
      const senderName = update.callback_query.from.first_name || "Creator";

      let prompt = "/help";
      if (callbackData === "cmd_orders") prompt = "/orders";
      if (callbackData === "cmd_sales") prompt = "/sales";
      if (callbackData === "cmd_describe") prompt = "/describe";

      const reply = generateJamiReply(prompt, senderName);

      await sendTelegramMessage(chatId, reply.text, {
        parse_mode: "HTML",
        reply_markup: reply.replyMarkup,
      });

      return NextResponse.json({ status: "handled", type: "callback_query" });
    }

    return NextResponse.json({ status: "ignored" });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ status: "error", error: message }, { status: 500 });
  }
}
