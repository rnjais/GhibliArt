import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-sky-500 flex items-center justify-center text-white">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="font-bold text-slate-200 tracking-tight">Ghibli AI Generator</span>
        </div>

        {/* Copyright */}
        <p className="text-xs text-slate-500 flex items-center gap-1">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
          <span>using Spring Boot & React</span>
        </p>

        {/* Links */}
        <div className="flex items-center gap-6 text-xs text-slate-400">
          <a href="#features" className="hover:text-emerald-400 transition-colors">Features</a>
          <a href="#gallery" className="hover:text-emerald-400 transition-colors">Gallery</a>
          <a href="#faq" className="hover:text-emerald-400 transition-colors">FAQ</a>
        </div>

      </div>
    </footer>
  );
}
