"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { toast } from "@/ui/toast"
import { cn } from "@/lib/utils"

interface TeamCreateButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {}

export function TeamCreateButton({
  className,
  ...props
}: TeamCreateButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  async function onClick() {
    setIsLoading(true)

    const response = await fetch("/api/teams", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Test",
        slug: "test",
      }),
    })

    setIsLoading(false)

    if (!response?.ok) {
      if (response.status === 402) {
        return toast({
          title: "Limit of 1 team.",
          message: "Please upgrade to the PRO plan.",
          type: "error",
        })
      }

      return toast({
        title: "Something went wrong.",
        message: "Your team was not created. Please try again.",
        type: "error",
      })
    }

    // This forces a cache invalidation.
    router.refresh()
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        "relative inline-flex h-9 items-center rounded-md border border-transparent bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2",
        {
          "cursor-not-allowed opacity-60": isLoading,
        },
        className
      )}
      disabled={isLoading}
      {...props}
    >
      Create Team
    </button>
  )
}
