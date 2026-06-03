"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { algorithmInfo } from "@/lib/sorting-algorithms"

type AlgorithmSelectorProps = {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

export function AlgorithmSelector({ value, onChange, disabled }: AlgorithmSelectorProps) {
  return (
    <div className="space-y-1.5 sm:space-y-2">
      <label className="text-xs sm:text-sm font-medium text-muted-foreground">Algorithm</label>
      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger className="w-full bg-secondary/50 border-border/50 focus:border-primary text-sm">
          <SelectValue placeholder="Select algorithm" />
        </SelectTrigger>
        <SelectContent className="bg-card border-border">
          {Object.entries(algorithmInfo).map(([key, info]) => (
            <SelectItem
              key={key}
              value={key}
              className="text-sm focus:bg-primary/20 focus:text-foreground"
            >
              {info.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
