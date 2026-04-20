import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, MessageSquare, TrendingUp, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { TechStackPills } from "@/components/ui/tech-icon";

export const metadata: Metadata = {
  title: "Demo Langsung",
  description: "Demo interaktif untuk tools bisnis berbasis AI. Coba pemrosesan invoice, chat data bisnis, dan peramalan penjualan.",
};

const demos = [
  {
    id: "invoice-processor",
    title: "Pemroses Invoice AI",
    description:
      "Unggah gambar invoice atau PDF — AI akan mengekstrak vendor, item, total, dan tanggal jatuh tempo ke dalam JSON terstruktur. Mensimulasikan otomasi account payable kelas enterprise.",
    businessContext:
      "Tim account payable memproses ribuan invoice setiap bulan. Input manual berarti error dan keterlambatan. Demo ini menunjukkan ekstraksi berbasis AI yang terintegrasi dengan sistem ERP.",
    icon: Brain,
    status: "live" as const,
    href: "/demos/invoice-processor",
    tags: ["AI/ML", "Pemrosesan Dokumen", "Otomasi"],
    techStack: ["Python", "OpenAI", "Next.js", "MySQL"],
    gradient: "from-violet-500 to-purple-600",
  },
  {
    id: "business-chat",
    title: "Chat Data Bisnis",
    description:
      "Mengobrol dengan database perusahaan simulasi. Ajukan pertanyaan seperti 'Berapa penjualan Q3?' atau 'Tampilkan pelanggan teratas berdasarkan pendapatan' dan dapatkan jawaban terstruktur.",
    businessContext:
      "Pengguna bisnis tidak seharusnya perlu kemampuan SQL untuk mendapatkan jawaban. Antarmuka bahasa alami ke data perusahaan mengurangi ketergantungan pada engineering untuk query ad-hoc.",
    icon: MessageSquare,
    status: "live" as const,
    href: "/demos/business-chat",
    tags: ["NLP", "Analitik Data", "Antarmuka Chat"],
    techStack: ["OpenAI", "Next.js", "TypeScript", "Prisma"],
    gradient: "from-blue-500 to-cyan-600",
  },
  {
    id: "sales-forecast",
    title: "Dashboard Peramalan Penjualan",
    description:
      "Visualisasi interaktif data penjualan dengan analisis tren, pola musiman, dan peramalan prediktif menggunakan model statistik.",
    businessContext:
      "Pimpinan penjualan membutuhkan data yang berorientasi ke depan, bukan hanya laporan historis. Dashboard forecasting memungkinkan perencanaan wilayah dan prediksi pendapatan yang lebih baik.",
    icon: TrendingUp,
    status: "live" as const,
    href: "/demos/sales-forecast",
    tags: ["Visualisasi Data", "Forecasting", "Analitik"],
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
          Interaktif
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Lingkungan Demo Langsung
        </h1>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
          Jangan hanya membaca kapabilitasnya. Berinteraksilah dengan sistem nyata yang
          memproses data, menjalankan model AI, dan memvisualisasikan hasil.
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
                          {demo.status === "live" ? "Aktif" : "Segera Hadir"}
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
                      Kenapa Ini Penting
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
                        Buka Demo
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
