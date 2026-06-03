"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

type BarProps = {
  value: number
  maxValue: number
  index: number
  isComparing: boolean
  isSorted: boolean
  isPivot: boolean
  totalBars: number
}

export function Bar({
  value,
  maxValue,
  index,
  isComparing,
  isSorted,
  isPivot,
  totalBars,
}: BarProps) {

  // FIX HYDRATION ISSUE
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const heightPercentage =
    (value / maxValue) * 100

  const barWidth =
    Math.max(100 / totalBars - 0.5, 1.5)

  const getBarColor = () => {

    if (isSorted)
      return "bg-[oklch(0.65_0.2_145)]"

    if (isPivot)
      return "bg-[oklch(0.7_0.15_50)]"

    if (isComparing)
      return "bg-[oklch(0.55_0.22_25)]"

    return "bg-[oklch(0.55_0.25_280)]"
  }

  const getGlowColor = () => {

    if (isSorted)
      return "0 0 20px oklch(0.65 0.2 145 / 0.5)"

    if (isPivot)
      return "0 0 20px oklch(0.7 0.15 50 / 0.5)"

    if (isComparing)
      return "0 0 20px oklch(0.55 0.22 25 / 0.5)"

    return "none"
  }

  return (

    <motion.div
      layout
      initial={{
        opacity: 0,
        y: 20
      }}
      animate={{
        opacity: 1,
        y: 0,
        height: `${heightPercentage}%`,
      }}
      transition={{
        layout: {
          type: "spring",
          stiffness: 300,
          damping: 30
        },
        height: {
          type: "spring",
          stiffness: 300,
          damping: 30
        },
        opacity: {
          duration: 0.2
        },
      }}
      className={`relative rounded-t-sm sm:rounded-t-md ${getBarColor()} transition-colors duration-150`}
      style={{
        width: `${barWidth}%`,
        minWidth: "4px",
        boxShadow: getGlowColor(),
      }}
    >

      {/* SHOW VALUES ONLY AFTER CLIENT MOUNTS */}
      {mounted && totalBars <= 20 && (

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-1 sm:bottom-2 left-1/2 -translate-x-1/2 text-[8px] sm:text-xs font-mono font-bold text-white drop-shadow-lg"
          style={{
            textShadow:
              "0 1px 2px rgba(0,0,0,0.8)",
          }}
        >
          {value}
        </motion.span>

      )}

    </motion.div>
  )
}

