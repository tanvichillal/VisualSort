"use client"

import { BarChart3 } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function Navbar() {
  return (
    <header className="w-full py-3 px-4 sm:py-4 sm:px-6 glass border-b border-border/50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <BarChart3 className="h-6 w-6 sm:h-8 sm:w-8 text-primary flex-shrink-0" />
          <h1 className="text-lg sm:text-2xl md:text-3xl font-bold tracking-tight">
            <span className="text-foreground">Visual</span>
            <span className="text-primary">Sort</span>
          </h1>
        </div>
        <ThemeToggle />
      </div>
    </header>
  )
}
