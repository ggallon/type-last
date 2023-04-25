import * as z from "zod"

export const userNameSchema = z.object({
  name: z.string().min(3).max(32),
})

export const userUserNameSchema = z.object({
  username: z.string().min(3).max(48),
})

export const sameString = (value: string, check: string) =>
  value === check || `The text you entered did not match "${check}".`

export const userSchema = z.union([userNameSchema, userUserNameSchema])
