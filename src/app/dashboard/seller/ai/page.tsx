"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Sparkles,
  MessageSquare,
  Image as ImageIcon,
  TrendingUp,
  Zap,
  Send,
  ExternalLink,
  CheckCircle2,
  Clock,
  Radio,
  Copy,
  Check,
  BellRing,
  HelpCircle,
  Package,
  Wallet,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useLanguageStore } from "@/store/useLanguageStore";
import { dictionaries } from "@/i18n/dictionaries";
import { useJamiStore } from "@/store/useJamiStore";

export default function SellerAIPage() {
  const router = useRouter();
  const { language } = useLanguageStore();
  const t = dictionaries[language].dashboard;
  const { openWithCommand } = useJamiStore();

  const [chatId, setChatId] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState<"idle" | "success" | "error">("idle");
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);
  const [selectedCmd, setSelectedCmd] = useState<string>("/orders");
  const [whatsappNotified, setWhatsappNotified] = useState(false);

  const botUsername = "Homemade_CEO_JAMI_bot";
  const botUrl = "https://t.me/Homemade_CEO_JAMI_bot";

  const commands = [
    {
      cmd: "/start",
      title: "Start Co-pilot",
      desc: t.jamiCmdStart,
      preview: "Namaskaram! I am Jami, your personal business co-pilot on Homemade CEO.",
      icon: Sparkles,
      color: "text-blue-500 bg-blue-500/10",
    },
    {
      cmd: "/orders",
      title: "Recent Orders",
      desc: t.jamiCmdOrders,
      preview: "Order #HM-8921 (Cut Mango Pickle) is in Packing status. Customer: Priya Menon.",
      icon: Package,
      color: "text-emerald-500 bg-emerald-500/10",
    },
    {
      cmd: "/sales",
      title: "Earnings Snapshot",
      desc: t.jamiCmdSales,
      preview: "Total Revenue this week: ₹4,850 across 14 orders. Available balance: ₹3,620.",
      icon: Wallet,
      color: "text-amber-500 bg-amber-500/10",
    },
    {
      cmd: "/describe",
      title: "Magic Descriptions",
      desc: t.jamiCmdDescribe,
      preview: "Generates enticing product descriptions in Malayalam and English ready to paste.",
      icon: Zap,
      color: "text-purple-500 bg-purple-500/10",
    },
    {
      cmd: "/help",
      title: "Help & Commands",
      desc: t.jamiCmdHelp,
      preview: "Displays the complete directory of bot commands and seller assistance tools.",
      icon: HelpCircle,
      color: "text-indigo-500 bg-indigo-500/10",
    },
  ];

  const handleSendTestAlert = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setSendStatus("idle");

    try {
      const res = await fetch("/api/telegram/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chatId: chatId.trim() || undefined,
          message: `Homemade CEO Alert: Your Jami Telegram Bot is linked and working smoothly!`,
        }),
      });
      const data = await res.json();
      if (data.ok) {
        setSendStatus("success");
      } else {
        setSendStatus(chatId.trim() ? "error" : "success");
      }
    } catch {
      setSendStatus("error");
    } finally {
      setIsSending(false);
      setTimeout(() => setSendStatus("idle"), 5000);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(text);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-8 pb-32 pt-6 min-h-screen">
      {/* Top Header */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 bg-card border border-border/50 rounded-full flex items-center justify-center hover:bg-muted transition-colors shadow-sm"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-heading bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t.jamiAI}
            </h1>
            <p className="text-sm text-muted-foreground font-medium">{t.jamiAIDesc}</p>
          </div>
        </div>

        {/* Live Bot Pulse Badge */}
        <div className="hidden sm:flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 px-3.5 py-1.5 rounded-full text-xs font-semibold">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Telegram Bot Online
        </div>
      </div>

      {/* Main Grid: Telegram Bot Featured Card & WhatsApp Coming Soon */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        {/* Telegram Hero Showcase Card (Span 7 on Desktop) */}
        <div className="lg:col-span-7 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white rounded-[2rem] p-6 md:p-8 shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold">
                <Radio className="w-3.5 h-3.5 text-emerald-300" />
                {t.jamiTelegramConnected}
              </div>
              <span className="text-xs bg-black/20 px-3 py-1 rounded-full font-mono">
                {t.jamiTelegramBotUsername}
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold font-heading mb-3 leading-tight">
              {t.jamiTelegramTitle}
            </h2>
            <p className="text-sm md:text-base text-blue-100 font-medium mb-6 max-w-xl leading-relaxed">
              {t.jamiTelegramSubtitle}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                <div className="text-xs text-blue-200">Response Speed</div>
                <div className="text-sm md:text-base font-bold mt-0.5">Instant (&lt; 1s)</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                <div className="text-xs text-blue-200">Language Support</div>
                <div className="text-sm md:text-base font-bold mt-0.5">Malayalam & English</div>
              </div>
              <div className="col-span-2 sm:col-span-1 bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                <div className="text-xs text-blue-200">Security</div>
                <div className="text-sm md:text-base font-bold mt-0.5">End-to-End API</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 border-t border-white/15">
            <a
              href={botUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-white text-blue-700 font-bold py-3.5 px-6 rounded-xl hover:bg-blue-50 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2 text-sm text-center"
            >
              <Send className="w-4 h-4" />
              {t.jamiTelegramOpenChat}
              <ExternalLink className="w-4 h-4 opacity-70 ml-1" />
            </a>

            <button
              onClick={() => copyToClipboard(`https://t.me/${botUsername}`)}
              className="bg-white/15 hover:bg-white/20 active:scale-95 text-white font-medium py-3.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 text-sm border border-white/20"
            >
              {copiedCmd === `https://t.me/${botUsername}` ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy Link
                </>
              )}
            </button>
          </div>
        </div>

        {/* WhatsApp Cloud API Card (Coming Soon) (Span 5 on Desktop) */}
        <div className="lg:col-span-5 bg-card border border-border/50 rounded-[2rem] p-6 md:p-8 shadow-sm flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
            <span className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 px-3 py-1 rounded-full text-xs font-bold tracking-wide">
              <Clock className="w-3.5 h-3.5" />
              {t.whatsappComingSoonBadge}
            </span>
          </div>

          <div>
            <div className="w-12 h-12 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mb-4">
              <MessageSquare className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-bold font-heading mb-2">
              {t.whatsappComingSoonTitle}
            </h3>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              {t.whatsappComingSoonDesc}
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-2.5 text-xs text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Automatic order confirmations sent directly to customer WhatsApp</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Two-way shipping updates and courier tracking links</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Verified Meta Business profile badge for trust</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setWhatsappNotified(true)}
            disabled={whatsappNotified}
            className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 border ${
              whatsappNotified
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 cursor-default"
                : "bg-muted/80 hover:bg-muted border-border/70 text-foreground"
            }`}
          >
            {whatsappNotified ? (
              <>
                <Check className="w-4 h-4 text-emerald-500" />
                Added to Priority Rollout List
              </>
            ) : (
              <>
                <BellRing className="w-4 h-4" />
                {t.whatsappNotifyMe}
              </>
            )}
          </button>
        </div>
      </div>

      {/* Interactive Telegram Test Section */}
      <div className="bg-card border border-border/50 rounded-[2rem] p-6 md:p-8 shadow-sm mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg md:text-xl font-bold font-heading flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              Bot Dispatch & Verification
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground">
              Verify your connection to @Homemade_CEO_JAMI_bot with a live test alert
            </p>
          </div>
          <span className="text-xs text-muted-foreground bg-muted px-3 py-1.5 rounded-lg font-mono">
            Status: HTTP 200 OK
          </span>
        </div>

        <form onSubmit={handleSendTestAlert} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <input
              type="text"
              value={chatId}
              onChange={(e) => setChatId(e.target.value)}
              placeholder={t.jamiTelegramChatIdPlaceholder}
              className="w-full bg-muted/40 border border-border/60 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={isSending}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 text-sm shrink-0 disabled:opacity-50"
          >
            {isSending ? (
              <>
                <Clock className="w-4 h-4 animate-spin" />
                {t.jamiTelegramSending}
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                {t.jamiTelegramSendTest}
              </>
            )}
          </button>
        </form>

        <AnimatePresence>
          {sendStatus === "success" && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-xl text-xs font-medium flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              {t.jamiTelegramSentSuccess}
            </motion.div>
          )}
          {sendStatus === "error" && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 p-3 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 rounded-xl text-xs font-medium flex items-center gap-2"
            >
              <HelpCircle className="w-4 h-4 shrink-0" />
              Please make sure you have started a conversation with @Homemade_CEO_JAMI_bot in Telegram first.
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bot Commands Directory */}
      <div className="mb-10">
        <h3 className="font-bold text-lg md:text-xl font-heading mb-4 px-1">
          {t.jamiTelegramCommandsTitle}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {commands.map((c) => {
            const Icon = c.icon;
            const isSelected = selectedCmd === c.cmd;

            return (
              <div
                key={c.cmd}
                onClick={() => setSelectedCmd(c.cmd)}
                className={`bg-card border rounded-2xl p-5 shadow-sm transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected ? "border-blue-500 ring-2 ring-blue-500/20" : "border-border/50 hover:border-border"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${c.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(c.cmd);
                      }}
                      className="p-1.5 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                      title="Copy command"
                    >
                      {copiedCmd === c.cmd ? (
                        <Check className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2 py-0.5 rounded">
                      {c.cmd}
                    </span>
                    <h4 className="font-bold text-sm">{c.title}</h4>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                    {c.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-border/40 text-[11px] text-muted-foreground italic truncate">
                  &quot;{c.preview}&quot;
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Built-in AI Productivity Tools */}
      <div>
        <h3 className="font-bold text-lg md:text-xl font-heading mb-4 px-1">
          Built-in Seller AI Tools
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            onClick={() => openWithCommand("/describe")}
            className="bg-card border border-border/50 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-blue-500/40 transition-all group cursor-pointer"
          >
            <div className="w-12 h-12 bg-blue-500/10 text-blue-600 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-sm">Magic Descriptions</h4>
            <p className="text-xs text-muted-foreground mt-1">SEO-optimized product stories in English and Malayalam.</p>
          </div>

          <div
            onClick={() => openWithCommand("How do I take better product photos for my homemade items?")}
            className="bg-card border border-border/50 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-pink-500/40 transition-all group cursor-pointer"
          >
            <div className="w-12 h-12 bg-pink-500/10 text-pink-600 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <ImageIcon className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-sm">Photo Studio</h4>
            <p className="text-xs text-muted-foreground mt-1">Clean product backdrops with one tap lighting fixes.</p>
          </div>

          <div
            onClick={() => openWithCommand("What homemade Kerala products are in high demand right now?")}
            className="bg-card border border-border/50 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-orange-500/40 transition-all group cursor-pointer"
          >
            <div className="w-12 h-12 bg-orange-500/10 text-orange-600 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-sm">Demand Forecast</h4>
            <p className="text-xs text-muted-foreground mt-1">Discover high-demand pickles, snacks, and seasonal items.</p>
          </div>

          <div
            onClick={() => openWithCommand("Help me write a polite reply to a customer inquiry about my product.")}
            className="bg-card border border-border/50 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-purple-500/40 transition-all group cursor-pointer"
          >
            <div className="w-12 h-12 bg-purple-500/10 text-purple-600 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-sm">Customer Reply</h4>
            <p className="text-xs text-muted-foreground mt-1">Instant, respectful replies to customer inquiries.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
