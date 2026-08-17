import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, Building, Landmark, Clock, Monitor, 
  Image as ImageIcon, Database, Network, 
  Settings, ArrowDownToLine, ArrowUpFromLine, Percent, 
  Cpu, Zap, ShieldCheck, Layers, Coins
} from 'lucide-react';
import { AppState } from './types';

// Banking flow coordinates (calibrated for spacious layout on both mobile and desktop)
const coordsDesktop = {
  width: 1000,
  height: 280,
  sender: { x: 90, y: 140, pos: 'bottom' },
  b1: { x: 295, y: 140, pos: 'bottom' },
  ps: { x: 500, y: 140, pos: 'bottom' },
  b2: { x: 705, y: 140, pos: 'bottom' },
  receiver: { x: 910, y: 140, pos: 'bottom' },
};

const coordsMobile = {
  width: 360,
  height: 330,
  sender: { x: 75, y: 38, pos: 'bottom' },
  b1: { x: 285, y: 105, pos: 'bottom' },
  ps: { x: 75, y: 175, pos: 'bottom' },
  b2: { x: 285, y: 245, pos: 'bottom' },
  receiver: { x: 180, y: 310, pos: 'bottom' },
};

// 1. Intro Comparison Card (Slide 0)
const IntroVsPreview = ({ lang }: { lang: string }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none px-3 sm:px-6"
    >
       <div className="relative flex flex-row items-center justify-center gap-3 sm:gap-8 md:gap-14 perspective-[1200px] w-full max-w-3xl">
          {/* Traditional Bank Card */}
          <motion.div 
            initial={{ rotateY: 15, x: -20, opacity: 0 }}
            animate={{ rotateY: 8, x: 0, opacity: 1 }}
            transition={{ duration: 0.45 }}
            className="w-[145px] sm:w-[190px] md:w-[240px] h-[210px] sm:h-[240px] md:h-[290px] bg-gradient-to-br from-cyan-950/60 via-black/90 to-black border-2 border-cyan-500/40 rounded-3xl flex flex-col items-center justify-center p-3 sm:p-5 shadow-[0_15px_45px_rgba(6,182,212,0.2)] backdrop-blur-xl"
            style={{ transformStyle: 'preserve-3d' }}
          >
             <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl bg-cyan-900/50 border-2 border-cyan-400/60 flex items-center justify-center mb-2.5 sm:mb-4 shadow-[0_0_25px_rgba(6,182,212,0.4)]">
               <Building className="w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 text-cyan-300" />
             </div>
             <div className="text-cyan-300 text-xs sm:text-sm md:text-base max-sm:tracking-normal tracking-wider font-black uppercase text-center leading-tight">
               {lang === 'ua' ? 'Традиційні банки' : 'Traditional Bank'}
             </div>
             <div className="mt-2.5 text-[10px] sm:text-xs md:text-sm text-cyan-100 font-bold font-mono text-center bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-500/30">
               {lang === 'ua' ? 'Посередники • Дні' : 'Intermediaries • Days'}
             </div>
          </motion.div>

          {/* VS Hologram Badge */}
          <motion.div 
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.1, type: 'spring', damping: 12 }}
            className="z-20 w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-[#0A0A0B] border-2 sm:border-3 border-[#14F195] flex items-center justify-center shadow-[0_0_35px_rgba(20,241,149,0.6)] flex-shrink-0"
          >
             <span className="text-white text-xs sm:text-base md:text-lg font-black italic tracking-tight font-display">VS</span>
          </motion.div>

          {/* Solana Futuristic Card */}
          <motion.div 
            initial={{ rotateY: -15, x: 20, opacity: 0 }}
            animate={{ rotateY: -8, x: 0, opacity: 1 }}
            transition={{ duration: 0.45 }}
            className="w-[145px] sm:w-[190px] md:w-[240px] h-[210px] sm:h-[240px] md:h-[290px] bg-gradient-to-br from-[#14F195]/25 via-black/90 to-black border-2 border-[#14F195]/60 rounded-3xl flex flex-col items-center justify-center p-3 sm:p-5 shadow-[0_15px_45px_rgba(20,241,149,0.3)] backdrop-blur-xl"
            style={{ transformStyle: 'preserve-3d' }}
          >
             <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl bg-[#14F195]/20 border-2 border-[#14F195]/70 flex items-center justify-center mb-2.5 sm:mb-4 shadow-[0_0_30px_rgba(20,241,149,0.5)]">
               <Zap className="w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 text-[#14F195]" />
             </div>
             <div className="text-[#14F195] text-xs sm:text-sm md:text-base max-sm:tracking-normal tracking-wider font-black uppercase text-center leading-tight">
               {lang === 'ua' ? 'Мережа Solana' : 'Solana Network'}
             </div>
             <div className="mt-2.5 text-[10px] sm:text-xs md:text-sm text-[#14F195] font-bold font-mono text-center bg-black/90 px-2.5 py-1 rounded-full border border-[#14F195]/50 shadow-[0_0_15px_rgba(20,241,149,0.2)]">
               {lang === 'ua' ? '400ms • $0.00025' : '400ms • $0.00025'}
             </div>
          </motion.div>
       </div>
    </motion.div>
  );
};

// 2. Animated Flow Laser Arrows for Banking
const DynamicBankArrow = ({ start, end, active, isWait, isMobile }: any) => {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const length = Math.sqrt(dx * dx + dy * dy);
  const padding = isMobile ? 32 : 46;
  if (length < padding * 2) return null;
  
  const x1 = start.x + dx * (padding / length);
  const y1 = start.y + dy * (padding / length);
  const x2 = start.x + dx * (1 - padding / length);
  const y2 = start.y + dy * (1 - padding / length);

  return (
    <>
      {/* Background trace line */}
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(6,182,212,0.22)" strokeWidth={isMobile ? 2.5 : 3.5} strokeLinecap="round" />
      {/* Active laser line */}
      {active && (
        <motion.line
          x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="#06b6d4"
          strokeWidth={isMobile ? 3 : 4.5}
          strokeLinecap="round"
          strokeDasharray={isMobile ? "15 35" : "25 60"}
          initial={{ strokeDashoffset: 80 }}
          animate={{ strokeDashoffset: !isWait ? 0 : 80 }}
          transition={!isWait ? { repeat: Infinity, duration: 0.8, ease: "linear" } : { duration: 0 }}
          style={{ filter: "drop-shadow(0 0 8px rgba(6,182,212,0.95))" }}
        />
      )}
    </>
  );
};

// 3. User Avatar Node (Sender / Receiver)
const PersonNode = ({ label, x, y, cWidth, cHeight, active, isSolana, labelPos = 'bottom' }: any) => {
  const border = isSolana ? 'border-[#14F195] shadow-[0_0_25px_rgba(20,241,149,0.5)]' : 'border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.4)]';
  const iconCol = isSolana ? 'text-[#14F195]' : 'text-cyan-300';
  const labelBg = isSolana ? 'bg-[#14F195]/25' : 'bg-cyan-950/95';
  const labelBorder = isSolana ? 'border-[#14F195]/70' : 'border-cyan-400/80';
  const labelText = isSolana ? 'text-[#14F195]' : 'text-cyan-100';

  const leftPercent = `${(x / cWidth) * 100}%`;
  const topPercent = `${(y / cHeight) * 100}%`;

  return (
    <motion.div 
      className="absolute flex flex-col items-center justify-center pointer-events-none -translate-x-1/2 -translate-y-1/2"
      style={{ left: leftPercent, top: topPercent, zIndex: 30 }}
      animate={{ opacity: active ? 1 : 0.4 }}
    >
      {labelPos === 'top' && (
        <div className={`mb-2 text-xs sm:text-sm md:text-base font-black max-sm:tracking-normal tracking-wider uppercase px-3 py-1 rounded-xl border shadow-xl ${labelBg} ${labelBorder} ${labelText} max-sm:whitespace-normal max-sm:break-words text-center leading-tight`}>
          {label}
        </div>
      )}
      <div className={`w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-black/90 border-2 sm:border-3 ${border} rounded-2xl sm:rounded-3xl flex items-center justify-center backdrop-blur-md transition-all duration-300`}>
        <User className={`w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 ${iconCol}`} />
      </div>
      {labelPos === 'bottom' && (
        <div className={`mt-2 text-xs sm:text-sm md:text-base font-black max-sm:tracking-normal tracking-wider uppercase px-3 py-1 rounded-xl border shadow-xl ${labelBg} ${labelBorder} ${labelText} max-sm:whitespace-normal max-sm:break-words text-center leading-tight`}>
          {label}
        </div>
      )}
    </motion.div>
  );
};

