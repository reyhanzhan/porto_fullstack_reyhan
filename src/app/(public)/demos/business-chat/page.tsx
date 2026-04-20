"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Send, Bot, User, Loader2 } from "lucide-react";
import Link from "next/link";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  data?: Record<string, unknown>;
  timestamp: Date;
}

// Simulated business data responses
const RESPONSES: Record<string, { content: string; data?: Record<string, unknown> }> = {
  revenue: {
    content:
      "Total pendapatan Q3 2025 adalah **$4.2M**, naik 23% dibanding Q2. Segmen dengan performa terbaik adalah Enterprise SaaS sebesar $2.8M, diikuti SMB sebesar $1.1M dan Professional Services sebesar $0.3M.",
    data: {
      q3Revenue: "$4.2M",
      growth: "+23%",
      segments: { enterprise: "$2.8M", smb: "$1.1M", services: "$0.3M" },
    },
  },
  customers: {
    content:
      "5 pelanggan teratas berdasarkan lifetime value:\n1. **TechCorp Global** — $892K (36 bulan)\n2. **DataFlow Inc** — $654K (24 bulan)\n3. **CloudScale Systems** — $523K (18 bulan)\n4. **Apex Manufacturing** — $498K (30 bulan)\n5. **NovaPay Solutions** — $412K (12 bulan)",
    data: {
      topCustomers: [
        { name: "TechCorp Global", ltv: 892000 },
        { name: "DataFlow Inc", ltv: 654000 },
        { name: "CloudScale Systems", ltv: 523000 },
      ],
    },
  },
  churn: {
    content:
      "Churn rate bulanan saat ini: **2.1%**. Turun dari 3.4% pada kuartal sebelumnya. Pendorong churn utama: 1) ketidaksesuaian product fit (42%), 2) keterbatasan anggaran (31%), 3) pindah ke kompetitor (27%). Rekomendasi: tingkatkan onboarding untuk akun mid-market.",
  },
  pipeline: {
    content:
      "Ringkasan sales pipeline:\n- **Discovery**: 23 deal ($1.8M)\n- **Demo Selesai**: 15 deal ($2.1M)\n- **Proposal Terkirim**: 8 deal ($1.4M)\n- **Negosiasi**: 4 deal ($890K)\n- **Closed Won (bulan ini)**: 6 deal ($720K)\n\nNilai pipeline tertimbang: **$3.2M**",
  },
  default: {
    content:
      "Saya bisa membantu menjawab pertanyaan data bisnis seperti:\n- \"Berapa penjualan Q3?\"\n- \"Tampilkan pelanggan teratas berdasarkan pendapatan\"\n- \"Berapa churn rate kita?\"\n- \"Ringkasan pipeline\"\n\nCoba ajukan salah satu pertanyaan tersebut.",
  },
};

function getResponse(input: string): { content: string; data?: Record<string, unknown> } {
  const lower = input.toLowerCase();
  if (lower.includes("revenue") || lower.includes("sales") || lower.includes("penjualan") || lower.includes("pendapatan") || lower.includes("q3")) return RESPONSES.revenue;
  if (lower.includes("customer") || lower.includes("top") || lower.includes("ltv") || lower.includes("pelanggan") || lower.includes("teratas")) return RESPONSES.customers;
  if (lower.includes("churn") || lower.includes("retention") || lower.includes("retensi")) return RESPONSES.churn;
  if (lower.includes("pipeline") || lower.includes("deal") || lower.includes("forecast") || lower.includes("ringkasan")) return RESPONSES.pipeline;
  return RESPONSES.default;
}

export default function BusinessChatDemo() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Selamat datang di Chat Intelijen Bisnis. Saya memiliki akses ke data perusahaan simulasi yang mencakup penjualan, pelanggan, pipeline, dan metrik retensi. Silakan tanyakan apa pun terkait bisnis.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate API latency
    await new Promise((r) => setTimeout(r, 1000 + Math.random() * 1500));

    const response = getResponse(userMsg.content);
    const assistantMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: response.content,
      data: response.data,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMsg]);
    setIsTyping(false);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <Link
        href="/demos"
        className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Semua Demo
      </Link>

      <div className="mb-8">
        <Badge variant="success" className="mb-3">Demo Langsung</Badge>
        <h1 className="text-3xl font-bold tracking-tight">Chat Data Bisnis</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400 max-w-2xl">
          Antarmuka bahasa alami untuk data perusahaan. Ajukan pertanyaan tentang penjualan, pelanggan,
          churn, atau pipeline — tanpa perlu SQL.
        </p>
      </div>

      <Card className="flex flex-col h-[600px]">
        <CardHeader className="border-b border-zinc-200 dark:border-zinc-800 py-3">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <CardTitle className="text-sm">Asisten BI — Terhubung ke dataset demo</CardTitle>
          </div>
        </CardHeader>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
            >
              {msg.role === "assistant" && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
                  <Bot className="h-4 w-4" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-lg px-4 py-3 text-sm ${
                  msg.role === "user"
                    ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                    : "bg-zinc-100 dark:bg-zinc-800"
                }`}
              >
                <p className="whitespace-pre-line leading-relaxed">{msg.content}</p>
                {msg.data && (
                  <details className="mt-2">
                    <summary className="text-xs opacity-60 cursor-pointer hover:opacity-100">
                      Lihat data mentah
                    </summary>
                    <pre className="mt-1 text-[10px] opacity-60 overflow-x-auto">
                      {JSON.stringify(msg.data, null, 2)}
                    </pre>
                  </details>
                )}
              </div>
              {msg.role === "user" && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-900 dark:bg-white">
                  <User className="h-4 w-4 text-white dark:text-zinc-900" />
                </div>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
                <Bot className="h-4 w-4" />
              </div>
              <div className="rounded-lg bg-zinc-100 dark:bg-zinc-800 px-4 py-3">
                <Loader2 className="h-4 w-4 animate-spin text-zinc-400" />
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-zinc-200 dark:border-zinc-800 p-4">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Tanyakan tentang penjualan, pelanggan, pipeline..."
              disabled={isTyping}
              className="flex-1"
            />
            <Button onClick={sendMessage} disabled={isTyping || !input.trim()} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {["Berapa penjualan Q3?", "Pelanggan teratas", "Churn rate", "Ringkasan pipeline"].map(
              (q) => (
                <button
                  key={q}
                  onClick={() => {
                    setInput(q);
                  }}
                  className="rounded-full border border-zinc-200 dark:border-zinc-700 px-2.5 py-1 text-xs text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                >
                  {q}
                </button>
              )
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
