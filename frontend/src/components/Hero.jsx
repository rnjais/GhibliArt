import React from 'react';
import { Wand2, Image as ImageIcon, Sparkles, ArrowRight, Palette } from 'lucide-react';

export default function Hero({ onStartCreating }) {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:py-28">
      {/* Glow Backdrops */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-sky-500/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wide uppercase shadow-inner">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Powered Studio Ghibli Magic</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-100 leading-[1.15]">
            Transform your photos into{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400 bg-clip-text text-transparent">
              Ghibli Art
            </span>{' '}
            with Ghibli AI
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Create mesmerizing anime-style masterpieces from your photos or simple text prompts using state-of-the-art Stability AI models.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={onStartCreating}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base text-white bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 hover:from-emerald-400 hover:to-sky-400 shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-3 group"
            >
              <Wand2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span>Try Ghibli AI</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="#gallery"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-semibold text-base text-slate-300 bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Palette className="w-5 h-5 text-emerald-400" />
              <span>Explore Gallery</span>
            </a>
          </div>

          {/* Quick Stats / Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-12 max-w-3xl mx-auto text-left">
            <div className="glass-card p-4 rounded-2xl border border-slate-800">
              <div className="text-2xl font-bold text-emerald-400">100% Studio Quality</div>
              <div className="text-xs text-slate-400 mt-1">Authentic anime presets</div>
            </div>
            <div className="glass-card p-4 rounded-2xl border border-slate-800">
              <div className="text-2xl font-bold text-teal-400">Photo & Text</div>
              <div className="text-xs text-slate-400 mt-1">Dual generation modes</div>
            </div>
            <div className="glass-card p-4 rounded-2xl border border-slate-800 col-span-2 md:col-span-1">
              <div className="text-2xl font-bold text-sky-400">Instant Download</div>
              <div className="text-xs text-slate-400 mt-1">High resolution PNG output</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
