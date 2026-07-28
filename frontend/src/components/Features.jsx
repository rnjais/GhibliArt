import React from 'react';
import { Target, Zap, Award, Sliders } from 'lucide-react';

export default function Features() {
  const featureList = [
    {
      icon: Target,
      title: "High Accuracy Generation",
      description: "Trained to match Studio Ghibli's classic color palettes, soft lighting, and whimsical hand-painted details.",
      color: "from-emerald-500 to-teal-500"
    },
    {
      icon: Zap,
      title: "Fast Image Processing",
      description: "Powered by OpenFeign Spring Boot backend and Stability AI APIs for ultra-fast generation speeds.",
      color: "from-teal-500 to-sky-500"
    },
    {
      icon: Award,
      title: "Stunning Studio Quality",
      description: "Output crisp 768x512 PNG images ready for downloading, printing, or social media sharing.",
      color: "from-sky-500 to-indigo-500"
    },
    {
      icon: Sliders,
      title: "Multiple Art Styles",
      description: "Choose between Comic Book, Anime, Cinematic, Analog Film, and Digital Art presets to match your vision.",
      color: "from-indigo-500 to-emerald-500"
    }
  ];

  return (
    <section id="features" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-400">Why Ghibli AI</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-100">
            Engineered for Unmatched Anime Aesthetics
          </p>
          <p className="text-slate-400 text-base">
            Everything you need to turn everyday photos and prompts into enchanted Studio Ghibli artwork.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featureList.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="glass-card glass-card-hover p-8 rounded-3xl border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${item.color} p-3 text-white shadow-lg mb-6 flex items-center justify-center`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-100 mb-3">{item.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
