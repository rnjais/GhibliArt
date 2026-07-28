import React, { useState } from 'react';
import PhotoToArtSection from './PhotoToArtSection';
import TextToArtSection from './TextToArtSection';
import { Image as ImageIcon, Type, Sparkles } from 'lucide-react';

export default function CreateSection({ activeTab: externalTab }) {
  const [activeTab, setActiveTab] = useState(externalTab || 'photo');

  return (
    <section id="create" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generation Studio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100">
            Create Your Ghibli Masterpiece
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Upload your photo or write a detailed text prompt to generate Studio Ghibli art in seconds.
          </p>

          {/* Tab Switcher */}
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-900 border border-slate-800 shadow-inner mt-6">
            <button
              onClick={() => setActiveTab('photo')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                activeTab === 'photo'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Photo to Art</span>
            </button>

            <button
              onClick={() => setActiveTab('text')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                activeTab === 'text'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Type className="w-4 h-4" />
              <span>Text to Art</span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'photo' ? <PhotoToArtSection /> : <TextToArtSection />}

      </div>
    </section>
  );
}
