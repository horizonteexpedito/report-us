"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Bug,
  CheckCircle,
  AlertTriangle,
  Info,
  ChevronDown,
  ChevronUp,
  Monitor,
  Smartphone,
  Tablet,
} from "lucide-react"

export function DebugPanel() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [deviceType, setDeviceType] = useState<"desktop" | "mobile" | "tablet">("desktop")

  // Simular detecção de dispositivo
  const detectDevice = () => {
    const width = window.innerWidth
    if (width < 768) {
      setDeviceType("mobile")
    } else if (width < 1024) {
      setDeviceType("tablet")
    } else {
      setDeviceType("desktop")
    }
  }

  const debugInfo = [
    { label: "Sistema", value: "Tinder Check v2.0", status: "success" },
    { label: "Geolocalização", value: "Ativa", status: "success" },
    { label: "Upload de Foto", value: "Funcional", status: "success" },
    { label: "Geração PDF", value: "Operacional", status: "success" },
    { label: "Responsividade", value: "Mobile-First", status: "info" },
    { label: "Performance", value: "Otimizada", status: "success" },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-3 w-3 text-green-400" />
      case "warning":
        return <AlertTriangle className="h-3 w-3 text-yellow-400" />
      case "info":
        return <Info className="h-3 w-3 text-blue-400" />
      default:
        return <CheckCircle className="h-3 w-3 text-green-400" />
    }
  }

  const getDeviceIcon = () => {
    switch (deviceType) {
      case "mobile":
        return <Smartphone className="h-4 w-4" />
      case "tablet":
        return <Tablet className="h-4 w-4" />
      default:
        return <Monitor className="h-4 w-4" />
    }
  }

  return (
    <Card className="bg-slate-800/30 border-slate-700/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <Bug className="h-5 w-5 text-purple-400" />
            Painel de Debug
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-slate-400 hover:text-white"
          >
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-4">
          {/* Informações do Dispositivo */}
          <div className="bg-slate-700/20 rounded-lg p-3 border border-slate-600/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white text-sm font-medium">Dispositivo Detectado</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={detectDevice}
                className="text-blue-400 hover:text-blue-300 text-xs"
              >
                Atualizar
              </Button>
            </div>
            <div className="flex items-center gap-2">
              {getDeviceIcon()}
              <span className="text-slate-300 text-sm capitalize">{deviceType}</span>
              <Badge className="text-green-400 bg-transparent border-green-400 text-xs">Otimizado</Badge>
            </div>
          </div>

          {/* Status dos Componentes */}
          <div className="space-y-2">
            <h4 className="text-white text-sm font-medium mb-3">Status dos Componentes</h4>
            {debugInfo.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-slate-700/10 rounded border border-slate-600/20"
              >
                <span className="text-slate-300 text-sm">{item.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 text-xs">{item.value}</span>
                  {getStatusIcon(item.status)}
                </div>
              </div>
            ))}
          </div>

          {/* Informações Técnicas */}
          <div className="bg-slate-700/20 rounded-lg p-3 border border-slate-600/30">
            <h4 className="text-white text-sm font-medium mb-2">Informações Técnicas</h4>
            <div className="space-y-1 text-xs text-slate-400">
              <p>• Framework: Next.js 15 + React 18</p>
              <p>• Styling: Tailwind CSS + shadcn/ui</p>
              <p>• Geolocalização: Navigator API</p>
              <p>• Upload: FileReader API</p>
              <p>• PDF: HTML Export</p>
            </div>
          </div>

          {/* Logs Simulados */}
          <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-600/30">
            <h4 className="text-white text-sm font-medium mb-2">Logs do Sistema</h4>
            <div className="space-y-1 text-xs font-mono">
              <p className="text-green-400">[INFO] Sistema inicializado com sucesso</p>
              <p className="text-blue-400">[DEBUG] Geolocalização detectada</p>
              <p className="text-green-400">[INFO] Componentes carregados</p>
              <p className="text-slate-500">[TRACE] Aguardando interação do usuário</p>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
