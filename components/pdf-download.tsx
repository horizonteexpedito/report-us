"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, FileText, Loader2, CheckCircle, Star } from "lucide-react"

interface PDFDownloadProps {
  data: {
    nomeInvestigado: string
    location: string
    profileImage: string
    status: string
    matches: number
    likes: number
    messages: number
    isPhotoPrivate: boolean
    photos: string[]
  }
  isGenerating: boolean
  onGenerate: (generating: boolean) => void
}

export function PDFDownload({ data, isGenerating, onGenerate }: PDFDownloadProps) {
  const [downloadComplete, setDownloadComplete] = useState(false)

  const generatePDF = async () => {
    onGenerate(true)
    setDownloadComplete(false)

    try {
      // Simular geração do PDF
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Criar conteúdo HTML do PDF com design profissional
      const pdfContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>Relatório de Investigação - ${data.nomeInvestigado}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; 
              background: #F5F6FA; 
              color: #333333; 
              line-height: 1.6;
              padding: 20px;
            }
            .container { 
              max-width: 800px; 
              margin: 0 auto; 
              background: white; 
              border-radius: 12px; 
              box-shadow: 0 4px 6px rgba(0,0,0,0.1);
              overflow: hidden;
            }
            .header { 
              background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); 
              color: white; 
              padding: 30px; 
              text-align: center; 
            }
            .header h1 { 
              font-size: 28px; 
              font-weight: 600; 
              margin-bottom: 8px; 
            }
            .header p { 
              opacity: 0.9; 
              font-size: 16px; 
            }
            .profile-section { 
              padding: 30px; 
              border-bottom: 1px solid #E3E6ED; 
            }
            .profile-header { 
              display: flex; 
              align-items: center; 
              gap: 20px; 
              margin-bottom: 20px; 
            }
            .profile-image { 
              width: 150px; 
              height: 150px; 
              border-radius: 50%; 
              object-fit: cover; 
              border: 3px solid #D1D5DB; 
              box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            }
            .profile-info h2 { 
              font-size: 24px; 
              font-weight: 600; 
              color: #111111; 
              margin-bottom: 8px; 
            }
            .status-badge { 
              display: inline-block; 
              background: rgba(34, 197, 94, 0.1); 
              color: #22C55E; 
              padding: 4px 12px; 
              border-radius: 20px; 
              font-size: 14px; 
              font-weight: 500; 
              border: 1px solid rgba(34, 197, 94, 0.2);
              margin-bottom: 8px;
            }
            .location { 
              color: #666666; 
              font-size: 16px; 
            }
            .photo-caption { 
              font-style: italic; 
              color: #666666; 
              font-size: 12px; 
              text-align: center; 
              margin-top: 8px; 
            }
            .metrics-section { 
              padding: 30px; 
              border-bottom: 1px solid #E3E6ED; 
            }
            .metrics-grid { 
              display: grid; 
              grid-template-columns: repeat(3, 1fr); 
              gap: 20px; 
            }
            .metric-card { 
              background: #F9FAFB; 
              border: 1px solid #E5E7EB; 
              border-radius: 8px; 
              padding: 20px; 
              text-align: center; 
            }
            .metric-number { 
              font-size: 32px; 
              font-weight: bold; 
              color: #111111; 
              margin-bottom: 4px; 
            }
            .metric-label { 
              color: #6B7280; 
              font-size: 14px; 
            }
            .section-title { 
              font-size: 20px; 
              font-weight: 600; 
              color: #111111; 
              margin-bottom: 20px; 
              padding-bottom: 8px; 
              border-bottom: 2px solid #3B82F6; 
            }
            .footer { 
              padding: 30px; 
              text-align: center; 
              background: #F9FAFB; 
              color: #6B7280; 
              font-size: 14px; 
            }
            .warning-box { 
              background: rgba(251, 191, 36, 0.1); 
              border: 1px solid rgba(251, 191, 36, 0.3); 
              border-radius: 8px; 
              padding: 16px; 
              margin: 20px 0; 
            }
            .warning-box h4 { 
              color: #F59E0B; 
              font-weight: 600; 
              margin-bottom: 8px; 
            }
            .warning-box p { 
              color: #92400E; 
              font-size: 14px; 
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎯 Relatório de Investigação</h1>
              <p>Análise Completa de Perfil Digital</p>
            </div>
            
            <div class="profile-section">
              <h3 class="section-title">Perfil Investigado</h3>
              <div class="profile-header">
                <div>
                  <img src="${data.profileImage}" alt="Foto de ${data.nomeInvestigado}" class="profile-image" />
                  <div class="photo-caption">Rosto identificado em perfil do Tinder</div>
                </div>
                <div class="profile-info">
                  <h2>${data.nomeInvestigado}</h2>
                  <div class="status-badge">✅ ${data.status}</div>
                  <div class="location">📍 ${data.location}</div>
                </div>
              </div>
            </div>
            
            <div class="metrics-section">
              <h3 class="section-title">Métricas de Atividade</h3>
              <div class="metrics-grid">
                <div class="metric-card">
                  <div class="metric-number">${data.matches}</div>
                  <div class="metric-label">Matches Encontrados</div>
                </div>
                <div class="metric-card">
                  <div class="metric-number" style="color: #3B82F6;">${data.likes}</div>
                  <div class="metric-label">Curtidas Recebidas</div>
                </div>
                <div class="metric-card">
                  <div class="metric-number">${data.messages}</div>
                  <div class="metric-label">Mensagens Enviadas</div>
                </div>
              </div>
            </div>
            
            <div class="warning-box">
              <h4>⚠️ Informações Importantes</h4>
              <p>Este relatório foi gerado com base em dados simulados para fins demonstrativos. 
              Em um sistema real, essas informações seriam coletadas através de APIs autorizadas 
              e seguindo todas as diretrizes de privacidade aplicáveis.</p>
            </div>
            
            <div class="footer">
              <p>Relatório gerado em ${new Date().toLocaleDateString("pt-BR")} às ${new Date().toLocaleTimeString("pt-BR")}</p>
              <p>© 2024 Sistema de Investigação Digital - Todos os direitos reservados</p>
            </div>
          </div>
        </body>
        </html>
      `

      // Criar e baixar o arquivo
      const blob = new Blob([pdfContent], { type: "text/html" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `relatorio-investigacao-${data.nomeInvestigado.replace(/\s+/g, "-").toLowerCase()}.html`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      setDownloadComplete(true)
    } catch (error) {
      console.error("Erro ao gerar PDF:", error)
    } finally {
      onGenerate(false)
    }
  }

  return (
    <Card className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border-green-500/30">
      <CardContent className="p-6">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Star className="h-6 w-6 text-yellow-400" />
            <h3 className="text-xl font-bold text-white">Relatório Completo</h3>
            <Star className="h-6 w-6 text-yellow-400" />
          </div>

          <p className="text-gray-300 mb-6">
            Baixe o relatório completo em PDF com todas as informações coletadas sobre{" "}
            <strong>{data.nomeInvestigado}</strong>.
          </p>

          {downloadComplete && (
            <div className="flex items-center justify-center gap-2 p-3 bg-green-900/20 border border-green-500/30 rounded-lg mb-4">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span className="text-green-300 font-medium">Download concluído com sucesso!</span>
            </div>
          )}

          <Button
            onClick={generatePDF}
            disabled={isGenerating}
            size="lg"
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold px-8 py-3 text-lg"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Gerando PDF...
              </>
            ) : (
              <>
                <Download className="h-5 w-5 mr-2" />
                Baixar Relatório PDF
              </>
            )}
          </Button>

          <div className="flex items-center justify-center gap-4 text-sm text-gray-400 mt-4">
            <div className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              <span>Formato HTML</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4" />
              <span>Dados Completos</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