// 4. Banking Intermediary Card
const BankCard = ({ label, icon: Icon, x, y, cWidth, cHeight, active, highlight, colorHint, labelPos = 'bottom' }: any) => {
  let theme = {
    bg: 'bg-black/80',
    border: 'border-white/20',
    icon: 'text-white/40',
    labelBg: 'bg-black/90',
    labelBorder: 'border-white/20',
    labelText: 'text-white/60'
  };

  if (active) {
    if (colorHint === 'blue') {
      theme = { bg: 'bg-cyan-950/80', border: 'border-cyan-400', icon: 'text-cyan-300', labelBg: 'bg-cyan-950', labelBorder: 'border-cyan-400', labelText: 'text-cyan-100' };
    } else if (colorHint === 'purple') {
      theme = { bg: 'bg-purple-950/80', border: 'border-purple-400', icon: 'text-purple-300', labelBg: 'bg-purple-950', labelBorder: 'border-purple-400', labelText: 'text-purple-100' };
    } else if (colorHint === 'amber') {
      theme = { bg: 'bg-amber-950/80', border: 'border-amber-400', icon: 'text-amber-300', labelBg: 'bg-amber-950', labelBorder: 'border-amber-400', labelText: 'text-amber-100' };
    }
  }

  if (highlight) {
    theme = { bg: 'bg-red-950/90', border: 'border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.6)]', icon: 'text-red-400', labelBg: 'bg-red-950', labelBorder: 'border-red-400', labelText: 'text-red-100' };
  }

  const leftPercent = `${(x / cWidth) * 100}%`;
  const topPercent = `${(y / cHeight) * 100}%`;

  return (
    <motion.div 
      className="absolute flex flex-col items-center justify-center pointer-events-none -translate-x-1/2 -translate-y-1/2"
      style={{ left: leftPercent, top: topPercent, zIndex: active ? 25 : 10 }}
      animate={{ opacity: active ? 1 : 0.4, scale: highlight ? 1.08 : 1 }}
    >
      {labelPos === 'top' && (
        <div className={`mb-2 text-xs sm:text-sm md:text-base font-black max-sm:tracking-normal tracking-wider uppercase px-3 py-1 rounded-xl border shadow-xl ${theme.labelBg} ${theme.labelBorder} ${theme.labelText} max-sm:whitespace-normal max-sm:break-words text-center leading-tight`}>
          {label}
        </div>
      )}
      <div className={`w-13 h-13 sm:w-16 sm:h-16 md:w-20 md:h-20 flex flex-col items-center justify-center border-2 sm:border-3 ${theme.border} ${theme.bg} backdrop-blur-xl rounded-2xl sm:rounded-3xl transition-all duration-300 shadow-xl`}>
        <Icon className={`w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 ${theme.icon}`} />
      </div>
      {labelPos === 'bottom' && (
        <div className={`mt-2 text-xs sm:text-sm md:text-base font-black max-sm:tracking-normal tracking-wider uppercase px-3 py-1 rounded-xl border shadow-xl ${theme.labelBg} ${theme.labelBorder} ${theme.labelText} max-sm:whitespace-normal max-sm:break-words text-center leading-tight`}>
          {label}
        </div>
      )}
    </motion.div>
  );
};

