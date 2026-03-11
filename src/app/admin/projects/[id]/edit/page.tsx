import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { ProjectForm } from "@/components/admin/project-form";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({ params }: PageProps) {
  const { id } = await params;
  const project = await db.project.findUnique({ where: { id } });

  if (!project) notFound();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Edit Project</h1>
        <p className="text-sm text-zinc-500 mt-1">{project.title}</p>
      </div>
      <ProjectForm project={project} />
    </div>
  );
}
