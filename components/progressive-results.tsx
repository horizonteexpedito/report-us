"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { ActivityBlocks } from "@/components/activity-blocks"
import { PhotoGallery } from "@/components/photo-gallery"
import { PDFDownload } from "@/components/pdf-download"
import { LeadBlock } from "@/components/lead-block"
import { Loader2, Eye, Zap, AlertTriangle } from "lucide-react"

interface ProgressiveResultsProps {
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
  isGeneratingPDF: boolean
  onGeneratePDF: (generating: boolean) => void
}

interface AnalysisStep {
  id: string
  title: string
  transitionMessage: string
  component: React.ReactNode
  delay: number
  progressPercent: number
  animationClass: string
}

export function ProgressiveResults({ data, isGeneratingPDF, onGeneratePDF }: ProgressiveResultsProps) {
  const [currentStep, setCurrentStep] = useState(-1)
  const [isAnalyzing, setIsAnalyzing] = useState(true)
  const [showPDFButton, setShowPDFButton] = useState(false)
  const [currentProgress, setCurrentProgress] = useState(20)
  const [showTransitionMessage, setShowTransitionMessage] = useState(false)
  const [transitionMessage, setTransitionMessage] = useState("")
  const [isComplete, setIsComplete] = useState(false)

  // Garantir que data existe e tem valores padrão
  const safeData = {
    nomeInvestigado: data?.nomeInvestigado || "Usuário",
    location: data?.location || "São Paulo, SP",
    profileImage: data?.profileImage || "/placeholder.svg?height=120&width=120",
    status: data?.status || "Perfil Ativo",
    matches: data?.matches || 0,
    likes: data?.likes || 0,
    messages: data?.messages || 0,
    isPhotoPrivate: data?.isPhotoPrivate || false,
    photos: data?.photos || [
      "/placeholder.svg?height=300&width=200",
      "/placeholder.svg?height=300&width=200",
      "/placeholder.svg?height=300&width=200",
      "/placeholder.svg?height=300&width=200",
    ],
  }

  const analysisSteps: AnalysisStep[] = [
    {
      id: "profile",
      title: "Perfil Investigado Encontrado",
      transitionMessage: "Identificando perfil da pessoa...",
      component: (
        <div className="animate-slide-in-left-fade">
          <LeadBlock data={safeData} />
        </div>
      ),
      delay: 500,
      progressPercent: 30,
      animationClass: "animate-slide-in-left-fade",
    },
    {
      id: "matches",
      title: "Matches Detectados",
      transitionMessage: "Analisando atividades recentes...",
      component: (
        <div className="animate-slide-in-left-fade">
          <ActivityBlocks data={safeData} showOnly="matches" />
        </div>
      ),
      delay: 1000,
      progressPercent: 50,
      animationClass: "animate-slide-in-left-fade",
    },
    {
      id: "likes",
      title: "Curtidas Identificadas",
      transitionMessage: "Detectando interações...",
      component: (
        <div className="animate-bounce-in-custom">
          <ActivityBlocks data={safeData} showOnly="likes" />
        </div>
      ),
      delay: 1500,
      progressPercent: 70,
      animationClass: "animate-bounce-in-custom",
    },
    {
      id: "messages",
      title: "Mensagens Rastreadas",
      transitionMessage: "Verificando mensagens enviadas...",
      component: (
        <div className="animate-typing-reveal">
          <ActivityBlocks data={safeData} showOnly="messages" />
        </div>
      ),
      delay: 2000,
      progressPercent: 85,
      animationClass: "animate-typing-reveal",
    },
    {
      id: "photos",
      title: "Fotos Bloqueadas",
      transitionMessage: "Aplicando protocolo de segurança nas fotos...",
      component: (
        <div className="animate-blur-fade-in">
          <PhotoGallery photos={safeData.photos} />
        </div>
      ),
      delay: 2500,
      progressPercent: 100,
      animationClass: "animate-blur-fade-in",
    },
  ]

  // Inicializar progresso
  useEffect(() => {
    setCurrentProgress(20)
  }, [])

  useEffect(() => {
    if (!isAnalyzing || currentStep >= analysisSteps.length) return

    const processStep = async () => {
      const stepIndex = currentStep + 1
      if (stepIndex >= analysisSteps.length) return

      const step = analysisSteps[stepIndex]

      // Mostrar mensagem de transição
      setTransitionMessage(step.transitionMessage)
      setShowTransitionMessage(true)

      // Aguardar 300ms para mostrar a mensagem
      await new Promise((resolve) => setTimeout(resolve, 300))

      // Esconder mensagem de transição
      setShowTransitionMessage(false)

      // Aguardar o delay do passo
      await new Promise((resolve) => setTimeout(resolve, step.delay - 300))

      // Mostrar o bloco
      setCurrentStep(stepIndex)

      // Atualizar progresso suavemente
      setTimeout(() => {
        setCurrentProgress(step.progressPercent)
      }, 200)

      // Se é o último passo
      if (stepIndex === analysisSteps.length - 1) {
        setTimeout(() => {
          setIsAnalyzing(false)
          setIsComplete(true)
          setTimeout(() => {
            setShowPDFButton(true)
          }, 500)
        }, 1000)
      }
    }

    const timeoutId = setTimeout(processStep, 100)
    return () => clearTimeout(timeoutId)
  }, [currentStep, isAnalyzing])

  return (
    <div className="space-y-8">
      {/* Barra de Progresso */}
      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
        <div className="flex items-center justify-between mb-4">
          <span className="text-white font-semibold">Progresso da Análise</span>
          <span className="text-blue-400 font-mono text-lg">{currentProgress}% concluído</span>
        </div>

        <div className="w-full bg-slate-700 rounded-full h-4 overflow-hidden mb-4">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-full transition-all duration-1000 ease-out relative"
            style={{ width: `${currentProgress}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            {currentProgress === 100 && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
            )}
          </div>
        </div>

        {/* Mensagem de Status */}
        <div className="text-center">
          {isAnalyzing && (
            <p className="text-gray-300 text-sm animate-pulse">
              <AlertTriangle className="inline h-4 w-4 mr-2 text-yellow-400" />
              Análise em andamento... Não feche a página.
            </p>
          )}
          {isComplete && !showPDFButton && (
            <p className="text-green-400 text-sm font-semibold animate-fade-in">
              ✅ Análise completa! Preparando relatório...
            </p>
          )}
          {showPDFButton && (
            <p className="text-green-400 text-sm font-semibold animate-bounce-subtle">
              🎯 Análise completa! Pronto para desbloquear o relatório?
            </p>
          )}
        </div>
      </div>

      {/* Toast de Transição */}
      {showTransitionMessage && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
          <div className="bg-blue-900/90 backdrop-blur-sm border border-blue-500/30 rounded-xl p-4 shadow-lg max-w-sm">
            <div className="flex items-center gap-3">
              <Loader2 className="h-5 w-5 text-blue-400 animate-spin" />
              <p className="text-white font-medium text-sm">{transitionMessage}</p>
            </div>
          </div>
        </div>
      )}

      {/* Blocos de Resultado */}
      <div className="space-y-6">
        {analysisSteps.map((step, index) => (
          <div key={step.id} className={`transition-all duration-500 ${index <= currentStep ? "block" : "hidden"}`}>
            {/* Título da Seção com Efeito */}
            <div className="flex items-center gap-3 mb-4 animate-fade-in">
              <div className="flex items-center gap-2 bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-lg px-4 py-2 border border-green-500/30">
                <Eye className="h-5 w-5 text-green-400" />
                <span className="text-green-400 font-semibold text-sm">✅ {step.title}</span>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-green-500/50 to-transparent"></div>
            </div>

            {/* Componente do Resultado */}
            {step.component}
          </div>
        ))}
      </div>

      {/* Botão PDF com Destaque */}
      {showPDFButton && (
        <div className="text-center mt-12 animate-zoom-in-bounce">
          <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-xl p-6 border border-yellow-500/30 mb-6 animate-glow-pulse">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Zap className="h-8 w-8 text-yellow-400 animate-bounce" />
              <h3 className="text-2xl font-bold text-white">🎯 Análise 100% Completa!</h3>
              <Zap className="h-8 w-8 text-yellow-400 animate-bounce delay-100" />
            </div>
            <p className="text-yellow-300 text-lg mb-4">Todos os dados foram coletados e processados com sucesso!</p>
            <p className="text-gray-300 text-sm">
              Baixe agora o relatório completo em PDF com todas as informações detalhadas.
            </p>
          </div>

          <div className="animate-heartbeat">
            <PDFDownload data={safeData} isGenerating={isGeneratingPDF} onGenerate={onGeneratePDF} />
          </div>
        </div>
      )}
    </div>
  )
}
