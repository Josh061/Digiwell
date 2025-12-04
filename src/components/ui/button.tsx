import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flame-hot focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 touch-manipulation",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-flame-core via-flame-hot to-flame-core bg-[length:200%_100%] text-flame-dark font-bold shadow-flame hover:shadow-flame-lg hover:bg-[position:100%_0] hover:scale-[1.02] active:scale-[0.98]",
        destructive:
          "bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg hover:shadow-xl hover:from-red-500 hover:to-red-400",
        outline:
          "border-2 border-flame-core/50 bg-transparent text-flame-hot backdrop-blur-sm hover:bg-flame-core/10 hover:border-flame-core hover:shadow-flame",
        secondary:
          "bg-flame-smoke/80 text-flame-hot border border-flame-core/20 hover:bg-flame-smoke hover:border-flame-core/40 hover:shadow-glow",
        ghost:
          "text-flame-hot hover:bg-flame-core/10 hover:text-flame-glow",
        link:
          "text-flame-hot underline-offset-4 hover:underline hover:text-flame-glow",
        flame:
          "bg-gradient-to-r from-flame-ember via-flame-core to-flame-hot bg-[length:200%_100%] text-white font-bold shadow-flame animate-fire-gradient hover:shadow-flame-lg",
        ember:
          "bg-flame-dark/80 text-flame-glow border border-flame-core/30 backdrop-blur-md hover:bg-flame-dark hover:border-flame-hot/50 hover:shadow-ember",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-9 rounded-lg px-4 text-xs",
        lg: "h-12 rounded-xl px-8 text-base",
        xl: "h-14 rounded-2xl px-10 text-lg",
        icon: "h-11 w-11 rounded-xl",
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
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
