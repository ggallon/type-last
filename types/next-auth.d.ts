import type { User as PrismaUser } from "@/lib/db"
import { User } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth/jwt" {
  interface JWT {
    id: PrismaUser["id"]
    username: PrismaUser["username"]
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: PrismaUser["id"]
      username: PrismaUser["username"]
    }
  }
}
