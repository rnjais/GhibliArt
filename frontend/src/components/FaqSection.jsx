import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: "How does Ghibli AI generate Studio Ghibli art?",
      a: "Ghibli AI uses Stability AI's Stable Diffusion models combined with specially crafted anime and Ghibli style presets, communicated seamlessly via our Spring Boot OpenFeign backend."
    },
    {
      q: "Is it free to test and create images?",
      a: "Yes! When you set up your Stability AI API key, new accounts receive 25 free credits, which is sufficient for generating over 20-30 high quality Ghibli images."
    },
    {
      q: "What is the difference between Photo to Art and Text to Art?",
      a: "Photo to Art uploads your existing image and transforms its composition and structure into Ghibli anime style. Text to Art generates a brand new image entirely from your text description."
    },
    {
      q: "Can I download high-resolution outputs?",
      a: "Absolutely. Once an image is generated, click the 'Download Image' button to save a 768x512 PNG file directly to your device."
    }
  ];

  return (
    <section id="faq" className="py-20 relative bg-slate-950/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100">
            Frequently Asked Questions
          </h2>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx}
              className="glass-card rounded-2xl border border-slate-800 overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}
                className="w-full p-6 text-left font-semibold text-slate-200 hover:text-white flex items-center justify-between gap-4"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-emerald-400 shrink-0 transition-transform duration-300 ${openIdx === idx ? 'rotate-180' : ''}`} />
              </button>
              
              {openIdx === idx && (
                <div className="px-6 pb-6 pt-0 text-sm text-slate-400 border-t border-slate-800/60 leading-relaxed mt-2">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
