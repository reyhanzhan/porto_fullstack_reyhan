import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import bcrypt from "bcryptjs";

const adapter = new PrismaMariaDb({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "porto_reyhan",
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  // =========================================================================
  // 1. Create Admin User
  // =========================================================================
  const hashedPassword = await bcrypt.hash("admin123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@reyhan.dev" },
    update: {},
    create: {
      email: "admin@reyhan.dev",
      name: "Reyhan (Admin)",
      password: hashedPassword,
      role: "ADMIN",
    },
  });
  console.log(`✅ Admin user: ${admin.email}`);

  // =========================================================================
  // 2. Create Tech Tags
  // =========================================================================
  const tags = [
    { name: "Next.js", category: "frontend" },
    { name: "React", category: "frontend" },
    { name: "TypeScript", category: "frontend" },
    { name: "Tailwind CSS", category: "frontend" },
    { name: "Node.js", category: "backend" },
    { name: "NestJS", category: "backend" },
    { name: "Python", category: "backend" },
    { name: "PostgreSQL", category: "database" },
    { name: "Prisma", category: "database" },
    { name: "Redis", category: "database" },
    { name: "OpenAI", category: "ai" },
    { name: "LangChain", category: "ai" },
    { name: "Docker", category: "infra" },
    { name: "AWS", category: "infra" },
    { name: "Vercel", category: "infra" },
  ];

  const tagMap: Record<string, string> = {};
  for (const tag of tags) {
    const created = await prisma.techTag.upsert({
      where: { name: tag.name },
      update: {},
      create: tag,
    });
    tagMap[tag.name] = created.id;
  }
  console.log(`✅ ${tags.length} tech tags created`);

  // =========================================================================
  // 3. Create Categories
  // =========================================================================
  const categories = [
    { name: "AI/ML", slug: "ai-ml" },
    { name: "Enterprise SaaS", slug: "enterprise-saas" },
    { name: "Data Analytics", slug: "data-analytics" },
    { name: "Automation", slug: "automation" },
    { name: "Internal Tools", slug: "internal-tools" },
  ];

  const catMap: Record<string, string> = {};
  for (const cat of categories) {
    const created = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
    catMap[cat.slug] = created.id;
  }
  console.log(`✅ ${categories.length} categories created`);

  // =========================================================================
  // 4. Create Projects
  // =========================================================================
  const projects = [
    {
      slug: "ai-invoice-processor",
      title: "AI-Powered Invoice Processing System",
      subtitle: "Automated AP workflow for enterprise finance teams",
      description:
        "Mid-market companies process 5,000–50,000 invoices monthly. Manual data entry into ERP systems costs $8–15 per invoice and introduces a 3–5% error rate. Finance teams spend 40% of their time on data entry instead of strategic analysis. Late payments due to processing delays damage vendor relationships and miss early-payment discounts worth 1–2% of invoice value.",
      solution:
        "Built a document processing pipeline using OCR (Tesseract + custom post-processing) feeding into a fine-tuned extraction model. The system:\n\n1. Accepts PDF/image uploads via pre-signed S3 URLs\n2. Runs OCR with layout-aware text extraction\n3. Uses GPT-4 with structured output for field extraction (vendor, line items, amounts, dates)\n4. Validates extracted data against business rules (amount thresholds, known vendors, duplicate detection)\n5. Pushes validated data to ERP via REST API\n6. Logs all processing events for audit compliance\n\nThe API is built with Next.js API routes, PostgreSQL for storage, and Redis for job queuing.",
      impact:
        "Reduced per-invoice processing cost from $12 to $0.80. Cut processing time from 4 minutes to 12 seconds per invoice. Achieved 94% straight-through processing rate (no human intervention needed). Estimated annual savings of $240K for a company processing 25,000 invoices/month.",
      architecture:
        "┌─────────┐     ┌──────────────┐     ┌─────────────┐\n│  Client  │────▶│  Next.js API │────▶│   S3 Upload  │\n└─────────┘     └──────┬───────┘     └──────┬──────┘\n                       │                     │\n                       ▼                     ▼\n              ┌────────────────┐    ┌────────────────┐\n              │  PostgreSQL    │    │  OCR Pipeline  │\n              │  (metadata)    │    │  (Tesseract)   │\n              └────────────────┘    └───────┬────────┘\n                                           │\n                                           ▼\n                                   ┌────────────────┐\n                                   │  GPT-4 Extract │\n                                   │  (structured)  │\n                                   └───────┬────────┘\n                                           │\n                                           ▼\n                                   ┌────────────────┐\n                                   │  Validation +  │\n                                   │  ERP Push      │\n                                   └────────────────┘",
      demoUrl: "/demos/invoice-processor",
      published: true,
      featured: true,
      sortOrder: 1,
      tags: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "OpenAI", "AWS"],
      categories: ["ai-ml", "automation"],
      metrics: [
        { label: "Processing Cost Reduction", value: "93%" },
        { label: "Avg Processing Time", value: "12 sec" },
        { label: "Straight-Through Rate", value: "94%" },
      ],
    },
    {
      slug: "business-intelligence-chat",
      title: "Natural Language BI Chat Interface",
      subtitle: "Ask your database questions in plain English",
      description:
        "Business stakeholders need data to make decisions but depend on engineering teams for ad-hoc queries. The typical turnaround for a data request is 2–5 business days. This bottleneck slows decision-making and creates frustration between business and technical teams. Self-service BI tools exist but have steep learning curves that most non-technical users abandon.",
      solution:
        "Developed a conversational interface that translates natural language questions into SQL queries against the company database. The system:\n\n1. Takes user input in natural language\n2. Uses GPT-4 to generate safe, read-only SQL queries\n3. Executes against a PostgreSQL database with row-level security\n4. Formats results into human-readable responses with optional charts\n5. Maintains conversation context for follow-up questions\n6. Includes guardrails to prevent data exfiltration or harmful queries\n\nBuilt with Next.js, Server-Sent Events for streaming, and a PostgreSQL query sandbox.",
      impact:
        "Reduced ad-hoc data request turnaround from 3 days to under 30 seconds. Decreased engineering time spent on data requests by 85%. Enabled 40+ non-technical stakeholders to self-serve data. Zero security incidents in 6 months of production use.",
      architecture:
        "┌─────────┐     ┌──────────────┐     ┌─────────────┐\n│ Chat UI │────▶│  Next.js SSE │────▶│   GPT-4     │\n│ (React) │◀────│  API Route   │◀────│   SQL Gen   │\n└─────────┘     └──────┬───────┘     └─────────────┘\n                       │\n                       ▼\n              ┌────────────────┐\n              │  PostgreSQL    │\n              │  (read-only    │\n              │   sandbox)     │\n              └────────────────┘",
      demoUrl: "/demos/business-chat",
      published: true,
      featured: true,
      sortOrder: 2,
      tags: ["Next.js", "TypeScript", "PostgreSQL", "OpenAI", "LangChain"],
      categories: ["ai-ml", "data-analytics"],
      metrics: [
        { label: "Query Response Time", value: "<30s" },
        { label: "Engineering Time Saved", value: "85%" },
        { label: "Active Non-Tech Users", value: "40+" },
      ],
    },
    {
      slug: "sales-forecasting-platform",
      title: "Sales Forecasting & Analytics Platform",
      subtitle: "Predictive revenue intelligence for sales leadership",
      description:
        "Sales teams rely on gut feel and spreadsheet-based forecasting that is consistently 20–30% inaccurate. This leads to missed quarterly targets, poor resource allocation, and loss of investor confidence. Manual consolidation of pipeline data across CRM systems takes 15+ hours per week from sales ops.",
      solution:
        "Built an analytics platform that ingests CRM data, applies statistical models (ARIMA, exponential smoothing), and presents interactive visualizations. Features:\n\n1. Automated CRM data sync via webhooks\n2. Multi-model forecasting with confidence intervals\n3. Segment-level breakdown (Enterprise, SMB, Services)\n4. Interactive Recharts-based dashboards\n5. Role-based views (VP sees territory roll-ups, reps see their pipeline)\n6. Weekly automated forecast reports via email\n\nFrontend built with Next.js + Recharts, backend processing in Python, data stored in PostgreSQL.",
      impact:
        "Improved forecast accuracy from 70% to 92%. Eliminated 15 hours/week of manual data consolidation. Enabled territory-level revenue prediction 90 days out. Identified $2.1M in at-risk pipeline that was successfully recovered through targeted intervention.",
      demoUrl: "/demos/sales-forecast",
      published: true,
      featured: false,
      sortOrder: 3,
      tags: ["Next.js", "TypeScript", "PostgreSQL", "Python", "Prisma"],
      categories: ["data-analytics", "enterprise-saas"],
      metrics: [
        { label: "Forecast Accuracy", value: "92%" },
        { label: "Time Saved (Weekly)", value: "15 hrs" },
        { label: "Pipeline Recovered", value: "$2.1M" },
      ],
    },
  ];

  for (const proj of projects) {
    const { tags: projTags, categories: projCats, metrics, ...projectData } = proj;

    const created = await prisma.project.upsert({
      where: { slug: proj.slug },
      update: projectData,
      create: projectData,
    });

    // Link tech tags
    for (const tagName of projTags) {
      if (tagMap[tagName]) {
        await prisma.projectTech.upsert({
          where: {
            projectId_techTagId: {
              projectId: created.id,
              techTagId: tagMap[tagName],
            },
          },
          update: {},
          create: {
            projectId: created.id,
            techTagId: tagMap[tagName],
          },
        });
      }
    }

    // Link categories
    for (const catSlug of projCats) {
      if (catMap[catSlug]) {
        await prisma.projectCategory.upsert({
          where: {
            projectId_categoryId: {
              projectId: created.id,
              categoryId: catMap[catSlug],
            },
          },
          update: {},
          create: {
            projectId: created.id,
            categoryId: catMap[catSlug],
          },
        });
      }
    }

    // Create metrics
    await prisma.projectMetric.deleteMany({ where: { projectId: created.id } });
    for (const metric of metrics) {
      await prisma.projectMetric.create({
        data: { ...metric, projectId: created.id },
      });
    }

    console.log(`✅ Project: ${created.title}`);
  }

  // =========================================================================
  // 5. Create sample audit log
  // =========================================================================
  await prisma.auditLog.create({
    data: {
      userId: admin.id,
      action: "LOGIN",
      entity: "User",
      entityId: admin.id,
      metadata: { method: "credentials", source: "seed" },
    },
  });
  console.log("✅ Sample audit log created");

  // =========================================================================
  // 6. Create sample page views
  // =========================================================================
  const paths = ["/", "/projects", "/demos", "/contact", "/projects/ai-invoice-processor"];
  for (let i = 0; i < 30; i++) {
    const daysAgo = Math.floor(Math.random() * 7);
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);

    await prisma.pageView.create({
      data: {
        path: paths[Math.floor(Math.random() * paths.length)],
        createdAt: date,
      },
    });
  }
  console.log("✅ 30 sample page views created");

  console.log("\n🎉 Seed complete!");
  console.log("   Admin login: admin@reyhan.dev / admin123");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
