import { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { Editor } from "@/components/editor"
import { authOptions } from "@/lib/auth"
import prisma, { type Post, type User } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"

async function getPostForUser(postId: Post["id"], userId: User["id"]) {
  return await prisma.post.findFirst({
    where: {
      id: postId,
      authorId: userId,
    },
  })
}

interface EditorPageProps {
  params: { postId: string }
}

export const metadata: Metadata = {
  title: "Editor",
}

export default async function EditorPage({ params }: EditorPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions.pages.signIn)
  }

  const post = await getPostForUser(params.postId, user.id)

  if (!post) {
    notFound()
  }

  return (
    <Editor
      post={{
        id: post.id,
        title: post.title,
        content: post.content,
        published: post.published,
      }}
    />
  )
}
