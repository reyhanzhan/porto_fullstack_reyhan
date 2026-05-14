"use client";

import { useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
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
      e.currentTarget.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-8">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30 mb-6">
          <CheckCircle className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
        </div>
        <h2 className="text-2xl font-bold">Pesan Terkirim</h2>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400">
          Terima kasih. Saya akan meninjau pesan Anda dan merespons dalam 24 jam.
        </p>
        <Button className="mt-6" onClick={() => setStatus("idle")}>
          Kirim Lagi
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium">Nama</label>
          <Input name="name" required placeholder="Nama Anda" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Email</label>
          <Input name="email" type="email" required placeholder="anda@perusahaan.com" />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium">
          Perusahaan <span className="text-zinc-400">(opsional)</span>
        </label>
        <Input name="company" placeholder="Nama perusahaan Anda" />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium">Subjek</label>
        <Input name="subject" required placeholder="Topik pesan ini tentang apa?" />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium">Pesan</label>
        <Textarea
          name="message"
          required
          rows={5}
          placeholder="Jelaskan proyek atau pertanyaan Anda..."
        />
      </div>

      {error ? <p className="text-sm text-red-600 dark:text-red-400">{error}</p> : null}

      <Button type="submit" className="w-full" disabled={status === "submitting"}>
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
  );
}
