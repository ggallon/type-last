import { ImageResponse, type NextRequest } from "next/server"
import { withMethodsEdge } from "@/lib/api-middlewares/with-methods"
import { avatarJsx, avatarSVG } from "@/lib/avatar"

export const runtime = "edge"

const isDevelopmentEnvironment =
  (globalThis == null ? undefined : globalThis.process?.env?.NODE_ENV) ===
  "development"

const IMG_TYPE = new Set(["png", "svg"])

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: { slug: string }
  }
) {
  const ReactDOMServer = (await import("react-dom/server")).default
  const { searchParams } = new URL(req.url)
  const textOrign = searchParams.get("text")
  const text = textOrign ? decodeURIComponent(textOrign) : ""
  const size = Number(searchParams.get("size") || "120")
  const [name, type] = params.slug?.split(".") || []
  const fileType = type ?? "png"

  if (!IMG_TYPE.has(fileType)) {
    return new Response(`The "${type}" file type is not supported.`, {
      status: 400,
    })
  }

  if (fileType === "svg") {
    const stream = await ReactDOMServer.renderToReadableStream(
      avatarSVG({ name, size, fileType, text })
    )
    return new Response(stream, {
      headers: {
        "Content-Type": "image/svg+xml",
        "cache-control": isDevelopmentEnvironment
          ? "no-cache, no-store"
          : "public, immutable, no-transform, max-age=31536000",
      },
    })
  }

  return new ImageResponse(await avatarJsx({ name, size, fileType, text }), {
    width: size,
    height: size,
  })
}
