const fs = require('fs');

let config = fs.readFileSync('src/layoutConfig.ts', 'utf8');

const pcHeights = {
  INTRO: 400,
  BANK_SIMPLE: 500,
  BANK_CHECK: 500,
  BANK_INSTITUTION: 500,
  BANK_FEE: 500,
  BANK_WAIT: 500,
  BANK_HUMAN: 500,
  BANK_RECEIVED: 500,
  HOOK: 500,
  BLOCKCHAIN_INTRO: 450,
  SOLANA_REVEAL: 500,
  SOLANA_SPEED: 400,
  SOLANA_FEE: 400,
  SOLANA_SMART_CONTRACTS: 450,
  SOLANA_DEFI: 480,
  SOLANA_NFT: 400,
  FINAL_REVEAL: 500,
  MEMORY_CARD: 350
};

for (const [state, height] of Object.entries(pcHeights)) {
  const regex = new RegExp(`\\[AppState\\.${state}\\]:\\s*\\{\\s*\\.\\.\\.defaultLayout,\\s*sceneClasses:\\s*'w-full max-sm:h-\\[\\d+px\\] max-sm:flex-none sm:flex-1`, 'g');
  config = config.replace(regex, `[AppState.${state}]: {\n    ...defaultLayout,\n    sceneClasses: 'w-full max-sm:h-' + config.match(new RegExp(`\\[AppState\\.${state}\\]: \\{[\\s\\S]*?max-sm:h-\\[(\\d+px)\\]`))[1] + ' max-sm:flex-none sm:h-[${height}px] sm:flex-none`);
}

fs.writeFileSync('src/layoutConfig.ts', config);
