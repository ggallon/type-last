import { DashboardNav } from "@/components/dashboard/nav"
import { dashboardConfig } from "@/config/dashboard"

interface AccountLayoutProps {
  children?: React.ReactNode
}

export default async function AccountLayout({ children }: AccountLayoutProps) {
  return (
    <>
      <aside className="hidden w-[200px] flex-col md:flex">
        <DashboardNav items={dashboardConfig.accountSidebarNav} />
      </aside>
      <main className="flex w-full flex-1 flex-col overflow-hidden pt-4">
        {children}
      </main>
    </>
  )
}
