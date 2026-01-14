
import React, { useState, useEffect, useCallback } from 'react';
import { SLIDES_BY_LANG, TITLES } from './constants';
import Slide from './components/Slide';
import { generateBusinessIdeas } from './services/geminiService';
import { BusinessIdea, Language } from './types';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('ja');
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);
  const [showIdeas, setShowIdeas] = useState(false);
  const [ideas, setIdeas] = useState<BusinessIdea[]>([]);
  const [loadingIdeas, setLoadingIdeas] = useState(false);

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

  const handleGenerateIdeas = async () => {
    setLoadingIdeas(true);
    setShowIdeas(true);
    const result = await generateBusinessIdeas(lang);
    setIdeas(result);
    setLoadingIdeas(false);
  };

  const UI_TEXT = {
    ja: {
      generateBtn: "具体ビジネス案を生成",
      backBtn: "プレゼンに戻る",
      loading: "AIがビジネスアイデアを練っています...",
      ideasTitle: "日本×グローバルの具体ビジネス案",
      target: "ターゲット",
      monetization: "マネタイズ",
      strategy: "戦略",
      deckInfo: "Strategy Deck 2024"
    },
    ru: {
      generateBtn: "Создать идеи бизнеса",
      backBtn: "Вернуться к презентации",
      loading: "Искусственный интеллект придумывает идеи...",
      ideasTitle: "Конкретные идеи: Япония × Мир",
      target: "Цель",
      monetization: "Монетизация",
      strategy: "Стратегия",
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
          <div className="flex bg-slate-800 p-1 rounded-full border border-slate-700">
            <button 
              onClick={() => setLang('ja')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${lang === 'ja' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
            >
              JA
            </button>
            <button 
              onClick={() => setLang('ru')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${lang === 'ru' ? 'bg-red-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
            >
              RU
            </button>
          </div>

          <button 
            onClick={handleGenerateIdeas}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-full text-sm font-semibold transition-all flex items-center gap-2 shadow-lg shadow-purple-500/20"
          >
            <span>💡</span> {t.generateBtn}
          </button>
          <div className="text-slate-400 text-sm font-mono bg-slate-800 px-3 py-1 rounded-md">
            {currentSlideIdx + 1} / {slides.length}
          </div>
        </div>
      </header>

      {/* Main Slide Area */}
      <main className="flex-grow flex items-center justify-center relative bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black">
        {showIdeas ? (
          <div className="w-full h-full max-w-6xl p-12 overflow-y-auto slide-enter scrollbar-hide">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                {t.ideasTitle}
              </h2>
              <button 
                onClick={() => setShowIdeas(false)}
                className="text-slate-400 hover:text-white flex items-center gap-2"
              >
                {t.backBtn} <span className="text-2xl">✕</span>
              </button>
            </div>
            
            {loadingIdeas ? (
              <div className="flex flex-col items-center justify-center h-64">
                <div className="animate-spin w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full mb-4"></div>
                <p className="text-slate-400">{t.loading}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
                {ideas.map((idea, idx) => (
                  <div key={idx} className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700 hover:border-purple-500/50 transition-colors">
                    <h3 className="text-xl font-bold mb-3 text-purple-300">{idea.title}</h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-slate-500 font-semibold">{t.target}:</span> {idea.target}</p>
                      <p><span className="text-slate-500 font-semibold">{t.monetization}:</span> {idea.monetization}</p>
                      <p><span className="text-slate-500 font-semibold">{t.strategy}:</span> {idea.scalability}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <Slide content={slides[currentSlideIdx]} />
        )}
      </main>

      {/* Navigation Controls */}
      {!showIdeas && (
        <nav className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6 p-3 bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl z-20">
          <button 
            onClick={prevSlide}
            disabled={currentSlideIdx === 0}
            className="p-3 hover:bg-slate-800 rounded-xl transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          
          <div className="flex gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlideIdx(idx)}
                className={`w-2 h-2 rounded-full transition-all ${idx === currentSlideIdx ? 'bg-blue-500 w-6' : 'bg-slate-700 hover:bg-slate-600'}`}
              />
            ))}
          </div>

          <button 
            onClick={nextSlide}
            disabled={currentSlideIdx === slides.length - 1}
            className="p-3 hover:bg-slate-800 rounded-xl transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </nav>
      )}

      {/* Background Decorations */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/10 blur-[120px] rounded-full -z-10"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full -z-10"></div>
    </div>
  );
};

export default App;
