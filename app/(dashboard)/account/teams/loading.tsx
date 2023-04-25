import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { TeamItem } from "@/components/team-item"

export default function DashboardTeamsLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Teams"
        text="Manage the Teams that you're a part of, join suggested ones, or create a new one."
      />
      <div className="divide-border-200 divide-y rounded-md border">
        <TeamItem.Skeleton />
        <TeamItem.Skeleton />
        <TeamItem.Skeleton />
        <TeamItem.Skeleton />
        <TeamItem.Skeleton />
      </div>
    </DashboardShell>
  )
}
