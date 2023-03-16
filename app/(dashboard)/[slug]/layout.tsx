import { DashboardNav } from "@/components/nav"
import { dashboardConfig } from "@/config/dashboard"

interface UserOrTeamDashboardLayoutProps {
  children?: React.ReactNode
}

export default async function UserOrTeamDashboardLayout({
  children,
}: UserOrTeamDashboardLayoutProps) {
  return (
    <>
      <aside className="hidden w-[200px] flex-col md:flex">
        <DashboardNav items={dashboardConfig.sidebarNav} />
      </aside>
      <main className="flex w-full flex-1 flex-col overflow-hidden pt-4">
        {children}
      </main>
    </>
  )
}
