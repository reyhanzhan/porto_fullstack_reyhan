import { db } from "@/lib/db";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, ExternalLink, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TechStackPills } from "@/components/ui/tech-icon";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Enterprise-grade projects solving real B2B problems with AI, full stack engineering, and system design.",
};

async function getProjects() {
  return db.project.findMany({
    where: { published: true },
    include: {
      techStack: { include: { techTag: true } },
      categories: { include: { category: true } },
      metrics: true,
    },
    orderBy: [{ featured: "desc" }, { sortOrder: "asc" }, { createdAt: "desc" }],
  });
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mx-auto max-w-2xl text-center animate-fade-in-up">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Project Portfolio
        </h1>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
          Each project solves a specific business problem. Not toy apps &mdash; production
          systems with measurable impact.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="mt-16 grid gap-8 stagger-children">
        {projects.length === 0 ? (
          <EmptyState />
        ) : (
          projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        )}
      </div>
    </div>
  );
}

type ProjectWithRelations = Awaited<ReturnType<typeof getProjects>>[number];

function ProjectCard({ project }: { project: ProjectWithRelations }) {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg hover:border-zinc-300 dark:hover:border-zinc-700 duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-3">
        {/* Image / Placeholder */}
        <div className="relative bg-gradient-to-br from-zinc-100 to-zinc-50 dark:from-zinc-800 dark:to-zinc-900 lg:col-span-1 min-h-[200px] flex items-center justify-center">
          {project.imageUrl ? (
            <img
              src={project.imageUrl}
              alt={project.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="text-center p-6">
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-white dark:bg-zinc-800 shadow-sm group-hover:scale-105 transition-transform duration-300">
                <span className="text-3xl font-bold text-zinc-300 dark:text-zinc-600">
                  {project.title.charAt(0)}
                </span>
              </div>
            </div>
          )}
          {project.featured && (
            <div className="absolute top-3 left-3">
              <Badge variant="default" className="shadow-sm">Featured</Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="lg:col-span-2 p-6 lg:p-8">
          <CardHeader className="p-0">
            <div className="flex items-start justify-between gap-4">
              <div>
                <CardTitle className="text-xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                  {project.title}
                </CardTitle>
                {project.subtitle && (
                  <CardDescription className="mt-1">
                    {project.subtitle}
                  </CardDescription>
                )}
              </div>
              <div className="flex gap-2 shrink-0">
                {project.demoUrl && (
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="gap-1.5">
                      Demo <ExternalLink className="h-3 w-3" />
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0 mt-4">
            {/* Business Problem */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                Business Problem
              </h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-2">
                {project.description}
              </p>
            </div>

            {/* Impact Metrics */}
            {project.metrics.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-3">
                {project.metrics.map((metric) => (
                  <div
                    key={metric.id}
                    className="rounded-lg bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1.5 border border-emerald-100 dark:border-emerald-800/30"
                  >
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                      {metric.label}: <strong>{metric.value}</strong>
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Tech Stack — Now with icons */}
            {project.techStack.length > 0 && (
              <div className="mt-4">
                <TechStackPills
                  techs={project.techStack.map(({ techTag }) => techTag.name)}
                />
              </div>
            )}

            {/* Read More */}
            <div className="mt-4">
              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center gap-1 text-sm font-medium text-zinc-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 underline-offset-4 hover:underline transition-colors"
              >
                View full case study
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-24">
      <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800 mb-4">
        <Layers className="h-8 w-8 text-zinc-300 dark:text-zinc-600" />
      </div>
      <h3 className="text-lg font-semibold">Projects coming soon</h3>
      <p className="mt-2 text-sm text-zinc-500 max-w-md mx-auto">
        Project case studies are being prepared. Check back soon for detailed
        breakdowns of enterprise systems I&apos;ve built.
      </p>
    </div>
  );
}
