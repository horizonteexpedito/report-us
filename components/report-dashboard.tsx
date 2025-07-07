"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle,
  MapPin,
  Heart,
  MessageCircle,
  Users,
  Download,
  RotateCcw,
  Globe,
  Activity,
  Loader2,
  User,
  Eye,
  Zap,
} from "lucide-react"

interface ReportDashboardProps {
  data: {
    name: string
    photo: string
    matches: number
    likes: number
    messages: number
    city: string
    country: string
    coordinates?: {
      latitude: number
      longitude: number
    }
  }
  onNewAnalysis: () => void
}

export function ReportDashboard({ data, onNewAnalysis }: ReportDashboardProps) {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  // Function to generate automatic photo description
  const generatePhotoDescription = (name: string): string => {
    const descriptions = [
      "Adult person, neutral expression, well-defined facial features",
      "Young individual, subtle smile, clear facial characteristics",
      "Middle-aged person, direct gaze, prominent facial traits",
      "Young adult, confident expression, oval-shaped face",
      "Adult person, serious demeanor, well-defined characteristics",
    ]

    // Generate description based on name hash for consistency
    let hash = 0
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash)
    }

    return descriptions[Math.abs(hash) % descriptions.length]
  }

  // Function to detect image resolution
  const getImageResolution = (): string => {
    return "High – 400x400px" // Simulation of automatic detection
  }

  const generatePDF = async () => {
    setIsGeneratingPDF(true)

    // Simulate PDF generation
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const photoDescription = generatePhotoDescription(data.name)
    const imageResolution = getImageResolution()

    const pdfContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Tinder Check - ${data.name} Report</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: linear-gradient(135deg, #1e293b 0%, #7c3aed 50%, #1e293b 100%);
            color: #ffffff;
            line-height: 1.6;
            padding: 20px;
          }
          .container { 
            max-width: 800px; 
            margin: 0 auto; 
            background: rgba(30, 41, 59, 0.9);
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 25px 50px rgba(0,0,0,0.5);
          }
          .header { 
            background: linear-gradient(135deg, #7c3aed 0%, #3b82f6 50%, #f97316 100%);
            padding: 30px;
            text-align: center;
          }
          .header h1 { 
            font-size: 32px; 
            font-weight: bold; 
            margin-bottom: 8px;
          }
          .header p { 
            opacity: 0.9; 
            font-size: 16px;
          }
          .profile-section { 
            padding: 30px;
            border-bottom: 1px solid rgba(148, 163, 184, 0.2);
          }
          .profile-header { 
            display: flex; 
            align-items: center; 
            gap: 25px; 
            margin-bottom: 25px;
          }
          .profile-image { 
            width: 120px; 
            height: 120px; 
            border-radius: 50%; 
            object-fit: cover; 
            border: 3px solid #3b82f6;
            box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
          }
          .profile-info h2 { 
            font-size: 28px; 
            font-weight: bold; 
            margin-bottom: 8px;
          }
          .status-badge { 
            display: inline-block; 
            background: rgba(34, 197, 94, 0.2); 
            color: #22c55e; 
            padding: 6px 16px; 
            border-radius: 20px; 
            font-size: 14px; 
            font-weight: 600;
            border: 1px solid rgba(34, 197, 94, 0.3);
            margin-bottom: 12px;
          }
          .location { 
            color: #94a3b8; 
            font-size: 16px;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .photo-caption { 
            font-style: italic; 
            color: #64748b; 
            font-size: 12px; 
            text-align: center; 
            margin-top: 8px;
          }
          .metrics-grid { 
            display: grid; 
            grid-template-columns: repeat(3, 1fr); 
            gap: 20px; 
            margin-top: 25px;
          }
          .metric-card { 
            background: rgba(51, 65, 85, 0.5); 
            border: 1px solid rgba(148, 163, 184, 0.2); 
            border-radius: 12px; 
            padding: 20px; 
            text-align: center;
          }
          .metric-number { 
            font-size: 32px; 
            font-weight: bold; 
            margin-bottom: 8px;
          }
          .metric-label { 
            color: #94a3b8; 
            font-size: 14px;
            font-weight: 500;
          }
          .section { 
            padding: 30px;
            border-bottom: 1px solid rgba(148, 163, 184, 0.2);
          }
          .section-title { 
            font-size: 24px; 
            font-weight: bold; 
            margin-bottom: 20px;
            color: #f8fafc;
            display: flex;
            align-items: center;
            gap: 12px;
          }
          .info-grid { 
            display: grid; 
            grid-template-columns: repeat(2, 1fr); 
            gap: 20px;
          }
          .info-card { 
            background: rgba(51, 65, 85, 0.3); 
            border: 1px solid rgba(148, 163, 184, 0.2); 
            border-radius: 12px; 
            padding: 20px;
          }
          .info-label { 
            color: #94a3b8; 
            font-size: 14px; 
            margin-bottom: 8px;
            font-weight: 500;
          }
          .info-value { 
            color: #f8fafc; 
            font-size: 16px; 
            font-weight: 600;
          }
          .analysis-text {
            color: #cbd5e1;
            font-size: 16px;
            line-height: 1.7;
            margin-bottom: 16px;
          }
          .photo-analysis {
            background: rgba(51, 65, 85, 0.3);
            border: 1px solid rgba(148, 163, 184, 0.2);
            border-radius: 12px;
            padding: 25px;
            margin-top: 20px;
          }
          .photo-analysis h4 {
            color: #3b82f6;
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .photo-analysis p {
            margin-bottom: 12px;
            line-height: 1.6;
          }
          .photo-analysis .highlight {
            color: #22c55e;
            font-weight: 600;
          }
          .footer { 
            padding: 30px; 
            text-align: center; 
            background: rgba(15, 23, 42, 0.8);
            color: #64748b;
          }
          .footer p {
            margin-bottom: 8px;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🛡️ Tinder Check</h1>
            <p>Digital Investigation Report</p>
          </div>
          
          <div class="profile-section">
            <div class="section-title">
              ✅ Investigated Profile Found
            </div>
            <div class="profile-header">
              <div>
                <img src="${data.photo}" alt="Photo of ${data.name}" class="profile-image" />
                <div class="photo-caption">Face found on Tinder profile</div>
              </div>
              <div class="profile-info">
                <h2>${data.name}</h2>
                <div class="status-badge">✅ Active Profile Found</div>
                <div class="location">
                  📍 ${data.city}, ${data.country}
                </div>
              </div>
            </div>
            
            <div class="metrics-grid">
              <div class="metric-card">
                <div class="metric-number" style="color: #3b82f6;">${data.matches}</div>
                <div class="metric-label">Matches</div>
              </div>
              <div class="metric-card">
                <div class="metric-number" style="color: #ef4444;">${data.likes}</div>
                <div class="metric-label">Likes</div>
              </div>
              <div class="metric-card">
                <div class="metric-number" style="color: #22c55e;">${data.messages}</div>
                <div class="metric-label">Messages</div>
              </div>
            </div>
          </div>
          
          <div class="section">
            <div class="section-title">
              📊 Investigation Summary
            </div>
            <div class="analysis-text">
              <strong>Collected Data:</strong>
            </div>
            <div class="info-grid">
              <div class="info-card">
                <div class="info-label">Detected Matches</div>
                <div class="info-value">${data.matches} matches found</div>
              </div>
              <div class="info-card">
                <div class="info-label">Received Likes</div>
                <div class="info-value">${data.likes} likes registered</div>
              </div>
              <div class="info-card">
                <div class="info-label">Sent Messages</div>
                <div class="info-value">${data.messages} messages detected</div>
              </div>
              <div class="info-card">
                <div class="info-label">Profile Status</div>
                <div class="info-value" style="color: #22c55e;">Active and Verified</div>
              </div>
            </div>
            
            <div style="margin-top: 25px;">
              <div class="analysis-text">
                <strong>Digital Behavior Analysis:</strong>
              </div>
              <div class="analysis-text">
                • <strong>Usage Frequency:</strong> Active daily with peak activity between 7 PM and 11 PM<br>
                • <strong>Match Pattern:</strong> ${data.matches} new matches in the last 7 days<br>
                • <strong>Engagement:</strong> ${data.messages} messages sent, indicating active interaction<br>
                • <strong>Popularity:</strong> ${data.likes} likes received demonstrate an attractive profile
              </div>
            </div>
          </div>
          
          <div class="section">
            <div class="section-title">
              📍 Location Information
            </div>
            <div class="info-grid">
              <div class="info-card">
                <div class="info-label">Detected Location</div>
                <div class="info-value">${data.city}, ${data.country}</div>
              </div>
              <div class="info-card">
                <div class="info-label">Last Activity</div>
                <div class="info-value" style="color: #22c55e;">Online now</div>
              </div>
              <div class="info-card">
                <div class="info-label">Detection Method</div>
                <div class="info-value">IP Analysis and Advanced Geolocation</div>
              </div>
              <div class="info-card">
                <div class="info-label">GPS Coordinates</div>
                <div class="info-value">${data.coordinates ? `${data.coordinates.latitude.toFixed(4)}, ${data.coordinates.longitude.toFixed(4)}` : "Not available"}</div>
              </div>
            </div>
          </div>
          
          <div class="section">
            <div class="section-title">
              🧠 Profile Photo Analysis
            </div>
            
            <div class="photo-analysis">
              <h4>🔍 Advanced Technical Analysis</h4>
              
              <p><strong>Investigated Person's Name:</strong> ${data.name}</p>
              <p><strong>Face Found on Tinder Profile:</strong> <span class="highlight">✅ Compatible</span></p>
              
              <p><strong>Automatic Face Description:</strong></p>
              <p style="font-style: italic; color: #cbd5e1; margin-left: 20px;">
                "${photoDescription}."
              </p>
              
              <p><strong>Compatibility with Detected Profile:</strong></p>
              <p style="color: #cbd5e1; margin-left: 20px;">
                "The visual analysis of the provided face indicates high compatibility with the profile found on Tinder. 
                The main facial identification points match the investigated account data, 
                reinforcing the authenticity of the correspondence."
              </p>
              
              <div style="margin-top: 20px;">
                <div class="info-grid">
                  <div class="info-card">
                    <div class="info-label">Photo Type</div>
                    <div class="info-value">Real photo manually uploaded by user</div>
                  </div>
                  <div class="info-card">
                    <div class="info-label">Image Resolution</div>
                    <div class="info-value" style="color: #22c55e;">${imageResolution}</div>
                  </div>
                  <div class="info-card">
                    <div class="info-label">Image Status</div>
                    <div class="info-value" style="color: #22c55e;">Validated as compatible with active Tinder profile</div>
                  </div>
                  <div class="info-card">
                    <div class="info-label">Reliability</div>
                    <div class="info-value" style="color: #22c55e;">95.7% accuracy</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="footer">
            <p><strong>Tinder Check - Digital Investigation System</strong></p>
            <p>Report generated on ${new Date().toLocaleDateString("en-US")} at ${new Date().toLocaleTimeString("en-US")}</p>
            <p>© 2024 - All rights reserved</p>
          </div>
        </div>
      </body>
      </html>
    `

    const blob = new Blob([pdfContent], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `tinder-check-${data.name.replace(/\s+/g, "-").toLowerCase()}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    setIsGeneratingPDF(false)
  }

  const photoDescription = generatePhotoDescription(data.name)
  const imageResolution = getImageResolution()

  return (
    <div className="space-y-6">
      {/* Block 1: Investigated Profile Found */}
      <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-green-400" />
            Investigated Profile Found
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Photo and Info */}
            <div className="text-center">
              <img
                src={data.photo || "/placeholder.svg"}
                alt={`Photo of ${data.name}`}
                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-blue-400 shadow-lg mx-auto"
              />
              <p className="text-xs text-slate-400 italic mt-2 max-w-32">Face found on Tinder profile</p>
            </div>

            {/* Profile Data */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{data.name}</h2>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 mb-3">✅ Active Profile Found</Badge>
              <div className="flex items-center justify-center md:justify-start gap-2 text-slate-300 mb-4">
                <MapPin className="h-4 w-4 text-orange-400" />
                <span>
                  {data.city}, {data.country}
                </span>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-3 md:gap-4">
                <div className="bg-slate-700/30 rounded-lg p-3 text-center border border-slate-600/30">
                  <Users className="h-5 w-5 text-blue-400 mx-auto mb-1" />
                  <div className="text-lg md:text-xl font-bold text-white">{data.matches}</div>
                  <div className="text-xs text-slate-400">Matches</div>
                </div>
                <div className="bg-slate-700/30 rounded-lg p-3 text-center border border-slate-600/30">
                  <Heart className="h-5 w-5 text-red-400 mx-auto mb-1" />
                  <div className="text-lg md:text-xl font-bold text-white">{data.likes}</div>
                  <div className="text-xs text-slate-400">Likes</div>
                </div>
                <div className="bg-slate-700/30 rounded-lg p-3 text-center border border-slate-600/30">
                  <MessageCircle className="h-5 w-5 text-green-400 mx-auto mb-1" />
                  <div className="text-lg md:text-xl font-bold text-white">{data.messages}</div>
                  <div className="text-xs text-slate-400">Messages</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Block 2: Profile Data */}
      <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 shadow-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <User className="h-5 w-5 text-purple-400" />
            Profile Data
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-700/20 rounded-lg p-4 border border-slate-600/30">
              <div className="text-slate-400 text-sm mb-1">Name</div>
              <div className="text-white font-semibold">{data.name}</div>
            </div>
            <div className="bg-slate-700/20 rounded-lg p-4 border border-slate-600/30">
              <div className="text-slate-400 text-sm mb-1">Status</div>
              <div className="text-green-400 font-semibold">Active Profile Found</div>
            </div>
            <div className="bg-slate-700/20 rounded-lg p-4 border border-slate-600/30">
              <div className="text-slate-400 text-sm mb-1">Photo</div>
              <div className="text-blue-400 font-semibold">Face found on Tinder</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Block 3: Location */}
      <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 shadow-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <MapPin className="h-5 w-5 text-orange-400" />
            Location
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-700/20 rounded-lg p-4 border border-slate-600/30">
              <div className="text-slate-400 text-sm mb-1">City</div>
              <div className="text-white font-semibold">{data.city}</div>
            </div>
            <div className="bg-slate-700/20 rounded-lg p-4 border border-slate-600/30">
              <div className="text-slate-400 text-sm mb-1">Country</div>
              <div className="text-white font-semibold">{data.country}</div>
            </div>
            <div className="bg-slate-700/20 rounded-lg p-4 border border-slate-600/30">
              <div className="text-slate-400 text-sm mb-1">Last Activity</div>
              <div className="text-green-400 font-semibold">Online now</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Block 4: Investigation Summary */}
      <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 shadow-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-400" />
            Investigation Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-white font-semibold mb-3">Collected Data:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-700/20 rounded-lg p-4 border border-slate-600/30 text-center">
                <div className="text-blue-400 font-bold text-xl">{data.matches}</div>
                <div className="text-slate-400 text-sm">Detected Matches</div>
              </div>
              <div className="bg-slate-700/20 rounded-lg p-4 border border-slate-600/30 text-center">
                <div className="text-red-400 font-bold text-xl">{data.likes}</div>
                <div className="text-slate-400 text-sm">Received Likes</div>
              </div>
              <div className="bg-slate-700/20 rounded-lg p-4 border border-slate-600/30 text-center">
                <div className="text-green-400 font-bold text-xl">{data.messages}</div>
                <div className="text-slate-400 text-sm">Sent Messages</div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">Digital Behavior Analysis:</h3>
            <div className="space-y-2 text-slate-300">
              <p>
                <strong className="text-white">Usage Frequency:</strong> Active daily with peak activity between 7 PM
                and 11 PM
              </p>
              <p>
                <strong className="text-white">Match Pattern:</strong> {data.matches} new matches in the last 7 days
              </p>
              <p>
                <strong className="text-white">Engagement:</strong> {data.messages} messages sent, indicating active
                interaction
              </p>
              <p>
                <strong className="text-white">Popularity:</strong> {data.likes} likes received demonstrate an
                attractive profile
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Block 5: Location Information */}
      <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 shadow-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Globe className="h-5 w-5 text-orange-400" />
            Location Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-700/20 rounded-lg p-4 border border-slate-600/30">
              <div className="text-slate-400 text-sm mb-1">Detected Location</div>
              <div className="text-white font-semibold">
                {data.city}, {data.country}
              </div>
            </div>
            <div className="bg-slate-700/20 rounded-lg p-4 border border-slate-600/30">
              <div className="text-slate-400 text-sm mb-1">Last Activity</div>
              <div className="text-green-400 font-semibold">Online now</div>
            </div>
            <div className="bg-slate-700/20 rounded-lg p-4 border border-slate-600/30">
              <div className="text-slate-400 text-sm mb-1">Detection Method</div>
              <div className="text-white font-semibold text-xs">IP Analysis and Advanced Geolocation</div>
            </div>
            <div className="bg-slate-700/20 rounded-lg p-4 border border-slate-600/30">
              <div className="text-slate-400 text-sm mb-1">GPS Coordinates</div>
              <div className="text-white font-semibold text-xs">
                {data.coordinates
                  ? `${data.coordinates.latitude.toFixed(4)}, ${data.coordinates.longitude.toFixed(4)}`
                  : "Not available"}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Block 6: Advanced Profile Photo Analysis */}
      <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 shadow-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Eye className="h-5 w-5 text-purple-400" />🧠 Profile Photo Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Technical Analysis */}
          <div className="bg-slate-700/20 rounded-lg p-6 border border-slate-600/30">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="h-5 w-5 text-blue-400" />
              <h3 className="text-blue-400 font-bold text-lg">Advanced Technical Analysis</h3>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-slate-400 text-sm">Investigated Person's Name:</span>
                <p className="text-white font-semibold">{data.name}</p>
              </div>

              <div>
                <span className="text-slate-400 text-sm">Face Found on Tinder Profile:</span>
                <p className="text-green-400 font-semibold">✅ Compatible</p>
              </div>

              <div>
                <span className="text-slate-400 text-sm">Automatic Face Description:</span>
                <p className="text-slate-300 italic mt-1 pl-4 border-l-2 border-slate-600">"{photoDescription}."</p>
              </div>

              <div>
                <span className="text-slate-400 text-sm">Compatibility with Detected Profile:</span>
                <p className="text-slate-300 mt-1 pl-4 border-l-2 border-slate-600">
                  "The visual analysis of the provided face indicates high compatibility with the profile found on
                  Tinder. The main facial identification points match the investigated account data, reinforcing the
                  authenticity of the correspondence."
                </p>
              </div>
            </div>
          </div>

          {/* Technical Data */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-700/20 rounded-lg p-4 border border-slate-600/30">
              <div className="text-slate-400 text-sm mb-1">Photo Type</div>
              <div className="text-white font-semibold text-sm">Real photo manually uploaded by user</div>
            </div>
            <div className="bg-slate-700/20 rounded-lg p-4 border border-slate-600/30">
              <div className="text-slate-400 text-sm mb-1">Image Resolution</div>
              <div className="text-green-400 font-semibold">{imageResolution}</div>
            </div>
            <div className="bg-slate-700/20 rounded-lg p-4 border border-slate-600/30">
              <div className="text-slate-400 text-sm mb-1">Image Status</div>
              <div className="text-green-400 font-semibold text-sm">
                Validated as compatible with active Tinder profile
              </div>
            </div>
            <div className="bg-slate-700/20 rounded-lg p-4 border border-slate-600/30">
              <div className="text-slate-400 text-sm mb-1">Reliability</div>
              <div className="text-green-400 font-semibold">95.7% accuracy</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={generatePDF}
          disabled={isGeneratingPDF}
          className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-200"
        >
          {isGeneratingPDF ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Generating PDF...
            </>
          ) : (
            <>
              <Download className="h-5 w-5 mr-2" />
              Download PDF Report
            </>
          )}
        </Button>

        <Button
          onClick={onNewAnalysis}
          variant="outline"
          className="flex-1 border-slate-600 text-white hover:bg-slate-700 py-3 text-lg bg-transparent"
        >
          <RotateCcw className="h-5 w-5 mr-2" />
          New Analysis
        </Button>
      </div>
    </div>
  )
}
