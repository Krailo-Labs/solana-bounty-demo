export enum AppState {
  INTRO = 0,
  BANK_SIMPLE = 1,
  BANK_CHECK = 2,
  BANK_INSTITUTION = 3,
  BANK_FEE = 4,
  BANK_WAIT = 5,
  BANK_HUMAN = 6,
  BANK_RECEIVED = 7,
  HOOK = 8,
  BLOCKCHAIN_INTRO = 9,
  SOLANA_REVEAL = 10,
  SOLANA_SPEED = 11,
  SOLANA_FEE = 12,
  SOLANA_SMART_CONTRACTS = 13,
  SOLANA_DEFI = 14,
  SOLANA_NFT = 15,
  FINAL_REVEAL = 16,
  MEMORY_CARD = 17,
  QA_EXPLORER = 18
}

export type Language = 'en' | 'ua';
export type Speed = 0.8 | 1 | 1.25;
