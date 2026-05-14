"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
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
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import dynamic from "next/dynamic";
import ShapeGrid from "@/components/ShapeGrid";

// Dynamic import: BorderGlow runs complex pointer-tracking + canvas masking.
// Deferring it prevents it from bloating the initial JS parse on every visit.
const BorderGlow = dynamic(() => import("@/components/BorderGlow"), {
  ssr: false,
  loading: () => null,
});

// =============================================================================
// LANDING PAGE — Premium Vercel / Linear / OpenAI Style
// Business-first messaging. No "Hi, I'm..." — this is a product page.
// =============================================================================

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
      delay: i * 0.1,
    },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

// Blur + slide up — for headings and hero text
const blurInUp = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1] as const,
      delay: i * 0.12,
    },
  }),
};

// Spring scale — for numbers / metrics
const scaleUp = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.34, 1.56, 0.64, 1] as const,
      delay: i * 0.08,
    },
  }),
};

// Reusable scroll-triggered section
function AnimatedSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function HomePage() {
  return (
    <>
      {/* ================================================================= */}
      {/* HERO SECTION — Authority + First Impression                       */}
      {/* ================================================================= */}
      <section className="relative overflow-hidden bg-white dark:bg-slate-950">
        <div className="pointer-events-none absolute inset-0 z-0">
          <ShapeGrid
            speed={0.5}
            squareSize={40}
            direction="diagonal"
            borderColor="#2F293A"
            hoverFillColor="#222222"
            shape="square"
            hoverTrailAmount={0}
            className="h-full w-full"
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(99,102,241,0.1),transparent)] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(129,140,248,0.08),transparent)]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-28 sm:px-6 sm:py-36 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <Badge
                variant="secondary"
                className="mb-8 gap-1.5 border-zinc-200 bg-white/80 text-zinc-600 backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/50 dark:text-zinc-400"
              >
                <Sparkles className="h-3 w-3" />
                Full Stack &middot; AI Systems &middot; B2B
              </Badge>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="text-4xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-6xl lg:text-7xl"
            >
              I build{" "}
              <span className="bg-linear-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent dark:from-indigo-500 dark:to-cyan-400">
                AI-powered business systems
              </span>{" "}
              for B2B
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="mt-6 text-lg leading-relaxed text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto"
            >
              Enterprise-grade full stack solutions that automate workflows,
              reduce operational costs, and turn unstructured data into
              actionable business intelligence. Not templates &mdash;{" "}
              <span className="text-zinc-950 dark:text-zinc-50 font-medium">
                real systems
              </span>
              .
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.48 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
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
            </motion.div>

            {/* Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.65, ease: [0.34, 1.2, 0.64, 1], delay: 0.6 }}
              className="mt-20 flex flex-wrap items-center justify-center gap-x-12 gap-y-6"
            >
              {metrics.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Bottom fade line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-zinc-200 to-transparent dark:via-zinc-800/50" />
      </section>

      {/* ================================================================= */}
      {/* FEATURES SECTION — Breathing Room + Readability                  */}
      {/* ================================================================= */}
      <section className="relative bg-slate-50 dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-700/40">
        <div className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
          <AnimatedSection className="mx-auto max-w-2xl text-center">
            <motion.h2
              variants={blurInUp}
              className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-4xl"
            >
              Systems that solve real problems
            </motion.h2>
            <motion.p
              variants={blurInUp}
              className="mt-4 text-zinc-500 dark:text-zinc-400"
            >
              Every project is built to address a specific business pain point
              &mdash; with measurable ROI.
            </motion.p>
          </AnimatedSection>

          <AnimatedSection className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((cap) => (
              <motion.div
                key={cap.title}
                variants={cardVariant}
                className="transition-all duration-300 hover:-translate-y-0.5"
              >
                <BorderGlow
                  edgeSensitivity={30}
                  glowColor="40 80 80"
                  backgroundColor="#120F17"
                  borderRadius={28}
                  glowRadius={40}
                  glowIntensity={1}
                  coneSpread={25}
                  animated={false}
                  colors={["#c084fc", "#f472b6", "#38bdf8"]}
                  className="group h-full"
                >
                  <div className="relative overflow-hidden rounded-[28px] p-6">
                    {/* Hover glow */}
                    <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.04),transparent)] dark:bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.06),transparent)]" />

                    <div className="relative">
                      {/* Icon */}
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-600 transition-all duration-300 group-hover:border-indigo-200 group-hover:bg-indigo-50 group-hover:text-indigo-600 dark:border-zinc-800 dark:bg-zinc-800/50 dark:text-zinc-400 dark:group-hover:border-indigo-500/30 dark:group-hover:bg-indigo-500/10 dark:group-hover:text-indigo-400">
                        <cap.icon className="h-5 w-5" />
                      </div>

                      {/* Title */}
                      <h3 className="mt-4 text-base font-semibold text-zinc-950 dark:text-zinc-50">
                        {cap.title}
                      </h3>

                      {/* Description */}
                      <p className="mt-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                        {cap.description}
                      </p>

                      {/* Feature checklist */}
                      <div className="mt-4 space-y-2">
                        {cap.features.map((f) => (
                          <div
                            key={f}
                            className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400"
                          >
                            <CheckCircle className="h-3.5 w-3.5 shrink-0 text-emerald-500 dark:text-emerald-400" />
                            {f}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </BorderGlow>
              </motion.div>
            ))}
          </AnimatedSection>
        </div>

        {/* Bottom fade line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-zinc-200 to-transparent dark:via-zinc-800/50" />
      </section>

      {/* ================================================================= */}
      {/* TECH STACK — Innovation + Digital Feel                            */}
      {/* ================================================================= */}
      <section className="relative overflow-hidden bg-sky-50/60 dark:bg-[#060d1a] border-t border-sky-100/80 dark:border-slate-800/50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center">
            <motion.p
              variants={blurInUp}
              className="text-xs font-medium uppercase tracking-[0.2em] text-sky-600/70 dark:text-sky-400/50 mb-10"
            >
              Production Tech Stack
            </motion.p>
            <motion.div variants={blurInUp}>
              <TechStackMarquee techs={techStack} />
            </motion.div>
          </AnimatedSection>
        </div>

        {/* Bottom fade line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-zinc-200 to-transparent dark:via-zinc-800/50" />
      </section>

      {/* ================================================================= */}
      {/* CTA SECTION — Urgency + Focus Peak                               */}
      {/* ================================================================= */}
      <section className="relative overflow-hidden bg-linear-to-br from-slate-900 via-slate-900 to-indigo-950">
        {/* Ambient indigo glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_70%,rgba(99,102,241,0.22),transparent)]" />
        <div className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
          <AnimatedSection className="relative mx-auto max-w-2xl text-center">
            <motion.h2
              variants={blurInUp}
              className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
            >
              See the systems in action
            </motion.h2>
            <motion.p
              variants={blurInUp}
              className="mt-4 text-slate-300"
            >
              Don&apos;t just read about it. Interact with live demos that
              process real data and show real results.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/demos">
                <Button size="lg" className="gap-2 bg-indigo-500 hover:bg-indigo-400 text-white border-0">
                  Launch Demo Environment
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="border-white/25 text-white hover:bg-white/10 hover:text-white">
                  Get in Touch
                </Button>
              </Link>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}

// =============================================================================
// Data
// =============================================================================

const metrics = [
  { value: "5+", label: "Production Systems" },
  { value: "94%", label: "AI Accuracy" },
  { value: "60%", label: "Cost Reduction" },
];

const capabilities = [
  {
    title: "AI Document Processing",
    description:
      "Automated extraction from invoices, contracts, and reports. Upload → AI processes → structured JSON output ready for your ERP.",
    icon: Brain,
    features: [
      "OCR + NLP pipeline",
      "94% extraction accuracy",
      "ERP-ready JSON output",
    ],
  },
  {
    title: "Business Intelligence",
    description:
      "Real-time analytics on sales pipelines, inventory, and operations. Role-based views with granular access control.",
    icon: LineChart,
    features: [
      "Interactive dashboards",
      "Role-based access",
      "Real-time data sync",
    ],
  },
  {
    title: "Enterprise API Platforms",
    description:
      "RESTful and event-driven APIs with proper auth, rate limiting, versioning, and comprehensive audit logging.",
    icon: Layers,
    features: [
      "JWT + API key auth",
      "Rate limiting & versioning",
      "Full audit trail",
    ],
  },
  {
    title: "Database Architecture",
    description:
      "Relational schema design with MySQL. Optimized queries, proper indexing, and data integrity constraints.",
    icon: Database,
    features: [
      "Schema design & migrations",
      "Query optimization",
      "Data integrity",
    ],
  },
  {
    title: "Auth & Access Control",
    description:
      "Multi-role authentication systems with session management, RBAC, and complete audit trails for compliance.",
    icon: Shield,
    features: [
      "RBAC & multi-tenant",
      "Session management",
      "Compliance audit logs",
    ],
  },
  {
    title: "Workflow Automation",
    description:
      "End-to-end process automation that eliminates manual data entry, reduces errors by 90%, and scales without headcount.",
    icon: Zap,
    features: [
      "90% error reduction",
      "Event-driven triggers",
      "Horizontal scaling",
    ],
  },
];

const techStack = [
  "Next.js",
  "TypeScript",
  "React",
  "Tailwind CSS",
  "Node.js",
  "Python",
  "TensorFlow",
  "MySQL",
  "Prisma",
  "Docker",
  "AWS",
  "OpenAI",
  "Redis",
];
