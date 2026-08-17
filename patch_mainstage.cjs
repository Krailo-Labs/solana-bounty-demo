const fs = require('fs');
let code = fs.readFileSync('src/MainStage.tsx', 'utf8');

code = code.replace(
  /<main\s+className="[^"]+"\s*>/s,
  `<main className={slideLayoutConfig[state]?.sceneClasses || 'w-full max-sm:flex-1 sm:flex-1 relative z-10 flex items-center justify-center p-1 sm:p-2 md:p-3 overflow-visible'} style={{ transition: 'height 0.5s ease-in-out' }}>`
);

code = code.replace(
  /<div className="w-full flex-shrink-0 z-20 flex items-center justify-center pt-1 max-sm:pt-2 pb-2 sm:pt-2 sm:pb-3 relative">\s*<ExplanationZone state={state} t={t} \/>\s*<\/div>/s,
  `<div className={slideLayoutConfig[state]?.textZoneClasses || 'w-full flex-shrink-0 z-20 flex items-center justify-center pt-1 max-sm:pt-2 pb-2 sm:pt-2 sm:pb-3 relative'} style={{ transition: 'all 0.5s ease-in-out' }}>\n           <ExplanationZone state={state} t={t} />\n         </div>`
);

fs.writeFileSync('src/MainStage.tsx', code);
