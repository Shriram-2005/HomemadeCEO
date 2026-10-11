import { NextResponse } from "next/server";
import {
  sendTelegramMessage,
  getTelegramBotInfo,
  setTelegramBotCommands,
} from "@/lib/telegram";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { chatId, message } = body;

    // First ensure bot commands are registered
    await setTelegramBotCommands();

    if (!chatId) {
      // Just do a health check
      const botInfo = await getTelegramBotInfo();
      return NextResponse.json({
        ok: botInfo.ok === true,
        message: "Bot is connected and active.",
        bot: botInfo.result,
      });
    }

    const testText = message || `<b>Homemade CEO Alert</b>\n\nYour Jami Telegram Bot is connected and active.\nTime: ${new Date().toLocaleTimeString()}`;
    const result = await sendTelegramMessage(chatId, testText);

    return NextResponse.json(result);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Error sending test alert";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
