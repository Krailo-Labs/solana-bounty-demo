const fs = require('fs');

let config = fs.readFileSync('src/layoutConfig.ts', 'utf8');

// Replace sm:flex-1 with sm:flex-none sm:h-[450px] globally first for default
config = config.replace(/sm:flex-1/g, 'sm:flex-none sm:h-[450px]');

// Then set specific heights
const pcHeights = {
  INTRO: 380,
  BANK_SIMPLE: 500,
  BANK_CHECK: 500,
  BANK_INSTITUTION: 500,
  BANK_FEE: 500,
  BANK_WAIT: 500,
  BANK_HUMAN: 500,
  BANK_RECEIVED: 500,
  HOOK: 450,
  BLOCKCHAIN_INTRO: 420,
  SOLANA_REVEAL: 550,
  SOLANA_SPEED: 420,
  SOLANA_FEE: 420,
  SOLANA_SMART_CONTRACTS: 460,
  SOLANA_DEFI: 480,
  SOLANA_NFT: 420,
  FINAL_REVEAL: 500,
  MEMORY_CARD: 380
};

for (const [state, height] of Object.entries(pcHeights)) {
  const regex = new RegExp(`(\\[AppState\\.${state}\\]: \\{[\\s\\S]*?sm:h-\\[)\\d+px(\\])`, 'g');
  config = config.replace(regex, `$1${height}px$2`);
}

fs.writeFileSync('src/layoutConfig.ts', config);
