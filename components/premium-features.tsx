import { Search, Clock, BarChart3, Bell, MapPin, Lock, CheckCircle } from "lucide-react"

export function PremiumFeatures() {
  const features = [
    {
      icon: Search,
      title: "Análise de Matches Repetitivos",
      description:
        "Descubra com quais perfis o alvo mais interagiu nas últimas semanas. Veja se existem pessoas com quem ele(a) continua dando match com frequência... e se esses padrões estão se repetindo.",
      color: "text-blue-400",
      bgGradient: "from-blue-900/20 to-blue-800/10",
      borderColor: "border-blue-500/30",
    },
    {
      icon: MapPin,
      title: "Histórico de Localizações por Cidade",
      description:
        "Visualize um mapa com as cidades onde o perfil esteve ativo recentemente. Saiba se houve acessos de locais inesperados ou viagens suspeitas.",
      color: "text-red-400",
      bgGradient: "from-red-900/20 to-red-800/10",
      borderColor: "border-red-500/30",
    },
    {
      icon: Clock,
      title: "Horário de Pico de Atividade",
      description:
        "Descubra em quais horários o perfil mais acessa o aplicativo. Madrugada? Tarde? Saiba quando ele(a) está mais online... e com quem pode estar conversando nesses momentos.",
      color: "text-green-400",
      bgGradient: "from-green-900/20 to-green-800/10",
      borderColor: "border-green-500/30",
    },
    {
      icon: BarChart3,
      title: "Relatório Comparativo de 30 Dias",
      description:
        "Acompanhe a evolução do comportamento do perfil ao longo do último mês. Veja se a atividade está aumentando, diminuindo ou mantendo o mesmo padrão de uso.",
      color: "text-purple-400",
      bgGradient: "from-purple-900/20 to-purple-800/10",
      borderColor: "border-purple-500/30",
    },
    {
      icon: Bell,
      title: "Alertas de Novas Curtidas em Tempo Real",
      description:
        "Ative um sistema de alerta e receba notificações sempre que o perfil receber uma nova curtida, um novo match ou iniciar uma nova conversa. Monitore cada nova interação em tempo real.",
      color: "text-yellow-400",
      bgGradient: "from-yellow-900/20 to-yellow-800/10",
      borderColor: "border-yellow-500/30",
    },
  ]

  return (
    <div className="mt-16 bg-gradient-to-br from-slate-900/50 to-slate-800/30 rounded-2xl p-8 border border-slate-700/50">
      {/* Header da Seção */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="text-4xl">🔓</div>
          <h3 className="text-3xl font-bold text-white">Ferramentas Avançadas</h3>
        </div>
        <p className="text-xl text-blue-300 font-semibold mb-6">Liberadas Após 7 Dias de Uso Contínuo</p>

        {/* Texto Explicativo Persuasivo */}
        <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-6 border border-blue-500/20 mb-8">
          <p className="text-gray-300 leading-relaxed text-left">
            <strong className="text-white">Estamos acompanhando o comportamento do perfil</strong> para trazer uma
            análise ainda mais profunda e personalizada.
            <br />
            <br />
            Para garantir a qualidade dos dados e detectar padrões reais de uso, essas funções avançadas só serão
            liberadas após <strong className="text-blue-400">7 dias de monitoramento contínuo</strong>.
            <br />
            <br />
            <strong className="text-white">Continue acessando seu painel diariamente</strong> e, em breve, você terá
            acesso a informações ainda mais detalhadas sobre o comportamento online do perfil.
          </p>
        </div>
      </div>

      {/* Grid de Funcionalidades */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br ${feature.bgGradient} rounded-xl p-6 border ${feature.borderColor} opacity-70 cursor-not-allowed relative overflow-hidden group hover:opacity-80 transition-all duration-300`}
          >
            {/* Ícone e Título */}
            <div className="flex items-start gap-4 mb-4">
              <div className="relative">
                <feature.icon className={`h-10 w-10 ${feature.color}`} />
                <Lock className="h-5 w-5 text-gray-400 absolute -bottom-1 -right-1 bg-slate-800 rounded-full p-1" />
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                  {feature.title}
                  <span className="text-2xl">
                    {feature.title.includes("Matches")
                      ? "🔎"
                      : feature.title.includes("Localização")
                        ? "📍"
                        : feature.title.includes("Horário")
                          ? "⏰"
                          : feature.title.includes("Relatório")
                            ? "📊"
                            : "🚨"}
                  </span>
                </h4>
              </div>
            </div>

            {/* Descrição */}
            <p className="text-gray-300 text-sm leading-relaxed mb-4">{feature.description}</p>

            {/* Aviso de Disponibilidade */}
            <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-600/30">
              <p className="text-xs text-gray-400 text-center font-medium">⏳ Disponível após 7 dias de uso</p>
            </div>

            {/* Efeito de Shimmer */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </div>
        ))}
      </div>

      {/* Rodapé da Seção */}
      <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-xl p-6 border border-green-500/20 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <CheckCircle className="h-6 w-6 text-green-400" />
          <p className="text-lg font-semibold text-white">
            Acesse seu painel diariamente para acompanhar o progresso do desbloqueio!
          </p>
        </div>
        <p className="text-green-300 text-sm">Cada acesso conta para liberar essas funcionalidades exclusivas</p>
      </div>
    </div>
  )
}
