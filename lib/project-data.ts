type TechStack = "shadcn" | "react" | "tailwindcss" | "nextjs" | "nestjs"
type ProjectLink = {
  type: "github" | "website" | "youtube";
  url: string;
}

export interface ProjectMeta {
  slug: string;
  title: string;
  shortDescription: string;
  techStack: TechStack[];
  links: ProjectLink[];
  image: string;
  date: string;
}

export const projects: ProjectMeta[] = [
  {
    slug: 'comsep',
    title: 'Comsep',
    shortDescription: 'aaa',
    techStack: ['nestjs', 'shadcn'],
    links: [{ type: 'github', url: '/' }],
    image: 'https://picsum.photos/536/354',
    date: '12 Mars 2026',
  },
]

export function getProjectBySlug(slug: string): ProjectMeta | undefined {
  return projects.find(p => p.slug === slug)
}