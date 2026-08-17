import React, { useState, useEffect } from 'react';
import { AppState, Language, Speed } from './types';
import { audio } from './audio';
import { Header } from './Header';
import { Scene } from './Scene';
import { ExplanationZone } from './ExplanationZone';
import { ActionZone } from './ActionZone';
import { QAExplorer } from './QAExplorer';
import { data } from './data';

const stateDurations: Record<AppState, number> = {
  [AppState.INTRO]: 0,
  [AppState.BANK_SIMPLE]: 4000,
  [AppState.BANK_CHECK]: 4000,
  [AppState.BANK_INSTITUTION]: 4000,
  [AppState.BANK_FEE]: 4000,
  [AppState.BANK_WAIT]: 6000,
  [AppState.BANK_HUMAN]: 4000,
  [AppState.BANK_RECEIVED]: 3500,
  [AppState.HOOK]: 0,
  [AppState.BLOCKCHAIN_INTRO]: 4500,
  [AppState.SOLANA_REVEAL]: 4500,
  [AppState.SOLANA_SPEED]: 3000,
  [AppState.SOLANA_FEE]: 4000,
  [AppState.SOLANA_SMART_CONTRACTS]: 6000,
  [AppState.SOLANA_DEFI]: 6000,
  [AppState.SOLANA_NFT]: 6000,
  [AppState.FINAL_REVEAL]: 5000,
  [AppState.MEMORY_CARD]: 0,
  [AppState.QA_EXPLORER]: 0,
};

export function MainStage({ isMobile }: { isMobile: boolean }) {
  const [state, setState] = useState<AppState>(AppState.INTRO);
  const [lang, setLang] = useState<Language>('en');
  const [sound, setSound] = useState(true);
  const [speed, setSpeed] = useState<Speed>(1);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    audio.enabled = sound;
  }, [sound]);

  // Audio sync
  useEffect(() => {
    if (!sound) return;
    audio.init();
    if (state >= AppState.BANK_SIMPLE && state <= AppState.BANK_RECEIVED) {
      audio.playBankTick();
      if (state === AppState.BANK_FEE || state === AppState.BANK_WAIT) {
         setTimeout(() => audio.playBankHeavy(), 200);
      }
    } else if (state >= AppState.BLOCKCHAIN_INTRO && state <= AppState.SOLANA_NFT) {
      audio.playSolanaPulse();
      if (state === AppState.SOLANA_REVEAL || state === AppState.SOLANA_SMART_CONTRACTS || state === AppState.SOLANA_DEFI || state === AppState.SOLANA_NFT) {
         setTimeout(() => audio.playSolanaChime(), 100);
      }
    } else if (state === AppState.FINAL_REVEAL || state === AppState.MEMORY_CARD) {
      audio.playSolanaChime();
    }
  }, [state, sound]);

  // Auto-advance
  useEffect(() => {
    if (isPaused) return;
    const baseDuration = stateDurations[state];
    if (baseDuration > 0) {
      const timer = setTimeout(() => {
        setState(s => s < AppState.MEMORY_CARD ? s + 1 : s);
      }, baseDuration / speed);
      return () => clearTimeout(timer);
    }
  }, [state, speed, isPaused]);

  const handleNext = () => {
    setState(s => s < AppState.MEMORY_CARD ? s + 1 : s);
  };

  const handlePrev = () => {
    setState(s => s > AppState.INTRO ? s - 1 : s);
  };

  const handleReplay = () => {
    setState(AppState.INTRO);
    setIsPaused(false);
  };

  const handleOpenQA = () => {
    setState(AppState.QA_EXPLORER);
    setIsPaused(false);
  };

  const handleBackToPresentation = () => {
    setState(AppState.MEMORY_CARD);
  };

  const togglePause = () => {
    setIsPaused(p => !p);
  };

  const isQAOpen = state === AppState.QA_EXPLORER;
  const t = data[lang];
  const currentDuration = stateDurations[state] / speed;

  if (isQAOpen) {
    return (
      <div id="main-stage-qa" className="w-full h-full flex flex-col bg-[#0A0A0B] overflow-hidden select-none">
        <QAExplorer
          lang={lang}
          onBackToPresentation={handleBackToPresentation}
          onReplay={handleReplay}
          isMobile={isMobile}
        />
      </div>
    );
  }

  return (
    <div id="main-stage" className="w-full h-full flex flex-col bg-[#0A0A0B] overflow-hidden select-none">
       {/* Fixed Header */}
       <div className="w-full h-[48px] sm:h-[54px] md:h-[60px] flex-shrink-0 z-50 relative">
         <Header 
           lang={lang} setLang={setLang}
           sound={sound} setSound={setSound}
           speed={speed} setSpeed={setSpeed}
           onToggleQA={handleOpenQA}
           isQAOpen={isQAOpen}
         />
       </div>
       
       {/* 3D Scene Viewport */}
       <main className="w-full flex-1 min-h-0 relative z-10 overflow-hidden flex items-center justify-center p-1 sm:p-2 md:p-3">
         <Scene state={state} isMobile={isMobile} speed={speed} lang={lang} />
       </main>
       
       {/* Explanation Zone (Lifted slightly higher with comfortable breathing room) */}
       <div className="w-full flex-shrink-0 z-20 flex items-center justify-center pt-1 pb-2 sm:pt-2 sm:pb-3">
         <ExplanationZone state={state} t={t} />
       </div>
       
       {/* Action Controls (Lifted upwards away from bottom screen edges) */}
       <div className="w-full h-[68px] sm:h-[78px] md:h-[84px] flex-shrink-0 z-30 pb-3 sm:pb-5 md:pb-6 flex items-center justify-center">
         <ActionZone 
           state={state} t={t} 
           onNext={handleNext} 
           onPrev={handlePrev}
           onReplay={handleReplay} 
           onOpenQA={handleOpenQA}
           isPaused={isPaused}
           onTogglePause={togglePause}
           duration={currentDuration} 
           lang={lang} 
         />
       </div>
    </div>
  );
}

