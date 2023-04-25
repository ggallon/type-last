import type { NextApiResponse } from "next"
import type { NextApiHandlerCustom, NextApiRequestCustom } from "@/types"
import type { User } from "next-auth"
import { getServerSession } from "next-auth/next"
import * as z from "zod"
import { authOptions } from "@/lib/auth"

export const schema = z.object({
  userId: z.string(),
})

export function withCurrentUser(handler: NextApiHandlerCustom) {
  return async function (req: NextApiRequestCustom, res: NextApiResponse) {
    try {
      const query = await schema.parse(req.query)

      // Check if the user has access to this user.
      const session = await getServerSession(req, res, authOptions)

      if (query.userId !== session?.user.id) {
        return res.status(403).end()
      }

      req.user = session.user

      return handler(req, res)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues)
      }

      return res.status(500).end()
    }
  }
}
