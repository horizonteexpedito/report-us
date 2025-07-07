"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, User, Camera, AlertCircle, CheckCircle, X } from "lucide-react"

interface NumberConsultationProps {
  onDataUpdate: (data: {
    nomeInvestigado: string
    location: string
    profileImage: string
    isPhotoPrivate?: boolean
  }) => void
  isLoading: boolean
  error: string
  setError: (error: string) => void
}

export function NumberConsultation({ onDataUpdate, isLoading, error, setError }: NumberConsultationProps) {
  const [nomeInvestigado, setNomeInvestigado] = useState("")
  const [fotoInvestigado, setFotoInvestigado] = useState("")
  const [location, setLocation] = useState("São Paulo, SP")
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle")

  // Função para gerar avatar automático baseado no nome
  const generateAvatarFromName = (name: string) => {
    if (!name) return ""

    const initials = name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .substring(0, 2)
      .toUpperCase()

    // Gerar cor baseada no hash do nome
    let hash = 0
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash)
    }

    const colors = ["1e40af", "dc2626", "059669", "7c2d12", "4338ca", "be185d", "0891b2", "65a30d", "c2410c", "6366f1"]

    const colorIndex = Math.abs(hash) % colors.length
    const backgroundColor = colors[colorIndex]

    return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=${backgroundColor}&color=fff&size=200&format=png&rounded=true&bold=true`
  }

  // Função para converter arquivo para base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
    })
  }

  // Função para validar arquivo de imagem
  const validateImageFile = (file: File): string | null => {
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
    const maxSize = 5 * 1024 * 1024 // 5MB

    if (!validTypes.includes(file.type)) {
      return "Formato não suportado. Use JPEG, PNG ou WebP."
    }

    if (file.size > maxSize) {
      return "Arquivo muito grande. Máximo 5MB."
    }

    return null
  }

  // Função para lidar com upload de arquivo
  const handleFileUpload = async (file: File) => {
    const validationError = validateImageFile(file)
    if (validationError) {
      setError(validationError)
      setUploadStatus("error")
      return
    }

    setUploadStatus("uploading")
    setError("")

    try {
      const base64 = await fileToBase64(file)
      setFotoInvestigado(base64)
      setUploadStatus("success")
    } catch (error) {
      setError("Erro ao processar a imagem.")
      setUploadStatus("error")
    }
  }

  // Função para lidar com drag and drop
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  // Função para lidar com input de arquivo
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  // Função para remover foto
  const handleRemovePhoto = () => {
    setFotoInvestigado("")
    setUploadStatus("idle")
    setError("")
  }

  // Função para iniciar investigação
  const handleStartInvestigation = () => {
    if (!nomeInvestigado.trim()) {
      setError("Por favor, digite o nome da pessoa.")
      return
    }

    if (nomeInvestigado.trim().length < 2) {
      setError("Nome deve ter pelo menos 2 caracteres.")
      return
    }

    setError("")

    // Usar foto carregada ou gerar avatar automático
    const finalImage = fotoInvestigado || generateAvatarFromName(nomeInvestigado)

    onDataUpdate({
      nomeInvestigado: nomeInvestigado.trim(),
      location,
      profileImage: finalImage,
      isPhotoPrivate: !fotoInvestigado, // Se não tem foto carregada, é "privada" (avatar)
    })
  }

  return (
    <Card className="mb-8 bg-slate-800/50 border-slate-700/50">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <User className="h-5 w-5 text-blue-400" />
          Investigação de Perfil
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Campo de Nome */}
        <div className="space-y-2">
          <Label htmlFor="nome" className="text-white font-medium">
            Qual o nome da pessoa que você deseja investigar? *
          </Label>
          <Input
            id="nome"
            type="text"
            placeholder="Digite o nome completo..."
            value={nomeInvestigado}
            onChange={(e) => setNomeInvestigado(e.target.value)}
            className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
            disabled={isLoading}
          />
        </div>

        {/* Upload de Foto */}
        <div className="space-y-3">
          <Label className="text-white font-medium">
            Envie uma foto de perfil da pessoa (opcional, mas recomendado)
          </Label>

          {!fotoInvestigado ? (
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                isDragOver ? "border-blue-400 bg-blue-900/20" : "border-slate-600 hover:border-slate-500"
              }`}
              onDrop={handleDrop}
              onDragOver={(e) => {
                e.preventDefault()
                setIsDragOver(true)
              }}
              onDragLeave={() => setIsDragOver(false)}
            >
              <Upload className="h-8 w-8 text-slate-400 mx-auto mb-3" />
              <p className="text-slate-300 mb-2">Arraste uma foto aqui ou clique para selecionar</p>
              <p className="text-slate-500 text-sm mb-4">JPEG, PNG, WebP - Máximo 5MB</p>
              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleFileInput}
                className="hidden"
                id="file-upload"
                disabled={isLoading}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => document.getElementById("file-upload")?.click()}
                disabled={isLoading}
                className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
              >
                <Camera className="h-4 w-4 mr-2" />
                Selecionar Foto
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-4 p-4 bg-slate-700/30 rounded-lg border border-slate-600">
              <img
                src={fotoInvestigado || "/placeholder.svg"}
                alt="Foto carregada"
                className="w-16 h-16 rounded-full object-cover border-2 border-slate-500"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-green-400 font-medium text-sm">Foto carregada com sucesso</span>
                </div>
                <p className="text-slate-400 text-sm">Imagem pronta para investigação</p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleRemovePhoto}
                disabled={isLoading}
                className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Status do Upload */}
          {uploadStatus === "uploading" && (
            <div className="flex items-center gap-2 text-blue-400 text-sm">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"></div>
              Processando imagem...
            </div>
          )}
        </div>

        {/* Localização */}
        <div className="space-y-2">
          <Label htmlFor="location" className="text-white font-medium">
            Localização (opcional)
          </Label>
          <Input
            id="location"
            type="text"
            placeholder="Ex: São Paulo, SP"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
            disabled={isLoading}
          />
        </div>

        {/* Mensagem de Erro */}
        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
            <AlertCircle className="h-4 w-4 text-red-400 flex-shrink-0" />
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}

        {/* Botão de Investigação */}
        <Button
          onClick={handleStartInvestigation}
          disabled={isLoading || !nomeInvestigado.trim()}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 text-lg"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Investigando...
            </>
          ) : (
            <>
              <User className="h-5 w-5 mr-2" />
              Iniciar Investigação
            </>
          )}
        </Button>

        {/* Informações sobre o Avatar Automático */}
        {nomeInvestigado && !fotoInvestigado && (
          <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <img
                  src={generateAvatarFromName(nomeInvestigado) || "/placeholder.svg"}
                  alt="Avatar automático"
                  className="w-12 h-12 rounded-full border-2 border-blue-400"
                />
              </div>
              <div>
                <h4 className="text-blue-300 font-semibold mb-1">Avatar Automático</h4>
                <p className="text-blue-200/80 text-sm">
                  Como você não enviou uma foto, será gerado um avatar automático baseado no nome "{nomeInvestigado}".
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
