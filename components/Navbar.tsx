'use client'

import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { GithubLogo } from './logos/GithubLogo'
import { Button } from './ui/button'
import { XLogo } from './logos/XLogo'
import { YouTubeLogo } from './logos/YouTubeLogo'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'

const links = [
  { name: 'About me', href: '/' },
  { name: 'LLMs.txt', href: '/llms.txt' },
  { name: 'Projects', href: '/projects' },
  { name: 'Blog', href: '/blog' },
]

const buttons = [
  { icon: GithubLogo, href: 'https://github.com/benlhachemi', title: 'GitHub' },
  { icon: XLogo, href: 'https://x.com/souhail_dev', title: 'Twitter' },
  { icon: YouTubeLogo, href: 'https://youtube.com/@souhail4dev', title: 'YouTube' },
]

export function Navbar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  return (
    <nav className="w-full flex items-center justify-between py-4 border-b">
      <h1 className="text-lg font-semibold">Souhail Benlhachemi</h1>

      <div className='flex items-center justify-center gap-16'>
        <ul className="flex gap-6">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className={cn("text-muted-foreground hover:text-primary", pathname === link.href && "text-primary")}>
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        <div className='flex items-center justify-center gap-1.5'>
          {buttons.map((button) => (
            <a key={button.href} href={button.href} target="_blank" rel="noopener noreferrer" title={button.title}>
              <Button variant="outline" size="icon">
                <button.icon />
              </Button>
            </a>
          ))}

          <Button variant="outline" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} title="Toggle theme">
            {theme === 'dark' ? <Sun /> : <Moon />}
          </Button>
        </div>
      </div>
    </nav>
  )
}