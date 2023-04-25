import Link from "next/link"
import type { NavItem } from "@/types"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { buttonVariants } from "@/ui/button"
import { siteConfig } from "@/config/site"

interface SiteHeaderProps {
  mainNavItem: NavItem[]
  children?: React.ReactNode
}

export function SiteHeader({ children, mainNavItem }: SiteHeaderProps) {
  return (
    <nav className="sticky top-0 z-20 w-full border-b border-b-slate-200">
      <div className="container flex h-16 select-none items-center bg-white dark:bg-slate-900">
        <MainNav items={mainNavItem} />
        <div className="flex-0 flex items-center justify-end space-x-2 sm:space-x-4">
          <div className="flex items-center space-x-1">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: "sm",
                  variant: "ghost",
                  className: "text-slate-700 dark:text-slate-400",
                })}
              >
                <Icons.gitHub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <Link
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: "sm",
                  variant: "ghost",
                  className: "text-slate-700 dark:text-slate-400",
                })}
              >
                <Icons.twitter className="h-5 w-5 fill-current" />
                <span className="sr-only">Twitter</span>
              </div>
            </Link>
            {children}
          </div>
        </div>
      </div>
    </nav>
  )
}
