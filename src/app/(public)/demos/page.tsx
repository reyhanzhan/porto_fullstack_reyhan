import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, MessageSquare, TrendingUp, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { TechStackPills } from "@/components/ui/tech-icon";

export const metadata: Metadata = {
  title: "Live Demos",
  description: "Interactive demos of AI-powered business tools. Try invoice processing, business chat, and sales forecasting.",
};

const demos = [
  {
    id: "invoice-processor",
    title: "AI Invoice Processor",
    description:
      "Upload an invoice image or PDF — the AI extracts vendor, line items, totals, and due dates into structured JSON. Simulates what enterprise AP automation looks like.",
    businessContext:
      "Accounts payable teams process thousands of invoices monthly. Manual entry = errors + delays. This demo shows AI-powered extraction that integrates with ERP systems.",
    icon: Brain,
    status: "live" as const,
    href: "/demos/invoice-processor",
    tags: ["AI/ML", "Document Processing", "Automation"],
    techStack: ["Python", "OpenAI", "Next.js", "MySQL"],
    gradient: "from-violet-500 to-purple-600",
  },
  {
    id: "business-chat",
    title: "Business Data Chat",
    description:
      "Chat with a simulated company database. Ask questions like 'What were Q3 sales?' or 'Show top customers by revenue' and get structured responses.",
    businessContext:
      "Business users shouldn't need SQL skills to get answers. Natural language interfaces to company data reduce dependency on engineering for ad-hoc queries.",
    icon: MessageSquare,
    status: "live" as const,
    href: "/demos/business-chat",
    tags: ["NLP", "Data Analytics", "Chat Interface"],
    techStack: ["OpenAI", "Next.js", "TypeScript", "Prisma"],
    gradient: "from-blue-500 to-cyan-600",
  },
  {
    id: "sales-forecast",
    title: "Sales Forecasting Dashboard",
    description:
      "Interactive visualization of sales data with trend analysis, seasonal patterns, and predictive forecasting using statistical models.",
    businessContext:
      "Sales leaders need forward-looking data, not just historical reports. Forecasting dashboards enable better territory planning and revenue prediction.",
    icon: TrendingUp,
    status: "live" as const,
    href: "/demos/sales-forecast",
    tags: ["Data Viz", "Forecasting", "Analytics"],
    techStack: ["React", "TypeScript", "Python", "Node.js"],
    gradient: "from-emerald-500 to-green-600",
  },
];

export default function DemosPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center mb-16 animate-fade-in-up">
        <Badge variant="secondary" className="mb-4 gap-1.5">
          <Sparkles className="h-3 w-3" />
          Interactive
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Live Demo Environment
        </h1>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
          Don&apos;t just read about capabilities. Interact with real systems that
          process data, run AI models, and visualize results.
        </p>
      </div>

      <div className="grid gap-8 stagger-children">
        {demos.map((demo) => (
          <Card
            key={demo.id}
            className="group overflow-hidden transition-all hover:shadow-lg hover:border-zinc-300 dark:hover:border-zinc-700 duration-300"
          >
            <div className="grid grid-cols-1 lg:grid-cols-4">
              {/* Icon panel */}
              <div className="relative flex items-center justify-center bg-zinc-50 dark:bg-zinc-900 p-8 lg:p-12 overflow-hidden">
                <div className="absolute inset-0 opacity-5 dark:opacity-10 bg-[radial-gradient(ellipse_at_center,rgba(120,119,198,0.3),transparent)]" />
                <div className={`flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br ${demo.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <demo.icon className="h-12 w-12 text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="lg:col-span-3 p-6 lg:p-8">
                <CardHeader className="p-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2.5 mb-2">
                        <CardTitle className="text-xl">{demo.title}</CardTitle>
                        <Badge
                          variant={demo.status === "live" ? "success" : "warning"}
                          className="gap-1"
                        >
                          {demo.status === "live" && (
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          )}
                          {demo.status === "live" ? "Live" : "Coming Soon"}
                        </Badge>
                      </div>
                      <CardDescription className="text-sm leading-relaxed">
                        {demo.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-0 mt-4">
                  {/* Business Context */}
                  <div className="rounded-xl bg-zinc-50 dark:bg-zinc-900/50 p-4 mb-4 border border-zinc-100 dark:border-zinc-800">
                    <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                      Why This Matters
                    </p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {demo.businessContext}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div className="mb-4">
                    <TechStackPills techs={demo.techStack} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {demo.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-[10px]">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Link href={demo.href}>
                      <Button size="sm" className="gap-1.5 shadow-sm">
                        Launch Demo
                        <ArrowRight className="h-3 w-3" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
