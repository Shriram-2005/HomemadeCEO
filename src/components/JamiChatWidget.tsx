"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Send,
  MessageSquare,
  X,
  Menu,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Clock,
  Radio,
  CheckCircle2,
  Copy,
  Check,
  Package,
  Wallet,
  Zap,
  HelpCircle,
  Camera,
  Mic,
  Settings,
  Plus,
  MessageCircle,
  History,
  Globe,
} from "lucide-react";
import { useLanguageStore } from "@/store/useLanguageStore";
import { dictionaries } from "@/i18n/dictionaries";

interface MessageItem {
  id: string;
  sender: "user" | "jami";
  text: string;
  time: string;
  options?: Array<{ label: string; cmd: string }>;
}

interface ChatHistoryItem {
  id: string;
  title: string;
  time: string;
  preview: string;
}

export function JamiChatWidget() {
  const { language } = useLanguageStore();
  const t = dictionaries[language].dashboard;

  const [isOpen, setIsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [channel, setChannel] = useState<"select" | "telegram" | "whatsapp">("select");

  // Accordion state for sidebar chat history dropdowns
  const [isTelegramHistoryOpen, setIsTelegramHistoryOpen] = useState(true);
  const [isWhatsappHistoryOpen, setIsWhatsappHistoryOpen] = useState(false);

  // Dynamic Chat histories linked to global language
  const telegramHistory: ChatHistoryItem[] = [
    {
      id: "th-1",
      title: t.th1Title,
      time: language === "ml" ? "ഇന്ന്, 2:15 PM" : "Today, 2:15 PM",
      preview: t.th1Preview,
    },
    {
      id: "th-2",
      title: t.th2Title,
      time: language === "ml" ? "ഇന്നലെ" : "Yesterday",
      preview: t.th2Preview,
    },
    {
      id: "th-3",
      title: t.th3Title,
      time: language === "ml" ? "ഒക്ടോ 9" : "Oct 9",
      preview: t.th3Preview,
    },
  ];

  const whatsappHistory: ChatHistoryItem[] = [
    {
      id: "wh-1",
      title: t.wh1Title,
      time: t.jamiSoonStatus,
      preview: t.wh1Preview,
    },
    {
      id: "wh-2",
      title: t.wh2Title,
      time: t.jamiSoonStatus,
      preview: t.wh2Preview,
    },
    {
      id: "wh-3",
      title: t.wh3Title,
      time: t.jamiSoonStatus,
      preview: t.wh3Preview,
    },
  ];

  const [messages, setMessages] = useState<MessageItem[]>([]);

  // Dynamically synchronize welcome message when language toggles from header
  useEffect(() => {
    setMessages((prev) => {
      // If empty or only contains the initial welcome message, refresh in current language
      if (prev.length === 0 || (prev.length === 1 && prev[0].id === "msg-welcome")) {
        return [
          {
            id: "msg-welcome",
            sender: "jami",
            text: t.jamiWelcomeMessage,
            time: language === "ml" ? "ഇപ്പോൾ" : "Just now",
            options: [
              { label: language === "ml" ? "ഓർഡറുകൾ" : "Orders", cmd: "/orders" },
              { label: language === "ml" ? "വിൽപ്പന" : "Sales", cmd: "/sales" },
              { label: language === "ml" ? "മാജിക് വിവരണം" : "Magic Description", cmd: "/describe" },
              { label: language === "ml" ? "സഹായം" : "Help", cmd: "/help" },
            ],
          },
        ];
      }
      return prev;
    });
  }, [language, t.jamiWelcomeMessage]);

  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (channel === "telegram") {
      scrollToBottom();
    }
  }, [messages, isTyping, channel]);

  // Lock background scrolling on mobile when Jami chat is open
  useEffect(() => {
    if (isOpen) {
      const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
      if (isMobile) {
        const prevOverflow = document.body.style.overflow;
        const prevTouchAction = document.body.style.touchAction;

        document.body.style.overflow = "hidden";
        document.body.style.touchAction = "none";

        return () => {
          document.body.style.overflow = prevOverflow;
          document.body.style.touchAction = prevTouchAction;
        };
      }
    }
  }, [isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isTyping) return;

    const userMsg: MessageItem = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText("");
    setIsTyping(true);

    try {
      const history = messages.slice(-6).map((m) => ({
        role: m.sender === "user" ? ("user" as const) : ("assistant" as const),
        content: m.text.replace(/<[^>]*>/g, ""),
      }));

      const res = await fetch("/api/telegram/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, senderName: "Amina", history }),
      });
      const data = await res.json();

      let replyText = data?.reply || "I received your message and have updated your business notes.";
      replyText = replyText.replace(/\n/g, "<br/>");

      // Extract inline buttons if returned
      const inlineButtons: Array<{ label: string; cmd: string }> = [];
      if (data?.replyMarkup?.inline_keyboard && Array.isArray(data.replyMarkup.inline_keyboard)) {
        for (const row of data.replyMarkup.inline_keyboard) {
          if (Array.isArray(row)) {
            for (const btn of row) {
              if (btn.text && (btn.callback_data || btn.url)) {
                inlineButtons.push({
                  label: btn.text,
                  cmd: btn.callback_data ? `/${btn.callback_data.replace("cmd_", "")}` : btn.text,
                });
              }
            }
          }
        }
      }

      const jamiMsg: MessageItem = {
        id: `jami-${Date.now()}`,
        sender: "jami",
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        options: inlineButtons.length > 0 ? inlineButtons : undefined,
      };

      setMessages((prev) => [...prev, jamiMsg]);
    } catch {
      const errorMsg: MessageItem = {
        id: `jami-err-${Date.now()}`,
        sender: "jami",
        text: language === "ml"
          ? "നെറ്റ്‌വർക്ക് കണക്റ്റുചെയ്യുന്നതിൽ തടസ്സമുണ്ട്. ദയവായി അൽപ്പസമയത്തിന് ശേഷം വീണ്ടും ശ്രമിക്കുക."
          : "I am having trouble connecting to the network right now. Please try again shortly.",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSelectHistoryItem = (item: ChatHistoryItem, targetChannel: "telegram" | "whatsapp") => {
    setChannel(targetChannel);
    setIsSidebarOpen(false);

    if (targetChannel === "telegram") {
      const topicMsg: MessageItem = {
        id: `topic-${Date.now()}`,
        sender: "jami",
        text: `${t.switchedToConversation} <b>${item.title}</b>.<br/><i>${item.preview}</i>`,
        time: item.time,
      };
      setMessages((prev) => [...prev, topicMsg]);
    }
  };

  const handleCopy = (id: string, text: string) => {
    const cleanText = text.replace(/<[^>]*>/g, "");
    navigator.clipboard.writeText(cleanText);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <>
      {/* Floating Action Button (FAB) */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="jami-fab-btn"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-[80px] md:bottom-8 right-4 md:right-8 z-[110] bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white w-14 h-14 rounded-full shadow-[0_0_20px_rgba(147,51,234,0.4)] hover:shadow-[0_0_30px_rgba(147,51,234,0.7)] hover:scale-105 transition-all duration-300 flex items-center justify-center overflow-hidden shrink-0 group"
            title="Chat with Jami AI"
          >
            <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform shrink-0" />
            <span className="sr-only">Open Jami AI</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Mobile Backdrop - positioned below header so main header stays completely visible */}
            <motion.div
              key="jami-mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed top-16 inset-x-0 bottom-0 bg-black/40 z-[95] md:hidden backdrop-blur-xs overscroll-none touch-none"
            />

            <motion.div
              key="jami-chat-panel"
              initial={{ clipPath: "circle(28px at calc(100% - 40px) calc(100% - 40px))", opacity: 0 }}
              animate={{ clipPath: "circle(150% at calc(100% - 40px) calc(100% - 40px))", opacity: 1 }}
              exit={{ clipPath: "circle(28px at calc(100% - 40px) calc(100% - 40px))", opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              className="origin-bottom-right fixed top-16 bottom-[72px] md:bottom-0 left-0 right-0 md:top-auto md:left-auto md:right-8 md:bottom-8 md:w-[420px] md:h-[650px] z-[98] bg-background md:border md:border-border/60 md:rounded-3xl shadow-2xl flex flex-col overflow-hidden overscroll-contain touch-manipulation"
            >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-4 flex items-center justify-between text-white shadow-md z-10 shrink-0">
              <div className="flex items-center gap-2.5 min-w-0">
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="p-1.5 hover:bg-white/20 rounded-md transition-colors shrink-0 -ml-1.5"
                  title="Menu"
                >
                  <Menu className="w-5 h-5 text-white" />
                </button>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-base leading-tight truncate">{t.jamiAI}</h3>
                    {channel === "telegram" && (
                      <span className="inline-flex items-center gap-1 bg-emerald-400/20 text-emerald-200 border border-emerald-400/30 text-[10px] px-2 py-0.5 rounded-full font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        {t.channelTelegram}
                      </span>
                    )}
                    {channel === "whatsapp" && (
                      <span className="inline-flex items-center gap-1 bg-amber-400/20 text-amber-200 border border-amber-400/30 text-[10px] px-2 py-0.5 rounded-full font-medium">
                        <Clock className="w-2.5 h-2.5" />
                        {t.channelWhatsapp}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] font-medium text-blue-100 truncate">
                    {channel === "select"
                      ? t.selectChannelSubtitle
                      : channel === "telegram"
                      ? "@Homemade_CEO_JAMI_bot"
                      : t.whatsappComingSoonBadge}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {channel !== "select" && (
                  <button
                    onClick={() => setChannel("select")}
                    className="text-xs bg-white/15 hover:bg-white/25 text-white px-2.5 py-1 rounded-full font-medium transition-colors"
                  >
                    {t.switchChannel}
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-white/20 rounded-full transition-colors shrink-0 ml-0.5"
                  title="Close"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Sidebar Drawer Menu with Chat History Dropdowns */}
            <AnimatePresence>
              {isSidebarOpen && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsSidebarOpen(false)}
                    className="absolute inset-0 bg-black/40 z-20 backdrop-blur-sm"
                  />
                  <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "-100%" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="absolute top-0 left-0 bottom-0 w-[290px] bg-background z-30 shadow-2xl flex flex-col border-r border-border/50"
                  >
                    {/* Drawer Header */}
                    <div className="p-4 border-b border-border/50 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-purple-600" />
                        <span className="font-bold font-heading text-base">Jami AI</span>
                      </div>
                      <button onClick={() => setIsSidebarOpen(false)} className="p-1.5 hover:bg-muted rounded-full">
                        <X className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </div>

                    {/* Drawer Content */}
                    <div className="p-4 flex-1 overflow-y-auto space-y-4">
                      <button
                        onClick={() => {
                          setChannel("select");
                          setIsSidebarOpen(false);
                        }}
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-95 text-white p-2.5 rounded-xl font-medium transition-opacity shadow-sm text-xs sm:text-sm"
                      >
                        <Plus className="w-4 h-4" />
                        {t.switchChannel}
                      </button>

                      {/* Dropdown 1: Telegram Option with Chat History */}
                      <div className="border border-border/60 rounded-xl overflow-hidden bg-card shadow-xs">
                        <button
                          onClick={() => setIsTelegramHistoryOpen(!isTelegramHistoryOpen)}
                          className="w-full p-3 flex items-center justify-between hover:bg-muted/50 transition-colors text-left"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-7 h-7 rounded-lg bg-blue-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                              <Send className="w-3.5 h-3.5" />
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="font-bold text-xs sm:text-sm text-foreground truncate">
                                  {t.channelTelegram}
                                </span>
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                              </div>
                              <span className="text-[10px] text-muted-foreground block truncate">
                                {t.telegramChatHistory}
                              </span>
                            </div>
                          </div>
                          <motion.div
                            animate={{ rotate: isTelegramHistoryOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="shrink-0 text-muted-foreground ml-2"
                          >
                            <ChevronDown className="w-4 h-4" />
                          </motion.div>
                        </button>

                        <AnimatePresence>
                          {isTelegramHistoryOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="border-t border-border/40 bg-muted/20 overflow-hidden"
                            >
                              <div className="p-2 space-y-1">
                                {telegramHistory.map((item) => (
                                  <button
                                    key={item.id}
                                    onClick={() => handleSelectHistoryItem(item, "telegram")}
                                    className="w-full text-left p-2 rounded-lg hover:bg-muted transition-colors group flex items-start gap-2"
                                  >
                                    <MessageCircle className="w-3.5 h-3.5 text-blue-500 mt-0.5 shrink-0" />
                                    <div className="min-w-0 flex-1">
                                      <p className="text-xs font-medium text-foreground truncate group-hover:text-blue-600 transition-colors">
                                        {item.title}
                                      </p>
                                      <p className="text-[10px] text-muted-foreground truncate">
                                        {item.time}
                                      </p>
                                    </div>
                                  </button>
                                ))}

                                <button
                                  onClick={() => {
                                    setChannel("telegram");
                                    setIsSidebarOpen(false);
                                  }}
                                  className="w-full mt-1 p-2 rounded-lg text-left text-[11px] font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-500/10 flex items-center gap-1.5 transition-colors"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                  <span>{t.jamiStartNewChat}</span>
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Dropdown 2: WhatsApp Option with Chat History */}
                      <div className="border border-border/60 rounded-xl overflow-hidden bg-card shadow-xs">
                        <button
                          onClick={() => setIsWhatsappHistoryOpen(!isWhatsappHistoryOpen)}
                          className="w-full p-3 flex items-center justify-between hover:bg-muted/50 transition-colors text-left"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                              <MessageSquare className="w-3.5 h-3.5" />
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="font-bold text-xs sm:text-sm text-foreground truncate">
                                  {t.channelWhatsapp}
                                </span>
                                <span className="text-[9px] bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 px-1.5 py-0.2 rounded-full font-bold">
                                  {t.jamiSoonStatus}
                                </span>
                              </div>
                              <span className="text-[10px] text-muted-foreground block truncate">
                                {t.whatsappChatHistory}
                              </span>
                            </div>
                          </div>
                          <motion.div
                            animate={{ rotate: isWhatsappHistoryOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="shrink-0 text-muted-foreground ml-2"
                          >
                            <ChevronDown className="w-4 h-4" />
                          </motion.div>
                        </button>

                        <AnimatePresence>
                          {isWhatsappHistoryOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="border-t border-border/40 bg-muted/20 overflow-hidden"
                            >
                              <div className="p-2 space-y-1">
                                {whatsappHistory.map((item) => (
                                  <button
                                    key={item.id}
                                    onClick={() => handleSelectHistoryItem(item, "whatsapp")}
                                    className="w-full text-left p-2 rounded-lg hover:bg-muted transition-colors group flex items-start gap-2"
                                  >
                                    <MessageSquare className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                                    <div className="min-w-0 flex-1">
                                      <p className="text-xs font-medium text-foreground truncate group-hover:text-emerald-600 transition-colors">
                                        {item.title}
                                      </p>
                                      <p className="text-[10px] text-muted-foreground truncate">
                                        {item.time}
                                      </p>
                                    </div>
                                  </button>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Drawer Footer */}
                    <div className="p-3 border-t border-border/50 text-[11px] text-muted-foreground flex items-center gap-2">
                      <Radio className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{t.jamiEngineOnline}</span>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            {/* Content Body Based on Selected Channel */}
            <div className="flex-1 overflow-y-auto overscroll-contain touch-pan-y bg-muted/20 flex flex-col relative">
              {/* STATE 1: CHANNEL SELECTOR - EXACTLY 2 CARDS SIDE BY SIDE */}
              {channel === "select" && (
                <div className="p-5 flex-1 flex flex-col justify-center items-center">
                  <div className="w-full max-w-xs text-center mb-6">
                    <h3 className="text-sm sm:text-base font-bold font-heading text-foreground mb-1">
                      {t.selectChannel}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {t.selectChannelSubtitle}
                    </p>
                  </div>

                  {/* 2 Cards Strictly Side by Side */}
                  <div className="grid grid-cols-2 gap-3.5 w-full max-w-xs">
                    {/* Card 1: Telegram */}
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setChannel("telegram")}
                      className="p-4 rounded-2xl bg-card border-2 border-blue-500/40 hover:border-blue-500 shadow-sm flex flex-col items-center justify-center text-center transition-all group aspect-square"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-blue-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <Send className="w-6 h-6" />
                      </div>
                      <span className="font-bold text-xs sm:text-sm text-foreground">
                        {t.channelTelegram}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        {t.jamiOnlineStatus}
                      </span>
                    </motion.button>

                    {/* Card 2: WhatsApp */}
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setChannel("whatsapp")}
                      className="p-4 rounded-2xl bg-card border border-border/70 hover:border-amber-500/50 shadow-sm flex flex-col items-center justify-center text-center transition-all group aspect-square"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <MessageSquare className="w-6 h-6" />
                      </div>
                      <span className="font-bold text-xs sm:text-sm text-foreground">
                        {t.channelWhatsapp}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-600 dark:text-amber-400 mt-1">
                        <Clock className="w-2.5 h-2.5" />
                        {t.jamiSoonStatus}
                      </span>
                    </motion.button>
                  </div>
                </div>
              )}

              {/* STATE 2: WHATSAPP COMING SOON VIEW */}
              {channel === "whatsapp" && (
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <button
                      onClick={() => setChannel("select")}
                      className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mb-4 transition-colors font-medium"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      {t.switchChannel}
                    </button>

                    <div className="w-14 h-14 rounded-2xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4">
                      <Clock className="w-7 h-7" />
                    </div>

                    <div className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs px-2.5 py-1 rounded-full font-bold mb-3">
                      {t.whatsappComingSoonBadge}
                    </div>

                    <h3 className="text-xl font-bold font-heading mb-2">
                      {t.whatsappComingSoonTitle}
                    </h3>

                    <p className="text-xs md:text-sm text-muted-foreground mb-6 leading-relaxed">
                      {t.whatsappComingSoonDesc}
                    </p>

                    <div className="space-y-3 bg-card border border-border/60 rounded-2xl p-4">
                      <div className="flex items-start gap-2.5 text-xs">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{t.whatsappBenefit1}</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-xs">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{t.whatsappBenefit2}</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-xs">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{t.whatsappBenefit3}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6">
                    <button
                      onClick={() => setChannel("telegram")}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-4 rounded-xl text-xs md:text-sm transition-all shadow-md flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      {t.useTelegramInstead}
                    </button>
                  </div>
                </div>
              )}

              {/* STATE 3: TELEGRAM BOT CHAT INTERFACE */}
              {channel === "telegram" && (
                <div className="flex-1 flex flex-col justify-between p-4 space-y-4">
                  {/* Message History */}
                  <div className="space-y-3 overflow-y-auto flex-1 pr-1">
                    {messages.map((m) => {
                      const isUser = m.sender === "user";
                      return (
                        <div
                          key={m.id}
                          className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                        >
                          <div
                            className={`max-w-[85%] rounded-2xl p-3.5 text-xs md:text-sm leading-relaxed shadow-sm relative group ${
                              isUser
                                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-none"
                                : "bg-card border border-border/60 text-foreground rounded-bl-none"
                            }`}
                          >
                            <div
                              dangerouslySetInnerHTML={{ __html: m.text }}
                              className="break-words space-y-1"
                            />

                            {!isUser && (
                              <button
                                onClick={() => handleCopy(m.id, m.text)}
                                className="absolute top-2 right-2 p-1 rounded-md opacity-0 group-hover:opacity-100 hover:bg-muted text-muted-foreground transition-all"
                                title="Copy response"
                              >
                                {copiedId === m.id ? (
                                  <Check className="w-3 h-3 text-emerald-500" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </button>
                            )}

                            {m.options && m.options.length > 0 && (
                              <div className="mt-3 pt-2 border-t border-border/40 flex flex-wrap gap-1.5">
                                {m.options.map((opt) => (
                                  <button
                                    key={opt.cmd}
                                    onClick={() => handleSendMessage(opt.cmd)}
                                    className="bg-muted hover:bg-blue-500/10 text-foreground hover:text-blue-600 dark:hover:text-blue-400 border border-border/50 text-[11px] font-medium px-2.5 py-1 rounded-lg transition-colors"
                                  >
                                    {opt.label}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                          <span className="text-[10px] text-muted-foreground mt-1 px-1">
                            {m.time}
                          </span>
                        </div>
                      );
                    })}

                    {isTyping && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground p-2 bg-card border border-border/50 rounded-xl w-fit">
                        <Sparkles className="w-3.5 h-3.5 text-purple-600 animate-spin" />
                        <span>{t.jamiTyping}</span>
                      </div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>

                  {/* Quick Commands Bar */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 shrink-0 scrollbar-none">
                    <button
                      onClick={() => handleSendMessage("/orders")}
                      className="bg-card hover:bg-muted border border-border/60 text-[11px] font-medium px-2.5 py-1 rounded-lg shrink-0 flex items-center gap-1 transition-colors"
                    >
                      <Package className="w-3 h-3 text-emerald-500" />
                      /orders
                    </button>
                    <button
                      onClick={() => handleSendMessage("/sales")}
                      className="bg-card hover:bg-muted border border-border/60 text-[11px] font-medium px-2.5 py-1 rounded-lg shrink-0 flex items-center gap-1 transition-colors"
                    >
                      <Wallet className="w-3 h-3 text-amber-500" />
                      /sales
                    </button>
                    <button
                      onClick={() => handleSendMessage("/describe")}
                      className="bg-card hover:bg-muted border border-border/60 text-[11px] font-medium px-2.5 py-1 rounded-lg shrink-0 flex items-center gap-1 transition-colors"
                    >
                      <Zap className="w-3 h-3 text-purple-500" />
                      /describe
                    </button>
                    <button
                      onClick={() => handleSendMessage("/help")}
                      className="bg-card hover:bg-muted border border-border/60 text-[11px] font-medium px-2.5 py-1 rounded-lg shrink-0 flex items-center gap-1 transition-colors"
                    >
                      <HelpCircle className="w-3 h-3 text-indigo-500" />
                      /help
                    </button>
                  </div>

                  {/* Input Bar */}
                  <div className="pt-2 border-t border-border/50 bg-background shrink-0">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSendMessage();
                      }}
                      className="flex items-center gap-2"
                    >
                      <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder={t.typeMessagePlaceholder}
                        className="flex-1 bg-muted/50 border border-border/60 rounded-full py-2.5 px-4 text-xs md:text-sm focus:outline-none focus:border-blue-500 transition-colors min-w-0"
                      />

                      <button
                        type="submit"
                        disabled={!inputText.trim() || isTyping}
                        className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white flex items-center justify-center transition-all shadow-md shrink-0"
                        title="Send"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
        )}
      </AnimatePresence>
    </>
  );
}
