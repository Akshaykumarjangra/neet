"use client"

// If `sonner` is installed, this component will use it. In environments without it,
// we provide a safe fallback no-op component to satisfy TypeScript.
let Sonner: any = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  Sonner = require("sonner").Toaster;
} catch {
  Sonner = () => null;
}

import { useTheme } from "next-themes"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
