import Link from "next/link"
import { Skeleton } from "@/ui/skeleton"
import type { MembershipRole, Team } from "@/lib/db"
import { formatDate } from "@/lib/utils"

interface TeamItemProps {
  team: Pick<Team, "id" | "name" | "slug" | "createdAt">
  role: MembershipRole
}

export function TeamItem({ team, role }: TeamItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <Link href={`/${team.slug}`} className="font-semibold hover:underline">
          {team.name}
        </Link>
        <div>
          <p className="text-sm text-slate-600">
            {formatDate(team.createdAt?.toDateString())}
          </p>
          <p className="text-sm text-slate-600">{role}</p>
        </div>
      </div>
    </div>
  )
}

TeamItem.Skeleton = function TeamItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}
