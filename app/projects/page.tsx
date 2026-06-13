import ProjectsContent from '@/content/projects/index.mdx'
import { Metadata } from "next/types"

export const metadata: Metadata = {
  title: "Projects",
  description: "Some of my projects",
}

export default function Page() {
  return (
    <div className="space-y-16">
      <ProjectsContent />
    </div>
  )
}