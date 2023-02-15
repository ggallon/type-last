import { notFound } from "next/navigation"
import { DashboardNav } from "@/components/dashboard/nav"
import { UserAccountNav } from "@/components/dashboard/user-account-nav"
import { SiteHeader } from "@/components/site-header"
import { dashboardConfig } from "@/config/dashboard"
import { siteConfig } from "@/config/site"
import { getCurrentUser } from "@/lib/session"

export const metadata = {
  title: {
    default: `Dashboard - ${siteConfig.name}`,
    template: `%s - Dashboard - ${siteConfig.name}`,
  },
}

interface DashboardLayoutProps {
  children?: React.ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const user = await getCurrentUser()

  if (!user) {
    return notFound()
  }

  return (
    <>
      <div className="flex min-h-screen flex-col">
        <SiteHeader mainNavItem={dashboardConfig.mainNav}>
          <UserAccountNav
            user={{
              name: user.name,
              image: user.image,
              email: user.email,
            }}
          />
        </SiteHeader>
        <div className="container grid gap-12 md:grid-cols-[200px_1fr]">
          <aside className="hidden w-[200px] flex-col md:flex">
            <DashboardNav items={dashboardConfig.sidebarNav} />
          </aside>
          <main className="flex w-full flex-1 flex-col overflow-hidden pt-4">
            {children}
          </main>
        </div>
      </div>
    </>
  )
}
