interface UserOrTeamDashboardLayoutProps {
  children?: React.ReactNode
}

export default async function UserOrTeamDashboardLayout({
  children,
}: UserOrTeamDashboardLayoutProps) {
  return (
    <main className="flex w-full flex-1 flex-col overflow-hidden pt-4">
      {children}
    </main>
  )
}
