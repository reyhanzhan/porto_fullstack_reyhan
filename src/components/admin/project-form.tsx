"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createProject, updateProject } from "@/app/admin/actions";
import { Loader2 } from "lucide-react";
import { type FormEvent, useState, useTransition } from "react";

interface Project {
  id: string;
  title: string;
  slug: string;
  subtitle: string | null;
  description: string;
  solution: string;
  impact: string | null;
  architecture: string | null;
  demoUrl: string | null;
  repoUrl: string | null;
  published: boolean;
  featured: boolean;
  sortOrder: number;
}

interface Props {
  project?: Project;
}

export function ProjectForm({ project }: Props) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const isEditing = !!project;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      setError("");

      if (isEditing) {
        const result = await updateProject(project.id, formData);
        if (result?.error) setError(result.error);
      } else {
        const result = await createProject(formData);
        if (result?.error) setError(result.error);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Title</label>
                <Input
                  name="title"
                  required
                  minLength={3}
                  defaultValue={project?.title}
                  placeholder="AI-Powered Invoice Processing System"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Slug</label>
                <Input
                  name="slug"
                  required
                  minLength={3}
                  pattern="^[a-z0-9-]+$"
                  defaultValue={project?.slug}
                  placeholder="ai-invoice-processing"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Subtitle</label>
                <Input
                  name="subtitle"
                  defaultValue={project?.subtitle ?? ""}
                  placeholder="Short tagline for the project"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Business Case</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Business Problem
                </label>
                <Textarea
                  name="description"
                  required
                  minLength={20}
                  rows={4}
                  defaultValue={project?.description}
                  placeholder="Describe the business problem this project solves..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Technical Solution
                </label>
                <Textarea
                  name="solution"
                  required
                  minLength={20}
                  rows={4}
                  defaultValue={project?.solution}
                  placeholder="Describe the technical approach and architecture..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Measurable Impact
                </label>
                <Textarea
                  name="impact"
                  rows={3}
                  defaultValue={project?.impact ?? ""}
                  placeholder="e.g., Reduced processing time by 60%, saved $200K/year..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  System Architecture
                </label>
                <Textarea
                  name="architecture"
                  rows={6}
                  defaultValue={project?.architecture ?? ""}
                  placeholder="Describe the system architecture diagram..."
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Publishing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="published"
                  defaultChecked={project?.published}
                  className="rounded border-zinc-300"
                />
                <span className="text-sm">Published</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="featured"
                  defaultChecked={project?.featured}
                  className="rounded border-zinc-300"
                />
                <span className="text-sm">Featured</span>
              </label>
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Sort Order
                </label>
                <Input
                  name="sortOrder"
                  type="number"
                  defaultValue={project?.sortOrder ?? 0}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Demo URL
                </label>
                <Input
                  name="demoUrl"
                  type="url"
                  defaultValue={project?.demoUrl ?? ""}
                  placeholder="https://demo.example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Repository URL
                </label>
                <Input
                  name="repoUrl"
                  type="url"
                  defaultValue={project?.repoUrl ?? ""}
                  placeholder="https://github.com/..."
                />
              </div>
            </CardContent>
          </Card>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : isEditing ? (
              "Update Project"
            ) : (
              "Create Project"
            )}
          </Button>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
        </div>
      </div>
    </form>
  );
}
