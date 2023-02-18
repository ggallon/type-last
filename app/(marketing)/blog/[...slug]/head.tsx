import MdxHead from "@/components/docs/mdx-head"

export default function Head({ params }) {
  return (
    <MdxHead
      params={params}
      og={{
        heading: "Blog",
        mode: "light",
        type: "Blog Post",
      }}
    />
  )
}
