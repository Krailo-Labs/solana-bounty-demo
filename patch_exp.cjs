const fs = require('fs');
let code = fs.readFileSync('src/ExplanationZone.tsx', 'utf8');

code = code.replace(
  /<motion\.div\s+key=\{`text-\$\{state\}`\}\s+initial=\{\{ opacity: 0, y: 6 \}\}\s+animate=\{\{ opacity: 1, y: 0 \}\}\s+exit=\{\{ opacity: 0, y: -6 \}\}\s+transition=\{\{ duration: 0.2 \}\}\s+className="[^"]+"/s,
  `<motion.div
          key={\`text-\${state}\`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className={slideLayoutConfig[state]?.textAlignmentClasses || 'flex flex-col items-center justify-center w-full max-w-3xl px-1 text-center'}`
);

fs.writeFileSync('src/ExplanationZone.tsx', code);
