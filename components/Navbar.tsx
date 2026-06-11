'use client'

import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { GithubLogo } from './logos/GithubLogo'
import { Button } from './ui/button'
import { XLogo } from './logos/XLogo'
import { YouTubeLogo } from './logos/YouTubeLogo'
import { useTheme } from 'next-themes'
import { Menu, Moon, Sun } from 'lucide-react'
import { LinkedInLogo } from './logos/LinkedInLogo'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'

const links = [
  { name: 'About', href: '/' },
  { name: 'LLMs.txt', href: '/llms.txt' },
  { name: 'Services', href: '/services' },
  { name: 'Projects', href: '/projects' },
  { name: 'Blog', href: '/blog' },
]

const buttons = [
  { icon: GithubLogo, href: 'https://github.com/benlhachemi', title: 'GitHub' },
  { icon: YouTubeLogo, href: 'https://youtube.com/@souhail4dev', title: 'YouTube' },
  { icon: XLogo, href: 'https://x.com/souhail_dev', title: 'Twitter' },
  { icon: LinkedInLogo, href: 'https://linkedin.com/in/souhail-benlhachemi', title: 'LinkedIn' },
]

export function Navbar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  return (
    <nav className="w-full flex items-center justify-between py-4 border-b">
      <a href="/" title="Home" className="text-lg font-semibold flex items-baseline gap-1">
        Souhail Benlhachemi
        <span className="size-1.5 bg-primary" />
      </a>

      {/* Desktop nav */}
      <div className='hidden md:flex items-center justify-center gap-8 lg:gap-16'>
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
              <Button variant="outline" size="icon-sm">
                <button.icon />
              </Button>
            </a>
          ))}

          <Button variant="outline" size="icon-sm" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} title="Toggle theme">
            {theme === 'dark' ? <Sun /> : <Moon />}
          </Button>
        </div>
      </div>

      {/* Mobile burger menu */}
      <Sheet>
        <SheetTrigger className="md:hidden">
          <Button variant="outline" size="icon-sm">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <div className="flex flex-col gap-8 pt-10 px-4">
            <ul className="flex flex-col gap-4">
              {links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={cn("text-lg text-muted-foreground hover:text-primary", pathname === link.href && "text-primary")}>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            <hr className="border-border" />

            <div className='flex items-center gap-1.5'>
              {buttons.map((button) => (
                <a key={button.href} href={button.href} target="_blank" rel="noopener noreferrer" title={button.title}>
                  <Button variant="outline" size="icon-sm">
                    <button.icon />
                  </Button>
                </a>
              ))}

              <Button variant="outline" size="icon-sm" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} title="Toggle theme">
                {theme === 'dark' ? <Sun /> : <Moon />}
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  )
}