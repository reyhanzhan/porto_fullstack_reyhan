import { db } from "@/lib/db";

export const dynamic = 'force-dynamic';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, FolderKanban, Layers } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { TogglePublishButton } from "@/components/admin/toggle-publish-button";
import { TechStackPills } from "@/components/ui/tech-icon";

async function getProjects() {
  return db.project.findMany({
    include: {
      techStack: { include: { techTag: true } },
      metrics: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

export default async function AdminProjectsPage() {
  const projects = await getProjects();
  const published = projects.filter((p) => p.published).length;

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600">
            <FolderKanban className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
            <p className="text-sm text-zinc-500">
              {projects.length} total &middot; {published} published &middot;{" "}
              {projects.length - published} drafts
            </p>
          </div>
        </div>
        <Link href="/admin/projects/new">
          <Button className="gap-2 shadow-sm">
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </Link>
      </div>

      {projects.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-16">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800 mb-4">
              <Layers className="h-8 w-8 text-zinc-300 dark:text-zinc-600" />
            </div>
            <h3 className="text-lg font-semibold mb-1">No projects yet</h3>
            <p className="text-sm text-zinc-500 mb-4">
              Create your first project to get started.
            </p>
            <Link href="/admin/projects/new">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Create Project
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-zinc-50/80 dark:bg-zinc-900/80 border-b border-zinc-200 dark:border-zinc-800">
                <tr>
                  <th className="text-left px-5 py-3.5 font-medium text-zinc-500 text-xs uppercase tracking-wider">
                    Project
                  </th>
                  <th className="text-left px-5 py-3.5 font-medium text-zinc-500 text-xs uppercase tracking-wider hidden md:table-cell">
                    Status
                  </th>
                  <th className="text-left px-5 py-3.5 font-medium text-zinc-500 text-xs uppercase tracking-wider hidden xl:table-cell">
                    Tech Stack
                  </th>
                  <th className="text-left px-5 py-3.5 font-medium text-zinc-500 text-xs uppercase tracking-wider hidden lg:table-cell">
                    Created
                  </th>
                  <th className="text-right px-5 py-3.5 font-medium text-zinc-500 text-xs uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/50">
                {projects.map((project) => (
                  <tr
                    key={project.id}
                    className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-colors"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800 text-sm font-bold text-zinc-400 shrink-0">
                          {project.title.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{project.title}</p>
                          <p className="text-xs text-zinc-400 font-mono">
                            /{project.slug}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <div className="flex items-center gap-2">
                        {project.published ? (
                          <Badge variant="success" className="gap-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            Published
                          </Badge>
                        ) : (
                          <Badge variant="warning" className="gap-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                            Draft
                          </Badge>
                        )}
                        {project.featured && (
                          <Badge className="text-[10px]">Featured</Badge>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4 hidden xl:table-cell">
                      {project.techStack.length > 0 ? (
                        <TechStackPills
                          techs={project.techStack
                            .slice(0, 3)
                            .map(({ techTag }) => techTag.name)}
                        />
                      ) : (
                        <span className="text-xs text-zinc-400">—</span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-zinc-500 text-xs hidden lg:table-cell">
                      {formatDate(project.createdAt)}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-1.5">
                        <TogglePublishButton
                          projectId={project.id}
                          published={project.published}
                        />
                        <Link href={`/admin/projects/${project.id}/edit`}>
                          <Button variant="ghost" size="icon" title="Edit">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
