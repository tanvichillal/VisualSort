"use client"

import { Bar } from "./bar"
import type { SortingStep } from "@/lib/sorting-algorithms"

type BarsContainerProps = {
  array: number[]
  step: SortingStep | null
}

export function BarsContainer({ array, step }: BarsContainerProps) {
  const maxValue = Math.max(...array, 1)
  const comparing = step?.comparing || []
  const sorted = step?.sorted || []
  const pivot = step?.pivot

  return (
    <div className="glass rounded-xl p-3 sm:p-4 md:p-6">
      <div className="h-[200px] sm:h-[300px] md:h-[400px] flex items-end justify-center gap-0.5 sm:gap-1">
        {array.map((value, index) => (
          <Bar
            key={`${index}-${value}`}
            value={value}
            maxValue={maxValue}
            index={index}
            isComparing={comparing.includes(index)}
            isSorted={sorted.includes(index)}
            isPivot={pivot === index}
            totalBars={array.length}
          />
        ))}
      </div>
      <div className="mt-3 sm:mt-4 flex flex-wrap justify-center gap-2 sm:gap-4 text-xs sm:text-sm">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded bg-[oklch(0.55_0.25_280)]" />
          <span className="text-muted-foreground">Unsorted</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded bg-[oklch(0.55_0.22_25)]" />
          <span className="text-muted-foreground">Comparing</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded bg-[oklch(0.7_0.15_50)]" />
          <span className="text-muted-foreground">Pivot</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded bg-[oklch(0.65_0.2_145)]" />
          <span className="text-muted-foreground">Sorted</span>
        </div>
      </div>
    </div>
  )
}
