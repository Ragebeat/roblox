
import React, { useState, useEffect, useCallback } from 'react';
import { SLIDES_BY_LANG, TITLES } from './constants';
import Slide from './components/Slide';
import { Language } from './types';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('ja');
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);

  const slides = SLIDES_BY_LANG[lang];

  const nextSlide = useCallback(() => {
    setCurrentSlideIdx(prev => Math.min(prev + 1, slides.length - 1));
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlideIdx(prev => Math.max(prev - 1, 0));
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
  }, [nextSlide, prevSlide]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const UI_TEXT = {
    ja: {
      deckInfo: "Strategy Deck 2024"
    },
    ru: {
      deckInfo: "Стратегическая презентация 2024"
    }
  };

  const t = UI_TEXT[lang];

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-50 overflow-hidden relative">
      {/* Header */}
      <header className="px-8 py-4 flex justify-between items-center bg-slate-900/50 backdrop-blur-md border-b border-slate-800 shrink-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-xl italic shadow-lg shadow-blue-500/20">R</div>
          <div>
            <h1 className="text-lg font-bold truncate max-w-md">{TITLES[lang]}</h1>
            <p className="text-xs text-slate-400">{t.deckInfo}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {/* Language Toggle */}
          <div className="flex bg-slate-800 p-1 rounded-full border border-slate-700 shadow-inner">
            <button 
              onClick={() => {
                setLang('ja');
                setCurrentSlideIdx(0);
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${lang === 'ja' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
            >
              JAPANESE
            </button>
            <button 
              onClick={() => {
                setLang('ru');
                setCurrentSlideIdx(0);
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${lang === 'ru' ? 'bg-red-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
            >
              RUSSIAN
            </button>
          </div>

          <div className="text-slate-400 text-sm font-mono bg-slate-800 px-4 py-1.5 rounded-full border border-slate-700">
            {currentSlideIdx + 1} / {slides.length}
          </div>
        </div>
      </header>

      {/* Main Slide Area */}
      <main className="flex-grow flex items-center justify-center relative bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black">
        <Slide content={slides[currentSlideIdx]} />
      </main>

      {/* Navigation Controls */}
      <nav className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6 p-3 bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl z-20">
        <button 
          onClick={prevSlide}
          disabled={currentSlideIdx === 0}
          className="p-3 hover:bg-slate-800 rounded-xl transition-colors disabled:opacity-20 disabled:cursor-not-allowed group"
          aria-label="Previous Slide"
        >
          <svg className="w-6 h-6 group-active:scale-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        
        <div className="flex gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlideIdx(idx)}
              className={`w-2 h-2 rounded-full transition-all ${idx === currentSlideIdx ? 'bg-blue-500 w-8' : 'bg-slate-700 hover:bg-slate-600'}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <button 
          onClick={nextSlide}
          disabled={currentSlideIdx === slides.length - 1}
          className="p-3 hover:bg-slate-800 rounded-xl transition-colors disabled:opacity-20 disabled:cursor-not-allowed group"
          aria-label="Next Slide"
        >
          <svg className="w-6 h-6 group-active:scale-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </nav>

      {/* Background Decorations */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/10 blur-[120px] rounded-full -z-10 animate-pulse"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full -z-10 animate-pulse" style={{animationDelay: '1s'}}></div>
    </div>
  );
};

export default App;
