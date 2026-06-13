import { Metadata } from "next/types"

export const metadata: Metadata = {
  title: "Projects",
  description: "Some of my projects",
}

export default function Page() {
  return (
    <div>
      <div className="space-y-4 max-w-sm">
        <h1 className="text-4xl font-semibold">Projects</h1>
        <p className="text-muted-foreground">
          Some of my projects. Things I've built, shipped, and learned from.
        </p>
      </div>
    </div>
  )
}