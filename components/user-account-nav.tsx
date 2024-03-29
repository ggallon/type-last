"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { User } from "next-auth"
import { signOut } from "next-auth/react"
import { UserAvatar } from "@/components/user-avatar"
import { Button } from "@/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/dropdown"
import { siteConfig } from "@/config/site"

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user: Pick<User, "name" | "image" | "email">
}

export function UserAccountNav({ user }: UserAccountNavProps) {
  const path = usePathname()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:ring-brand-900 flex items-center gap-2 overflow-hidden focus:ring-2 focus:ring-offset-2 focus-visible:outline-none">
        <UserAvatar user={{ name: user.name, image: user.image }} />
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent className="mt-2 md:w-[240px]" align="end">
          <DropdownMenuItem active={path === "/dashboard"}>
            <Link href="/dashboard" className="w-full">
              Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem active={path === "/account/billing"}>
            <Link href="/account/billing" className="w-full">
              Billing
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem active={path === "/account"}>
            <Link href="/account" className="w-full">
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
          <DropdownMenuItem className="flex items-center justify-center">
            <Button size="sm" className="w-full">
              Upgrade to Pro
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  )
}
