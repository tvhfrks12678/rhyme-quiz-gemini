import { createFileRoute, Link } from '@tanstack/react-router'
import {
  Music,
  Zap,
  Server,
  Route as RouteIcon,
  Shield,
  Waves,
  Sparkles,
} from 'lucide-react'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      <section className="relative py-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10"></div>
        <div className="relative max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-6 mb-6">
            <Music className="w-24 h-24 text-cyan-400" />
            <h1 className="text-6xl md:text-7xl font-black text-white [letter-spacing:-0.08em]">
              <span className="text-gray-300">RHYME</span>{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                QUIZ
              </span>
            </h1>
          </div>
          <p className="text-2xl md:text-3xl text-gray-300 mb-8 font-light">
            ラップの韻を当てるクイズに挑戦しよう！
          </p>
          <div className="flex flex-col items-center gap-4">
            <Link
              to="/quiz"
              className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition-colors shadow-lg shadow-cyan-500/50 text-xl"
            >
              クイズを始める
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
