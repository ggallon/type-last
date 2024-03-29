import type { NextApiResponse } from "next"
import type { NextApiHandlerCustom, NextApiRequestCustom } from "@/types"
import * as z from "zod"
import prisma from "@/lib/db"

export const schema = z.object({
  postId: z.string(),
})

export function withPost(handler: NextApiHandlerCustom) {
  return async function (req: NextApiRequestCustom, res: NextApiResponse) {
    try {
      // Check if the user has access to this post.
      const query = await schema.parse(req.query)

      const count = await prisma.post.count({
        where: {
          id: query.postId,
          authorId: req.session.user.id,
        },
      })

      if (count < 1) {
        return res.status(403).end()
      }

      return handler(req, res)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues)
      }

      return res.status(500).end()
    }
  }
}
