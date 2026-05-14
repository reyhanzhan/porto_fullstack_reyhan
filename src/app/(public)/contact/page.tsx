import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, Mail, MessageSquare } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";

export default function ContactPage() {
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
              <ContactForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
