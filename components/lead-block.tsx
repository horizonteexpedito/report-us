"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, CheckCircle, Camera } from "lucide-react"

interface LeadBlockProps {
  data: {
    nomeInvestigado: string
    location: string
    profileImage: string
    status: string
    matches: number
    likes: number
    messages: number
    isPhotoPrivate: boolean
  }
}

export function LeadBlock({ data }: LeadBlockProps) {
  const { nomeInvestigado, location, profileImage, status, matches, likes, messages, isPhotoPrivate } = data

  return (
    <div className="mb-8" style={{ backgroundColor: "#F5F6FA" }}>
      <Card className="border-0 shadow-lg" style={{ backgroundColor: "#FFFFFF", borderColor: "#E3E6ED" }}>
        <CardContent className="p-8">
          {/* Seção do Perfil Investigado */}
          <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
            {/* Avatar e Foto */}
            <div className="flex flex-col items-center space-y-3">
              <div className="relative">
                <img
                  src={profileImage || "/placeholder.svg"}
                  alt={`Foto de ${nomeInvestigado}`}
                  className="w-24 h-24 rounded-full object-cover shadow-md"
                  style={{ border: "2px solid #D1D5DB" }}
                />
                {isPhotoPrivate && (
                  <div className="absolute -bottom-1 -right-1 bg-red-500 rounded-full p-1">
                    <Camera className="h-3 w-3 text-white" />
                  </div>
                )}
              </div>
              <p className="text-xs italic text-center max-w-[120px]" style={{ color: "#666666" }}>
                Rosto identificado em perfil do Tinder
              </p>
            </div>

            {/* Informações do Perfil */}
            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-2xl font-semibold mb-2" style={{ color: "#111111", fontWeight: 600 }}>
                  {nomeInvestigado}
                </h2>
                <div className="flex items-center gap-2 mb-3">
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1 px-3 py-1"
                    style={{
                      backgroundColor: "rgba(34, 197, 94, 0.1)",
                      color: "#22C55E",
                      border: "1px solid rgba(34, 197, 94, 0.2)",
                    }}
                  >
                    <CheckCircle className="h-3 w-3" />
                    {status}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm" style={{ color: "#333333" }}>
                  <MapPin className="h-4 w-4" style={{ color: "#666666" }} />
                  <span>{location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Métricas em Cartões Separados */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border shadow-sm" style={{ backgroundColor: "#F9FAFB", borderColor: "#E5E7EB" }}>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold mb-1" style={{ color: "#111111" }}>
                  {matches}
                </div>
                <div className="text-sm" style={{ color: "#6B7280" }}>
                  Matches Encontrados
                </div>
              </CardContent>
            </Card>

            <Card className="border shadow-sm" style={{ backgroundColor: "#F9FAFB", borderColor: "#E5E7EB" }}>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold mb-1" style={{ color: "#3B82F6" }}>
                  {likes}
                </div>
                <div className="text-sm" style={{ color: "#6B7280" }}>
                  Curtidas Recebidas
                </div>
              </CardContent>
            </Card>

            <Card className="border shadow-sm" style={{ backgroundColor: "#F9FAFB", borderColor: "#E5E7EB" }}>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold mb-1" style={{ color: "#111111" }}>
                  {messages}
                </div>
                <div className="text-sm" style={{ color: "#6B7280" }}>
                  Mensagens Enviadas
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
