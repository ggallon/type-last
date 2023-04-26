interface DashboardLayoutProps {
  children?: React.ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <main className="flex w-full flex-1 flex-col overflow-hidden pt-4">
      {children}
    </main>
  )
}
