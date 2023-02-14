"use client"

import Link from "next/link"
import { User } from "next-auth"
import { signOut } from "next-auth/react"
import { UserAvatar } from "@/components/dashboard/user-avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/dropdown"
import { siteConfig } from "@/config/site"
import { Button } from "@/ui/button"

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user: Pick<User, "name" | "image" | "email">
}

export function UserAccountNav({ user }: UserAccountNavProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 overflow-hidden focus:ring-2 focus:ring-brand-900 focus:ring-offset-2 focus-visible:outline-none">
        <UserAvatar user={{ name: user.name, image: user.image }} />
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent className="mt-2 md:w-[240px]" align="end">
          <DropdownMenuItem>
            <Link href="/dashboard" className="w-full">
              Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href="/dashboard/billing" className="w-full">
              Billing
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/dashboard/settings" className="w-full">
              Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href="/docs" className="w-full">
              Documentation
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href={siteConfig.links.github}
              className="w-full"
              target="_blank"
            >
              GitHub
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onSelect={(event) => {
              event.preventDefault()
              signOut({
                callbackUrl: `${window.location.origin}/login`,
              })
            }}
          >
            Log Out
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex items-center justify-center"
          >
            <Button size="sm" className="w-full">Upgrade to Pro</Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  )
}
