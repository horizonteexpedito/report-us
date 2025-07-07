"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { InitialForm } from "@/components/initial-form"
import { ReportDashboard } from "@/components/report-dashboard"
import { LoadingOverlay } from "@/components/loading-overlay"

interface LocationData {
  city: string
  country: string
  coordinates?: {
    latitude: number
    longitude: number
  }
}

export default function TinderCheck() {
  const [currentStep, setCurrentStep] = useState<"form" | "loading" | "report">("form")
  const [locationData, setLocationData] = useState<LocationData>({
    city: "New York",
    country: "United States",
  })
  const [locationPermissionDenied, setLocationPermissionDenied] = useState(false)
  const [investigationData, setInvestigationData] = useState({
    name: "",
    photo: "",
    matches: 0,
    likes: 0,
    messages: 0,
    city: "",
    country: "",
    coordinates: undefined as { latitude: number; longitude: number } | undefined,
  })

  // Function to get city name from coordinates (simulation)
  const getCityFromCoordinates = async (lat: number, lng: number): Promise<LocationData> => {
    // In a real system, would use a reverse geocoding API
    // Here we simulate based on coordinates
    const cities = [
      { name: "New York", country: "United States", lat: 40.7128, lng: -74.006 },
      { name: "Los Angeles", country: "United States", lat: 34.0522, lng: -118.2437 },
      { name: "Chicago", country: "United States", lat: 41.8781, lng: -87.6298 },
      { name: "Houston", country: "United States", lat: 29.7604, lng: -95.3698 },
      { name: "Phoenix", country: "United States", lat: 33.4484, lng: -112.074 },
      { name: "Philadelphia", country: "United States", lat: 39.9526, lng: -75.1652 },
      { name: "San Antonio", country: "United States", lat: 29.4241, lng: -98.4936 },
      { name: "San Diego", country: "United States", lat: 32.7157, lng: -117.1611 },
      { name: "Dallas", country: "United States", lat: 32.7767, lng: -96.797 },
      { name: "San Jose", country: "United States", lat: 37.3382, lng: -121.8863 },
    ]

    // Find closest city
    let closestCity = cities[0]
    let minDistance = Math.abs(lat - cities[0].lat) + Math.abs(lng - cities[0].lng)

    cities.forEach((city) => {
      const distance = Math.abs(lat - city.lat) + Math.abs(lng - city.lng)
      if (distance < minDistance) {
        minDistance = distance
        closestCity = city
      }
    })

    return {
      city: closestCity.name,
      country: closestCity.country,
      coordinates: { latitude: lat, longitude: lng },
    }
  }

  // Detect geolocation automatically
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          const locationInfo = await getCityFromCoordinates(latitude, longitude)
          setLocationData(locationInfo)
          setLocationPermissionDenied(false)
        },
        (error) => {
          console.log("Geolocation denied or error:", error)
          setLocationPermissionDenied(true)
          // Keep default location
          setLocationData({
            city: "New York",
            country: "United States",
          })
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000, // 5 minutes
        },
      )
    } else {
      setLocationPermissionDenied(true)
    }
  }, [])

  const handleStartAnalysis = (name: string, photo: string) => {
    // Generate random data as specified
    const matches = Math.floor(Math.random() * 10) + 3 // 3-12
    const likes = Math.floor(Math.random() * 26) + 15 // 15-40
    const messages = Math.floor(Math.random() * 9) + 2 // 2-10

    setInvestigationData({
      name,
      photo,
      matches,
      likes,
      messages,
      city: locationData.city,
      country: locationData.country,
      coordinates: locationData.coordinates,
    })

    setCurrentStep("loading")

    // Simulate analysis time
    setTimeout(() => {
      setCurrentStep("report")
    }, 4000)
  }

  const handleNewAnalysis = () => {
    setCurrentStep("form")
    setInvestigationData({
      name: "",
      photo: "",
      matches: 0,
      likes: 0,
      messages: 0,
      city: "",
      country: "",
      coordinates: undefined,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800">
      <Header />

      <main className="container mx-auto px-4 py-6 max-w-4xl">
        {currentStep === "form" && (
          <InitialForm
            onStartAnalysis={handleStartAnalysis}
            locationData={locationData}
            locationPermissionDenied={locationPermissionDenied}
          />
        )}

        {currentStep === "report" && <ReportDashboard data={investigationData} onNewAnalysis={handleNewAnalysis} />}
      </main>

      {currentStep === "loading" && (
        <LoadingOverlay isVisible={true} message="Analyzing Tinder profile... Please wait a few moments..." />
      )}
    </div>
  )
}
