import { z } from 'zod';

export const ProjectFrontmatterSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  status: z.enum(['completed', 'active', 'archived']),
  featured: z.boolean().default(false),
  github: z.string().url().optional(),
  demo: z.string().url().optional(),
  technologies: z.array(z.string()),
  coverImage: z.string().optional(),
  date: z.string().or(z.date()).transform((val) => new Date(val)),
});

export type ProjectFrontmatter = z.infer<typeof ProjectFrontmatterSchema>;

export const DevLogFrontmatterSchema = z.object({
  title: z.string().min(1, "Title is required"),
  project: z.string().min(1, "Project reference is required"),
  date: z.string().or(z.date()).transform((val) => new Date(val)),
  tags: z.array(z.string()).default([]),
  summary: z.string().min(1, "Summary is required"),
});

export type DevLogFrontmatter = z.infer<typeof DevLogFrontmatterSchema>;
