"use client"

import Image from "next/image"
import OgImage from "public/og.jpg"
import { Icons } from "@/components/icons"
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover"
import { siteConfig } from "@/config/site"

export function Help() {
  return (
    <Popover>
      <PopoverTrigger className="bg-brand fixed bottom-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-full border text-white">
        <Icons.pizza className="h-5 w-5" />
        <span className="sr-only">Toggle</span>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="text-smw-[300px] bg-brand text-white"
      >
        <div className="grid gap-4">
          <Image
            src={OgImage}
            alt="Screenshot"
            className="overflow-hidden rounded-sm"
          />
          <p>
            This app is a work in progress. I&apos;m building this in public.
          </p>
          <p>
            You can follow the progress on Twitter{" "}
            <a
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
              className="border-b border-b-white"
            >
              {siteConfig.creator.twitter}
            </a>{" "}
            or on{" "}
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="border-b border-b-white"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </PopoverContent>
    </Popover>
  )
}
