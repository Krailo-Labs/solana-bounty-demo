import React from 'react';
import { Language, Speed } from './types';
import { audio } from './audio';
import { Volume2, VolumeX, Sparkles, HelpCircle } from 'lucide-react';

interface HeaderProps {
  lang: Language;
  setLang: (l: Language) => void;
  sound: boolean;
  setSound: (s: boolean) => void;
  speed: Speed;
  setSpeed: (s: Speed) => void;
  onToggleQA?: () => void;
  isQAOpen?: boolean;
}

export function Header({ 
  lang, 
  setLang, 
  sound, 
  setSound, 
  speed, 
  setSpeed,
  onToggleQA,
  isQAOpen 
}: HeaderProps) {
  return (
    <header className="w-full h-full flex items-center justify-between px-3 sm:px-5 md:px-8 border-b border-white/10 bg-[#0A0A0B]/95 backdrop-blur-md select-none">
       {/* App Title with Live Pulse */}
       <div className="flex items-center gap-2 min-w-0 flex-1 pr-2">
         <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#14F195] shadow-[0_0_10px_#14F195] flex-shrink-0 animate-pulse" />
         <span className="text-white/80 text-[11px] sm:text-xs md:text-sm font-bold tracking-wider uppercase font-display truncate">
           {lang === 'en' ? 'Solana Interactive Guide' : 'Інтерактивний гід Solana'}
         </span>
       </div>

       {/* Control Buttons with Fixed Widths (Zero Shifting) */}
       <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">
         {/* QA / AI Assistant Quick Button */}
         {onToggleQA && (
           <button
             id="header-qa-btn"
             onClick={onToggleQA}
             className={`h-8 sm:h-9 px-2.5 sm:px-3 flex items-center gap-1.5 rounded-lg border text-[11px] sm:text-xs font-black tracking-wider transition-all active:scale-95 ${
               isQAOpen
                 ? 'bg-[#14F195] text-black border-[#14F195] shadow-[0_0_15px_rgba(20,241,149,0.6)]'
                 : 'bg-white/10 hover:bg-[#14F195]/20 border-white/20 text-[#14F195]'
             }`}
             title={lang === 'en' ? 'Q&A & AI Assistant' : 'Питання & AI Помічник'}
           >
             <Sparkles className="w-3.5 h-3.5" />
             <span className="hidden xs:inline">{lang === 'en' ? 'AI FAQ' : 'AI & FAQ'}</span>
           </button>
         )}

         {/* Language Toggle */}
         <button 
           id="header-lang-btn"
           className="w-[66px] sm:w-[76px] h-8 sm:h-9 flex-shrink-0 flex items-center justify-center rounded-lg border border-white/15 bg-white/5 text-[11px] sm:text-xs font-bold tracking-wider text-white/90 hover:bg-white/10 hover:border-white/30 transition-colors active:scale-95"
           onClick={() => setLang(lang === 'en' ? 'ua' : 'en')}
           title="Toggle Language / Перемкнути мову"
         >
           <span className={lang === 'en' ? 'text-[#14F195] font-extrabold' : 'text-white/40'}>EN</span>
           <span className="text-white/20 mx-1">|</span>
           <span className={lang === 'ua' ? 'text-[#14F195] font-extrabold' : 'text-white/40'}>UA</span>
         </button>

         {/* Sound Toggle */}
         <button 
           id="header-sound-btn"
           className={`w-[78px] sm:w-[92px] h-8 sm:h-9 flex-shrink-0 flex items-center justify-center gap-1.5 rounded-lg border text-[11px] sm:text-xs font-bold tracking-wider transition-colors active:scale-95 ${
             sound ? 'border-cyan-500/50 bg-cyan-950/40 text-cyan-300' : 'border-white/15 bg-white/5 text-white/40'
           }`}
           onClick={() => {
              setSound(!sound);
              if (!sound) { audio.init(); audio.playSolanaPulse(); }
           }}
           title="Toggle Sound / Звук"
         >
           {sound ? <Volume2 className="w-3.5 h-3.5 flex-shrink-0 text-cyan-400" /> : <VolumeX className="w-3.5 h-3.5 flex-shrink-0 text-white/40" />}
           <span className="font-mono">{sound ? (lang === 'en' ? 'ON' : 'ВКЛ') : (lang === 'en' ? 'OFF' : 'ВИКЛ')}</span>
         </button>

         {/* Speed Toggle */}
         <button 
           id="header-speed-btn"
           className="w-11 sm:w-12 h-8 sm:h-9 flex-shrink-0 flex items-center justify-center rounded-lg border border-white/15 bg-white/5 text-[11px] sm:text-xs font-bold font-mono tracking-wider text-white/90 hover:bg-white/10 hover:border-white/30 transition-colors active:scale-95"
           onClick={() => {
             const next = speed === 1 ? 1.25 : speed === 1.25 ? 0.8 : 1;
             setSpeed(next as any);
           }}
           title="Animation Speed / Швидкість"
         >
           {speed}x
         </button>
       </div>
    </header>
  );
}

