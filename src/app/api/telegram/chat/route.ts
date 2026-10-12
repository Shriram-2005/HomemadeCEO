import { NextResponse } from "next/server";
import { generateJamiReply } from "@/lib/telegram";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const message = body.message || "/start";
    const senderName = body.senderName || "Amina";
    const history = Array.isArray(body.history) ? body.history : [];

    const reply = await generateJamiReply(message, senderName, history);

    return NextResponse.json({
      ok: true,
      reply: reply.text,
      replyMarkup: reply.replyMarkup,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error generating reply";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
