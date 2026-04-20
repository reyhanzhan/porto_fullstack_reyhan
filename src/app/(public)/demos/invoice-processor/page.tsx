"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Upload,
  FileText,
  Loader2,
  CheckCircle,
  AlertCircle,
  Brain,
  Scan,
  Database,
  FileJson,
  ArrowRight,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { TechStackPills } from "@/components/ui/tech-icon";

type ProcessingStage = "idle" | "uploading" | "ocr" | "extraction" | "validation" | "complete" | "error";

interface InvoiceResult {
  vendor: { name: string; address: string; taxId: string };
  invoiceNumber: string;
  date: string;
  dueDate: string;
  purchaseOrder: string;
  lineItems: { description: string; quantity: number; unitPrice: number; total: number }[];
  subtotal: number;
  tax: number;
  total: number;
  currency: string;
  paymentTerms: string;
  confidence: number;
  processingTimeMs: number;
  fieldsExtracted: number;
}

const pipelineStages = [
  { id: "uploading", label: "Unggah", icon: Upload, description: "Mengunggah dokumen" },
  { id: "ocr", label: "OCR", icon: Scan, description: "Pengenalan teks" },
  { id: "extraction", label: "Ekstraksi AI", icon: Brain, description: "Ekstraksi NLP" },
  { id: "validation", label: "Validasi", icon: Database, description: "Validasi skema" },
  { id: "complete", label: "Output", icon: FileJson, description: "JSON siap pakai" },
];

