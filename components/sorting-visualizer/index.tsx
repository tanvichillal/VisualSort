"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { Navbar } from "./navbar"
import { ArrayInput } from "./array-input"
import { Controls } from "./controls"
import { BarsContainer } from "./bars-container"
import { ComplexityInfo } from "./complexity-info"
import { algorithms, type SortingStep } from "@/lib/sorting-algorithms"

function generateRandomArray(size: number): number[] {
  return Array.from(
    { length: size },
    () => Math.floor(Math.random() * 95) + 5
  )
}

export function SortingVisualizer() {

  // FIXED HYDRATION ISSUE
  const [array, setArray] = useState<number[]>([])

  const [algorithm, setAlgorithm] = useState("bubble")
  const [speed, setSpeed] = useState(50)
  const [arraySize, setArraySize] = useState(15)
  const [isSorting, setIsSorting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const [step, setStep] =
    useState<SortingStep | null>(null)

  const sortingRef =
    useRef<Generator<SortingStep> | null>(null)

  const timeoutRef =
    useRef<NodeJS.Timeout | null>(null)

  const isPausedRef = useRef(isPaused)
  const speedRef = useRef(speed)

  // Generate array AFTER mount
  useEffect(() => {
    setArray(generateRandomArray(15))
  }, [])

  // Keep refs synced
  useEffect(() => {
    isPausedRef.current = isPaused
  }, [isPaused])

  useEffect(() => {
    speedRef.current = speed
  }, [speed])

  const clearTimeoutOnly = useCallback(() => {

    if (timeoutRef.current) {

      clearTimeout(timeoutRef.current)

      timeoutRef.current = null
    }

  }, [])

  const clearSorting = useCallback(() => {

    clearTimeoutOnly()

    sortingRef.current = null

  }, [clearTimeoutOnly])

  const runSortingStep = useCallback(() => {

    if (!sortingRef.current) return

    if (isPausedRef.current) {
      return
    }

    const result = sortingRef.current.next()

    if (result.done) {

      setIsSorting(false)
      setIsPaused(false)

      sortingRef.current = null

      return
    }

    setStep(result.value)

    setArray(result.value.array)

    const delay =
      Math.max(10, 500 - speedRef.current * 5)

    timeoutRef.current =
      setTimeout(runSortingStep, delay)

  }, [])

  const handleStart = useCallback(() => {

    if (isSorting && isPaused) {

      setIsPaused(false)

      isPausedRef.current = false

      setTimeout(runSortingStep, 0)

      return
    }

    const algorithmFn =
      algorithms[
        algorithm as keyof typeof algorithms
      ]

    if (!algorithmFn) return

    sortingRef.current = algorithmFn(array)

    setIsSorting(true)

    setIsPaused(false)

    isPausedRef.current = false

    runSortingStep()

  }, [
    algorithm,
    array,
    isSorting,
    isPaused,
    runSortingStep
  ])

  const handlePause = useCallback(() => {

    if (isPaused) {

      setIsPaused(false)

      isPausedRef.current = false

      setTimeout(runSortingStep, 0)

    } else {

      setIsPaused(true)

      isPausedRef.current = true

      clearTimeoutOnly()
    }

  }, [
    isPaused,
    runSortingStep,
    clearTimeoutOnly
  ])

  const handleReset = useCallback(() => {

    clearSorting()

    setIsSorting(false)

    setIsPaused(false)

    isPausedRef.current = false

    setStep(null)

    setArray(generateRandomArray(arraySize))

  }, [arraySize, clearSorting])

  const handleSetArray = useCallback(
    (newArray: number[]) => {

      if (!isSorting) {

        setArray(newArray)

        setArraySize(newArray.length)

        setStep(null)
      }

    },
    [isSorting]
  )

  const handleArraySizeChange = useCallback(
    (newSize: number) => {

      setArraySize(newSize)

      if (!isSorting) {

        setArray(generateRandomArray(newSize))

        setStep(null)
      }

    },
    [isSorting]
  )

  const handleAlgorithmChange = useCallback(
    (newAlgorithm: string) => {

      setAlgorithm(newAlgorithm)

    },
    []
  )

  useEffect(() => {

    return () => clearSorting()

  }, [clearSorting])

  return (

    <div className="min-h-screen flex flex-col">

      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6">

        <ArrayInput
          onSetArray={handleSetArray}
          disabled={isSorting}
        />

        <Controls
          algorithm={algorithm}
          onAlgorithmChange={handleAlgorithmChange}
          speed={speed}
          onSpeedChange={setSpeed}
          arraySize={arraySize}
          onArraySizeChange={handleArraySizeChange}
          onStart={handleStart}
          onReset={handleReset}
          isSorting={isSorting}
          isPaused={isPaused}
          onPause={handlePause}
        />

        <BarsContainer
          array={array}
          step={step}
        />

        <ComplexityInfo
          algorithm={algorithm}
        />

      </main>

      <footer className="py-3 sm:py-4 text-center text-xs sm:text-sm text-muted-foreground">

        <p>
          Built with React.js & Framer Motion
        </p>

      </footer>

    </div>
  )
}
