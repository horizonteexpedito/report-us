"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lock, Eye, AlertTriangle } from "lucide-react"

interface PhotoGalleryProps {
  photos?: string[]
}

export function PhotoGallery({ photos = [] }: PhotoGalleryProps) {
  // Garantir que sempre temos pelo menos 4 fotos
  const galleryPhotos =
    photos.length > 0
      ? photos
      : [
          "/placeholder.svg?height=300&width=200",
          "/placeholder.svg?height=300&width=200",
          "/placeholder.svg?height=300&width=200",
          "/placeholder.svg?height=300&width=200",
        ]

  // Garantir que temos exatamente 4 fotos
  while (galleryPhotos.length < 4) {
    galleryPhotos.push("/placeholder.svg?height=300&width=200")
  }

  return (
    <Card className="mb-8 bg-slate-800/50 border-slate-700/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <Eye className="h-5 w-5 text-blue-400" />
            Galeria de Fotos Detectadas
          </CardTitle>
          <Badge variant="destructive" className="flex items-center gap-1">
            <Lock className="h-3 w-3" />
            Bloqueadas
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {galleryPhotos.slice(0, 4).map((photo, index) => (
            <div key={index} className="relative group">
              <div className="aspect-[3/4] rounded-lg overflow-hidden bg-slate-700/50 border border-slate-600/50">
                <img
                  src={photo || "/placeholder.svg"}
                  alt={`Foto ${index + 1}`}
                  className="w-full h-full object-cover filter blur-md group-hover:blur-sm transition-all duration-300"
                />
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Lock className="h-8 w-8 mx-auto mb-2 text-red-400" />
                    <p className="text-xs font-medium">Foto {index + 1}</p>
                    <p className="text-xs opacity-75">Bloqueada</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-yellow-300 font-semibold mb-1">Fotos Protegidas por Segurança</h4>
              <p className="text-yellow-200/80 text-sm">
                As fotos foram detectadas mas estão bloqueadas por questões de privacidade. Para desbloquear o acesso
                completo, considere fazer upgrade para a versão premium.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
