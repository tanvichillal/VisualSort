"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Shuffle, ListPlus } from "lucide-react"

type ArrayInputProps = {
  onSetArray: (array: number[]) => void
  disabled?: boolean
}

export function ArrayInput({ onSetArray, disabled }: ArrayInputProps) {
  const [inputValue, setInputValue] = useState("5,3,8,1,9,4,7,2,6")

  const handleSetArray = () => {
    const values = inputValue
      .split(",")
      .map((v) => parseInt(v.trim(), 10))
      .filter((v) => !isNaN(v) && v > 0 && v <= 100)
    
    if (values.length > 0) {
      onSetArray(values)
    }
  }

  const handleGenerateRandom = () => {
    const size = Math.floor(Math.random() * 10) + 8 // 8-17 elements
    const randomArray = Array.from({ length: size }, () =>
      Math.floor(Math.random() * 95) + 5
    )
    setInputValue(randomArray.join(","))
    onSetArray(randomArray)
  }

  return (
    <div className="glass rounded-xl p-3 sm:p-4 space-y-2 sm:space-y-3">
      <label className="text-xs sm:text-sm font-medium text-muted-foreground">
        Custom Array (comma-separated values 1-100)
      </label>
      <div className="flex flex-col gap-2 sm:gap-3">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="5,3,8,1,9,4,7,2,6"
          className="w-full bg-secondary/50 border-border/50 focus:border-primary text-sm"
          disabled={disabled}
        />
        <div className="flex gap-2">
          <Button
            onClick={handleSetArray}
            disabled={disabled}
            variant="secondary"
            size="sm"
            className="flex-1 sm:flex-none gap-1 sm:gap-2 text-xs sm:text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <ListPlus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Set Array</span>
            <span className="sm:hidden">Set</span>
          </Button>
          <Button
            onClick={handleGenerateRandom}
            disabled={disabled}
            size="sm"
            className="flex-1 sm:flex-none gap-1 sm:gap-2 text-xs sm:text-sm bg-primary text-primary-foreground hover:bg-primary/80"
          >
            <Shuffle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            Random
          </Button>
        </div>
      </div>
    </div>
  )
}
