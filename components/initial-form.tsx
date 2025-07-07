"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, User, AlertCircle, CheckCircle, X, Camera, Search, MapPin, AlertTriangle } from "lucide-react"

interface LocationData {
  city: string
  country: string
  coordinates?: {
    latitude: number
    longitude: number
  }
}

interface InitialFormProps {
  onStartAnalysis: (name: string, photo: string) => void
  locationData: LocationData
  locationPermissionDenied: boolean
}

export function InitialForm({ onStartAnalysis, locationData, locationPermissionDenied }: InitialFormProps) {
  const [name, setName] = useState("")
  const [photo, setPhoto] = useState("")
  const [error, setError] = useState("")
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateFile = (file: File): string | null => {
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
    const maxSize = 10 * 1024 * 1024 // 10MB

    if (!validTypes.includes(file.type)) {
      return "Unsupported format. Use JPEG, PNG, or WebP."
    }

    if (file.size > maxSize) {
      return "File too large. Maximum 10MB."
    }

    return null
  }

  const handleFileUpload = async (file: File) => {
    const validationError = validateFile(file)
    if (validationError) {
      setError(validationError)
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      setPhoto(result)
      setError("")
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  const handleSubmit = () => {
    if (!name.trim()) {
      setError("Please enter the person's name.")
      return
    }

    if (name.trim().length < 2) {
      setError("Name must be at least 2 characters long.")
      return
    }

    if (!photo) {
      setError("Please upload a photo of the person.")
      return
    }

    setError("")
    onStartAnalysis(name.trim(), photo)
  }

  const removePhoto = () => {
    setPhoto("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Main Title */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Profile Investigation</h2>
        <p className="text-lg text-slate-300">Discover if someone has an active Tinder profile</p>
      </div>

      {/* Geolocation Warning */}
      {locationPermissionDenied && (
        <Card className="mb-6 bg-orange-900/20 border-orange-500/30">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-orange-300 font-semibold mb-1">Geolocation Disabled</h3>
                <p className="text-orange-200/80 text-sm">
                  For a more accurate and complete report, we recommend enabling location permission in your browser.
                  This allows us to automatically detect your location for more detailed analysis.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Location Status */}
      <Card className="mb-6 bg-slate-800/30 border-slate-700/50">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-green-400" />
            <div>
              <h3 className="text-white font-semibold">Location Detected</h3>
              <p className="text-slate-300 text-sm">
                {locationData.city}, {locationData.country}
                {locationData.coordinates && <span className="text-slate-400 ml-2">(Accuracy: High)</span>}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <User className="h-5 w-5 text-purple-400" />
            Investigation Data
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white font-medium">
              Investigated person's name *
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter full name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-400 focus:ring-purple-400/20"
            />
          </div>

          {/* Photo Upload */}
          <div className="space-y-3">
            <Label className="text-white font-medium">Person's photo *</Label>

            {!photo ? (
              <div
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                  isDragOver
                    ? "border-purple-400 bg-purple-900/20"
                    : "border-slate-600 hover:border-slate-500 hover:bg-slate-800/30"
                }`}
                onDrop={handleDrop}
                onDragOver={(e) => {
                  e.preventDefault()
                  setIsDragOver(true)
                }}
                onDragLeave={() => setIsDragOver(false)}
              >
                <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-white font-medium mb-2">Drag a photo here or click to select</h3>
                <p className="text-slate-400 text-sm mb-4">JPEG, PNG, WebP • Maximum 10MB</p>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={handleFileSelect}
                  className="hidden"
                />

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Select Photo
                </Button>
              </div>
            ) : (
              <div className="relative">
                <div className="flex items-center gap-4 p-4 bg-slate-700/30 rounded-xl border border-slate-600">
                  <img
                    src={photo || "/placeholder.svg"}
                    alt="Selected photo"
                    className="w-20 h-20 rounded-full object-cover border-2 border-purple-400 shadow-lg"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span className="text-green-400 font-medium">Photo uploaded</span>
                    </div>
                    <p className="text-slate-400 text-sm">Ready for analysis</p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={removePhoto}
                    className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
              <AlertCircle className="h-4 w-4 text-red-400 flex-shrink-0" />
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          {/* Analysis Button */}
          <Button
            onClick={handleSubmit}
            disabled={!name.trim() || !photo}
            className="w-full bg-gradient-to-r from-purple-600 via-blue-600 to-orange-500 hover:from-purple-700 hover:via-blue-700 hover:to-orange-600 text-white font-semibold py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Search className="h-5 w-5 mr-2" />
            Start Analysis
          </Button>

          {/* Security Information */}
          <div className="p-4 bg-slate-700/20 rounded-lg border border-slate-600/30">
            <p className="text-slate-300 text-sm text-center">
              🔒 <strong>100% Secure and Confidential</strong>
              <br />
              Your data is processed with complete privacy
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
