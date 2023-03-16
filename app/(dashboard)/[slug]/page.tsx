import { notFound } from "next/navigation"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import prisma, { type User } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"

const getUserOrTeams = async (userId: User["id"], slug: string) => {
  return await prisma.user.findFirst({
    where: {
      AND: [
        {
          id: userId,
        },
      ],
      OR: [
        {
          username: slug,
        },
        {
          teams: {
            some: {
              team: {
                is: {
                  slug: slug,
                },
              },
            },
          },
        },
      ],
    },
    select: {
      id: true,
      name: true,
      username: true,
      teams: {
        select: {
          team: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
      },
    },
  })
}

export default async function UserOrTeamDashboardPage({
  params,
}: {
  params: {
    slug: string
  }
}) {
  const user = await getCurrentUser()
  const userOrTeam = await getUserOrTeams(user.id, params.slug)

  if (!userOrTeam) {
    return notFound()
  }

  const nameOfUserOrTeam =
    userOrTeam.username === params.slug
      ? userOrTeam.name
      : userOrTeam?.teams[0].team.slug === params.slug
      ? `${userOrTeam.teams[0].team.name} team`
      : "unkown :("

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Dashboard"
        text={`Yes it's the ${nameOfUserOrTeam}!`}
      />
      <EmptyPlaceholder>
        <EmptyPlaceholder.Icon name="post" />
        <EmptyPlaceholder.Title>No project</EmptyPlaceholder.Title>
        <EmptyPlaceholder.Description>
          You don&apos;t have any project for the {nameOfUserOrTeam}. Start
          creating project.
        </EmptyPlaceholder.Description>
      </EmptyPlaceholder>
    </DashboardShell>
  )
}
