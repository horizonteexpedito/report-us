import { Search } from "lucide-react"

export function EmotionalBlock() {
  return (
    <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-6 mb-8 border border-blue-500/20">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Search className="h-6 w-6 text-blue-400" />
          <h3 className="text-xl font-bold text-white">🔍 Análise realizada para o número abaixo:</h3>
        </div>
        <p className="text-gray-300 leading-relaxed">
          Com base nos dados que você informou, geramos este relatório exclusivo com as informações mais recentes
          detectadas. Abaixo estão os detalhes da pessoa que você escolheu analisar:
        </p>
      </div>
    </div>
  )
}
