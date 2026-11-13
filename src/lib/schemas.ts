import { z } from 'zod';

export const ProjectFrontmatterSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  date: z.string().or(z.date()).transform((val) => new Date(val)).optional(),
});

export type ProjectFrontmatter = z.infer<typeof ProjectFrontmatterSchema>;

// İletişim formu — /api/contact route'unda sunucu tarafında doğrulanır.
// name ve subject e-postanın başlık kısmına girdiği için satır sonu içeremez.
const SINGLE_LINE = /^[^\r\n]*$/;

export const ContactSchema = z.object({
  name: z
    .string('Name is required')
    .trim()
    .min(1, 'Name is required')
    .max(100, 'Name must be at most 100 characters')
    .regex(SINGLE_LINE, 'Name must be a single line'),
  email: z
    .string('Email is required')
    .trim()
    .max(254, 'Email must be at most 254 characters')
    .pipe(z.email('Invalid email address')),
  subject: z
    .string('Subject is required')
    .trim()
    .min(1, 'Subject is required')
    .max(150, 'Subject must be at most 150 characters')
    .regex(SINGLE_LINE, 'Subject must be a single line'),
  message: z
    .string('Message is required')
    .trim()
    .min(1, 'Message is required')
    .max(5000, 'Message must be at most 5000 characters'),
});

export type ContactInput = z.infer<typeof ContactSchema>;
