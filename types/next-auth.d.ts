import { User } from "next-auth"
import { JWT } from "next-auth/jwt"
import type { User as PrismaUser } from "@/lib/db"

declare module "next-auth/jwt" {
  interface JWT {
    id: PrismaUser["id"]
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: PrismaUser["id"]
    }
  }
}
