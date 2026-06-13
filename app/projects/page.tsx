import { getProjects } from "@/lib/project-data"
import { ProjectCard } from "@/components/ProjectCard"
import ProjectsContent from '@/content/projects/index.mdx'
import { Metadata } from "next/types"

export const metadata: Metadata = {
  title: "Projects",
  description: "Some of my projects",
}

export default function Page() {
  const projects = getProjects()

  return (
    <div className="space-y-16">

      <div className="space-y-4 max-w-sm">
        <h1 className="text-4xl font-semibold">Projects</h1>
        <p className="text-muted-foreground">
          Some of my projects. Things I've built, shipped, and learned from.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <ProjectCard
            key={project.slug}
            date={project.date}
            image={project.image}
            links={project.links}
            shortDescription={project.shortDescription}
            techStack={project.techStack}
            title={project.title}
            slug={project.slug}
            className="grid-cols-1"
          />
        ))}
      </div>
    </div>
  )
}