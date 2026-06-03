"use client"

import { Button } from "@/components/ui/button"
import { Play, RotateCcw, Pause } from "lucide-react"
import { AlgorithmSelector } from "./algorithm-selector"
import { SpeedSlider } from "./speed-slider"
import { ArraySizeSlider } from "./array-size-slider"

type ControlsProps = {
  algorithm: string
  onAlgorithmChange: (value: string) => void
  speed: number
  onSpeedChange: (value: number) => void
  arraySize: number
  onArraySizeChange: (value: number) => void
  onStart: () => void
  onReset: () => void
  isSorting: boolean
  isPaused: boolean
  onPause: () => void
}

export function Controls({
  algorithm,
  onAlgorithmChange,
  speed,
  onSpeedChange,
  arraySize,
  onArraySizeChange,
  onStart,
  onReset,
  isSorting,
  isPaused,
  onPause,
}: ControlsProps) {
  return (
    <div className="glass rounded-xl p-3 sm:p-4 space-y-3 sm:space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="col-span-2 sm:col-span-1">
          <AlgorithmSelector
            value={algorithm}
            onChange={onAlgorithmChange}
            disabled={isSorting && !isPaused}
          />
        </div>
        <SpeedSlider
          value={speed}
          onChange={onSpeedChange}
          disabled={false}
        />
        <ArraySizeSlider
          value={arraySize}
          onChange={onArraySizeChange}
          disabled={isSorting}
        />
        <div className="col-span-2 sm:col-span-1 flex items-end gap-2">
          {isSorting ? (
            <Button
              onClick={onPause}
              variant="secondary"
              size="sm"
              className="flex-1 gap-1 sm:gap-2 text-xs sm:text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              {isPaused ? (
                <>
                  <Play className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span className="hidden xs:inline">Resume</span>
                  <span className="xs:hidden">Play</span>
                </>
              ) : (
                <>
                  <Pause className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  Pause
                </>
              )}
            </Button>
          ) : (
            <Button
              onClick={onStart}
              size="sm"
              className="flex-1 gap-1 sm:gap-2 text-xs sm:text-sm bg-primary text-primary-foreground hover:bg-primary/80 transition-colors"
            >
              <Play className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Start Sorting</span>
              <span className="sm:hidden">Start</span>
            </Button>
          )}
          <Button
            onClick={onReset}
            variant="outline"
            size="sm"
            className="gap-1 sm:gap-2 text-xs sm:text-sm border-border/50 hover:bg-destructive hover:text-destructive-foreground hover:border-destructive transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Reset</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
