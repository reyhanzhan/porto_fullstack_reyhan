"use server";

import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { createAuditLog } from "@/lib/audit";
import { projectSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProject(formData: FormData) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") throw new Error("Unauthorized");

  const raw = {
    title: formData.get("title") as string,
    slug: formData.get("slug") as string,
    subtitle: formData.get("subtitle") as string,
    description: formData.get("description") as string,
    solution: formData.get("solution") as string,
    impact: formData.get("impact") as string,
    architecture: formData.get("architecture") as string,
    demoUrl: formData.get("demoUrl") as string,
    repoUrl: formData.get("repoUrl") as string,
    published: formData.get("published") === "on",
    featured: formData.get("featured") === "on",
    sortOrder: parseInt(formData.get("sortOrder") as string) || 0,
  };

  const validated = projectSchema.parse(raw);

  const project = await db.project.create({
    data: validated,
  });

  await createAuditLog({
    action: "CREATE",
    entity: "Project",
    entityId: project.id,
    metadata: { title: project.title },
  });

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  redirect("/admin/projects");
}

export async function updateProject(id: string, formData: FormData) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") throw new Error("Unauthorized");

  const raw = {
    title: formData.get("title") as string,
    slug: formData.get("slug") as string,
    subtitle: formData.get("subtitle") as string,
    description: formData.get("description") as string,
    solution: formData.get("solution") as string,
    impact: formData.get("impact") as string,
    architecture: formData.get("architecture") as string,
    demoUrl: formData.get("demoUrl") as string,
    repoUrl: formData.get("repoUrl") as string,
    published: formData.get("published") === "on",
    featured: formData.get("featured") === "on",
    sortOrder: parseInt(formData.get("sortOrder") as string) || 0,
  };

  const validated = projectSchema.parse(raw);

  await db.project.update({
    where: { id },
    data: validated,
  });

  await createAuditLog({
    action: "UPDATE",
    entity: "Project",
    entityId: id,
    metadata: { title: validated.title },
  });

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath(`/projects/${validated.slug}`);
  redirect("/admin/projects");
}

export async function toggleProjectPublish(id: string, published: boolean) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") throw new Error("Unauthorized");

  await db.project.update({
    where: { id },
    data: { published },
  });

  await createAuditLog({
    action: "UPDATE",
    entity: "Project",
    entityId: id,
    metadata: { action: published ? "publish" : "unpublish" },
  });

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
}

export async function deleteProject(id: string) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") throw new Error("Unauthorized");

  const project = await db.project.findUnique({ where: { id } });

  await db.project.delete({ where: { id } });

  await createAuditLog({
    action: "DELETE",
    entity: "Project",
    entityId: id,
    metadata: { title: project?.title },
  });

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
}

export async function updateMessageStatus(id: string, status: "READ" | "REPLIED" | "ARCHIVED") {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") throw new Error("Unauthorized");

  await db.contactMessage.update({
    where: { id },
    data: { status },
  });

  await createAuditLog({
    action: "UPDATE",
    entity: "ContactMessage",
    entityId: id,
    metadata: { newStatus: status },
  });

  revalidatePath("/admin/messages");
}
