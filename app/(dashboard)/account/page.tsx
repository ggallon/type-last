import { redirect } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { UserNameForm } from "@/components/dashboard/user-name-form"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"

export const metadata = {
  title: "Settings - Account",
}

export default async function SettingsPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions.pages.signIn)
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Settings"
        text="Manage your personal account."
      />
      <div className="grid gap-10">
        <UserNameForm user={{ id: user.id, name: user.name! }} />
      </div>
    </DashboardShell>
  )
}
