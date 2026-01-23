import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'secondary' | 'destructive' | 'outline'
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
    const variants = {
        default: "border-transparent bg-indigo-600 text-white hover:bg-indigo-700",
        secondary: "border-transparent bg-indigo-100 text-indigo-900 hover:bg-indigo-200 dark:bg-indigo-900 dark:text-indigo-50",
        destructive: "border-transparent bg-red-500 text-white hover:bg-red-600",
        outline: "text-zinc-950 dark:text-zinc-50 border-zinc-200 dark:border-zinc-800",
    }

    return (
        <div
            className={cn(
                "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 dark:focus:ring-zinc-300",
                variants[variant],
                className
            )}
            {...props}
        />
    )
}

export { Badge }
