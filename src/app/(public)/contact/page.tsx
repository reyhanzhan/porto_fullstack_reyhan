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
        throw new Error(err.error || "Failed to send message");
      }

      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30 mb-6">
          <CheckCircle className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
        </div>
        <h1 className="text-3xl font-bold">Message Sent</h1>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400">
          Thanks for reaching out. I&apos;ll review your message and respond within
          24 hours. For urgent matters, connect via LinkedIn.
        </p>
        <Button className="mt-6" onClick={() => setStatus("idle")}>
          Send Another
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Info */}
        <div className="lg:col-span-2">
          <Badge variant="secondary" className="mb-4">Get in Touch</Badge>
          <h1 className="text-3xl font-bold tracking-tight">
            Let&apos;s discuss your project
          </h1>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Whether you need an AI-powered system, an internal tool, or a
            full-stack application — I&apos;d like to understand your business
            challenge first.
          </p>

          <div className="mt-8 space-y-4">
            {[
              {
                icon: MessageSquare,
                title: "Technical Consultation",
                desc: "Architecture reviews, system design, tech stack decisions",
              },
              {
                icon: Building,
                title: "B2B Systems",
                desc: "Enterprise tools, SaaS products, internal platforms",
              },
              {
                icon: Mail,
                title: "AI Integration",
                desc: "Document processing, NLP, predictive analytics",
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
              <CardTitle>Send a Message</CardTitle>
              <CardDescription>
                All fields except Company are required. Messages are stored securely
                and visible only to the admin.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Name</label>
                    <Input name="name" required placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Email</label>
                    <Input name="email" type="email" required placeholder="you@company.com" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Company <span className="text-zinc-400">(optional)</span>
                  </label>
                  <Input name="company" placeholder="Your company" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">Subject</label>
                  <Input name="subject" required placeholder="What's this about?" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">Message</label>
                  <Textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="Describe your project or question..."
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
                      Sending...
                    </>
                  ) : (
                    "Send Message"
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
