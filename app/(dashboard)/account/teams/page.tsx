import { cache } from "react"
import { redirect } from "next/navigation"
import { EmptyPlaceholder } from "@/components/dashboard/empty-placeholder"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { TeamCreateButton } from "@/components/dashboard/team-create-button"
import { TeamItem } from "@/components/dashboard/team-item"
import { authOptions } from "@/lib/auth"
import prisma, { type User } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"

export const metadata = {
  title: "Teams - Account",
}

const getTeamsMemberShips = cache(async (userId: User["id"]) => {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      teams: {
        select: {
          role: true,
          team: {
            select: {
              id: true,
              name: true,
              slug: true,
              createdAt: true,
            },
          },
        },
      },
    },
  })
})

export default async function SettingsPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions.pages.signIn)
  }

  const userTeam = await getTeamsMemberShips(user.id)

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Teams"
        text="Manage the Teams that you're a part of, join suggested ones, or create a new one."
      >
        <TeamCreateButton />
      </DashboardHeader>
      <div>
        {userTeam.teams?.length ? (
          <div className="divide-y divide-neutral-200 rounded-md border border-slate-200">
            {userTeam.teams.map((menberShip) => (
              <TeamItem
                key={menberShip.team.id}
                team={menberShip.team}
                role={menberShip.role}
              />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="teams" />
            <EmptyPlaceholder.Title>No Teams</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              Create a new Proactice Team to collaborate with others.
            </EmptyPlaceholder.Description>
            <TeamCreateButton className="border-slate-200 bg-white text-brand-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2" />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  )
}
