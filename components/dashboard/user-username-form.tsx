"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Icons } from "@/components/icons"
import { Card } from "@/ui/card"
import { toast } from "@/ui/toast"
import { type User } from "@/lib/db"
import { cn } from "@/lib/utils"
import { userUserNameSchema } from "@/lib/validations/user"

interface UserUserNameFormProps extends React.HTMLAttributes<HTMLFormElement> {
  user: Pick<User, "id" | "username"> & {
    username: string | undefined
  }
}

type FormData = z.infer<typeof userUserNameSchema>

export function UserUserNameForm({
  user,
  className,
  ...props
}: UserUserNameFormProps) {
  const router = useRouter()
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(userUserNameSchema),
    defaultValues: {
      username: user.username,
    },
  })

  async function onSubmit(data: FormData) {
    const response = await fetch(`/api/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: data.username,
      }),
    })

    console.log("response", response)

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        message: "Your username was not updated. Please try again.",
        type: "error",
      })
    }

    toast({
      message: "Your username has been updated.",
      type: "success",
    })

    router.refresh()
  }

  return (
    <form
      className={cn(className)}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <Card>
        <Card.Header>
          <Card.Title>Your Username</Card.Title>
          <Card.Description>
            This is your URL namespace within Proactice.
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <div className="grid gap-1">
            <label className="sr-only" htmlFor="name">
              Username
            </label>
            <input
              id="username"
              className="my-0 mb-2 block h-9 w-[350px] rounded-md border border-slate-300 py-2 px-3 text-sm placeholder:text-slate-400 hover:border-slate-400 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-800 focus:ring-offset-1"
              size={32}
              name="username"
              {...register("username")}
            />
            {errors?.username && (
              <p className="px-1 text-xs text-red-600">
                {errors.username.message}
              </p>
            )}
          </div>
        </Card.Content>
        <Card.Footer>
          <div className="flex flex-row items-center justify-between">
            <p className="text-sm text-gray-600">
              Please use 48 characters at maximum.
            </p>
            <button
              type="submit"
              className={cn(
                "relative inline-flex h-9 items-center rounded-md border border-transparent bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2",
                {
                  "cursor-not-allowed opacity-60": isSubmitting,
                },
                className
              )}
              disabled={isSubmitting}
            >
              {isSubmitting && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              <span>Save</span>
            </button>
          </div>
        </Card.Footer>
      </Card>
    </form>
  )
}
