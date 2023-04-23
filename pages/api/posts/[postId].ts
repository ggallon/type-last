import type { NextApiRequest, NextApiResponse } from "next"
import * as z from "zod"
import { withAuthentication } from "@/lib/api-middlewares/with-authentication"
import { withMethods } from "@/lib/api-middlewares/with-methods"
import { withPost } from "@/lib/api-middlewares/with-post"
import prisma from "@/lib/db"
import { postPatchSchema } from "@/lib/validations/post"

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const postId = req.query.postId as string

  if (req.method === "DELETE") {
    try {
      await prisma.post.delete({
        where: {
          id: postId,
        },
      })

      return res.status(204).end()
    } catch (error) {
      return res.status(500).end()
    }
  }

  if (req.method === "PATCH") {
    try {
      const post = await prisma.post.findUniqueOrThrow({
        select: {
          id: true,
          title: true,
        },
        where: {
          id: postId,
        },
      })

      const body = postPatchSchema.parse(req.body)

      // TODO: Implement sanitization for content.

      await prisma.post.update({
        where: {
          id: post.id,
        },
        data: {
          title: body.title || post.title,
          content: body.content,
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

export default withMethods(
  ["DELETE", "PATCH"],
  withAuthentication(withPost(handler))
)
