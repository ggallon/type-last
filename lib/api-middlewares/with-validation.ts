import type { NextApiResponse } from "next"
import type { NextApiHandlerCustom, NextApiRequestCustom } from "@/types"
import * as z from "zod"
import type { ZodSchema } from "zod"

export function withValidation<T extends ZodSchema>(
  schema: T,
  handler: NextApiHandlerCustom
) {
  return async function (req: NextApiRequestCustom, res: NextApiResponse) {
    try {
      const body = req.body ? req.body : {}

      await schema.parse(body)

      return handler(req, res)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues)
      }

      return res.status(422).end()
    }
  }
}
