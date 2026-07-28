import React, { useState } from 'react';
import GhibliStyleDropdown from './GhibliStyleDropdown';
import { Wand2, Download, RotateCcw, AlertCircle, Loader2, Image as ImageIcon } from 'lucide-react';

export default function TextToArtSection() {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('general');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [generatedImage, setGeneratedImage] = useState(null);

  const isCreateDisabled = isLoading || !prompt.trim();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a description for your artwork.');
      return;
    }

    setIsLoading(true);
    setError(null);

    const payload = { prompt, style };

    try {
      const response = await fetch('http://localhost:8080/api/v1/generate-from-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok. Status ${response.status}: ${errorText}`);
      }

      const resultBlob = await response.blob();
      const imageUrl = URL.createObjectURL(resultBlob);
      setGeneratedImage(imageUrl);
    } catch (err) {
      console.error('Error generating image from text:', err);
      setError(err.message || 'Failed to generate image. Please check your Stability API key and backend logs.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `Ghibli_art_${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCreateAnother = () => {
    setGeneratedImage(null);
    setPrompt('');
    setStyle('general');
    setError(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      
      {/* Left Input Column */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <div>
          <h3 className="text-xl font-bold text-slate-100">Text to Ghibli Art</h3>
          <p className="text-xs text-slate-400 mt-1">Describe your scene and pick a Ghibli preset style.</p>
        </div>

        {/* Style Dropdown */}
        <GhibliStyleDropdown selectedStyle={style} onChangeStyle={setStyle} />

        {/* Prompt Input */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
            Text Prompt
          </label>
          <textarea
            rows={5}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="In a warm softly lit Studio Ghibli style room with wooden panels and books stacked on a desk..."
            className="w-full bg-slate-900 border border-slate-700/80 rounded-2xl p-4 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all resize-none"
          />
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={handleGenerate}
          disabled={isCreateDisabled}
          className={`w-full py-4 rounded-2xl font-bold text-sm text-white flex items-center justify-center gap-3 shadow-lg transition-all duration-300 ${
            isCreateDisabled
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50'
              : 'bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 hover:from-emerald-400 hover:to-sky-400 shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5'
          }`}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Generating Ghibli Art...</span>
            </>
          ) : (
            <>
              <Wand2 className="w-5 h-5" />
              <span>Generate Ghibli Art</span>
            </>
          )}
        </button>
      </div>

      {/* Right Output Column */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 min-h-[420px] flex flex-col items-center justify-center relative overflow-hidden">
        {generatedImage ? (
          <div className="w-full space-y-6 text-center">
            <div className="rounded-2xl overflow-hidden border border-slate-700 shadow-2xl bg-slate-900 max-h-[400px] flex items-center justify-center">
              <img
                src={generatedImage}
                alt="Generated Ghibli Art"
                className="w-full h-full object-contain max-h-[400px]"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleDownload}
                className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-sm bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Download Image</span>
              </button>

              <button
                onClick={handleCreateAnother}
                className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-sm bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center justify-center gap-2 transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Create Another</span>
              </button>
            </div>
          </div>
        ) : isLoading ? (
          <div className="text-center space-y-4 py-12">
            <div className="w-16 h-16 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 animate-spin mx-auto" />
            <p className="text-sm font-medium text-emerald-400">Painting your Ghibli artwork...</p>
            <p className="text-xs text-slate-500">This takes a few seconds via Stability AI</p>
          </div>
        ) : (
          <div className="text-center space-y-3 py-16 text-slate-500">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-600">
              <ImageIcon className="w-8 h-8" />
            </div>
            <p className="text-sm font-semibold text-slate-400">No Image Generated Yet</p>
            <p className="text-xs max-w-xs mx-auto">Fill in the prompt and click generate to create your artwork.</p>
          </div>
        )}
      </div>

    </div>
  );
}
