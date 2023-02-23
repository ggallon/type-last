import { generateGradient } from "@/utils/gradient"

export interface AvatarProps {
  name?: string
  size?: number
  fileType?: string
  text?: string
}

export async function avatarJsx({
  name,
  size,
  fileType,
  text,
}: AvatarProps): Promise<JSX.Element> {
  const gradient = generateGradient(name || Math.random() + "")
  return (
    <div
      style={{
        display: "flex",
        height: size,
        width: size,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        backgroundImage: `linear-gradient(45deg, ${gradient.fromColor}, ${gradient.toColor})`,
        fontSize: text ? (size * 0.9) / text.length : "",
        fontWeight: 800,
        textAlign: "center",
      }}
    >
      {fileType === "png" && text && (
        <div style={{ color: "#fff", display: "flex" }}>{text}</div>
      )}
    </div>
  )
}

export function avatarSVG({ name, size, fileType, text }: AvatarProps) {
  const gradient = generateGradient(name || Math.random() + "")
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={gradient.fromColor} />
            <stop offset="100%" stopColor={gradient.toColor} />
          </linearGradient>
        </defs>
        <rect fill="url(#gradient)" x="0" y="0" width={size} height={size} />
        {fileType === "svg" && text && (
          <text
            x="50%"
            y="50%"
            alignmentBaseline="central"
            dominantBaseline="central"
            textAnchor="middle"
            fill="#fff"
            fontFamily="sans-serif"
            fontSize={(size * 0.9) / text.length}
          >
            {text}
          </text>
        )}
      </g>
    </svg>
  )
}
