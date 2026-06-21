'use client'

import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { Button } from './ui/button'
import { useTheme } from 'next-themes'
import { Menu, Moon, Sun } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'

const links = [
  { name: 'About', href: '/' },
  { name: 'LLMs.txt', href: '/llms.txt' },
  { name: 'Services', href: '/services' },
  { name: 'CV', href: '/cv.pdf' },
  { name: 'Projects', href: '/projects' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
]

export function Navbar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  return (
    <nav className="w-full flex items-center justify-between py-4 border-b sticky top-0 z-40 bg-background">
      <a href="/" title="Home" className="text-lg font-semibold flex items-baseline gap-0.5">
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

        <Button variant="ghost" className="text-muted-foreground" size="icon-sm" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} title="Toggle theme">
          {theme === 'dark' ? <Sun /> : <Moon />}
        </Button>
      </div>

      {/* Mobile burger menu */}
      <Sheet>
        <SheetTrigger className="md:hidden">
          <Button variant="ghost" size="icon-sm">
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

            <Button variant="ghost" className="text-muted-foreground" size="icon-sm" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} title="Toggle theme">
              {theme === 'dark' ? <Sun /> : <Moon />}
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  )
}