// 5. Blockchain Shared Notebook / Ledger Slide (Slide 9: BLOCKCHAIN_INTRO)
const BlockchainLedgerSlide = ({ isMobile, lang }: { isMobile: boolean, lang: string }) => {
  const nodeCities = lang === 'ua' ? [
    { city: 'Київ', label: 'Копія книги #1' },
    { city: 'Варшава', label: 'Копія книги #2' },
    { city: 'Токіо', label: 'Копія книги #3' },
    { city: 'Сідней', label: 'Копія книги #4' },
    { city: 'Лондон', label: 'Копія книги #5' },
    { city: 'Нью-Йорк', label: 'Копія книги #6' },
  ] : [
    { city: 'Kyiv', label: 'Ledger Copy #1' },
    { city: 'Warsaw', label: 'Ledger Copy #2' },
    { city: 'Tokyo', label: 'Ledger Copy #3' },
    { city: 'Sydney', label: 'Ledger Copy #4' },
    { city: 'London', label: 'Ledger Copy #5' },
    { city: 'New York', label: 'Ledger Copy #6' },
  ];

  const nodeCount = 6;
  const radiusX = isMobile ? 142 : 270;
  const radiusY = isMobile ? 96 : 132;

  // Calculate coordinates for all nodes
  const nodeCoords = nodeCities.map((_, i) => {
    const angle = (i * (360 / nodeCount) - 90) * (Math.PI / 180);
    return {
      x: Math.cos(angle) * radiusX,
      y: Math.sin(angle) * radiusY,
    };
  });
  
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }} 
      animate={{ opacity: 1, scale: 1 }} 
      exit={{ opacity: 0, scale: 0.95 }} 
      className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none px-2"
    >
      <div className="relative w-full max-w-4xl h-[280px] sm:h-[320px] md:h-[360px] flex items-center justify-center">
        {/* Full Peer-to-Peer Interconnected Mesh Lines */}
        <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none" style={{ zIndex: 10 }}>
          {/* 1. Outer Ring & Peer Connections between all nodes */}
          {nodeCoords.map((c1, i) =>
            nodeCoords.map((c2, j) => {
              if (i >= j) return null;
              const isAdjacent = (j === i + 1) || (i === 0 && j === nodeCount - 1);
              return (
                <g key={`peer-${i}-${j}`}>
                  <line 
                    x1={`calc(50% + ${c1.x}px)`} y1={`calc(50% + ${c1.y}px)`} 
                    x2={`calc(50% + ${c2.x}px)`} y2={`calc(50% + ${c2.y}px)`} 
                    stroke={isAdjacent ? "rgba(6,182,212,0.35)" : "rgba(6,182,212,0.15)"} 
                    strokeWidth={isAdjacent ? "1.5" : "1"} 
                    strokeDasharray={isAdjacent ? "4 4" : "2 4"} 
                  />
                  {isAdjacent && (
                    <motion.line 
                      x1={`calc(50% + ${c1.x}px)`} y1={`calc(50% + ${c1.y}px)`} 
                      x2={`calc(50% + ${c2.x}px)`} y2={`calc(50% + ${c2.y}px)`} 
                      stroke="#06b6d4" 
                      strokeWidth="2" 
                      strokeDasharray="8 24"
                      initial={{ strokeDashoffset: 32 }}
                      animate={{ strokeDashoffset: 0 }}
                      transition={{ repeat: Infinity, duration: 1.2, ease: "linear", delay: i * 0.15 }}
                      style={{ filter: "drop-shadow(0 0 4px rgba(6,182,212,0.8))" }}
                    />
                  )}
                </g>
              );
            })
          )}

          {/* 2. Spoke lines connecting central hub to each node */}
          {nodeCoords.map((c, i) => (
            <g key={`hub-${i}`}>
              <line 
                x1="50%" y1="50%" 
                x2={`calc(50% + ${c.x}px)`} y2={`calc(50% + ${c.y}px)`} 
                stroke="rgba(6,182,212,0.25)" strokeWidth="1.5" strokeDasharray="3 3" 
              />
              <motion.line 
                x1="50%" y1="50%" 
                x2={`calc(50% + ${c.x}px)`} y2={`calc(50% + ${c.y}px)`} 
                stroke="#14F195" strokeWidth="2.5" strokeDasharray="10 30"
                initial={{ strokeDashoffset: 40 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ repeat: Infinity, duration: 0.9, ease: "linear", delay: i * 0.1 }}
                style={{ filter: "drop-shadow(0 0 5px rgba(20,241,149,0.9))" }}
              />
            </g>
          ))}
        </svg>

        {/* Compact, Neat Pulsing Central Hub */}
        <div className="relative flex flex-col items-center justify-center z-30 pointer-events-none">
          <div className="w-18 h-18 sm:w-22 sm:h-22 md:w-26 md:h-26 rounded-2xl bg-cyan-950/95 border-2 border-cyan-400 flex flex-col items-center justify-center shadow-[0_0_40px_rgba(6,182,212,0.5)] backdrop-blur-xl p-1.5">
             <Database className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-cyan-300 mb-0.5 drop-shadow-[0_0_10px_rgba(6,182,212,0.9)]" />
             <div className="text-[8px] sm:text-[10px] md:text-xs font-black text-cyan-100 uppercase max-sm:tracking-normal tracking-wider bg-cyan-900/90 px-1.5 py-0.5 rounded max-sm:whitespace-normal max-sm:break-words text-center leading-tight">
               {lang === 'ua' ? 'СПІЛЬНА КНИГА' : 'SHARED BOOK'}
             </div>
          </div>
          <div className="mt-1 text-cyan-200 text-[8px] sm:text-[9px] md:text-[11px] font-bold uppercase max-sm:tracking-normal tracking-wider bg-black/90 px-2 sm:px-2.5 py-0.5 rounded-full border border-cyan-400/50 shadow-md max-sm:whitespace-normal max-sm:break-words text-center leading-tight">
            {lang === 'ua' ? 'Один запис для всіх' : 'Same record for all'}
          </div>
        </div>

        {/* Orbiting Ledger Copy Nodes with Extra Wide Spacing */}
        {nodeCities.map((item, i) => {
          const { x, y } = nodeCoords[i];

          return (
            <div 
              key={i}
              className="absolute z-20 flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2"
              style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-2xl bg-black/95 border-2 border-cyan-400/80 flex flex-col items-center justify-center shadow-[0_0_18px_rgba(6,182,212,0.4)] backdrop-blur-md">
                <Monitor className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-cyan-300" />
                <div className="text-[7px] sm:text-[8px] font-mono font-bold text-cyan-300 leading-none mt-0.5">{item.city}</div>
              </div>
              <div className="mt-0.5 text-[7px] sm:text-[8px] md:text-[9px] font-black text-cyan-100 uppercase max-sm:tracking-normal tracking-wider bg-black/90 px-1.5 py-0.5 rounded border border-cyan-500/40 max-sm:whitespace-normal max-sm:break-words text-center leading-tight shadow-sm">
                {item.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Helpful Concept Badge */}
      <div className="mt-1 bg-cyan-950/80 border border-cyan-400/50 px-3 py-1 rounded-full backdrop-blur-md shadow-lg">
        <span className="text-cyan-200 text-[9px] sm:text-xs md:text-sm font-bold">
          {lang === 'ua' ? '📖 Сторінка миттєво оновлюється на всіх комп\'ютерах одночасно' : '📖 Page updates identically across all computers worldwide simultaneously'}
        </span>
      </div>
    </motion.div>
  );
};

// 6. Live Solana Validator Network Slide (Slide 10: SOLANA_REVEAL)
const SolanaNetworkSlide = ({ isMobile, lang }: { isMobile: boolean, lang: string }) => {
  const nodes = isMobile ? [
    { x: '16%', y: '22%', name: 'Комп\'ютер 1 (ЄС)', role: 'Перевірка балансу' },
    { x: '84%', y: '22%', name: 'Комп\'ютер 2 (США)', role: 'Захист від підробки' },
    { x: '16%', y: '78%', name: 'Комп\'ютер 3 (Азія)', role: 'Запис переказу' },
    { x: '84%', y: '78%', name: 'Комп\'ютер 4 (Австралія)', role: 'Миттєва згода' },
    { x: '50%', y: '50%', name: 'СПІЛЬНИЙ КОНСЕНСУС', role: '2,000+ комп\'ютерів' },
  ] : [
    { x: '15%', y: '24%', name: 'Комп\'ютер 1 (Європа)', role: 'Перевіряє баланс відправника' },
    { x: '50%', y: '16%', name: 'Комп\'ютер 2 (США)', role: 'Захищає від повторних витрат' },
    { x: '85%', y: '24%', name: 'Комп\'ютер 3 (Азія)', role: 'Записує в історію транзакцій' },
    { x: '22%', y: '76%', name: 'Комп\'ютер 4 (Бразилія)', role: 'Підтверджує відсутність шахрайства' },
    { x: '78%', y: '76%', name: 'Комп\'ютер 5 (Австралія)', role: 'Дає миттєве підтвердження' },
  ];

  const centerTitle = lang === 'ua' ? 'КОЛЕКТИВНА ЗГОДА' : 'COLLECTIVE CONSENSUS';
  const centerSub = lang === 'ua' ? '2,000+ комп\'ютерів без директора' : '2,000+ independent computers';

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none px-2"
    >
      <div className="relative w-full h-full max-w-4xl mx-auto">
        {/* Neon Mesh Network Lines */}
        <svg className="absolute inset-0 w-full h-full overflow-visible">
          {nodes.map((n1, i) =>
            nodes.slice(i + 1).map((n2, j) => (
              <motion.line 
                key={`${i}-${j}`}
                x1={n1.x} y1={n1.y} x2={n2.x} y2={n2.y}
                stroke="rgba(20,241,149,0.3)"
                strokeWidth="2"
                strokeDasharray="5 7"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              />
            ))
          )}
        </svg>

        {/* Live Active PC Validator Nodes */}
        {nodes.map((node, i) => {
          const isCenter = node.x === '50%' && node.y === '50%';
          return (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.08, type: 'spring' }}
              className="absolute flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2"
              style={{ left: node.x, top: node.y, zIndex: isCenter ? 30 : 20 }}
            >
              <div className={`relative ${isCenter ? 'w-[130px] sm:w-[150px] md:w-[180px] h-[100px] sm:h-[88px] md:h-[100px] border-3 border-[#14F195] bg-[#14F195]/20' : 'w-[120px] sm:w-[135px] md:w-[165px] h-[90px] sm:h-[80px] md:h-[92px] border-2 sm:border-3 border-[#14F195]/70 bg-black/90'} rounded-2xl flex flex-col items-center justify-center p-2 shadow-[0_0_30px_rgba(20,241,149,0.4)] backdrop-blur-xl`}>
                <div className="absolute top-2 right-2 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#14F195] animate-ping" />
                  <span className="w-2 h-2 rounded-full bg-[#14F195]" />
                </div>
                <Cpu className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#14F195] mb-0.5 drop-shadow-[0_0_10px_rgba(20,241,149,0.9)]" />
                <div className="text-[9px] sm:text-xs md:text-sm font-black text-white max-sm:tracking-normal tracking-wider uppercase font-mono text-center">
                  {isCenter ? centerTitle : node.name}
                </div>
                <div className="text-[8px] sm:text-[10px] md:text-xs text-[#14F195] font-mono font-bold mt-0.5 text-center ">
                  {isCenter ? centerSub : node.role}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Role Comparison Banner */}
      <div className="mt-1 bg-black/90 border-2 border-[#14F195]/60 px-4 py-1.5 rounded-2xl shadow-xl flex items-center gap-2 z-30">
        <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#14F195] flex-shrink-0" />
        <span className="text-white font-extrabold text-[10px] sm:text-xs md:text-sm">
          {lang === 'ua' ? '💡 Замість 1 банку з директорами — тисячі комп\'ютерів перевіряють один одного!' : '💡 Instead of 1 bank with managers — thousands of computers check each other with 100% honesty!'}
        </span>
      </div>
    </motion.div>
  );
};

// 7. Breathtaking 3D Solana Transaction Architecture (Slide 11: SOLANA_SPEED)
const SolanaSpeedVisual = ({ isMobile, lang }: { isMobile: boolean, lang: string }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }} 
      animate={{ opacity: 1, scale: 1 }} 
      exit={{ opacity: 0, scale: 0.95 }} 
      className="relative w-full h-full max-w-5xl mx-auto flex flex-col items-center justify-center pointer-events-none px-2 perspective-[1400px]"
    >
      {/* 3D Kinetic Highway Container */}
      <div 
        className="relative w-full flex flex-col items-center justify-center"
        style={{ transformStyle: 'preserve-3d', transform: isMobile ? 'rotateX(6deg)' : 'rotateX(12deg)' }}
      >
        {/* 4 Crystal-Clear Intuitive Symmetrical Pipeline Steps */}
        <div className="w-full flex items-center justify-between gap-1 sm:gap-2.5 md:gap-4 max-w-4xl mb-2 sm:mb-3 md:mb-4 px-1 z-30">
          
          {/* Step 1: Sender Intent */}
          <div className="flex-1 min-w-0 flex flex-col items-center justify-center bg-black/90 border-2 border-cyan-400 rounded-2xl p-1 max-sm:px-0.5 sm:p-2.5 md:p-3 shadow-[0_0_20px_rgba(6,182,212,0.3)] backdrop-blur-xl">
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl bg-cyan-950/90 border border-cyan-400 flex items-center justify-center mb-1">
              <User className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-cyan-300" />
            </div>
            <div className="text-cyan-200 text-[7px] sm:text-xs md:text-sm font-black uppercase max-sm:tracking-normal tracking-wider text-center w-full">
              {lang === 'ua' ? '1. Ти надсилаєш' : '1. You Send'}
            </div>
            <div className="text-cyan-400 text-[7px] sm:text-[9px] md:text-[10px] font-mono font-bold mt-0.5 max-sm:whitespace-normal max-sm:break-words text-center leading-tight">
              $1,000
            </div>
          </div>

          {/* Flowing Connector Arrow */}
          <div className="flex-shrink-0 flex items-center px-0.5">
            <Zap className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-[#14F195] animate-pulse" />
          </div>

          {/* Step 2: Instant Direct Transmission */}
          <div className="flex-1 min-w-0 flex flex-col items-center justify-center bg-gradient-to-b from-[#14F195]/20 to-black/95 border-2 border-[#14F195] rounded-2xl p-1 max-sm:px-0.5 sm:p-2.5 md:p-3 shadow-[0_0_35px_rgba(20,241,149,0.4)] backdrop-blur-xl relative overflow-hidden">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl bg-black/90 border-2 border-[#14F195] flex items-center justify-center mb-1 shadow-[0_0_15px_rgba(20,241,149,0.8)]"
            >
              <Cpu className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#14F195]" />
            </motion.div>
            <div className="text-[#14F195] text-[7px] sm:text-xs md:text-sm font-black uppercase max-sm:tracking-normal tracking-wider text-center w-full">
              {lang === 'ua' ? '2. Без черги' : '2. Direct Pickup'}
            </div>
            <div className="text-emerald-300 text-[7px] sm:text-[8px] md:text-[10px] font-mono font-bold mt-0.5 bg-[#14F195]/20 px-1 py-0.5 rounded text-center max-sm:whitespace-normal max-sm:break-words text-center leading-tight">
              {lang === 'ua' ? 'Пряма передача' : 'No Waiting'}
            </div>
          </div>

          {/* Flowing Connector Arrow */}
          <div className="flex-shrink-0 flex items-center px-0.5">
            <Zap className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-[#14F195] animate-pulse" />
          </div>

          {/* Step 3: Collective Confirmation */}
          <div className="flex-1 min-w-0 flex flex-col items-center justify-center bg-black/90 border-2 border-purple-400 rounded-2xl p-1 max-sm:px-0.5 sm:p-2.5 md:p-3 shadow-[0_0_20px_rgba(168,85,247,0.3)] backdrop-blur-xl">
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl bg-purple-950/90 border border-purple-400 flex items-center justify-center mb-1">
              <Network className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-purple-300" />
            </div>
            <div className="text-purple-200 text-[7px] sm:text-xs md:text-sm font-black uppercase max-sm:tracking-normal tracking-wider text-center w-full">
              {lang === 'ua' ? '3. Комп\'ютери' : '3. Computers'}
            </div>
            <div className="text-purple-300 text-[7px] sm:text-[9px] md:text-[10px] font-mono font-bold mt-0.5 text-center max-sm:whitespace-normal max-sm:break-words text-center leading-tight">
              {lang === 'ua' ? '0.4с згода' : '0.4s verify'}
            </div>
          </div>

          {/* Flowing Connector Arrow */}
          <div className="flex-shrink-0 flex items-center px-0.5">
            <Zap className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-[#14F195] animate-pulse" />
          </div>

          {/* Step 4: Instant Arrival */}
          <div className="flex-1 min-w-0 flex flex-col items-center justify-center bg-black/90 border-2 border-[#14F195] rounded-2xl p-1 max-sm:px-0.5 sm:p-2.5 md:p-3 shadow-[0_0_25px_rgba(20,241,149,0.35)] backdrop-blur-xl">
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl bg-emerald-950/90 border border-[#14F195] flex items-center justify-center mb-1">
              <Coins className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#14F195]" />
            </div>
            <div className="text-[#14F195] text-[7px] sm:text-xs md:text-sm font-black uppercase max-sm:tracking-normal tracking-wider text-center w-full">
              {lang === 'ua' ? '4. Отримувач' : '4. Received'}
            </div>
            <div className="text-emerald-300 text-[7px] sm:text-[9px] md:text-[10px] font-mono font-black mt-0.5 max-sm:whitespace-normal max-sm:break-words text-center leading-tight">
              $1,000 OK
            </div>
          </div>

        </div>

        {/* 3D High-Speed Non-Stop Continuous Laser Pulse Stream */}
        <div className="relative w-full max-w-4xl h-11 sm:h-14 md:h-16 flex items-center justify-center my-1 sm:my-1.5 z-20 overflow-hidden rounded-2xl bg-black/60 border border-[#14F195]/40 backdrop-blur-md px-3 sm:px-4">
          <div className="absolute inset-x-0 h-1 sm:h-1.5 bg-gradient-to-r from-cyan-400 via-[#14F195] to-emerald-400 shadow-[0_0_25px_rgba(20,241,149,1)]" />
          
          {/* Continuous High-Speed Non-Stop Laser Pulse 1 */}
          <motion.div 
            animate={{ left: ['-20%', '120%'] }}
            transition={{ repeat: Infinity, duration: 1.1, ease: "linear" }}
            className="absolute top-1/2 -translate-y-1/2 w-24 sm:w-36 h-3.5 sm:h-5 rounded-full bg-white shadow-[0_0_25px_#fff,0_0_45px_#14F195]"
          />

          {/* Continuous High-Speed Non-Stop Laser Pulse 2 (Staggered) */}
          <motion.div 
            animate={{ left: ['-20%', '120%'] }}
            transition={{ repeat: Infinity, duration: 1.1, ease: "linear", delay: 0.55 }}
            className="absolute top-1/2 -translate-y-1/2 w-20 sm:w-28 h-3 sm:h-4 rounded-full bg-[#14F195] shadow-[0_0_20px_#14F195,0_0_40px_#06b6d4]"
          />

          {/* Speed Indicator Badge in Center */}
          <div className="relative z-30 bg-black/90 border border-[#14F195] px-2.5 py-1 sm:px-3 rounded-full text-[#14F195] font-black text-[9px] sm:text-xs uppercase tracking-widest flex items-center gap-1.5 shadow-lg">
            <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#14F195] animate-bounce" />
            <span>{lang === 'ua' ? 'ПРЯМА ШВИДКІСНА МАГІСТРАЛЬ' : 'HIGH-SPEED DIGITAL HIGHWAY'}</span>
          </div>
        </div>

        {/* Live Network Metrics Badges */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-3 md:gap-4 mt-1.5 sm:mt-2.5 z-30">
          <div className="bg-black/95 border-2 border-[#14F195] px-2.5 py-1 sm:px-4 sm:py-1.5 md:px-5 md:py-2 rounded-2xl shadow-[0_0_30px_rgba(20,241,149,0.5)] flex items-center gap-1.5 sm:gap-2">
            <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#14F195] animate-bounce flex-shrink-0" />
            <span className="text-white font-black text-[10px] sm:text-xs md:text-sm lg:text-base max-sm:tracking-normal tracking-wider uppercase font-mono max-sm:whitespace-normal max-sm:break-words text-center leading-tight">
              {lang === 'ua' ? 'МИТТЄВИЙ ПЕРЕКАЗ' : 'INSTANT FINALITY'}
            </span>
          </div>

          <div className="bg-black/95 border-2 border-cyan-400 px-2.5 py-1 sm:px-4 sm:py-1.5 md:px-5 md:py-2 rounded-2xl shadow-[0_0_25px_rgba(6,182,212,0.4)] flex items-center gap-1.5 sm:gap-2">
            <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-cyan-300 flex-shrink-0" />
            <span className="text-cyan-200 font-extrabold text-[10px] sm:text-xs md:text-sm lg:text-base max-sm:tracking-normal tracking-wider uppercase font-mono max-sm:whitespace-normal max-sm:break-words text-center leading-tight">
              {lang === 'ua' ? 'БЕЗ БАНКІВСЬКИХ ЧЕРГ' : 'ZERO WAITING QUEUES'}
            </span>
          </div>

          <div className="bg-black/95 border-2 border-yellow-400 px-2.5 py-1 sm:px-4 sm:py-1.5 md:px-5 md:py-2 rounded-2xl shadow-[0_0_25px_rgba(250,204,21,0.4)] flex items-center gap-1.5 sm:gap-2">
            <Percent className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-yellow-400 flex-shrink-0" />
            <span className="text-yellow-300 font-extrabold text-[10px] sm:text-xs md:text-sm lg:text-base max-sm:tracking-normal tracking-wider uppercase font-mono max-sm:whitespace-normal max-sm:break-words text-center leading-tight">
              {lang === 'ua' ? 'КОМІСІЯ: ~$0.00025' : 'FEE: ~$0.00025'}
            </span>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

// 8. Solana Low Fee Visual (Slide 12: SOLANA_FEE)
const SolanaFeeVisual = ({ isMobile, lang }: { isMobile: boolean, lang: string }) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none px-4">
      <div className="flex flex-col items-center justify-center gap-3 sm:gap-5">
        {/* 100% Value Delivered */}
        <div className="w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-3xl bg-gradient-to-br from-[#14F195]/25 via-black/90 to-black border-3 sm:border-4 border-[#14F195] flex flex-col items-center justify-center shadow-[0_0_60px_rgba(20,241,149,0.5)] backdrop-blur-xl">
           <Coins className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-[#14F195] mb-1.5 drop-shadow-[0_0_20px_rgba(20,241,149,0.9)]" />
           <div className="text-white font-black text-2xl sm:text-3xl md:text-4xl max-sm:tracking-normal tracking-wider font-display">$1,000</div>
           <div className="text-[#14F195] font-black text-xs sm:text-sm md:text-base uppercase tracking-widest mt-1">
             {lang === 'ua' ? '100% ДОСТАВЛЕНО' : '100% DELIVERED'}
           </div>
        </div>

        {/* Floating Fee Badge */}
        <motion.div 
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: [0, 4, 0], opacity: 1 }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="bg-black/95 border-2 border-yellow-400 px-4 py-2 sm:px-6 sm:py-2.5 rounded-full shadow-[0_0_30px_rgba(250,204,21,0.5)] flex items-center gap-2.5"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-pulse flex-shrink-0" />
          <span className="text-yellow-300 font-black text-xs sm:text-sm md:text-base font-mono max-sm:whitespace-normal max-sm:break-words text-center leading-tight">
            {lang === 'ua' ? 'Комісія мережі: ~$0.00025 (частка цента)' : 'Network Fee: ~$0.00025 (fraction of a cent)'}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
};

// 9. Smart Contracts 3D Visual (Slide 13: SOLANA_SMART_CONTRACTS)
const SmartContractVisual: React.FC<{ lang: string }> = ({ lang }) => (
  <motion.div
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0.9, opacity: 0 }}
    className="absolute inset-0 flex items-center justify-center z-40 perspective-[1500px] pointer-events-none"
  >
    <div className="relative flex flex-col items-center justify-center" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(15deg)' }}>
      <motion.div 
        animate={{ rotateY: 360 }} 
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="relative w-52 h-52 sm:w-68 sm:h-68 md:w-84 md:h-84 rounded-full border-3 border-purple-500/60 bg-gradient-to-tr from-purple-900/30 via-black/50 to-purple-500/20 shadow-[0_0_70px_rgba(168,85,247,0.4)] flex items-center justify-center"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="w-36 h-36 sm:w-42 sm:h-42 md:w-50 md:h-50 rounded-3xl bg-black/95 border-3 border-purple-400 flex flex-col items-center justify-center shadow-[0_0_45px_rgba(168,85,247,0.7)] backdrop-blur-2xl" style={{ transform: 'translateZ(30px)' }}>
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 6, ease: "linear" }}>
            <Settings className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.9)]" />
          </motion.div>
          <div className="mt-2 text-purple-200 font-black text-[10px] sm:text-xs md:text-sm max-sm:tracking-normal tracking-wider uppercase">
            {lang === 'ua' ? 'АВТОМАТИЧНИЙ КОД' : 'AUTOMATED CODE'}
          </div>
        </div>

        <div className="absolute -top-5 sm:-top-6 left-1/2 -translate-x-1/2 bg-purple-950 border-2 border-purple-400 px-3.5 py-1 rounded-full text-[10px] sm:text-xs md:text-sm text-purple-200 font-extrabold uppercase shadow-xl w-[120px] text-center max-sm:whitespace-normal max-sm:break-words">
          {lang === 'ua' ? 'Умова (Input)' : 'Condition (Input)'}
        </div>
        <div className="absolute -bottom-5 sm:-bottom-6 left-1/2 -translate-x-1/2 bg-[#14F195]/25 border-2 border-[#14F195] px-3.5 py-1 rounded-full text-[10px] sm:text-xs md:text-sm text-[#14F195] font-extrabold uppercase shadow-xl w-[120px] text-center max-sm:whitespace-normal max-sm:break-words">
          {lang === 'ua' ? 'Виконано (Execution)' : 'Execution (Done)'}
        </div>
      </motion.div>
    </div>
  </motion.div>
);

