import { GithubLogo } from "@/components/logos/GithubLogo"
import { ShadcnLogo } from "@/components/logos/ShadcnLogo"
import { YouTubeLogo } from "@/components/logos/YouTubeLogo"
import { ProjectCard, ProjectCardProps } from "@/components/ProjectCard"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Metadata } from "next/types"

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
      <div className="space-y-4 max-w-sm">
        <h1 className="text-4xl font-semibold">Projects</h1>
        <p className="text-muted-foreground">
          Some of my projects. Things I've built, shipped, and learned from.
        </p>
      </div>

      {projects.map(project => (
        <ProjectCard
          key={project.title}
          date={project.date}
          image={project.image}
          links={project.links}
          shortDescription={project.shortDescription}
          techStack={project.techStack}
          title={project.title}
        />
      ))}
    </div>
  )
}