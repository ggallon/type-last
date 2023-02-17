import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { TeamItem } from "@/components/dashboard/team-item"

export default function DashboardTeamsLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Teams"
        text="Manage the Teams that you're a part of, join suggested ones, or create a new one."
      />
      <div className="divide-y divide-neutral-200 rounded-md border border-slate-200">
        <TeamItem.Skeleton />
        <TeamItem.Skeleton />
        <TeamItem.Skeleton />
        <TeamItem.Skeleton />
        <TeamItem.Skeleton />
      </div>
    </DashboardShell>
  )
}
