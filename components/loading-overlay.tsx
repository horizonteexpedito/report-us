"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Search, Shield, Zap, CheckCircle } from "lucide-react"

interface LoadingOverlayProps {
  isVisible: boolean
  message: string
}

export function LoadingOverlay({ isVisible, message }: LoadingOverlayProps) {
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    { icon: Search, text: "Starting Tinder search...", duration: 1000 },
    { icon: Shield, text: "Analyzing profile data...", duration: 1500 },
    { icon: Zap, text: "Processing information...", duration: 1000 },
    { icon: CheckCircle, text: "Finalizing report...", duration: 500 },
  ]

  useEffect(() => {
    if (!isVisible) {
      setProgress(0)
      setCurrentStep(0)
      return
    }

    let totalTime = 0
    const intervals: NodeJS.Timeout[] = []

    steps.forEach((step, index) => {
      const timeout = setTimeout(() => {
        setCurrentStep(index)
      }, totalTime)
      intervals.push(timeout)
      totalTime += step.duration
    })

    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 2
      })
    }, 80)

    return () => {
      intervals.forEach(clearTimeout)
      clearInterval(progressInterval)
    }
  }, [isVisible])

  if (!isVisible) return null

  const CurrentIcon = steps[currentStep]?.icon || Search

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-slate-800/90 border-slate-700/50 shadow-2xl">
        <CardContent className="p-8 text-center space-y-6">
          {/* Animated Icon */}
          <div className="flex justify-center">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-full animate-pulse">
              <CurrentIcon className="h-8 w-8 text-white" />
            </div>
          </div>

          {/* Title */}
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Investigating Profile</h3>
            <p className="text-slate-300 text-sm">{message}</p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <Progress value={progress} className="h-2 bg-slate-700" />
            <p className="text-slate-400 text-sm">{progress}% complete</p>
          </div>

          {/* Current Step */}
          <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/30">
            <div className="flex items-center gap-3">
              <CurrentIcon className="h-5 w-5 text-blue-400" />
              <span className="text-white text-sm font-medium">{steps[currentStep]?.text || "Processing..."}</span>
            </div>
          </div>

          {/* Step Indicator */}
          <div className="flex justify-center gap-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  index <= currentStep ? "bg-blue-400" : "bg-slate-600"
                }`}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
