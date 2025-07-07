"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertCircle, Loader2, Wifi, Database, Shield } from "lucide-react"

export function ApiTester() {
  const [isTestingAPI, setIsTestingAPI] = useState(false)
  const [apiStatus, setApiStatus] = useState<"idle" | "testing" | "success" | "error">("idle")

  const testAPI = async () => {
    setIsTestingAPI(true)
    setApiStatus("testing")

    // Simular teste de API
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Simular sucesso (90% das vezes)
    const success = Math.random() > 0.1
    setApiStatus(success ? "success" : "error")
    setIsTestingAPI(false)
  }

  const getStatusColor = () => {
    switch (apiStatus) {
      case "success":
        return "text-green-400"
      case "error":
        return "text-red-400"
      case "testing":
        return "text-blue-400"
      default:
        return "text-slate-400"
    }
  }

  const getStatusText = () => {
    switch (apiStatus) {
      case "success":
        return "Conectado"
      case "error":
        return "Erro de Conexão"
      case "testing":
        return "Testando..."
      default:
        return "Não Testado"
    }
  }

  return (
    <Card className="bg-slate-800/30 border-slate-700/50">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Wifi className="h-5 w-5 text-blue-400" />
          Status do Sistema
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Status dos Serviços */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-700/20 rounded-lg p-3 border border-slate-600/30">
            <div className="flex items-center gap-2 mb-1">
              <Database className="h-4 w-4 text-blue-400" />
              <span className="text-white text-sm font-medium">API Tinder</span>
            </div>
            <Badge className={`${getStatusColor()} bg-transparent border-current`}>
              {apiStatus === "testing" && <Loader2 className="h-3 w-3 mr-1 animate-spin" />}
              {apiStatus === "success" && <CheckCircle className="h-3 w-3 mr-1" />}
              {apiStatus === "error" && <AlertCircle className="h-3 w-3 mr-1" />}
              {getStatusText()}
            </Badge>
          </div>

          <div className="bg-slate-700/20 rounded-lg p-3 border border-slate-600/30">
            <div className="flex items-center gap-2 mb-1">
              <Shield className="h-4 w-4 text-green-400" />
              <span className="text-white text-sm font-medium">Segurança</span>
            </div>
            <Badge className="text-green-400 bg-transparent border-green-400">
              <CheckCircle className="h-3 w-3 mr-1" />
              Ativo
            </Badge>
          </div>

          <div className="bg-slate-700/20 rounded-lg p-3 border border-slate-600/30">
            <div className="flex items-center gap-2 mb-1">
              <Wifi className="h-4 w-4 text-green-400" />
              <span className="text-white text-sm font-medium">Servidor</span>
            </div>
            <Badge className="text-green-400 bg-transparent border-green-400">
              <CheckCircle className="h-3 w-3 mr-1" />
              Online
            </Badge>
          </div>
        </div>

        {/* Botão de Teste */}
        <Button
          onClick={testAPI}
          disabled={isTestingAPI}
          variant="outline"
          className="w-full border-slate-600 text-white hover:bg-slate-700 bg-transparent"
        >
          {isTestingAPI ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Testando Conexão...
            </>
          ) : (
            <>
              <Wifi className="h-4 w-4 mr-2" />
              Testar Conexão API
            </>
          )}
        </Button>

        {/* Resultado do Teste */}
        {apiStatus !== "idle" && (
          <div
            className={`p-3 rounded-lg border ${
              apiStatus === "success"
                ? "bg-green-900/20 border-green-500/30"
                : apiStatus === "error"
                  ? "bg-red-900/20 border-red-500/30"
                  : "bg-blue-900/20 border-blue-500/30"
            }`}
          >
            <div className="flex items-center gap-2">
              {apiStatus === "success" && <CheckCircle className="h-4 w-4 text-green-400" />}
              {apiStatus === "error" && <AlertCircle className="h-4 w-4 text-red-400" />}
              {apiStatus === "testing" && <Loader2 className="h-4 w-4 text-blue-400 animate-spin" />}
              <span
                className={`text-sm font-medium ${
                  apiStatus === "success" ? "text-green-300" : apiStatus === "error" ? "text-red-300" : "text-blue-300"
                }`}
              >
                {apiStatus === "success" && "Conexão estabelecida com sucesso!"}
                {apiStatus === "error" && "Falha na conexão. Tente novamente."}
                {apiStatus === "testing" && "Verificando conectividade..."}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
