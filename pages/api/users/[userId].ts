import type { NextApiResponse } from "next"
import type { NextApiRequestCustom } from "@/types"
import { withCurrentUser } from "@/lib/api-middlewares/with-current-user"
import { withMethods } from "@/lib/api-middlewares/with-methods"
import { withValidation } from "@/lib/api-middlewares/with-validation"
import prisma from "@/lib/db"
import { userSchema } from "@/lib/validations/user"

async function handler(req: NextApiRequestCustom, res: NextApiResponse) {
  try {
    await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        ...req.body,
      },
    })

    return res.end()
  } catch (error) {
    console.error("[API]/users/[userId] error: ", getErrorMessage(error))
    return res.status(422).end()
  }
}

export default withMethods(
  ["PATCH"],
  withCurrentUser(withValidation(userSchema, handler))
)

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message
  return String(error)
}
