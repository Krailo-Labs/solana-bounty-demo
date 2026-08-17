import { AppState } from './types';

export interface SlideLayout {
  sceneClasses: string;
  textZoneClasses: string;
  textAlignmentClasses: string;
}

const defaultLayout: SlideLayout = {
  // Desktop layout matches mobile logic now (fixed explicit heights, perfectly centered).
  sceneClasses: 'w-full max-sm:flex-none sm:flex-none sm:h-[450px] relative z-10 flex items-center justify-center p-1 sm:p-2 md:p-3 overflow-visible transition-all duration-500 ease-in-out',
  textZoneClasses: 'w-full flex-shrink-0 z-20 flex items-center justify-center pt-1 max-sm:pt-2 pb-2 sm:pt-2 sm:pb-3 relative transition-all duration-500 ease-in-out',
  textAlignmentClasses: 'flex flex-col items-center justify-center w-full max-w-3xl px-1 text-center',
};

// Fully decoupled configuration per slide. 
// You can now tweak `max-sm:h-[...]` (mobile height) AND `sm:h-[...]` (PC height) individually without breaking others!
export const slideLayoutConfig: Record<AppState, SlideLayout> = {
  [AppState.INTRO]: {
    ...defaultLayout,
    sceneClasses: 'w-full max-sm:h-[295px] sm:h-[420px] max-sm:flex-none sm:flex-none relative z-10 flex items-center justify-center p-1 overflow-visible transition-all duration-500 ease-in-out',
  },
  [AppState.BANK_SIMPLE]: {
    ...defaultLayout,
    sceneClasses: 'w-full max-sm:h-[375px] sm:h-[340px] max-sm:flex-none sm:flex-none relative z-10 flex items-center justify-center p-1 overflow-visible transition-all duration-500 ease-in-out',
  },
  [AppState.BANK_CHECK]: {
    ...defaultLayout,
    sceneClasses: 'w-full max-sm:h-[375px] sm:h-[340px] max-sm:flex-none sm:flex-none relative z-10 flex items-center justify-center p-1 overflow-visible transition-all duration-500 ease-in-out',
  },
  [AppState.BANK_INSTITUTION]: {
    ...defaultLayout,
    sceneClasses: 'w-full max-sm:h-[375px] sm:h-[340px] max-sm:flex-none sm:flex-none relative z-10 flex items-center justify-center p-1 overflow-visible transition-all duration-500 ease-in-out',
  },
  [AppState.BANK_FEE]: {
    ...defaultLayout,
    sceneClasses: 'w-full max-sm:h-[375px] sm:h-[430px] max-sm:flex-none sm:flex-none relative z-10 flex items-center justify-center p-1 overflow-visible transition-all duration-500 ease-in-out',
  },
  [AppState.BANK_WAIT]: {
    ...defaultLayout,
    sceneClasses: 'w-full max-sm:h-[375px] sm:h-[430px] max-sm:flex-none sm:flex-none relative z-10 flex items-center justify-center p-1 overflow-visible transition-all duration-500 ease-in-out',
  },
  [AppState.BANK_HUMAN]: {
    ...defaultLayout,
    sceneClasses: 'w-full max-sm:h-[375px] sm:h-[460px] max-sm:flex-none sm:flex-none relative z-10 flex items-center justify-center p-1 overflow-visible transition-all duration-500 ease-in-out',
  },
  [AppState.BANK_RECEIVED]: {
    ...defaultLayout,
    sceneClasses: 'w-full max-sm:h-[375px] sm:h-[460px] max-sm:flex-none sm:flex-none relative z-10 flex items-center justify-center p-1 overflow-visible transition-all duration-500 ease-in-out',
  },
  [AppState.HOOK]: {
    ...defaultLayout,
    sceneClasses: 'w-full max-sm:h-[375px] sm:h-[400px] max-sm:flex-none sm:flex-none relative z-10 flex items-center justify-center p-1 overflow-visible transition-all duration-500 ease-in-out',
  },
  [AppState.BLOCKCHAIN_INTRO]: {
    ...defaultLayout,
    sceneClasses: 'w-full max-sm:h-[340px] sm:h-[400px] max-sm:flex-none sm:flex-none relative z-10 flex items-center justify-center p-1 overflow-visible transition-all duration-500 ease-in-out',
  },
  [AppState.SOLANA_REVEAL]: {
    ...defaultLayout,
    sceneClasses: 'w-full max-sm:h-[360px] sm:h-[500px] max-sm:flex-none sm:flex-none relative z-10 flex items-center justify-center p-1 overflow-visible transition-all duration-500 ease-in-out',
  },
  [AppState.SOLANA_SPEED]: {
    ...defaultLayout,
    sceneClasses: 'w-full max-sm:h-[295px] sm:h-[400px] max-sm:flex-none sm:flex-none relative z-10 flex items-center justify-center p-1 overflow-visible transition-all duration-500 ease-in-out',
  },
  [AppState.SOLANA_FEE]: {
    ...defaultLayout,
    sceneClasses: 'w-full max-sm:h-[295px] sm:h-[420px] max-sm:flex-none sm:flex-none relative z-10 flex items-center justify-center p-1 overflow-visible transition-all duration-500 ease-in-out',
  },
  [AppState.SOLANA_SMART_CONTRACTS]: {
    ...defaultLayout,
    sceneClasses: 'w-full max-sm:h-[300px] sm:h-[450px] max-sm:flex-none sm:flex-none relative z-10 flex items-center justify-center p-1 overflow-visible transition-all duration-500 ease-in-out',
  },
  [AppState.SOLANA_DEFI]: {
    ...defaultLayout,
    sceneClasses: 'w-full max-sm:h-[340px] sm:h-[480px] max-sm:flex-none sm:flex-none relative z-10 flex items-center justify-center p-1 overflow-visible transition-all duration-500 ease-in-out',
  },
  [AppState.SOLANA_NFT]: {
    ...defaultLayout,
    sceneClasses: 'w-full max-sm:h-[300px] sm:h-[420px] max-sm:flex-none sm:flex-none relative z-10 flex items-center justify-center p-1 overflow-visible transition-all duration-500 ease-in-out',
  },
  [AppState.FINAL_REVEAL]: {
    ...defaultLayout,
    sceneClasses: 'w-full max-sm:h-[360px] sm:h-[460px] max-sm:flex-none sm:flex-none relative z-10 flex items-center justify-center p-1 overflow-visible transition-all duration-500 ease-in-out',
  },
  [AppState.MEMORY_CARD]: {
    ...defaultLayout,
    sceneClasses: 'w-full max-sm:h-[235px] sm:h-[350px] max-sm:flex-none sm:flex-none relative z-10 flex items-center justify-center p-1 overflow-visible transition-all duration-500 ease-in-out',
  },
  [AppState.QA_EXPLORER]: {
    ...defaultLayout,
  }
};
