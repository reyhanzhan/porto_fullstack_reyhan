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
      "Q3 2025 total revenue was **$4.2M**, up 23% from Q2. The top-performing segment was Enterprise SaaS at $2.8M, followed by SMB at $1.1M and Professional Services at $0.3M.",
    data: {
      q3Revenue: "$4.2M",
      growth: "+23%",
      segments: { enterprise: "$2.8M", smb: "$1.1M", services: "$0.3M" },
    },
  },
  customers: {
    content:
      "Top 5 customers by lifetime value:\n1. **TechCorp Global** — $892K (36 months)\n2. **DataFlow Inc** — $654K (24 months)\n3. **CloudScale Systems** — $523K (18 months)\n4. **Apex Manufacturing** — $498K (30 months)\n5. **NovaPay Solutions** — $412K (12 months)",
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
      "Current monthly churn rate: **2.1%**. That's down from 3.4% last quarter. Primary churn drivers: 1) Product fit gaps (42%), 2) Budget constraints (31%), 3) Competitor switch (27%). Recommended action: improve onboarding for mid-market accounts.",
  },
  pipeline: {
    content:
      "Sales pipeline summary:\n- **Discovery**: 23 deals ($1.8M)\n- **Demo Completed**: 15 deals ($2.1M)\n- **Proposal Sent**: 8 deals ($1.4M)\n- **Negotiation**: 4 deals ($890K)\n- **Closed Won (this month)**: 6 deals ($720K)\n\nWeighted pipeline value: **$3.2M**",
  },
  default: {
    content:
      "I can help with business data queries like:\n- \"What were Q3 sales?\"\n- \"Show top customers by revenue\"\n- \"What's our churn rate?\"\n- \"Pipeline summary\"\n\nTry asking one of these questions!",
  },
};

function getResponse(input: string): { content: string; data?: Record<string, unknown> } {
  const lower = input.toLowerCase();
  if (lower.includes("revenue") || lower.includes("sales") || lower.includes("q3")) return RESPONSES.revenue;
  if (lower.includes("customer") || lower.includes("top") || lower.includes("ltv")) return RESPONSES.customers;
  if (lower.includes("churn") || lower.includes("retention")) return RESPONSES.churn;
  if (lower.includes("pipeline") || lower.includes("deal") || lower.includes("forecast")) return RESPONSES.pipeline;
  return RESPONSES.default;
}

export default function BusinessChatDemo() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Welcome to the Business Intelligence Chat. I have access to simulated company data including sales, customers, pipeline, and retention metrics. Ask me anything about the business.",
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
        All Demos
      </Link>

      <div className="mb-8">
        <Badge variant="success" className="mb-3">Live Demo</Badge>
        <h1 className="text-3xl font-bold tracking-tight">Business Data Chat</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400 max-w-2xl">
          Natural language interface to company data. Ask questions about sales, customers,
          churn, or pipeline — no SQL required.
        </p>
      </div>

      <Card className="flex flex-col h-[600px]">
        <CardHeader className="border-b border-zinc-200 dark:border-zinc-800 py-3">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <CardTitle className="text-sm">BI Assistant — Connected to demo dataset</CardTitle>
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
                      View raw data
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
              placeholder="Ask about sales, customers, pipeline..."
              disabled={isTyping}
              className="flex-1"
            />
            <Button onClick={sendMessage} disabled={isTyping || !input.trim()} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {["What were Q3 sales?", "Top customers", "Churn rate", "Pipeline summary"].map(
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
