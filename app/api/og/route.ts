import { ImageResponse } from "next/server"
import { ogComponentJsx } from "@/components/og-component"
import { ogImageSchema } from "@/lib/validations/og"

export const runtime = "edge"

const interRegular = fetch(
  new URL("../../../assets/fonts/Inter-Regular-latin.woff", import.meta.url)
).then((res) => res.arrayBuffer())

const interBold = fetch(
  new URL("../../../assets/fonts/Inter-Bold-latin.woff", import.meta.url)
).then((res) => res.arrayBuffer())

export async function GET(req: Request) {
  try {
    const [fontRegular, fontBold] = await Promise.all([interRegular, interBold])
    const url = new URL(req.url)
    const values = ogImageSchema.parse(Object.fromEntries(url.searchParams))
    const heading =
      values.heading.length > 140
        ? `${values.heading.substring(0, 140)}...`
        : values.heading

    const { mode } = values
    const paint = mode === "dark" ? "#fff" : "#000"

    const fontSize = heading.length > 100 ? "70px" : "100px"
    const type = values.type

    return new ImageResponse(
      await ogComponentJsx({ fontSize, heading, mode, paint, type }),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Inter",
            data: fontRegular,
            weight: 400,
            style: "normal",
          },
          {
            name: "Inter",
            data: fontBold,
            weight: 700,
            style: "normal",
          },
        ],
      }
    )
  } catch (error) {
    return new Response(`Failed to generate image`, {
      status: 500,
    })
  }
}
