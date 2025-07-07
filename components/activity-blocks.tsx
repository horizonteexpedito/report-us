import { CheckCircle, Heart, MessageCircle, Users, MapPin } from "lucide-react"

interface ActivityBlocksProps {
  data: {
    status: string
    matches: number
    likes: number
    messages: number
    location: string
  }
  showOnly?: string
}

export function ActivityBlocks({ data, showOnly }: ActivityBlocksProps) {
  const blocks = [
    {
      id: "status",
      icon: CheckCircle,
      title: "Status do Perfil",
      value: data.status,
      color: "text-green-400",
      bgColor: "from-green-900/20 to-green-800/20",
      borderColor: "border-green-500/30",
    },
    {
      id: "matches",
      icon: Users,
      title: "Matches Recentes",
      value: `${data.matches} matches nos últimos 7 dias`,
      color: "text-blue-400",
      bgColor: "from-blue-900/20 to-blue-800/20",
      borderColor: "border-blue-500/30",
    },
    {
      id: "likes",
      icon: Heart,
      title: "Curtidas",
      value: `${data.likes} curtidas recentes`,
      color: "text-pink-400",
      bgColor: "from-pink-900/20 to-pink-800/20",
      borderColor: "border-pink-500/30",
    },
    {
      id: "messages",
      icon: MessageCircle,
      title: "Mensagens",
      value: `${data.messages} mensagens enviadas na última semana`,
      color: "text-purple-400",
      bgColor: "from-purple-900/20 to-purple-800/20",
      borderColor: "border-purple-500/30",
    },
    {
      id: "location",
      icon: MapPin,
      title: "Localização Confirmada",
      value: `Ativo em ${data.location}`,
      color: "text-red-400",
      bgColor: "from-red-900/20 to-red-800/20",
      borderColor: "border-red-500/30",
    },
  ]

  const filteredBlocks = showOnly ? blocks.filter((block) => block.id === showOnly) : blocks

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {filteredBlocks.map((block, index) => (
        <div
          key={block.id}
          className={`bg-gradient-to-br ${block.bgColor} rounded-xl p-6 border ${block.borderColor} hover:scale-105 transition-all duration-300 animate-card-reveal`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="relative">
              <block.icon className={`h-6 w-6 ${block.color} animate-pulse-soft`} />
              <div
                className={`absolute inset-0 ${block.color.replace("text-", "bg-")}/20 rounded-full animate-ping`}
              ></div>
            </div>
            <h3 className="text-white font-semibold">{block.title}</h3>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed animate-fade-in-delayed">{block.value}</p>
        </div>
      ))}
    </div>
  )
}
