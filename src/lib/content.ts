import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { ProjectFrontmatter, ProjectFrontmatterSchema, DevLogFrontmatter, DevLogFrontmatterSchema } from './schemas';

const CONTENT_PATH = path.join(process.cwd(), 'content');

export function getProjectBySlug(locale: string, slug: string) {
  const fullPath = path.join(CONTENT_PATH, locale, 'projects', `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  
  const validated = ProjectFrontmatterSchema.safeParse(data);
  if (!validated.success) {
    throw new Error(`[Zod Error] Invalid frontmatter in project '${slug}': ${validated.error.message}`);
  }

  return { slug, frontmatter: validated.data, content };
}

export function getAllProjects(locale: string) {
  const projectsDir = path.join(CONTENT_PATH, locale, 'projects');
  if (!fs.existsSync(projectsDir)) return [];
  
  const files = fs.readdirSync(projectsDir);
  const projects = files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '');
      return getProjectBySlug(locale, slug);
    })
    .filter(Boolean) as { slug: string; frontmatter: ProjectFrontmatter; content: string }[];
    
  return projects.sort((a, b) => b.frontmatter.date.getTime() - a.frontmatter.date.getTime());
}

export function getDevLogBySlug(locale: string, slug: string) {
  const fullPath = path.join(CONTENT_PATH, locale, 'devlog', `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  
  const validated = DevLogFrontmatterSchema.safeParse(data);
  if (!validated.success) {
    throw new Error(`[Zod Error] Invalid frontmatter in devlog '${slug}': ${validated.error.message}`);
  }

  return { slug, frontmatter: validated.data, content };
}

export function getAllDevLogs(locale: string) {
  const devlogDir = path.join(CONTENT_PATH, locale, 'devlog');
  if (!fs.existsSync(devlogDir)) return [];
  
  const files = fs.readdirSync(devlogDir);
  const logs = files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '');
      return getDevLogBySlug(locale, slug);
    })
    .filter(Boolean) as { slug: string; frontmatter: DevLogFrontmatter; content: string }[];
    
  return logs.sort((a, b) => b.frontmatter.date.getTime() - a.frontmatter.date.getTime());
}