// 10. DeFi 3D Visual (Slide 14: SOLANA_DEFI)
const DeFiVisual: React.FC<{ lang: string }> = ({ lang }) => (
  <motion.div
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0.9, opacity: 0 }}
    className="absolute inset-0 flex items-center justify-center z-40 perspective-[1200px] pointer-events-none"
  >
    <div className="relative flex flex-col items-center justify-center" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(28deg)' }}>
      <motion.div 
        animate={{ rotateZ: 360 }} 
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
        className="relative w-52 h-52 sm:w-70 sm:h-70 md:w-88 md:h-88 rounded-full border-3 sm:border-4 border-blue-500/50 bg-blue-950/25 shadow-[0_0_70px_rgba(59,130,246,0.35)] flex items-center justify-center"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-blue-950 border-3 sm:border-4 border-blue-400 rounded-full flex flex-col items-center justify-center shadow-[0_0_50px_rgba(59,130,246,0.9)] z-10" style={{ transform: 'rotateX(-28deg)' }}>
           <Landmark className="w-10 h-10 sm:w-13 sm:h-13 md:w-16 md:h-16 text-blue-300 drop-shadow-[0_0_15px_rgba(59,130,246,0.9)]" />
           <div className="text-[9px] sm:text-xs md:text-sm font-black text-blue-100 uppercase tracking-widest mt-1 max-sm:whitespace-normal max-sm:break-words text-center leading-tight">
             {lang === 'ua' ? 'ПУЛ ЛІКВІДНОСТІ' : 'LIQUIDITY POOL'}
           </div>
        </div>

        {[0, 60, 120, 180, 240, 300].map((deg, i) => (
          <div 
            key={i} 
            className="absolute top-1/2 left-1/2"
            style={{ transform: `translate(-50%, -50%) rotate(${deg}deg) translateY(-95px)` }}
          >
            <div className="p-2 sm:p-2.5 rounded-2xl bg-black/90 border-2 border-blue-400 shadow-xl" style={{ transform: 'rotateX(-28deg)' }}>
              {i % 2 === 0 ? (
                <ArrowDownToLine className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
              ) : (
                <ArrowUpFromLine className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
              )}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  </motion.div>
);

// 11. NFT 3D Visual (Slide 15: SOLANA_NFT)
const NFTVisual: React.FC<{ lang: string }> = ({ lang }) => (
  <motion.div
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0.9, opacity: 0 }}
    className="absolute inset-0 flex items-center justify-center z-40 perspective-[1200px] pointer-events-none"
  >
    <div className="relative flex flex-col items-center" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(10deg)' }}>
      <motion.div 
        animate={{ rotateY: 360, y: [-8, 8, -8] }}
        transition={{ rotateY: { repeat: Infinity, duration: 8, ease: "linear" }, y: { repeat: Infinity, duration: 4, ease: "easeInOut" } }}
        className="w-34 h-48 sm:w-46 sm:h-62 md:w-56 md:h-74 bg-gradient-to-br from-amber-500/35 via-black/90 to-black border-3 border-amber-400/80 rounded-3xl flex flex-col items-center justify-center p-3 sm:p-4 shadow-[0_0_60px_rgba(251,191,36,0.5)] backdrop-blur-xl z-20"
        style={{ transformStyle: 'preserve-3d' }}
      >
         <div className="w-full h-full border-2 border-amber-500/50 rounded-2xl flex flex-col items-center justify-center bg-black/70 relative overflow-hidden p-3 text-center">
            <ImageIcon className="w-12 h-12 sm:w-16 sm:h-16 md:w-22 md:h-22 text-amber-400 mb-2 drop-shadow-[0_0_20px_rgba(251,191,36,0.95)]" />
            <div className="text-amber-200 text-[10px] sm:text-xs md:text-sm font-black max-sm:tracking-normal tracking-wider uppercase leading-tight">
              {lang === 'ua' ? 'ПІДТВЕРДЖЕНА ВЛАСНІСТЬ' : 'VERIFIED OWNERSHIP'}
            </div>
            <div className="text-amber-400 font-mono text-[9px] sm:text-[10px] md:text-xs mt-1.5 font-bold">#SOL-NFT-9842</div>
         </div>
      </motion.div>

      {/* Holographic Pedestal */}
      <div className="mt-4 sm:mt-6 relative w-44 h-12 sm:w-64 sm:h-16 flex items-center justify-center">
        <div className="absolute inset-0 bg-amber-950/90 border-2 sm:border-3 border-amber-500/70 rounded-[100%] shadow-[0_0_50px_rgba(251,191,36,0.5)] flex items-center justify-center" style={{ transform: 'rotateX(75deg)' }}>
           <div className="w-3/4 h-3/4 rounded-[100%] border-2 border-amber-400/60 shadow-[inset_0_0_20px_rgba(251,191,36,0.7)]" />
        </div>
      </div>
    </div>
  </motion.div>
);

