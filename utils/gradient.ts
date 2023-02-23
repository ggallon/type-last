import color from "tinycolor2"

export function djb2(str: string): number {
  let hash = 5381
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i)
  }
  return hash
}

export function generateGradient(name: string): {
  fromColor: string
  toColor: string
} {
  const from = color({ h: djb2(name) % 360, s: 0.8, l: 0.6 })
  const to = from.triad()[1].toHexString()

  return {
    fromColor: from.toHexString(),
    toColor: to,
  }
}
