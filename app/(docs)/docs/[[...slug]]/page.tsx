import { notFound } from "next/navigation"
import { allDocs } from "contentlayer/generated"
import { Mdx } from "@/components/docs/mdx"
import { DocsPageHeader } from "@/components/docs/page-header"
import { DocsPager } from "@/components/docs/pager"
import { DashboardTableOfContents } from "@/components/docs/toc"
import { getTableOfContents } from "@/lib/toc"
import { absoluteUrl } from "@/lib/utils"
import "@/styles/mdx.css"

interface DocPageProps {
  params: {
    slug: string[]
  }
}

export async function generateStaticParams(): Promise<
  DocPageProps["params"][]
> {
  return allDocs.map((doc) => ({
    slug: doc.slugAsParams.split("/"),
  }))
}

export function generateMetadata({ params }) {
  const slug = params?.slug?.join("/") || ""
  const mdxDoc = allDocs.find((doc) => doc.slugAsParams === slug)

  if (!mdxDoc) {
    return { title: "Doc" }
  }

  const { title, description } = mdxDoc

  const url = process.env.NEXT_PUBLIC_APP_URL
  let ogUrl = new URL(`${url}/api/og`)
  ogUrl.searchParams.set("heading", description ?? "")
  ogUrl.searchParams.set("type", "Documentation")
  ogUrl.searchParams.set("mode", "light")

  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(mdxDoc.slug),
    },
    openGraph: {
      title,
      description,
      images: [`${ogUrl.toString()}`],
      url: url,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      url: url,
      images: [`${ogUrl.toString()}`],
    },
  }
}

export default async function DocPage({ params }: DocPageProps) {
  const slug = params?.slug?.join("/") || ""
  const doc = allDocs.find((doc) => doc.slugAsParams === slug)

  if (!doc) {
    notFound()
  }

  const toc = await getTableOfContents(doc.body.raw)

  return (
    <main className="relative py-6 lg:gap-10 lg:py-10 xl:grid xl:grid-cols-[1fr_300px]">
      <div className="mx-auto w-full min-w-0">
        <DocsPageHeader heading={doc.title} text={doc.description} />
        <Mdx code={doc.body.code} />
        <hr className="my-4 border-slate-200 md:my-6" />
        <DocsPager doc={doc} />
      </div>
      <div className="hidden text-sm xl:block">
        <div className="sticky top-16 -mt-10 max-h-[calc(var(--vh)-4rem)] overflow-y-auto pt-10">
          <DashboardTableOfContents toc={toc} />
        </div>
      </div>
    </main>
  )
}
