import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardNav } from "@/components/nav"
import { UserAccountNav } from "@/components/user-account-nav"
import { dashboardConfig } from "@/config/dashboard"
import { siteConfig } from "@/config/site"
import { authOptions } from "@/lib/auth"
import prisma, { type User } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"

const getUserWithTeams = async (userId: User["id"]) => {
  return await prisma.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      id: true,
      image: true,
      name: true,
      username: true,
      teams: {
        select: {
          team: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
      },
    },
  })
}

export const metadata: Metadata = {
  title: {
    default: `Dashboard - ${siteConfig.name}`,
    template: `%s - Dashboard - ${siteConfig.name}`,
  },
}

interface RootDashboardLayoutProps {
  children?: React.ReactNode
}

export default async function RootDashboardLayout({
  children,
}: RootDashboardLayoutProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions.pages.signIn)
  }

  const userWithTeams = await getUserWithTeams(user.id)

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader userWithTeams={userWithTeams} teamSwitcher>
        <UserAccountNav
          user={{
            name: user.name,
            image: user.image,
            email: user.email,
          }}
        />
      </DashboardHeader>
      <div className="container grid gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav items={dashboardConfig.sidebarNav} />
        </aside>
        {children}
      </div>
    </div>
  )
}
