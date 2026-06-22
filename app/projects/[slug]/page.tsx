import { getProjectBySlug, getProjectSlugs } from "@/lib/project-data"
import { projectRegistry } from "@/lib/project-registry"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export async function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}
  return { title: project.title, description: project.shortDescription }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  const Content = projectRegistry[slug]
  if (!Content) notFound()

  return (
    <div className="space-y-16">
      <Link href="/projects" title="Projects">
        <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground mb-8">
          <ArrowLeft className="size-4" />
          Back to Projects
        </Button>
      </Link>

      <div className="prose dark:prose-invert max-w-none">
        <Content />
      </div>
    </div>
  )
}