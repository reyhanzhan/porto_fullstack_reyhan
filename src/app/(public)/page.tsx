import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TechStackMarquee } from "@/components/ui/tech-icon";
import {
  ArrowRight,
  Brain,
  Database,
  Layers,
  LineChart,
  Shield,
  Zap,
  CheckCircle,
  Sparkles,
} from "lucide-react";

// =============================================================================
// LANDING PAGE
// Business-first messaging. No "Hi, I'm..." — this is a product page.
// =============================================================================

export default function HomePage() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(99,102,241,0.15),transparent)] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(129,140,248,0.1),transparent)]" />
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-3xl text-center animate-fade-in-up">
            <Badge variant="secondary" className="mb-6 gap-1.5">
              <Sparkles className="h-3 w-3" />
              Full Stack &middot; AI Systems &middot; B2B
            </Badge>

            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              I build{" "}
              <span className="bg-linear-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:via-violet-400 dark:to-purple-400">
                AI-powered business systems
              </span>{" "}
              for B2B
            </h1>

            <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
              Enterprise-grade full stack solutions that automate workflows,
              reduce operational costs, and turn unstructured data into
              actionable business intelligence. Not templates &mdash; real systems.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/projects">
                <Button size="lg" className="gap-2">
                  Explore Projects
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/demos">
                <Button variant="outline" size="lg" className="gap-2">
                  Try Live Demos
                  <Zap className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Social proof / stats */}
            <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-center">
              {[
                { value: "5+", label: "Production Systems" },
                { value: "94%", label: "AI Accuracy" },
                { value: "60%", label: "Cost Reduction" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHAT I BUILD */}
      <section className="border-t border-indigo-100/60 dark:border-indigo-500/10">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Systems that solve real problems
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400">
              Every project is built to address a specific business pain point
              &mdash; with measurable ROI.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 stagger-children">
            {capabilities.map((cap) => (
              <Card
                key={cap.title}
                className="group relative overflow-hidden transition-all hover:shadow-lg hover:shadow-indigo-500/8 hover:border-indigo-200/80 dark:hover:border-indigo-500/20 hover:-translate-y-1 duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400 group-hover:bg-linear-to-br group-hover:from-indigo-600 group-hover:to-violet-600 group-hover:text-white dark:group-hover:from-indigo-500 dark:group-hover:to-violet-500 transition-all duration-300">
                    <cap.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold">{cap.title}</h3>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {cap.description}
                  </p>
                  {/* Key features */}
                  <div className="mt-4 space-y-1.5">
                    {cap.features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-xs text-slate-500">
                        <CheckCircle className="h-3 w-3 text-emerald-500 shrink-0" />
                        {f}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* TECH STACK BAR — Now with real icons */}
      <section className="border-t border-indigo-100/60 bg-linear-to-b from-indigo-50/50 to-transparent dark:border-indigo-500/10 dark:from-indigo-500/3 dark:to-transparent">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-medium uppercase tracking-wider text-slate-500 mb-8">
              Production Tech Stack
            </p>
            <TechStackMarquee techs={techStack} />
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="border-t border-indigo-100/60 dark:border-indigo-500/10">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="relative mx-auto max-w-3xl text-center">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(99,102,241,0.08),transparent)] dark:bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(129,140,248,0.06),transparent)]" />
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              See the systems in action
            </h2>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400">
              Don&apos;t just read about it. Interact with live demos that process
              real data and show real results.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/demos">
                <Button size="lg" className="gap-2">
                  Launch Demo Environment
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// =============================================================================
// Data
// =============================================================================

const capabilities = [
  {
    title: "AI Document Processing",
    description:
      "Automated extraction from invoices, contracts, and reports. Upload → AI processes → structured JSON output ready for your ERP.",
    icon: Brain,
    features: ["OCR + NLP pipeline", "94% extraction accuracy", "ERP-ready JSON output"],
  },
  {
    title: "Business Intelligence",
    description:
      "Real-time analytics on sales pipelines, inventory, and operations. Role-based views with granular access control.",
    icon: LineChart,
    features: ["Interactive dashboards", "Role-based access", "Real-time data sync"],
  },
  {
    title: "Enterprise API Platforms",
    description:
      "RESTful and event-driven APIs with proper auth, rate limiting, versioning, and comprehensive audit logging.",
    icon: Layers,
    features: ["JWT + API key auth", "Rate limiting & versioning", "Full audit trail"],
  },
  {
    title: "Database Architecture",
    description:
      "Relational schema design with MySQL. Optimized queries, proper indexing, and data integrity constraints.",
    icon: Database,
    features: ["Schema design & migrations", "Query optimization", "Data integrity"],
  },
  {
    title: "Auth & Access Control",
    description:
      "Multi-role authentication systems with session management, RBAC, and complete audit trails for compliance.",
    icon: Shield,
    features: ["RBAC & multi-tenant", "Session management", "Compliance audit logs"],
  },
  {
    title: "Workflow Automation",
    description:
      "End-to-end process automation that eliminates manual data entry, reduces errors by 90%, and scales without headcount.",
    icon: Zap,
    features: ["90% error reduction", "Event-driven triggers", "Horizontal scaling"],
  },
];

const techStack = [
  "Next.js",
  "TypeScript",
  "React",
  "Tailwind CSS",
  "Node.js",
  "Python",
  "MySQL",
  "Prisma",
  "Docker",
  "AWS",
  "OpenAI",
  "Redis",
];
