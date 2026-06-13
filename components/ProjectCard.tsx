import { GithubLogo } from "@/components/logos/GithubLogo"
import { ShadcnLogo } from "@/components/logos/ShadcnLogo"
import { YouTubeLogo } from "@/components/logos/YouTubeLogo"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

type TechStack = "shadcn" | "react" | "tailwindcss" | "nextjs" | "nestjs"
type ProjectLink = {
  type: "github" | "website" | "youtube";
  url: string;
}

export interface ProjectCardProps {
  title: string;
  shortDescription: string;
  techStack: TechStack[];
  links: ProjectLink[];
  image: string;
  date: string;
}

const renderTechStack = (techStack: TechStack) => {
  switch (techStack) {
    case 'shadcn': return <ShadcnLogo />
  }
}

const getLinkTitle = (link: ProjectLink) => {
  switch (link.type) {
    case 'github': return 'Github repo'
    case 'website': return 'Live website'
    case 'youtube': return 'YouTube video'
  }
}

const getLinkIcon = (link: ProjectLink) => {
  switch (link.type) {
    case 'github': return <GithubLogo />
    case 'website': return <Globe />
    case 'youtube': return <YouTubeLogo />
  }
}

export function ProjectCard({ title, shortDescription, techStack, links, image, date }: ProjectCardProps) {
  return (
    <div className="w-full grid grid-cols-2 gap-8">
      <div className="w-full rounded-none shadow-xs bg-card">
        <Image
          src={image}
          alt="Project image"
          className="w-full h-48 object-cover"
          width={600}
          height={400}
        />

        <div className="space-y-4 p-6">
          {/* Title */}
          <div className="flex items-center justify-between gap-6">
            <h2 className="text-xl font-medium">{title}</h2>
            <div className="flex flex-wrap gap-2 *:size-4">
              {techStack.map(elt => renderTechStack(elt))}
            </div>
          </div>

          {/* Date */}
          <div className="text-xs text-muted-foreground">{date}</div>

          {/* Short Description */}
          <p className="text-muted-foreground">{shortDescription}</p>

          {/* Links & Button */}
          <div className="flex items-center justify-between gap-6">
            <div className="flex flex-wrap gap-0 *:text-muted-foreground *:grayscale-100">
              {links.map((link, i) => (
                <Link key={i} href={link.url} title={getLinkTitle(link)}>
                  <Button size="icon-sm" variant="ghost">
                    {getLinkIcon(link)}
                  </Button>
                </Link>
              ))}
            </div>

            <Button variant="default" size="default" className="rounded-none">
              More Info
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}