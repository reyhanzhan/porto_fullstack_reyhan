import { z } from "zod";

// =============================================================================
// Auth Schemas
// =============================================================================

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// =============================================================================
// Project Schemas
// =============================================================================

export const projectSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z.string().min(3).regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens"),
  subtitle: z.string().optional(),
  description: z.string().min(20, "Describe the business problem (min 20 chars)"),
  solution: z.string().min(20, "Describe the technical solution (min 20 chars)"),
  impact: z.string().optional(),
  architecture: z.string().optional(),
  demoUrl: z.string().url().optional().or(z.literal("")),
  repoUrl: z.string().url().optional().or(z.literal("")),
  imageUrl: z.string().optional(),
  published: z.boolean().default(false),
  featured: z.boolean().default(false),
  sortOrder: z.number().int().default(0),
});

export type ProjectFormData = z.infer<typeof projectSchema>;

// =============================================================================
// Contact Schemas
// =============================================================================

export const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  company: z.string().optional(),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
