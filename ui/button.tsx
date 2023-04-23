import * as React from "react"
import { VariantProps, cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center rounded-md font-medium transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background",
    "disabled:opacity-50 disabled:pointer-events-none",
  ],
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: ["hover:bg-accent hover:text-accent-foreground"],
        link: ["underline-offset-4 hover:underline text-primary"],
      },
      size: {
        default: "h-10 py-2 px-4 text-sm",
        sm: "h-9 px-2 text-sm",
        lg: "h-11 px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
