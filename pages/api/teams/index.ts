import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth/next"
import * as z from "zod"
import { withMethods } from "@/lib/api-middlewares/with-methods"
import { authOptions } from "@/lib/auth"
import prisma, { MembershipRole } from "@/lib/db"
import { RequiresProPlanError } from "@/lib/exceptions"
import { getUserSubscriptionPlan } from "@/lib/subscription"

export const teamCreateSchema = z.object({
  name: z.string().trim().max(34),
  slug: z.string().trim().max(48),
})

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(403).end()
  }

  const { user } = session

  if (req.method === "POST") {
    try {
      const subscriptionPlan = await getUserSubscriptionPlan(user.id)

      // If user is on a free plan.
      // Check if user has reached limit of 3 teams.
      if (!subscriptionPlan?.isPro) {
        const count = await prisma.membership.count({
          where: {
            userId: user.id,
            role: MembershipRole["OWNER"],
          },
        })

        console.log("count", count)

        if (count >= 3) {
          throw new RequiresProPlanError()
        }
      }

      const body = teamCreateSchema.parse(req.body)

      const team = await prisma.team.create({
        data: {
          name: body.name,
          slug: body.slug,
          members: {
            create: [
              {
                userId: user.id,
                accepted: true,
                role: MembershipRole["OWNER"],
              },
            ],
          },
        },
      })

      console.log("team", team)

      return res.json(team)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues)
      }

      if (error instanceof RequiresProPlanError) {
        return res.status(402).end()
      }

      return res.status(500).end()
    }
  }
}

export default withMethods(["POST"], handler)
