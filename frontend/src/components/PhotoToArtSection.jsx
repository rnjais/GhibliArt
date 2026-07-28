import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, Wand2, Download, RotateCcw, AlertCircle, Loader2, X } from 'lucide-react';

export default function PhotoToArtSection() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fileInputRef = useRef(null);

  const isCreateDisabled = isLoading || !uploadedFile;

  const onBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (file) => {
    if (file && file.type.startsWith('image/')) {
      setUploadedFile(file);
      setUploadedImage(URL.createObjectURL(file));
      setGeneratedImage(null);
      setError(null);
    } else {
      setError('Please upload a valid image file.');
      setUploadedFile(null);
      setUploadedImage(null);
    }
  };

  const handleGenerate = async () => {
    if (!uploadedFile) {
      setError('Please upload an image first.');
      return;
    }

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('image', uploadedFile);
    formData.append('prompt', prompt);

    try {
      const response = await fetch('http://localhost:8080/api/v1/generate', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok. Status ${response.status}: ${errorText}`);
      }

      const resultBlob = await response.blob();
      const imageUrl = URL.createObjectURL(resultBlob);
      setGeneratedImage(imageUrl);
    } catch (err) {
      console.error('Error generating image from photo:', err);
      setError(err.message || 'Failed to generate image. Please check your Stability API key and backend logs.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `Ghibli_photo_art_${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCreateAnother = () => {
    setUploadedFile(null);
    setUploadedImage(null);
    setGeneratedImage(null);
    setPrompt('');
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      
      {/* Left Input & Uploader Column */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <div>
          <h3 className="text-xl font-bold text-slate-100">Photo to Ghibli Art</h3>
          <p className="text-xs text-slate-400 mt-1">Upload a photo to transform it into Studio Ghibli style.</p>
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFileChange(e.target.files[0])}
        />

        {/* Drag & Drop Upload Zone */}
        {uploadedImage ? (
          <div className="relative rounded-2xl overflow-hidden border border-emerald-500/30 bg-slate-900 h-56 flex items-center justify-center group">
            <img
              src={uploadedImage}
              alt="Uploaded Preview"
              className="w-full h-full object-contain"
            />
            <button
              onClick={handleCreateAnother}
              className="absolute top-3 right-3 p-2 rounded-full bg-slate-950/80 text-slate-300 hover:text-white border border-slate-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div
            onClick={onBrowseClick}
            className="border-2 border-dashed border-slate-700 hover:border-emerald-500/50 rounded-2xl p-8 text-center bg-slate-900/50 hover:bg-slate-900/80 cursor-pointer transition-all duration-300 group flex flex-col items-center justify-center space-y-3"
          >
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <UploadCloud className="w-7 h-7" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-200">Click to upload photo</p>
              <p className="text-xs text-slate-500 mt-1">PNG, JPG, WEBP up to 10MB</p>
            </div>
            <button
              type="button"
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 group-hover:bg-emerald-500 group-hover:text-white transition-colors"
            >
              Browse Files
            </button>
          </div>
        )}

        {/* Prompt Input */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
            Prompt (Optional)
          </label>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Turn this image into Ghibli Studio Art with anime style..."
            className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
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
              <span>Transforming Image...</span>
            </>
          ) : (
            <>
              <Wand2 className="w-5 h-5" />
              <span>Transform to Ghibli Art</span>
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
            <p className="text-sm font-medium text-emerald-400">Transforming your photo into Ghibli Art...</p>
            <p className="text-xs text-slate-500">Processing photo via Stability AI</p>
          </div>
        ) : (
          <div className="text-center space-y-3 py-16 text-slate-500">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-600">
              <ImageIcon className="w-8 h-8" />
            </div>
            <p className="text-sm font-semibold text-slate-400">No Image Transformed Yet</p>
            <p className="text-xs max-w-xs mx-auto">Upload a photo on the left to start transformation.</p>
          </div>
        )}
      </div>

    </div>
  );
}
