import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth/next"
import * as z from "zod"
import { withMethods } from "@/lib/api-middlewares/with-methods"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/db"

export const teamPatchSchema = z.object({
  name: z.string().trim().max(34).optional(),
  slug: z.string().trim().max(48).optional(),
})

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(403).end()
  }

  console.log("###delete", req.method)
  if (req.method === "DELETE") {
    try {
      const teamDelete = await prisma.team.delete({
        where: {
          id: req.query.teamId as string,
        },
      })
      console.log("delete", teamDelete)
      return res.status(204).end()
    } catch (error: any) {
      console.log("ERROR delete", error.message)
      return res.status(500).end()
    }
  }

  if (req.method === "PATCH") {
    try {
      const teamId = req.query.teamId as string
      const body = teamPatchSchema.parse(req.body)

      await prisma.team.update({
        where: {
          id: teamId,
        },
        data: {
          name: body.name,
          slug: body.slug,
        },
      })

      return res.end()
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues)
      }

      return res.status(422).end()
    }
  }
}

export default withMethods(["DELETE", "PATCH"], handler)
