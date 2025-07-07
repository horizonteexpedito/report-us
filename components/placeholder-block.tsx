import { Search } from "lucide-react"

export function PlaceholderBlock() {
  return (
    <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 rounded-xl p-12 mb-8 border border-slate-700/50">
      <div className="flex flex-col items-center justify-center text-center gap-6">
        <div className="relative">
          <Search className="h-16 w-16 text-blue-400/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/10 to-transparent animate-pulse"></div>
        </div>

        <h3 className="text-2xl font-semibold text-gray-400">Aguardando número para iniciar a análise...</h3>

        <p className="text-gray-500 max-w-lg">
          Digite um número de WhatsApp no campo acima e clique em "Consultar Agora" para visualizar o relatório completo
          de atividade online.
        </p>

        <div className="flex gap-3 mt-4">
          <div className="w-3 h-3 bg-blue-400/50 rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-blue-400/50 rounded-full animate-pulse delay-100"></div>
          <div className="w-3 h-3 bg-blue-400/50 rounded-full animate-pulse delay-200"></div>
        </div>
      </div>
    </div>
  )
}
