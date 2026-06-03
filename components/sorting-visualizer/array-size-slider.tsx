"use client"

import { Slider } from "@/components/ui/slider"
import { Rows3 } from "lucide-react"

type ArraySizeSliderProps = {
  value: number
  onChange: (value: number) => void
  disabled?: boolean
}

export function ArraySizeSlider({ value, onChange, disabled }: ArraySizeSliderProps) {
  return (
    <div className="space-y-1.5 sm:space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs sm:text-sm font-medium text-muted-foreground flex items-center gap-1.5 sm:gap-2">
          <Rows3 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          Array Size
        </label>
        <span className="text-xs sm:text-sm text-primary font-medium">{value}</span>
      </div>
      <Slider
        value={[value]}
        onValueChange={([v]) => onChange(v)}
        min={5}
        max={50}
        step={1}
        disabled={disabled}
        className="[&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary"
      />
    </div>
  )
}