// 12. Why Does Solana Exist 3D Grand Kinetic Reactor (Slide 16: FINAL_REVEAL)
const WhyExistVisual: React.FC<{ lang: string }> = ({ lang }) => {
  const labels = lang === 'ua' ? [
    { title: 'ПРЯМИЙ ОБМІН P2P', sub: 'Без черг та затримок', icon: Zap, col: 'text-[#14F195]', border: 'border-[#14F195]', bg: 'bg-[#14F195]/15' },
    { title: 'БЕЗ ПОСЕРЕДНИКІВ', sub: 'Виключення банківських комісій', icon: ShieldCheck, col: 'text-cyan-400', border: 'border-cyan-400', bg: 'bg-cyan-900/25' },
    { title: 'СПІЛЬНА ДОВІРА', sub: 'Глобальний консенсус мережі', icon: Layers, col: 'text-purple-400', border: 'border-purple-400', bg: 'bg-purple-900/25' },
  ] : [
    { title: 'DIRECT P2P EXCHANGE', sub: 'Zero lines, instant settlement', icon: Zap, col: 'text-[#14F195]', border: 'border-[#14F195]', bg: 'bg-[#14F195]/15' },
    { title: 'ZERO MIDDLEMEN', sub: 'Eliminating toll-booth fees', icon: ShieldCheck, col: 'text-cyan-400', border: 'border-cyan-400', bg: 'bg-cyan-900/25' },
    { title: 'SHARED TRUST', sub: 'Global cryptographic consensus', icon: Layers, col: 'text-purple-400', border: 'border-purple-400', bg: 'bg-purple-900/25' },
  ];

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      className="absolute inset-0 flex items-center justify-center z-40 perspective-[1500px] pointer-events-none px-3"
    >
      <div className="relative w-full max-w-4xl h-full flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-8 md:gap-10">
        {/* Kinetic Gyro Core */}
        <div className="relative w-26 h-26 sm:w-40 sm:h-40 md:w-56 md:h-56 flex items-center justify-center flex-shrink-0" style={{ transformStyle: 'preserve-3d' }}>
          <motion.div 
            animate={{ rotateX: 360, rotateY: 360 }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="absolute inset-0 rounded-full border-2 border-[#14F195]/50 shadow-[0_0_40px_rgba(20,241,149,0.35)]"
            style={{ transformStyle: 'preserve-3d' }}
          />
          <motion.div 
            animate={{ rotateX: -360, rotateZ: 360 }}
            transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
            className="absolute inset-2 sm:inset-3 rounded-full border-2 border-cyan-400/50 shadow-[0_0_30px_rgba(6,182,212,0.35)]"
            style={{ transformStyle: 'preserve-3d' }}
          />
          <div className="w-14 h-14 sm:w-20 sm:h-20 md:w-26 md:h-26 bg-black/95 border-3 border-[#14F195] rounded-3xl flex flex-col items-center justify-center shadow-[0_0_50px_rgba(20,241,149,0.8)] z-10 backdrop-blur-xl">
             <Network className="w-7 h-7 sm:w-10 sm:h-10 md:w-13 md:h-13 text-[#14F195] drop-shadow-[0_0_12px_rgba(20,241,149,1)]" />
             <div className="text-[8px] sm:text-[9px] md:text-[10px] font-black text-white tracking-widest mt-0.5">SOLANA</div>
          </div>
        </div>

        {/* 3D Hologram Value Shields */}
        <div className="flex flex-col gap-2 sm:gap-3 md:gap-3.5 w-full max-w-lg">
          {labels.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: idx * 0.1 + 0.15 }}
              className={`flex items-center gap-3 sm:gap-4 p-2.5 sm:p-3.5 rounded-2xl border-2 ${item.border} ${item.bg} backdrop-blur-xl shadow-xl`}
            >
              <div className={`p-2 rounded-xl bg-black/90 border-2 ${item.border} flex-shrink-0`}>
                <item.icon className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 ${item.col}`} />
              </div>
              <div className="flex flex-col min-w-0">
                <div className={`text-xs sm:text-sm md:text-base font-black max-sm:tracking-normal tracking-wider uppercase ${item.col} truncate`}>
                  {item.title}
                </div>
                <div className="text-[10px] sm:text-xs md:text-sm text-white/85 font-semibold mt-0.5">
                  {item.sub}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// 13. Marvel-Style 3D Cinematic Assembler Room (Slide 17: MEMORY_CARD)
const FinalSpaceVisual: React.FC<{ lang: string }> = ({ lang }) => {
  const lbls = lang === 'ua' ? {
    core: 'ПУБЛІЧНА МЕРЕЖА SOLANA',
    items: [
      { title: 'ШВИДКІСТЬ', sub: '400 мс фіналізація', icon: Zap, color: 'text-cyan-400', border: 'border-cyan-400', bg: 'bg-cyan-950/90', rot: 0 },
      { title: 'МІКРО-КОМІСІЯ', sub: '< $0.00025 за дію', icon: Percent, color: 'text-yellow-400', border: 'border-yellow-400', bg: 'bg-yellow-950/90', rot: 72 },
      { title: 'СМАРТ-КОНТРАКТИ', sub: 'Автономні програми', icon: Settings, color: 'text-purple-400', border: 'border-purple-400', bg: 'bg-purple-950/90', rot: 144 },
      { title: 'ВІДКРИТИЙ DEFI', sub: 'Фінанси без банків', icon: Landmark, color: 'text-blue-400', border: 'border-blue-400', bg: 'bg-blue-950/90', rot: 216 },
      { title: 'NFT ВЛАСНІСТЬ', sub: 'Цифрові активи', icon: ImageIcon, color: 'text-amber-400', border: 'border-amber-400', bg: 'bg-amber-950/90', rot: 288 },
    ]
  } : {
    core: 'SOLANA PUBLIC NETWORK',
    items: [
      { title: 'SPEED', sub: '400ms finality', icon: Zap, color: 'text-cyan-400', border: 'border-cyan-400', bg: 'bg-cyan-950/90', rot: 0 },
      { title: 'MICRO-FEE', sub: '< $0.00025 per action', icon: Percent, color: 'text-yellow-400', border: 'border-yellow-400', bg: 'bg-yellow-950/90', rot: 72 },
      { title: 'SMART CONTRACTS', sub: 'Autonomous code', icon: Settings, color: 'text-purple-400', border: 'border-purple-400', bg: 'bg-purple-950/90', rot: 144 },
      { title: 'OPEN DEFI', sub: 'Finance without banks', icon: Landmark, color: 'text-blue-400', border: 'border-blue-400', bg: 'bg-blue-950/90', rot: 216 },
      { title: 'NFT ASSETS', sub: 'True digital assets', icon: ImageIcon, color: 'text-amber-400', border: 'border-amber-400', bg: 'bg-amber-950/90', rot: 288 },
    ]
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-2xl perspective-[1600px] pointer-events-none px-2"
    >
      <div className="relative flex items-center justify-center w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] md:w-[560px] md:h-[560px]" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(18deg)' }}>
        
        {/* Marvel Dynamic 3D Platform */}
        <motion.div 
          animate={{ rotateY: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Main Central Monolith */}
          <div className="absolute w-24 h-24 sm:w-30 sm:h-30 md:w-44 md:h-44 bg-gradient-to-tr from-[#14F195]/35 via-black/95 to-black border-3 border-[#14F195] flex flex-col items-center justify-center rounded-3xl shadow-[0_0_90px_rgba(20,241,149,0.8)] backdrop-blur-2xl z-20">
            <Network className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 text-[#14F195] drop-shadow-[0_0_18px_rgba(20,241,149,1)]" />
            <div className="mt-1.5 text-white font-black text-[8px] sm:text-[9px] md:text-xs max-sm:tracking-normal tracking-wider uppercase bg-black/90 px-2.5 py-0.5 rounded-full border border-[#14F195]/50 text-center max-sm:whitespace-normal max-sm:break-words text-center leading-tight">
              {lbls.core}
            </div>
          </div>

          {/* Symmetrical Orbiting 3D Shields */}
          {lbls.items.map((item, i) => (
            <div 
              key={i} 
              className="absolute top-1/2 left-1/2" 
              style={{ transform: `translate(-50%, -50%) rotateY(${item.rot}deg) translateZ(clamp(130px, 30vw, 220px))` }}
            >
              <motion.div 
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
                className={`flex flex-col items-center justify-center p-2 sm:p-3 md:p-3.5 rounded-2xl border-2 sm:border-3 ${item.border} ${item.bg} backdrop-blur-xl shadow-[0_0_35px_rgba(0,0,0,0.85)] w-[96px] h-[90px] sm:w-[115px] sm:h-[110px] md:w-[150px] md:h-[140px] text-center`}
              >
                <div className="p-1 sm:p-1.5 rounded-xl bg-black/95 border border-white/30 mb-1 sm:mb-1.5">
                  <item.icon className={`w-4 h-4 sm:w-5 sm:h-5 md:w-7 md:h-7 ${item.color}`} />
                </div>
                <div className={`text-[8px] sm:text-[10px] md:text-sm font-black max-sm:tracking-normal tracking-wider ${item.color} uppercase leading-tight`}>
                  {item.title}
                </div>
                <div className="text-[7px] sm:text-[8px] md:text-[10px] text-white/90 font-bold mt-0.5 leading-snug">
                  {item.sub}
                </div>
              </motion.div>
            </div>
          ))}

          {/* 3D Geometric Orbits */}
          <div className="absolute w-[290px] h-[290px] sm:w-[420px] sm:h-[420px] md:w-[530px] md:h-[530px] border border-white/15 rounded-full" style={{ transform: 'rotateX(90deg)' }} />
          <div className="absolute w-[290px] h-[290px] sm:w-[420px] sm:h-[420px] md:w-[530px] md:h-[530px] border-2 border-[#14F195]/40 rounded-full border-dashed" style={{ transform: 'rotateX(90deg) translateZ(20px)' }} />
        </motion.div>
      </div>
    </motion.div>
  );
};

// 14. Floating Money Component
const Money = ({ x, y, cWidth, cHeight, amount, isWait, isMobile }: any) => {
  const leftPercent = `${(x / cWidth) * 100}%`;
  const topPercent = `${(y / cHeight) * 100}%`;
  const yOffset = isMobile ? '-38px' : '-48px';

  return (
    <motion.div
      className="absolute z-50 pointer-events-none flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2"
      initial={false}
      animate={{ left: leftPercent, top: `calc(${topPercent} + ${yOffset})` }}
      transition={
         isWait ? { duration: 0 } :
         { type: "spring", stiffness: 60, damping: 14 }
      }
    >
       <div className="px-3 py-1 sm:px-3.5 sm:py-1.5 bg-gradient-to-r from-amber-400 to-yellow-400 border-2 border-yellow-200 rounded-full shadow-[0_0_20px_rgba(245,158,11,0.6)] flex items-center justify-center font-black text-slate-950 text-[11px] sm:text-xs md:text-sm tracking-wide backdrop-blur-md max-sm:whitespace-normal max-sm:break-words text-center leading-tight">
          <span>{amount}</span>
       </div>
    </motion.div>
  );
};

export function Scene({ state, isMobile, speed, lang }: any) {
  const c = isMobile ? coordsMobile : coordsDesktop;
  
  // Slide groups
  const isIntro = state === AppState.INTRO;
  const isBankFlow = state >= AppState.BANK_SIMPLE && state <= AppState.HOOK;
  const isBlockchainIntro = state === AppState.BLOCKCHAIN_INTRO;
  const isSolanaReveal = state === AppState.SOLANA_REVEAL;
  const isSolanaSpeed = state === AppState.SOLANA_SPEED;
  const isSolanaFee = state === AppState.SOLANA_FEE;
  const isSmartContracts = state === AppState.SOLANA_SMART_CONTRACTS;
  const isDeFi = state === AppState.SOLANA_DEFI;
  const isNFT = state === AppState.SOLANA_NFT;
  const isWhyExist = state === AppState.FINAL_REVEAL;
  const isMemoryCard = state === AppState.MEMORY_CARD;

  // Money trajectory (ONLY active during bank flow)
  let mx = c.sender.x;
  let my = c.sender.y;
  let mAmount = '$1,000';
  const showMoney = state >= AppState.BANK_SIMPLE && state <= AppState.BANK_RECEIVED;

  if (state >= AppState.BANK_FEE) mAmount = '$950';

  if (state === AppState.BANK_SIMPLE) {
    mx = c.b1.x; my = c.b1.y;
  } else if (state === AppState.BANK_CHECK) {
    mx = c.b1.x; my = c.b1.y;
  } else if (state >= AppState.BANK_INSTITUTION && state <= AppState.BANK_WAIT) {
    mx = c.ps.x; my = c.ps.y;
  } else if (state === AppState.BANK_HUMAN) {
    mx = c.b2.x; my = c.b2.y;
  } else if (state === AppState.BANK_RECEIVED) {
    mx = c.receiver.x; my = c.receiver.y;
  }

  const lbl = {
    sender: lang === 'en' ? 'You' : 'Ви',
    b1: lang === 'en' ? 'Your Bank' : 'Ваш банк',
    ps: lang === 'en' ? 'System' : 'Система',
    b2: lang === 'en' ? 'Recv Bank' : 'Банк отр.',
    receiver: lang === 'en' ? 'Receiver' : 'Отримувач'
  };

  return (
    <div id="scene-viewport" className="w-full h-full relative overflow-visible flex items-center justify-center max-sm:scale-[0.85] sm:scale-100 transition-transform duration-500 origin-center">
       {/* Background atmospheric ambient lights */}
       <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none z-0">
          <div className={`absolute w-[350px] sm:w-[500px] md:w-[650px] h-[350px] sm:h-[500px] md:h-[650px] rounded-full blur-[120px] transition-colors duration-1000 ${state >= AppState.BLOCKCHAIN_INTRO ? 'bg-[#14F195]/10' : 'bg-cyan-600/10'}`} />
          <div className="absolute top-1/4 left-1/4 w-[200px] h-[200px] rounded-full blur-[80px] bg-purple-600/10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_60%,transparent_100%)]" />
       </div>

       {/* 1. INTRO (Slide 0) */}
       <AnimatePresence>
         {isIntro && <IntroVsPreview lang={lang} />}
       </AnimatePresence>

       {/* 2. BANK FLOW (Slides 1 - 8) */}
       <AnimatePresence>
         {isBankFlow && (
           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative w-full max-w-[360px] md:max-w-4xl h-full max-h-[350px] md:h-[280px] mx-auto flex items-center justify-center">
             {/* SVG Connectors */}
             <svg viewBox={`0 0 ${c.width} ${c.height}`} className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" style={{ zIndex: 5 }}>
               <DynamicBankArrow start={c.sender} end={c.b1} active={state >= AppState.BANK_SIMPLE} isWait={state === AppState.BANK_WAIT} isMobile={isMobile} />
               <DynamicBankArrow start={c.b1} end={c.ps} active={state >= AppState.BANK_INSTITUTION} isWait={state === AppState.BANK_WAIT} isMobile={isMobile} />
               <DynamicBankArrow start={c.ps} end={c.b2} active={state >= AppState.BANK_HUMAN} isWait={state === AppState.BANK_WAIT} isMobile={isMobile} />
               <DynamicBankArrow start={c.b2} end={c.receiver} active={state >= AppState.BANK_RECEIVED} isWait={state === AppState.BANK_WAIT} isMobile={isMobile} />
             </svg>
             
             <PersonNode label={lbl.sender} x={c.sender.x} y={c.sender.y} cWidth={c.width} cHeight={c.height} labelPos={c.sender.pos} active={true} isSolana={false} />
             <BankCard label={lbl.b1} icon={Building} x={c.b1.x} y={c.b1.y} cWidth={c.width} cHeight={c.height} labelPos={c.b1.pos} active={state >= AppState.BANK_SIMPLE} highlight={state === AppState.BANK_CHECK} colorHint="blue" />
             <BankCard label={lbl.ps} icon={Landmark} x={c.ps.x} y={c.ps.y} cWidth={c.width} cHeight={c.height} labelPos={c.ps.pos} active={state >= AppState.BANK_INSTITUTION} highlight={state === AppState.BANK_FEE || state === AppState.BANK_WAIT} colorHint="purple" />
             <BankCard label={lbl.b2} icon={Building} x={c.b2.x} y={c.b2.y} cWidth={c.width} cHeight={c.height} labelPos={c.b2.pos} active={state >= AppState.BANK_HUMAN} highlight={state === AppState.BANK_HUMAN} colorHint="amber" />
             <PersonNode label={lbl.receiver} x={c.receiver.x} y={c.receiver.y} cWidth={c.width} cHeight={c.height} labelPos={c.receiver.pos} active={state >= AppState.BANK_RECEIVED} isSolana={false} />

             {/* Wait Clock animation */}
             {state === AppState.BANK_WAIT && (
               <div className="absolute z-40 pointer-events-none -translate-x-1/2 -translate-y-1/2" style={{ left: `${(c.ps.x / c.width) * 100}%`, top: `${(c.ps.y / c.height) * 100}%` }}>
                 <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full border-2 border-dashed border-red-400 animate-spin" />
                 <Clock className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-400 w-5 h-5 sm:w-7 sm:h-7 animate-pulse" />
               </div>
             )}

             {/* Fee Deducted popup */}
             {state === AppState.BANK_FEE && (
               <motion.div 
                 initial={{ opacity: 0, y: 0, scale: 0.5 }}
                 animate={{ opacity: 1, y: isMobile ? -62 : -74, scale: 1 }}
                 className="absolute z-50 text-red-400 font-extrabold text-lg sm:text-xl md:text-2xl drop-shadow-[0_0_15px_rgba(239,68,68,0.9)] -translate-x-1/2 -translate-y-1/2 max-sm:whitespace-normal max-sm:break-words text-center leading-tight"
                 style={{ left: `${(c.ps.x / c.width) * 100}%`, top: `${(c.ps.y / c.height) * 100}%` }}
               >
                 - $50
               </motion.div>
             )}

             {/* Money in transit */}
             {showMoney && (
               <Money x={mx} y={my} cWidth={c.width} cHeight={c.height} amount={mAmount} isWait={state === AppState.BANK_WAIT} isMobile={isMobile} />
             )}
           </motion.div>
         )}
       </AnimatePresence>

       {/* 3. BLOCKCHAIN INTRO (Slide 9) */}
       <AnimatePresence>
         {isBlockchainIntro && <BlockchainLedgerSlide isMobile={isMobile} lang={lang} />}
       </AnimatePresence>

       {/* 4. SOLANA REVEAL (Slide 10) */}
       <AnimatePresence>
         {isSolanaReveal && <SolanaNetworkSlide isMobile={isMobile} lang={lang} />}
       </AnimatePresence>

       {/* 5. SOLANA SPEED (Slide 11) */}
       <AnimatePresence>
         {isSolanaSpeed && <SolanaSpeedVisual isMobile={isMobile} lang={lang} />}
       </AnimatePresence>

       {/* 6. SOLANA LOW FEE (Slide 12) */}
       <AnimatePresence>
         {isSolanaFee && <SolanaFeeVisual isMobile={isMobile} lang={lang} />}
       </AnimatePresence>

       {/* 7. SMART CONTRACTS (Slide 13) */}
       <AnimatePresence>
         {isSmartContracts && <SmartContractVisual key="sc" lang={lang} />}
       </AnimatePresence>

       {/* 8. DEFI (Slide 14) */}
       <AnimatePresence>
         {isDeFi && <DeFiVisual key="defi" lang={lang} />}
       </AnimatePresence>

       {/* 9. NFT (Slide 15) */}
       <AnimatePresence>
         {isNFT && <NFTVisual key="nft" lang={lang} />}
       </AnimatePresence>

       {/* 10. WHY DOES SOLANA EXIST (Slide 16) */}
       <AnimatePresence>
         {isWhyExist && <WhyExistVisual key="why" lang={lang} />}
       </AnimatePresence>

       {/* 11. WHAT IS SOLANA (Slide 17) */}
       <AnimatePresence>
         {isMemoryCard && <FinalSpaceVisual key="final" lang={lang} />}
       </AnimatePresence>
    </div>
  );
}
