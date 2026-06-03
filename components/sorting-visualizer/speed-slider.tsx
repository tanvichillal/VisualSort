"use client"

import { Slider } from "@/components/ui/slider"
import { Gauge } from "lucide-react"

type SpeedSliderProps = {
  value: number
  onChange: (value: number) => void
  disabled?: boolean
}

export function SpeedSlider({ value, onChange, disabled }: SpeedSliderProps) {
  const speedLabels = ["Slow", "Medium", "Fast", "Ultra"]
  const speedIndex = Math.min(Math.floor((value - 1) / 25), 3)

  return (
    <div className="space-y-1.5 sm:space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs sm:text-sm font-medium text-muted-foreground flex items-center gap-1.5 sm:gap-2">
          <Gauge className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          Speed
        </label>
        <span className="text-xs sm:text-sm text-primary font-medium">{speedLabels[speedIndex]}</span>
      </div>
      <Slider
        value={[value]}
        onValueChange={([v]) => onChange(v)}
        min={1}
        max={100}
        step={1}
        disabled={disabled}
        className="[&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary"
      />
    </div>
  )
}
