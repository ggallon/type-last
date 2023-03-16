"use client"

import * as React from "react"
import { UserSubscriptionPlan } from "types"
import { Icons } from "@/components/icons"
import { buttonVariants } from "@/ui/button"
import { Card } from "@/ui/card"
import { toast } from "@/ui/toast"
import { cn, formatDate } from "@/lib/utils"

interface BillingFormProps extends React.HTMLAttributes<HTMLFormElement> {
  subscriptionPlan: UserSubscriptionPlan & {
    isCanceled: boolean
  }
}

export function BillingForm({
  subscriptionPlan,
  className,
  ...props
}: BillingFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    setIsLoading(!isLoading)

    // Get a Stripe session URL.
    const response = await fetch("/api/users/stripe")

    if (!response?.ok) {
      setIsLoading(false)
      return toast({
        title: "Something went wrong.",
        message: "Please refresh the page and try again.",
        type: "error",
      })
    }

    // Redirect to the Stripe session.
    // This could be a checkout page for initial upgrade.
    // Or portal to manage existing subscription.
    const session = await response.json()
    if (session) {
      window.location.href = session.url
    }
  }

  return (
    <form className={cn(className)} onSubmit={onSubmit} {...props}>
      <Card>
        <Card.Header>
          <Card.Title>Plan</Card.Title>
          <Card.Description>
            You are currently on the <strong>{subscriptionPlan.name}</strong>{" "}
            plan.
          </Card.Description>
        </Card.Header>
        <Card.Content>{subscriptionPlan.description}</Card.Content>
        <Card.Footer className="flex flex-col items-start space-y-2 md:flex-row md:justify-between md:space-x-0">
          <button
            type="submit"
            className={cn(buttonVariants())}
            disabled={isLoading}
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {subscriptionPlan.isPro ? "Manage Subscription" : "Upgrade to PRO"}
          </button>
          {subscriptionPlan.isPro ? (
            <p className="rounded-full text-xs font-medium">
              {subscriptionPlan.isCanceled
                ? "Your plan will be canceled on "
                : "Your plan renews on "}
              {formatDate(subscriptionPlan.stripeCurrentPeriodEnd)}.
            </p>
          ) : null}
        </Card.Footer>
      </Card>
    </form>
  )
}
