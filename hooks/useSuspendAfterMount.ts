import { startTransition, useEffect, useState } from "react"

type AnyFonction<ReturnType> = (...args: any[]) => ReturnType

export function useSuspendAfterMount<ReturnType>(
  callback: AnyFonction<ReturnType>
): ReturnType | undefined {
  const [didMount, setDidMount] = useState(false)

  useEffect(() => {
    startTransition(() => {
      setDidMount(true)
    })
  }, [])

  return didMount ? callback() : undefined
}
