import type { NextApiRequest, NextApiResponse } from "next"
import type { Icon } from "lucide-react"
import type { User } from "next-auth"
import { Icons } from "@/components/icons"
import type { User as PrismaUser } from "@/lib/db"

export type NavItem = {
  title: string
  href: string
  disabled?: boolean
}

export type MainNavItem = NavItem

export type SidebarNavItem = {
  title: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
} & (
  | {
      href: string
      items?: never
    }
  | {
      href?: string
      items: NavLink[]
    }
)

export type SiteConfig = {
  name: string
  domain: string
  description: string
  creator: {
    name: string
    twitter: string
  }
  links: {
    twitter: string
    github: string
  }
  defaultFrom: string
}

export type DocsConfig = {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export type MarketingConfig = {
  mainNav: MainNavItem[]
}

export type DashboardConfig = {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
  accountSidebarNav: SidebarNavItem[]
}

export type SubscriptionPlan = {
  name: string
  description: string
  stripePriceId: string | null
}

export type UserSubscriptionPlan = SubscriptionPlan &
  Pick<PrismaUser, "stripeCustomerId" | "stripeSubscriptionId"> & {
    stripeCurrentPeriodEnd: number
    isPro: boolean
  }

/**
 * Next `API` route request
 */
export interface NextApiRequestCustom extends NextApiRequest {
  session: Session
  user: User & {
    id: PrismaUser["id"]
    username: PrismaUser["username"]
  }
}

/**
 * Next `API` route handler
 */
export type NextApiHandlerCustom<T = any> = (
  req: NextApiRequestCustom,
  res: NextApiResponse<T>
) => unknown | Promise<unknown>
