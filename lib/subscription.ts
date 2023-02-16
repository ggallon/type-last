import { UserSubscriptionPlan } from "types"
import { freePlan, proPlan } from "@/config/subscriptions"
import prisma from "@/lib/db"

export async function getUserSubscriptionPlan(
  userId: string
): Promise<UserSubscriptionPlan> {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  })

  // Check if user is on a pro plan.
  let isPro: boolean = false
  let periodEnd: number = 0
  if (user.stripePriceId && user.stripeCurrentPeriodEnd) {
    isPro = user.stripeCurrentPeriodEnd.getTime() + 86_400_000 > Date.now()
    periodEnd = user.stripeCurrentPeriodEnd.getTime()
  }

  const plan = isPro ? proPlan : freePlan

  return {
    ...plan,
    ...user,
    stripeCurrentPeriodEnd:
      periodEnd > 0 ? periodEnd : user.stripeCurrentPeriodEnd?.getTime(),
    isPro,
  }
}
