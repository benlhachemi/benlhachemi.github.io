import { ProjectCard, ProjectCardProps } from "@/components/ProjectCard"
import { Metadata } from "next/types"
import ProjectsContent from '@/content/projects/index.mdx'

export const metadata: Metadata = {
  title: "Projects",
  description: "Some of my projects",
}

const projects: ProjectCardProps[] = [
  {
    title: 'Comsep',
    shortDescription: '',
    techStack: ['nestjs', 'shadcn'],
    links: [
      { type: 'github', url: '/' }
    ],
    image: 'https://picsum.photos/536/354',
    date: '12 Mars 2024',
  }
]

export default function Page() {
  return (
    <div className="space-y-16">
      <ProjectsContent />
    </div>
  )
}