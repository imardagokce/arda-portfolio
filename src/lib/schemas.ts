import { z } from 'zod';

export const ProjectFrontmatterSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  date: z.string().or(z.date()).transform((val) => new Date(val)).optional(),
});

export type ProjectFrontmatter = z.infer<typeof ProjectFrontmatterSchema>;
