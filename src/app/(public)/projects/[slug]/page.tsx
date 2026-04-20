import { db } from "@/lib/db";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Github, TrendingUp } from "lucide-react";
import Link from "next/link";
import { TechStackGrid } from "@/components/ui/tech-icon";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getProject(slug: string) {
  return db.project.findUnique({
    where: { slug, published: true },
    include: {
      techStack: { include: { techTag: true } },
      categories: { include: { category: true } },
      metrics: true,
    },
  });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: "Proyek Tidak Ditemukan" };

  return {
    title: project.title,
    description: project.description.slice(0, 160),
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 animate-fade-in">
      {/* Back */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Semua Proyek
      </Link>

      {/* Header */}
      <div>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.categories.map(({ category }) => (
            <Badge key={category.id} variant="secondary">
              {category.name}
            </Badge>
          ))}
          {project.featured && <Badge>Unggulan</Badge>}
        </div>

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {project.title}
        </h1>
        {project.subtitle && (
          <p className="mt-2 text-lg text-zinc-500">{project.subtitle}</p>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
              <Button className="gap-2">
                Demo Langsung <ExternalLink className="h-4 w-4" />
              </Button>
            </a>
          )}
          {project.repoUrl && (
            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="gap-2">
                Kode Sumber <Github className="h-4 w-4" />
              </Button>
            </a>
          )}
        </div>
      </div>

      {/* Business Problem */}
      <section className="mt-12">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 mb-3">
          Masalah Bisnis
        </h2>
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed whitespace-pre-line">
            {project.description}
          </p>
        </div>
      </section>

      {/* Technical Solution */}
      <section className="mt-12">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 mb-3">
          Solusi Teknis
        </h2>
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed whitespace-pre-line">
            {project.solution}
          </p>
        </div>
      </section>

      {/* System Architecture */}
      {project.architecture && (
        <section className="mt-12">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 mb-3">
            Arsitektur Sistem
          </h2>
          <Card className="overflow-hidden">
            <CardContent className="p-6 bg-zinc-50/50 dark:bg-zinc-900/50">
              <pre className="text-sm text-zinc-600 dark:text-zinc-400 whitespace-pre-wrap font-mono leading-relaxed">
                {project.architecture}
              </pre>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Impact */}
      {(project.impact || project.metrics.length > 0) && (
        <section className="mt-12">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 mb-3">
            Dampak Terukur
          </h2>
          {project.metrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
              {project.metrics.map((metric) => (
                <Card key={metric.id} className="overflow-hidden">
                  <div className="h-1 bg-gradient-to-r from-emerald-400 to-emerald-600" />
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1.5 mb-1">
                      <TrendingUp className="h-4 w-4 text-emerald-500" />
                      <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                        {metric.value}
                      </span>
                    </div>
                    <div className="text-xs text-zinc-500">{metric.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          {project.impact && (
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed whitespace-pre-line">
              {project.impact}
            </p>
          )}
        </section>
      )}

      {/* Tech Stack — Now with icons */}
      {project.techStack.length > 0 && (
        <section className="mt-12">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 mb-4">
            Teknologi yang Digunakan
          </h2>
          <Card>
            <CardContent className="p-6">
              <TechStackGrid
                techs={project.techStack.map(({ techTag }) => techTag.name)}
                size="md"
                showLabels={true}
                className="gap-4"
              />
            </CardContent>
          </Card>
        </section>
      )}
    </div>
  );
}
