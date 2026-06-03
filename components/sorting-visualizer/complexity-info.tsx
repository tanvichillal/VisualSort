"use client"

import { motion } from "framer-motion"
import { algorithmInfo } from "@/lib/sorting-algorithms"
import { Clock, Database, CheckCircle, XCircle, Info } from "lucide-react"

type ComplexityInfoProps = {
  algorithm: string
}

export function ComplexityInfo({ algorithm }: ComplexityInfoProps) {
  const info = algorithmInfo[algorithm]

  if (!info) return null

  return (
    <motion.div
      key={algorithm}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="glass rounded-xl p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4"
    >
      <h3 className="text-base sm:text-lg font-semibold text-primary flex items-center gap-2">
        <Info className="h-4 w-4 sm:h-5 sm:w-5" />
        {info.name}
      </h3>
      
      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
        {info.description}
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground">
            <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="text-[10px] sm:text-xs font-medium">Time Complexity</span>
          </div>
          <div className="space-y-0.5 pl-5 sm:pl-6">
            <p className="text-[10px] sm:text-xs">
              <span className="text-muted-foreground">Best: </span>
              <span className="font-mono text-primary">{info.timeComplexity.best}</span>
            </p>
            <p className="text-[10px] sm:text-xs">
              <span className="text-muted-foreground">Avg: </span>
              <span className="font-mono text-accent">{info.timeComplexity.average}</span>
            </p>
            <p className="text-[10px] sm:text-xs">
              <span className="text-muted-foreground">Worst: </span>
              <span className="font-mono text-destructive">{info.timeComplexity.worst}</span>
            </p>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground">
            <Database className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="text-[10px] sm:text-xs font-medium">Space</span>
          </div>
          <p className="font-mono text-xs sm:text-sm text-primary pl-5 sm:pl-6">{info.spaceComplexity}</p>
        </div>

        <div className="space-y-1 col-span-2 md:col-span-2">
          <div className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground">
            {info.stable ? (
              <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
            ) : (
              <XCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-destructive" />
            )}
            <span className="text-[10px] sm:text-xs font-medium">Stability</span>
          </div>
          <p className={`text-xs sm:text-sm pl-5 sm:pl-6 ${info.stable ? "text-primary" : "text-destructive"}`}>
            {info.stable ? "Stable" : "Not Stable"}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
