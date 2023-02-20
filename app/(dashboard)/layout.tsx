import { redirect } from "next/navigation"
import { UserAccountNav } from "@/components/dashboard/user-account-nav"
import { SiteHeader } from "@/components/site-header"
import { dashboardConfig } from "@/config/dashboard"
import { siteConfig } from "@/config/site"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"

export const metadata = {
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

  return (
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
        {children}
      </div>
    </div>
  )
}
