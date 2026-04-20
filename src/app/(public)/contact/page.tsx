"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Loader2, Mail, Building, MessageSquare } from "lucide-react";

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function ContactPage() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      company: formData.get("company") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Gagal mengirim pesan");
      }

      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30 mb-6">
          <CheckCircle className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
        </div>
        <h1 className="text-3xl font-bold">Pesan Terkirim</h1>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400">
          Terima kasih sudah menghubungi saya. Saya akan meninjau pesan Anda dan merespons dalam
          24 jam. Untuk kebutuhan mendesak, silakan hubungi melalui LinkedIn.
        </p>
        <Button className="mt-6" onClick={() => setStatus("idle")}>
          Kirim Lagi
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Info */}
        <div className="lg:col-span-2">
          <Badge variant="secondary" className="mb-4">Hubungi Saya</Badge>
          <h1 className="text-3xl font-bold tracking-tight">
            Mari diskusikan proyek Anda
          </h1>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Baik Anda membutuhkan sistem berbasis AI, tools internal, maupun
            aplikasi full stack — saya ingin memahami tantangan bisnis Anda
            terlebih dahulu.
          </p>

          <div className="mt-8 space-y-4">
            {[
              {
                icon: MessageSquare,
                title: "Konsultasi Teknis",
                desc: "Review arsitektur, desain sistem, dan keputusan tech stack",
              },
              {
                icon: Building,
                title: "Sistem B2B",
                desc: "Tools enterprise, produk SaaS, dan platform internal",
              },
              {
                icon: Mail,
                title: "Integrasi AI",
                desc: "Pemrosesan dokumen, NLP, dan analitik prediktif",
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
                  <item.icon className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
                </div>
                <div>
                  <h3 className="text-sm font-medium">{item.title}</h3>
                  <p className="text-xs text-zinc-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Kirim Pesan</CardTitle>
              <CardDescription>
                Semua field kecuali Perusahaan wajib diisi. Pesan disimpan secara aman
                dan hanya dapat dilihat oleh admin.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Nama</label>
                    <Input name="name" required placeholder="Nama Anda" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Email</label>
                    <Input name="email" type="email" required placeholder="anda@perusahaan.com" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Perusahaan <span className="text-zinc-400">(opsional)</span>
                  </label>
                  <Input name="company" placeholder="Nama perusahaan Anda" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">Subjek</label>
                  <Input name="subject" required placeholder="Topik pesan ini tentang apa?" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">Pesan</label>
                  <Textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="Jelaskan proyek atau pertanyaan Anda..."
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  disabled={status === "submitting"}
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Mengirim...
                    </>
                  ) : (
                    "Kirim Pesan"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
