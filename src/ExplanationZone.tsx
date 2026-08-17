import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AppState } from './types';

export function ExplanationZone({ state, t }: { state: AppState, t: any }) {
  const textMap = {
    [AppState.INTRO]: { title: t.intro_title, sub: t.intro_sub },
    [AppState.BANK_SIMPLE]: { title: t.bank_simple_title, sub: t.bank_simple_sub },
    [AppState.BANK_CHECK]: { title: t.bank_check_title, sub: t.bank_check_sub },
    [AppState.BANK_INSTITUTION]: { title: t.bank_inst_title, sub: t.bank_inst_sub },
    [AppState.BANK_FEE]: { title: t.bank_fee_title, sub: t.bank_fee_sub },
    [AppState.BANK_WAIT]: { title: t.bank_wait_title, sub: t.bank_wait_sub },
    [AppState.BANK_HUMAN]: { title: t.bank_human_title, sub: t.bank_human_sub },
    [AppState.BANK_RECEIVED]: { title: t.bank_received_title, sub: t.bank_received_sub },
    [AppState.HOOK]: { title: t.hook_title, sub: t.hook_sub },
    [AppState.BLOCKCHAIN_INTRO]: { title: t.bc_title, sub: t.bc_sub },
    [AppState.SOLANA_REVEAL]: { title: t.solana_title, sub: t.solana_sub },
    [AppState.SOLANA_SPEED]: { title: t.sol_speed_title, sub: t.sol_speed_sub },
    [AppState.SOLANA_FEE]: { title: t.sol_fee_title, sub: t.sol_fee_sub },
    [AppState.SOLANA_SMART_CONTRACTS]: { title: t.sc_title, sub: t.sc_sub },
    [AppState.SOLANA_DEFI]: { title: t.defi_title, sub: t.defi_sub },
    [AppState.SOLANA_NFT]: { title: t.nft_title, sub: t.nft_sub },
    [AppState.FINAL_REVEAL]: { title: t.why_exist_title, sub: t.why_exist_sub },
    [AppState.MEMORY_CARD]: { title: t.final_title, sub: t.final_sub },
  };

  const { title, sub } = textMap[state] || { title: '', sub: '' };

  return (
    <div id="explanation-zone" className="w-full flex flex-col items-center justify-center px-3 sm:px-6 md:px-10 text-center relative z-20 select-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={`text-${state}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col items-center justify-center w-full max-w-3xl px-1"
        >
          <h1 
            className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black font-display tracking-tight text-white leading-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)]"
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <p 
            className="text-white/95 text-sm sm:text-lg md:text-xl lg:text-2xl max-w-3xl leading-snug sm:leading-relaxed font-semibold mt-1.5 sm:mt-2.5 text-balance drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
            dangerouslySetInnerHTML={{ __html: sub }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

