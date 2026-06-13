import { projects, getProjectBySlug } from "@/lib/project-data"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

import ComsepContent from '@/content/projects/comsep.mdx'

const mdxContent: Record<string, React.ComponentType> = {
  comsep: ComsepContent,
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}
  return { title: project.title }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  const Content = mdxContent[slug]
  if (!Content) notFound()

  return (
    <div className="space-y-16">
      <Link href="/projects">
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