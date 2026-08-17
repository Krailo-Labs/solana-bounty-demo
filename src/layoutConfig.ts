import { AppState } from './types';

export interface SlideLayout {
  sceneClasses: string;
  textZoneClasses: string;
  textAlignmentClasses: string;
}

const defaultLayout: SlideLayout = {
  // Mobile flex-1 fills space naturally, PC flex-1 fills remaining space. 
  sceneClasses: 'w-full max-sm:flex-1 sm:flex-1 relative z-10 flex items-center justify-center p-1 sm:p-2 md:p-3 overflow-visible transition-all duration-500 ease-in-out',
  textZoneClasses: 'w-full flex-shrink-0 z-20 flex items-center justify-center pt-1 max-sm:pt-2 pb-2 sm:pt-2 sm:pb-3 relative transition-all duration-500 ease-in-out',
  textAlignmentClasses: 'flex flex-col items-center justify-center w-full max-w-3xl px-1 text-center',
};

// Fully decoupled configuration per slide. 
// You can now tweak `max-sm:h-[...]` or `max-sm:mt-[...]` individually without breaking others!
export const slideLayoutConfig: Record<AppState, SlideLayout> = {
  [AppState.INTRO]: {
    ...defaultLayout,
    sceneClasses: 'w-full max-sm:h-[295px] max-sm:flex-none sm:flex-1 relative z-10 flex items-center justify-center p-1 overflow-visible transition-all duration-500 ease-in-out',
  },
  [AppState.BANK_SIMPLE]: {
    ...defaultLayout,
    sceneClasses: 'w-full max-sm:h-[375px] max-sm:flex-none sm:flex-1 relative z-10 flex items-center justify-center p-1 overflow-visible transition-all duration-500 ease-in-out',
  },
  [AppState.BANK_CHECK]: {
    ...defaultLayout,
    sceneClasses: 'w-full max-sm:h-[375px] max-sm:flex-none sm:flex-1 relative z-10 flex items-center justify-center p-1 overflow-visible transition-all duration-500 ease-in-out',
  },
  [AppState.BANK_INSTITUTION]: {
    ...defaultLayout,
    sceneClasses: 'w-full max-sm:h-[375px] max-sm:flex-none sm:flex-1 relative z-10 flex items-center justify-center p-1 overflow-visible transition-all duration-500 ease-in-out',
  },
  [AppState.BANK_FEE]: {
    ...defaultLayout,
    sceneClasses: 'w-full max-sm:h-[375px] max-sm:flex-none sm:flex-1 relative z-10 flex items-center justify-center p-1 overflow-visible transition-all duration-500 ease-in-out',
  },
  [AppState.BANK_WAIT]: {
    ...defaultLayout,
    sceneClasses: 'w-full max-sm:h-[375px] max-sm:flex-none sm:flex-1 relative z-10 flex items-center justify-center p-1 overflow-visible transition-all duration-500 ease-in-out',
  },
  [AppState.BANK_HUMAN]: {
    ...defaultLayout,
    sceneClasses: 'w-full max-sm:h-[375px] max-sm:flex-none sm:flex-1 relative z-10 flex items-center justify-center p-1 overflow-visible transition-all duration-500 ease-in-out',
  },
  [AppState.BANK_RECEIVED]: {
    ...defaultLayout,
    sceneClasses: 'w-full max-sm:h-[375px] max-sm:flex-none sm:flex-1 relative z-10 flex items-center justify-center p-1 overflow-visible transition-all duration-500 ease-in-out',
  },
  [AppState.HOOK]: {
    ...defaultLayout,
    sceneClasses: 'w-full max-sm:h-[375px] max-sm:flex-none sm:flex-1 relative z-10 flex items-center justify-center p-1 overflow-visible transition-all duration-500 ease-in-out',
  },
  [AppState.BLOCKCHAIN_INTRO]: {
    ...defaultLayout,
    sceneClasses: 'w-full max-sm:h-[340px] max-sm:flex-none sm:flex-1 relative z-10 flex items-center justify-center p-1 overflow-visible transition-all duration-500 ease-in-out',
  },
  [AppState.SOLANA_REVEAL]: {
    ...defaultLayout,
    sceneClasses: 'w-full max-sm:h-[360px] max-sm:flex-none sm:flex-1 relative z-10 flex items-center justify-center p-1 overflow-visible transition-all duration-500 ease-in-out',
  },
  [AppState.SOLANA_SPEED]: {
    ...defaultLayout,
    sceneClasses: 'w-full max-sm:h-[295px] max-sm:flex-none sm:flex-1 relative z-10 flex items-center justify-center p-1 overflow-visible transition-all duration-500 ease-in-out',
  },
  [AppState.SOLANA_FEE]: {
    ...defaultLayout,
    sceneClasses: 'w-full max-sm:h-[295px] max-sm:flex-none sm:flex-1 relative z-10 flex items-center justify-center p-1 overflow-visible transition-all duration-500 ease-in-out',
  },
  [AppState.SOLANA_SMART_CONTRACTS]: {
    ...defaultLayout,
    sceneClasses: 'w-full max-sm:h-[300px] max-sm:flex-none sm:flex-1 relative z-10 flex items-center justify-center p-1 overflow-visible transition-all duration-500 ease-in-out',
  },
  [AppState.SOLANA_DEFI]: {
    ...defaultLayout,
    sceneClasses: 'w-full max-sm:h-[340px] max-sm:flex-none sm:flex-1 relative z-10 flex items-center justify-center p-1 overflow-visible transition-all duration-500 ease-in-out',
  },
  [AppState.SOLANA_NFT]: {
    ...defaultLayout,
    sceneClasses: 'w-full max-sm:h-[300px] max-sm:flex-none sm:flex-1 relative z-10 flex items-center justify-center p-1 overflow-visible transition-all duration-500 ease-in-out',
  },
  [AppState.FINAL_REVEAL]: {
    ...defaultLayout,
    sceneClasses: 'w-full max-sm:h-[360px] max-sm:flex-none sm:flex-1 relative z-10 flex items-center justify-center p-1 overflow-visible transition-all duration-500 ease-in-out',
  },
  [AppState.MEMORY_CARD]: {
    ...defaultLayout,
    sceneClasses: 'w-full max-sm:h-[235px] max-sm:flex-none sm:flex-1 relative z-10 flex items-center justify-center p-1 overflow-visible transition-all duration-500 ease-in-out',
  },
  [AppState.QA_EXPLORER]: {
    ...defaultLayout,
  }
};
