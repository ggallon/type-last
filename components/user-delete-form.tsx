"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"
import { Button } from "@/ui/button"
import { type User } from "@/lib/db"
import { cn } from "@/lib/utils"
import { sameString } from "@/lib/validations/user"

interface UserDeleteFormProps extends React.HTMLAttributes<HTMLFormElement> {
  user: Pick<User, "id" | "username"> & {
    username: string | undefined
  }
}

export function UserDeleteForm({
  user,
  className,
  ...props
}: UserDeleteFormProps) {
  const router = useRouter()
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      username: "",
      verify: "",
    },
  })

  async function onSubmit() {
    const response = await fetch(`/api/users/${user.id}`, {
      method: "DELETE",
    })

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your Personal Account was not deleted. Please try again.",
        variant: "destructive",
      })
    }

    toast({
      description: "Your Personal Account has been deleted.",
    })

    router.refresh()
  }

  return (
    <Card className="border-destructive">
      <CardHeader>
        <CardTitle>Delete Personal Account</CardTitle>
        <CardDescription>
          Permanently remove your Personal Account and all of its contents from
          the Vercel platform. This action is not reversible, so please continue
          with caution.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <div className="flex w-full flex-row items-center justify-end">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="h-9">
                <span>Delete Personal Account</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Personal Account</AlertDialogTitle>
              </AlertDialogHeader>
              <p>
                Proactice will{" "}
                <span className="font-bold">delete all of your projects</span>,
                along with all other resources belonging to your Personal
                Account.
              </p>
              <p>
                This will permanently delete your account and remove your data
                from our servers.
              </p>
              <Alert variant="destructive">
                <AlertDescription>
                  This action is not reversible. Please be certain.
                </AlertDescription>
              </Alert>
              <form className={cn("space-y-6 py-2", className)} {...props}>
                <div className="grid gap-1">
                  <Label htmlFor="username" className="mb-1">
                    Enter your username{" "}
                    <span className="font-bold">{user.username}</span> to
                    continue:
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    autoComplete="off"
                    autoCorrect="off"
                    {...register("username", {
                      validate: (value) => sameString(value, user.username),
                    })}
                  />
                  {errors?.username && (
                    <p className="px-1 text-xs text-red-600">
                      {errors.username.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-1">
                  <Label htmlFor="verify" className="mb-1">
                    To verify, type{" "}
                    <span className="font-bold">
                      delete my personal account
                    </span>{" "}
                    below:
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    autoComplete="off"
                    autoCorrect="off"
                    {...register("verify", {
                      validate: (value) =>
                        sameString(value, "delete my personal account"),
                    })}
                  />
                  {errors?.verify && (
                    <p className="px-1 text-xs text-red-600">
                      {errors.verify.message}
                    </p>
                  )}
                </div>
              </form>
              <AlertDialogFooter>
                <AlertDialogCancel
                  onClick={() => reset({ username: "", verify: "" })}
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  type="submit"
                  disabled={isSubmitting}
                  onClick={handleSubmit(onSubmit)}
                >
                  {isSubmitting && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  <span>Delete</span>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardFooter>
    </Card>
  )
}
