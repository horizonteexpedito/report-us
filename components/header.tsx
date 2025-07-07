"use client"

import { Shield, Search } from "lucide-react"

export function Header() {
  return (
    <header className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Tinder Check</h1>
              <p className="text-xs text-slate-400">Digital Investigation System</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 text-slate-300">
            <Search className="h-4 w-4" />
            <span className="text-sm">Professional Investigation</span>
          </div>
        </div>
      </div>
    </header>
  )
}
