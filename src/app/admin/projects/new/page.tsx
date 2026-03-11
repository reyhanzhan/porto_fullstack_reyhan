import { ProjectForm } from "@/components/admin/project-form";

export default function NewProjectPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">New Project</h1>
        <p className="text-sm text-zinc-500 mt-1">
          Add a new project case study to your portfolio
        </p>
      </div>
      <ProjectForm />
    </div>
  );
}
