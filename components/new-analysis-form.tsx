"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, Users, Calendar, Search, Loader2 } from "lucide-react"

export function NewAnalysisForm() {
  const [formData, setFormData] = useState({
    phoneNumber: "",
    gender: "",
    lastActivity: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^\+55\s?\d{2}\s?\d{4,5}-?\d{4}$/
    return phoneRegex.test(phone.replace(/\s/g, ""))
  }

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 2) return `+55 ${numbers}`
    if (numbers.length <= 4) return `+55 ${numbers.slice(2, 4)} ${numbers.slice(4)}`
    if (numbers.length <= 9) return `+55 ${numbers.slice(2, 4)} ${numbers.slice(4, 8)}-${numbers.slice(8)}`
    return `+55 ${numbers.slice(2, 4)} ${numbers.slice(4, 9)}-${numbers.slice(9, 13)}`
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    setFormData({ ...formData, phoneNumber: formatted })
    if (errors.phoneNumber) {
      setErrors({ ...errors, phoneNumber: "" })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Número de WhatsApp é obrigatório"
    } else if (!validatePhoneNumber(formData.phoneNumber)) {
      newErrors.phoneNumber = "Formato inválido. Use: +55 11 99999-9999"
    }

    if (!formData.gender) {
      newErrors.gender = "Selecione o gênero"
    }

    if (!formData.lastActivity) {
      newErrors.lastActivity = "Selecione a data da última atividade"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    // Simular envio para API
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Aqui seria a integração com a API
    console.log("Dados para envio:", formData)

    // Simular redirecionamento ou atualização
    alert("Nova análise iniciada! Redirecionando para o novo relatório...")

    setIsSubmitting(false)
  }

  return (
    <div className="mt-16 bg-gradient-to-br from-slate-800/50 to-slate-900/30 rounded-2xl p-8 border border-slate-700/50">
      {/* Header da Seção */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Phone className="h-8 w-8 text-blue-400" />
          <h3 className="text-2xl font-bold text-white">Quer descobrir outro número?</h3>
        </div>
        <p className="text-lg text-gray-300">Faça uma nova análise:</p>
      </div>

      {/* Formulário */}
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
        {/* Campo Número */}
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-white font-medium flex items-center gap-2">
            <Phone className="h-4 w-4 text-blue-400" />
            Número de WhatsApp
          </Label>
          <Input
            id="phone"
            type="text"
            placeholder="+55 11 99999-9999"
            value={formData.phoneNumber}
            onChange={handlePhoneChange}
            className={`bg-slate-700/50 border-slate-600 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400 ${
              errors.phoneNumber ? "border-red-500" : ""
            }`}
            maxLength={18}
          />
          {errors.phoneNumber && <p className="text-red-400 text-sm">{errors.phoneNumber}</p>}
        </div>

        {/* Campo Gênero */}
        <div className="space-y-2">
          <Label htmlFor="gender" className="text-white font-medium flex items-center gap-2">
            <Users className="h-4 w-4 text-pink-400" />
            Gênero
          </Label>
          <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
            <SelectTrigger
              className={`bg-slate-700/50 border-slate-600 text-white focus:border-pink-400 focus:ring-pink-400 ${
                errors.gender ? "border-red-500" : ""
              }`}
            >
              <SelectValue placeholder="Selecione o gênero" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600">
              <SelectItem value="masculino" className="text-white hover:bg-slate-700">
                Masculino
              </SelectItem>
              <SelectItem value="feminino" className="text-white hover:bg-slate-700">
                Feminino
              </SelectItem>
              <SelectItem value="nao-binario" className="text-white hover:bg-slate-700">
                Não-binário
              </SelectItem>
            </SelectContent>
          </Select>
          {errors.gender && <p className="text-red-400 text-sm">{errors.gender}</p>}
        </div>

        {/* Campo Data da Última Atividade */}
        <div className="space-y-2">
          <Label htmlFor="activity" className="text-white font-medium flex items-center gap-2">
            <Calendar className="h-4 w-4 text-green-400" />
            Data aproximada da última atividade
          </Label>
          <Select
            value={formData.lastActivity}
            onValueChange={(value) => setFormData({ ...formData, lastActivity: value })}
          >
            <SelectTrigger
              className={`bg-slate-700/50 border-slate-600 text-white focus:border-green-400 focus:ring-green-400 ${
                errors.lastActivity ? "border-red-500" : ""
              }`}
            >
              <SelectValue placeholder="Quando foi a última atividade?" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600">
              <SelectItem value="7-dias" className="text-white hover:bg-slate-700">
                Últimos 7 dias
              </SelectItem>
              <SelectItem value="30-dias" className="text-white hover:bg-slate-700">
                Últimos 30 dias
              </SelectItem>
              <SelectItem value="1-mes" className="text-white hover:bg-slate-700">
                Mais de 1 mês
              </SelectItem>
              <SelectItem value="nao-sei" className="text-white hover:bg-slate-700">
                Não tenho certeza
              </SelectItem>
            </SelectContent>
          </Select>
          {errors.lastActivity && <p className="text-red-400 text-sm">{errors.lastActivity}</p>}
        </div>

        {/* Botão de Envio */}
        <div className="pt-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processando Análise...
              </>
            ) : (
              <>
                <Search className="mr-2 h-5 w-5" />
                Iniciar Nova Análise
              </>
            )}
          </Button>
        </div>

        {/* Aviso de Integração */}
        <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-500/30 mt-6">
          <p className="text-blue-300 text-sm text-center">
            🔒 <strong>Análise segura e confidencial.</strong> Todos os dados são processados com máxima privacidade.
          </p>
        </div>
      </form>
    </div>
  )
}
