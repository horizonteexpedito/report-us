"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SuccessNotificationProps {
  isVisible: boolean
  title: string
  message: string
  onClose: () => void
  autoClose?: boolean
  duration?: number
}

export function SuccessNotification({
  isVisible,
  title,
  message,
  onClose,
  autoClose = true,
  duration = 5000,
}: SuccessNotificationProps) {
  const [progress, setProgress] = useState(100)

  useEffect(() => {
    if (!isVisible || !autoClose) return

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(interval)
          onClose()
          return 0
        }
        return prev - 100 / (duration / 100)
      })
    }, 100)

    return () => clearInterval(interval)
  }, [isVisible, autoClose, duration, onClose])

  useEffect(() => {
    if (isVisible) {
      setProgress(100)
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right duration-300">
      <Card className="bg-green-900/90 border-green-500/50 shadow-2xl backdrop-blur-sm max-w-sm">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <h3 className="text-green-100 font-semibold text-sm">{title}</h3>
              <p className="text-green-200/80 text-sm mt-1">{message}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-green-300 hover:text-green-100 hover:bg-green-800/50 h-6 w-6 p-0"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>

          {autoClose && (
            <div className="mt-3">
              <div className="w-full bg-green-800/50 rounded-full h-1">
                <div
                  className="bg-green-400 h-1 rounded-full transition-all duration-100 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
