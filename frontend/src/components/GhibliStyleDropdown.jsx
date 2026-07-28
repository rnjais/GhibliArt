import React from 'react';
import { Palette } from 'lucide-react';

export default function GhibliStyleDropdown({ selectedStyle, onChangeStyle }) {
  const styles = [
    { id: 'general', name: 'General Anime (Studio Ghibli)' },
    { id: 'comic-book', name: 'Comic Book' },
    { id: 'analog-film', name: 'Analog Film' },
    { id: 'cinematic', name: 'Cinematic' },
    { id: 'digital-art', name: 'Digital Art' }
  ];

  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2">
        <Palette className="w-4 h-4 text-emerald-400" />
        <span>Ghibli Art Style</span>
      </label>
      <select
        value={selectedStyle}
        onChange={(e) => onChangeStyle(e.target.value)}
        className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-3 text-slate-100 text-sm font-medium focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all cursor-pointer"
      >
        {styles.map((style) => (
          <option key={style.id} value={style.id} className="bg-slate-900 text-slate-100">
            {style.name}
          </option>
        ))}
      </select>
    </div>
  );
}
