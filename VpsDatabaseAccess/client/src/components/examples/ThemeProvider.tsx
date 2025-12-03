import { ThemeProvider } from '../ThemeProvider'
import { Button } from '@/components/ui/button'

export default function ThemeProviderExample() {
  return (
    <ThemeProvider>
      <div className="p-8">
        <p className="text-foreground">Theme provider is active</p>
      </div>
    </ThemeProvider>
  )
}
