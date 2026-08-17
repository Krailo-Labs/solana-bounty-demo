import React, { useEffect, useState } from 'react';
import { AppState } from './types';
import { motion } from 'motion/react';
import { Play, Pause, SkipBack, RotateCcw, ArrowRight, Sparkles, MessageSquare } from 'lucide-react';

export function ActionZone({ 
  state, 
  t, 
  onNext, 
  onPrev, 
  onReplay, 
  onOpenQA,
  isPaused, 
  onTogglePause, 
  duration, 
  lang 
}: { 
  state: AppState, 
  t: any, 
  onNext: () => void, 
  onPrev: () => void, 
  onReplay: () => void, 
  onOpenQA: () => void,
  isPaused: boolean, 
  onTogglePause: () => void, 
  duration: number, 
  lang: string 
}) {
  const isSend = state === AppState.INTRO;
  const isHook = state === AppState.HOOK;
  const isEnd = state === AppState.MEMORY_CARD;
  const isWait = state === AppState.BANK_WAIT;

  let label = t.btn_next;
  if (isSend) label = t.btn_send;
  if (isHook) label = t.btn_see_other;
  if (isWait) label = lang === 'en' ? 'Skip Bank Wait →' : 'Пропустити очікування →';

  const [key, setKey] = useState(0);
  useEffect(() => { setKey(k => k + 1); }, [state, isPaused]);

  return (
    <div id="action-zone" className="w-full flex items-center justify-center relative z-30 px-3 sm:px-4 gap-2 sm:gap-3 select-none">
      
      {/* Previous Step Button */}
      {!isSend && !isHook && !isEnd && (
        <button 
          id="action-prev-btn"
          onClick={onPrev}
          className="w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 flex items-center justify-center rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all active:scale-95 shadow-lg"
          aria-label="Previous step"
          title="Previous slide / Назад"
        >
          <SkipBack className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </button>
      )}

      {/* Pause / Resume Button: ALWAYS functional */}
      {!isSend && !isHook && !isEnd && (
        <button 
          id="action-pause-btn"
          onClick={onTogglePause}
          className={`w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 flex items-center justify-center rounded-2xl border transition-all active:scale-95 shadow-lg ${
            isPaused 
              ? 'bg-[#14F195]/20 border-[#14F195] text-[#14F195] shadow-[0_0_20px_rgba(20,241,149,0.3)]' 
              : 'bg-white/10 hover:bg-white/20 border-white/20 text-white'
          }`}
          aria-label={isPaused ? 'Resume' : 'Pause'}
          title={isPaused ? 'Resume / Продовжити' : 'Pause / Пауза'}
        >
          {isPaused ? <Play className="w-6 h-6 fill-current" /> : <Pause className="w-6 h-6 fill-current" />}
        </button>
      )}

      {/* Final Slide Controls: Replay and Enter Q&A & AI Hub */}
      {isEnd ? (
        <div className="flex items-center gap-2 sm:gap-4 w-full max-w-lg justify-center max-sm:px-1">
          <button
            id="action-replay-btn"
            onClick={onReplay}
            className="flex-[0.8] sm:flex-1 h-12 sm:h-14 flex items-center justify-center gap-1.5 sm:gap-2 rounded-2xl bg-white/15 hover:bg-white/25 border-2 border-white/25 text-white font-extrabold text-[10px] sm:text-sm md:text-base tracking-wide transition-all active:scale-95 shadow-lg max-sm:px-1"
          >
            <RotateCcw className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-cyan-300 flex-shrink-0" />
            <span className="whitespace-nowrap">{lang === 'ua' ? 'Спочатку' : 'Replay'}</span>
          </button>

          <button
            id="action-qa-btn"
            onClick={onOpenQA}
            className="flex-[1.2] sm:flex-[1.3] h-12 sm:h-14 flex items-center justify-center gap-1.5 sm:gap-2 rounded-2xl bg-gradient-to-r from-[#14F195] via-cyan-400 to-blue-500 text-slate-950 font-black text-[11px] sm:text-sm md:text-base tracking-wide transition-all active:scale-95 shadow-[0_0_30px_rgba(20,241,149,0.6)] max-sm:px-1"
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-slate-950 animate-pulse flex-shrink-0" />
            <span className="whitespace-nowrap text-center leading-tight">{lang === 'ua' ? 'Питання & AI Чат →' : 'Q&A & AI Chat →'}</span>
          </button>
        </div>
      ) : (
        /* Standard Main Action Button */
        <button 
          id="action-main-btn"
          onClick={onNext}
          className={`relative overflow-hidden w-full max-w-[280px] sm:max-w-[340px] md:max-w-[380px] h-12 sm:h-14 flex items-center justify-center rounded-2xl font-extrabold text-base sm:text-lg md:text-xl tracking-wide transition-all duration-200 active:scale-98 shadow-xl ${
            isWait 
              ? 'bg-gradient-to-r from-red-900/60 to-red-800/80 text-red-200 border-2 border-red-500/70 hover:border-red-400 hover:bg-red-800 shadow-[0_0_25px_rgba(239,68,68,0.4)]' :
            isSend || isHook 
              ? 'bg-gradient-to-r from-[#14F195] via-cyan-400 to-blue-500 text-slate-950 hover:opacity-95 shadow-[0_0_35px_rgba(20,241,149,0.5)] font-black' 
              : 'bg-white/15 text-white hover:bg-white/25 border-2 border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.1)]'
          }`}
        >
          {/* Normal Step Progress Fill */}
          {duration > 0 && !isWait && !isPaused && (
            <motion.div
              key={key}
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: duration / 1000, ease: 'linear' }}
              className="absolute left-0 top-0 bottom-0 bg-white/20"
            />
          )}
          
          {/* Wait Step Progress Fill (Stops when paused) */}
          {duration > 0 && isWait && !isPaused && (
            <motion.div
              key={`wait-${key}`}
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: duration / 1000, ease: 'linear' }}
              className="absolute left-0 top-0 bottom-0 bg-red-500/30"
            />
          )}

          <span className="relative z-10 flex items-center gap-2.5 whitespace-nowrap">
            {label}
            {!isSend && !isHook && !isWait && <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />}
          </span>
        </button>
      )}
    </div>
  );
}