export default function InvoiceProcessorDemo() {
  const [stage, setStage] = useState<ProcessingStage>("idle");
  const [result, setResult] = useState<InvoiceResult | null>(null);
  const [fileName, setFileName] = useState("");
  const [copied, setCopied] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);

  // Timer for elapsed ms
  useEffect(() => {
    if (!startTime || stage === "idle" || stage === "complete" || stage === "error") return;
    const interval = setInterval(() => setElapsedMs(Date.now() - startTime), 50);
    return () => clearInterval(interval);
  }, [startTime, stage]);

  const processInvoice = useCallback(async (file: File) => {
    setFileName(file.name);
    const start = Date.now();
    setStartTime(start);
    setElapsedMs(0);

    // Stage 1: Upload
    setStage("uploading");
    await sleep(800);

    // Stage 2: OCR
    setStage("ocr");
    await sleep(1200);

    // Stage 3: AI Extraction
    setStage("extraction");
    await sleep(2000);

    // Stage 4: Validation
    setStage("validation");
    await sleep(800);

    const endTime = Date.now();
    
    // Generate mock result
    const mockResult: InvoiceResult = {
      vendor: {
        name: "Acme Cloud Services Ltd.",
        address: "100 Innovation Drive, Suite 400, San Francisco, CA 94105",
        taxId: "US-TAX-" + Math.floor(Math.random() * 90000 + 10000),
      },
      invoiceNumber: "INV-2026-" + Math.floor(Math.random() * 9000 + 1000),
      date: "2026-03-01",
      dueDate: "2026-03-31",
      purchaseOrder: "PO-" + Math.floor(Math.random() * 9000 + 1000),
      lineItems: [
        { description: "Enterprise API Gateway — Bulanan", quantity: 1, unitPrice: 2499.0, total: 2499.0 },
        { description: "Unit Pemrosesan Data (1 juta request)", quantity: 3, unitPrice: 149.99, total: 449.97 },
        { description: "SLA Dukungan Premium", quantity: 1, unitPrice: 799.0, total: 799.0 },
        { description: "Sertifikat SSL — Wildcard", quantity: 2, unitPrice: 89.50, total: 179.0 },
      ],
      subtotal: 3926.97,
      tax: 706.85,
      total: 4633.82,
      currency: "USD",
      paymentTerms: "Net 30",
      confidence: 0.94 + Math.random() * 0.05,
      processingTimeMs: endTime - start,
      fieldsExtracted: 18,
    };

    setResult(mockResult);
    setElapsedMs(endTime - start);
    setStage("complete");
  }, []);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) processInvoice(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processInvoice(file);
  };

  const reset = () => {
    setStage("idle");
    setResult(null);
    setFileName("");
    setElapsedMs(0);
    setStartTime(null);
    setCopied(false);
  };

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(JSON.stringify(result, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const isProcessing = stage !== "idle" && stage !== "complete" && stage !== "error";

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 animate-fade-in">
      <Link
        href="/demos"
        className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Semua Demo
      </Link>

      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-500/20">
            <Brain className="h-6 w-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold tracking-tight">Pemroses Invoice AI</h1>
              <Badge variant="success" className="gap-1">
                <Sparkles className="h-3 w-3" /> Demo Langsung
              </Badge>
            </div>
            <p className="text-sm text-zinc-500 mt-0.5">
              Unggah file apa pun untuk mensimulasikan ekstraksi invoice berbasis AI
            </p>
          </div>
        </div>
        <TechStackPills techs={["Python", "OpenAI", "Next.js", "MySQL", "Docker"]} className="mt-4" />
      </div>

      {/* Processing Pipeline */}
      {stage !== "idle" && (
        <Card className="mb-8 overflow-hidden">
          <div className="h-1 bg-zinc-100 dark:bg-zinc-800">
            <div
              className="h-full bg-gradient-to-r from-violet-500 to-purple-600 transition-all duration-500"
              style={{
                width:
                  stage === "uploading" ? "20%" :
                  stage === "ocr" ? "40%" :
                  stage === "extraction" ? "60%" :
                  stage === "validation" ? "80%" :
                  stage === "complete" ? "100%" : "0%",
              }}
            />
          </div>
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-zinc-400" />
                <span className="text-sm font-medium">{fileName}</span>
              </div>
              <span className="text-xs font-mono text-zinc-400">
                {(elapsedMs / 1000).toFixed(1)}s
              </span>
            </div>
            <div className="flex items-center gap-2">
              {pipelineStages.map((ps, i) => {
                const stageOrder = ["uploading", "ocr", "extraction", "validation", "complete"];
                const currentIdx = stageOrder.indexOf(stage);
                const thisIdx = stageOrder.indexOf(ps.id);
                const isActive = ps.id === stage;
                const isDone = thisIdx < currentIdx || stage === "complete";
                
                return (
                  <div key={ps.id} className="flex items-center gap-2 flex-1">
                    <div
                      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-all duration-300 flex-1 ${
                        isActive
                          ? "bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 ring-1 ring-violet-200 dark:ring-violet-800"
                          : isDone
                          ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300"
                          : "bg-zinc-50 dark:bg-zinc-900 text-zinc-400"
                      }`}
                    >
                      {isDone ? (
                        <CheckCircle className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                      ) : isActive ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin shrink-0" />
                      ) : (
                        <ps.icon className="h-3.5 w-3.5 shrink-0" />
                      )}
                      <span className="hidden sm:inline">{ps.label}</span>
                    </div>
                    {i < pipelineStages.length - 1 && (
                      <ArrowRight className="h-3 w-3 text-zinc-300 dark:text-zinc-700 shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Area */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Upload className="h-4 w-4 text-zinc-400" />
                Input Dokumen
              </CardTitle>
            </CardHeader>
            <CardContent>
              {stage === "idle" ? (
                <div
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  className="relative rounded-xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 p-12 text-center hover:border-violet-300 dark:hover:border-violet-700 hover:bg-violet-50/30 dark:hover:bg-violet-900/10 transition-all cursor-pointer group"
                >
                  <input
                    type="file"
                    onChange={handleFileSelect}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    accept=".pdf,.png,.jpg,.jpeg,.txt,.csv"
                  />
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800 mx-auto group-hover:bg-violet-100 dark:group-hover:bg-violet-900/30 transition-colors">
                    <Upload className="h-7 w-7 text-zinc-400 group-hover:text-violet-500 transition-colors" />
                  </div>
                  <p className="mt-4 text-sm font-semibold">
                    Tarik dan lepas atau klik untuk mengunggah
                  </p>
                  <p className="mt-1 text-xs text-zinc-500">
                    PDF, PNG, JPEG, atau file apa pun (mode demo)
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="rounded-xl bg-zinc-50 dark:bg-zinc-900 p-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white dark:bg-zinc-800 shadow-sm">
                        <FileText className="h-6 w-6 text-zinc-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate">{fileName}</p>
                        <p className="text-xs text-zinc-500">
                          {stage === "complete"
                            ? `Diproses dalam ${(elapsedMs / 1000).toFixed(1)} dtk`
                            : "Sedang diproses..."}
                        </p>
                      </div>
                      <div>
                        {isProcessing && (
                          <Loader2 className="h-5 w-5 animate-spin text-violet-500" />
                        )}
                        {stage === "complete" && (
                          <CheckCircle className="h-5 w-5 text-emerald-500" />
                        )}
                        {stage === "error" && (
                          <AlertCircle className="h-5 w-5 text-red-500" />
                        )}
                      </div>
                    </div>
                  </div>

                  {stage === "complete" && result && (
                    <>
                      {/* Result Summary Cards */}
                      <div className="grid grid-cols-3 gap-3">
                        <div className="rounded-xl bg-emerald-50 dark:bg-emerald-900/20 p-3 text-center">
                          <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                            {Math.round(result.confidence * 100)}%
                          </p>
                          <p className="text-[10px] text-emerald-600/70 font-medium">Akurasi</p>
                        </div>
                        <div className="rounded-xl bg-blue-50 dark:bg-blue-900/20 p-3 text-center">
                          <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                            {result.fieldsExtracted}
                          </p>
                          <p className="text-[10px] text-blue-600/70 font-medium">Field</p>
                        </div>
                        <div className="rounded-xl bg-violet-50 dark:bg-violet-900/20 p-3 text-center">
                          <p className="text-lg font-bold text-violet-600 dark:text-violet-400">
                            {result.processingTimeMs}ms
                          </p>
                          <p className="text-[10px] text-violet-600/70 font-medium">Latensi</p>
                        </div>
                      </div>

                      {/* Line Items Table */}
                      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                        <div className="bg-zinc-50 dark:bg-zinc-900 px-4 py-2 border-b border-zinc-200 dark:border-zinc-800">
                          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                            Item Baris Terekstrak
                          </p>
                        </div>
                        <table className="w-full text-xs">
                          <thead>
                            <tr className="border-b border-zinc-100 dark:border-zinc-800">
                              <th className="text-left px-4 py-2 font-medium text-zinc-400">Item</th>
                              <th className="text-right px-4 py-2 font-medium text-zinc-400">Jumlah</th>
                              <th className="text-right px-4 py-2 font-medium text-zinc-400">Harga</th>
                              <th className="text-right px-4 py-2 font-medium text-zinc-400">Total</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-zinc-50 dark:divide-zinc-800/50">
                            {result.lineItems.map((item, i) => (
                              <tr key={i}>
                                <td className="px-4 py-2 font-medium">{item.description}</td>
                                <td className="px-4 py-2 text-right text-zinc-500">{item.quantity}</td>
                                <td className="px-4 py-2 text-right text-zinc-500">${item.unitPrice.toFixed(2)}</td>
                                <td className="px-4 py-2 text-right font-medium">${item.total.toFixed(2)}</td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
                            <tr>
                              <td colSpan={3} className="px-4 py-1.5 text-right text-zinc-500">Subtotal</td>
                              <td className="px-4 py-1.5 text-right font-medium">${result.subtotal.toFixed(2)}</td>
                            </tr>
                            <tr>
                              <td colSpan={3} className="px-4 py-1.5 text-right text-zinc-500">Pajak</td>
                              <td className="px-4 py-1.5 text-right font-medium">${result.tax.toFixed(2)}</td>
                            </tr>
                            <tr className="font-bold">
                              <td colSpan={3} className="px-4 py-2 text-right">Total</td>
                              <td className="px-4 py-2 text-right text-emerald-600 dark:text-emerald-400">${result.total.toFixed(2)}</td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>

                      <Button variant="outline" className="w-full gap-2" onClick={reset}>
                        <RotateCcw className="h-4 w-4" />
                        Proses Dokumen Lain
                      </Button>
                    </>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Architecture Card */}
          <Card>
            <CardContent className="p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">
                Arsitektur Produksi
              </p>
              <div className="space-y-2">
                {[
                  { step: "1", text: "Dokumen diunggah ke S3 menggunakan pre-signed URL" },
                  { step: "2", text: "Webhook memicu pipeline AI (OCR → ekstraksi NLP)" },
                  { step: "3", text: "Data terstruktur divalidasi terhadap skema invoice" },
                  { step: "4", text: "Hasil disimpan ke MySQL lalu dikirim ke ERP via API" },
                  { step: "5", text: "Audit log mencatat event pemrosesan" },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-3">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-[10px] font-bold text-zinc-500 shrink-0 mt-0.5">
                      {item.step}
                    </span>
                    <p className="text-xs text-zinc-500 leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* JSON Output Area */}
        <div>
          <Card className="sticky top-20">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <FileJson className="h-4 w-4 text-zinc-400" />
                  Data Terekstrak (JSON)
                </CardTitle>
                {result && (
                  <div className="flex items-center gap-2">
                    <Badge variant="success" className="gap-1 text-[10px]">
                      Akurasi {Math.round(result.confidence * 100)}%
                    </Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={copyToClipboard}
                      title="Salin JSON"
                    >
                      {copied ? (
                        <Check className="h-3.5 w-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {result ? (
                <pre className="rounded-xl bg-zinc-950 p-5 text-xs text-emerald-400 overflow-auto max-h-[600px] font-mono leading-relaxed">
                  {JSON.stringify(result, null, 2)}
                </pre>
              ) : (
                <div className="rounded-xl bg-zinc-50 dark:bg-zinc-900 p-16 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800 mx-auto mb-4">
                    <FileJson className="h-7 w-7 text-zinc-300 dark:text-zinc-600" />
                  </div>
                  <p className="text-sm font-medium text-zinc-400">
                    {isProcessing ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        AI sedang memproses dokumen Anda...
                      </span>
                    ) : (
                      "Unggah dokumen untuk melihat data hasil ekstraksi"
                    )}
                  </p>
                  <p className="text-xs text-zinc-400/60 mt-1">
                    Output berupa JSON terstruktur yang siap untuk ERP
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
