import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Gallery from './components/Gallery';
import CreateSection from './components/CreateSection';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';

export default function App() {
  const [activeView, setActiveView] = useState('home');

  const scrollToCreate = () => {
    setActiveView('create');
    const createEl = document.getElementById('create');
    if (createEl) {
      createEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigate = (view) => {
    setActiveView(view);
    if (view === 'create') {
      scrollToCreate();
    } else if (view === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-white">
      <Navbar onNavigate={handleNavigate} />
      
      <main>
        <Hero onStartCreating={scrollToCreate} />
        <CreateSection activeTab={activeView === 'create' ? 'photo' : 'photo'} />
        <Features />
        <Gallery />
        <FaqSection />
      </main>

      <Footer />
    </div>
  );
}
