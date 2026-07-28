import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

export default function Gallery() {
  const galleryItems = [
    {
      title: "Cozy Study Room",
      prompt: "A student sitting peacefully in a warm wooden Studio Ghibli room with books and tea...",
      style: "Comic Book",
      gradient: "from-amber-700/80 via-emerald-800/80 to-slate-900",
      tag: "Text to Art"
    },
    {
      title: "Enchanted Village",
      prompt: "A traditional Japanese countryside village under a starry night sky with glowing lanterns...",
      style: "Anime",
      gradient: "from-sky-700/80 via-indigo-900/80 to-slate-900",
      tag: "Photo to Art"
    },
    {
      title: "Flying Steampunk Castle",
      prompt: "A magnificent floating castle above fluffy white clouds in midday sunlight...",
      style: "Cinematic",
      gradient: "from-teal-700/80 via-blue-900/80 to-slate-900",
      tag: "Text to Art"
    },
    {
      title: "Rainy Street Corner",
      prompt: "A cat sitting under a red umbrella near a quiet train stop in the rain...",
      style: "Analog Film",
      gradient: "from-indigo-800/80 via-purple-950/80 to-slate-900",
      tag: "Photo to Art"
    }
  ];

  return (
    <section id="gallery" className="py-20 relative bg-slate-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-400">Community Gallery</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-100">
            Created with Ghibli AI
          </p>
          <p className="text-slate-400 text-base">
            Check out some of the stunning Studio Ghibli artworks created by our community.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryItems.map((item, idx) => (
            <div 
              key={idx}
              className="glass-card glass-card-hover rounded-3xl overflow-hidden border border-slate-800 group flex flex-col justify-between"
            >
              {/* Simulated Artwork Container */}
              <div className={`h-56 bg-gradient-to-br ${item.gradient} p-6 flex flex-col justify-between relative overflow-hidden`}>
                <div className="flex items-center justify-between z-10">
                  <span className="px-3 py-1 rounded-full bg-slate-950/60 backdrop-blur-md border border-white/10 text-xs font-semibold text-emerald-300">
                    {item.tag}
                  </span>
                  <button className="w-8 h-8 rounded-full bg-slate-950/40 backdrop-blur-md flex items-center justify-center text-slate-300 hover:text-red-400 transition-colors">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>

                <div className="z-10">
                  <span className="text-xs font-medium text-slate-300/80 block mb-1">Style: {item.style}</span>
                  <h4 className="text-lg font-bold text-white tracking-wide">{item.title}</h4>
                </div>

                {/* Decorative Sparkle */}
                <Sparkles className="absolute -bottom-4 -right-4 w-24 h-24 text-white/10 group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
              </div>

              {/* Prompt Detail */}
              <div className="p-5 bg-slate-900/60 flex-1 flex flex-col justify-between border-t border-slate-800/80">
                <p className="text-xs text-slate-400 line-clamp-2 italic">"{item.prompt}"</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
