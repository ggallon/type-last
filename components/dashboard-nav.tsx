import * as React from "react"
import Link from "next/link"
import { Icons } from "@/components/icons"
import { TeamSwitcher } from "@/components/team-switcher"
import type { User } from "@/lib/db"

interface MainNavProps {
  userWithTeams: User
  children?: React.ReactNode
}

export function DashboardNav({ userWithTeams, children }: MainNavProps) {
  return (
    <div className="flex flex-1 items-center">
      <Link href="/">
        <Icons.logo className="mx-auto h-7 w-7 text-foreground" />
      </Link>
      <TeamSwitcher groups={userWithTeams} />
    </div>
  )
}
