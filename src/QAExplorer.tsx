import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  ShieldCheck, 
  Percent, 
  Layers, 
  Cpu, 
  Coins, 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  RotateCcw, 
  ArrowLeft, 
  Settings2, 
  HelpCircle, 
  MessageSquare,
  ExternalLink,
  CheckCircle2,
  Lightbulb,
  Check
} from 'lucide-react';
import { Language } from './types';
import { QA_PRESETS, QAPreset, SMART_AI_KNOWLEDGE_BASE } from './qaData';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

const iconMap: Record<string, any> = {
  Zap,
  ShieldCheck,
  Percent,
  Layers,
  Cpu,
  Coins
};

export function QAExplorer({ 
  lang, 
  onBackToPresentation, 
  onReplay,
  isMobile 
}: { 
  lang: Language; 
  onBackToPresentation: () => void; 
  onReplay: () => void;
  isMobile: boolean;
}) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedPresetId, setExpandedPresetId] = useState<string | null>(QA_PRESETS[0].id);
  const [inputQuery, setInputQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'faq' | 'chat'>(isMobile ? 'faq' : 'faq');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: lang === 'ua' 
        ? '👋 Привіт! Я твій інтерактивний Solana & Web3 AI-помічник. Запитай мене будь-що про швидкість мережі, безпеку, комісії, смарт-контракти чи порівняння з банками!'
        : '👋 Hello! I am your interactive Solana & Web3 AI assistant. Ask me anything about network speed, security, micro-fees, smart contracts, or comparisons with traditional banking!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [cfWorkerUrl, setCfWorkerUrl] = useState<string>(() => {
  const saved = localStorage.getItem('solana_cf_worker_url');
    return saved !== null ? saved : 'https://solana-ai.krailo.sh/chat'; 
  });
  const [showSettings, setShowSettings] = useState(false);
  const [savedUrlNotification, setSavedUrlNotification] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: 'all', label: { ua: 'Усі питання', en: 'All Topics' } },
    { id: 'speed', label: { ua: '⚡ Швидкість', en: '⚡ Speed' } },
    { id: 'security', label: { ua: '🛡️ Безпека', en: '🛡️ Security' } },
    { id: 'fees', label: { ua: '💸 Комісії & SOL', en: '💸 Fees & SOL' } },
    { id: 'governance', label: { ua: '🌐 Контроль', en: '🌐 Governance' } },
    { id: 'compare', label: { ua: '⚖️ Порівняння', en: '⚖️ Comparison' } },
    { id: 'starter', label: { ua: '🚀 Старт', en: '🚀 Getting Started' } },
  ];

  const quickPrompts = lang === 'ua' ? [
    'Чому Solana швидша за банк?',
    'Що таке Proof of History?',
    'Як створити гаманець Phantom?',
    'Чи можуть заблокувати мій переказ?'
  ] : [
    'Why is Solana faster than banks?',
    'What is Proof of History?',
    'How do I create a Phantom wallet?',
    'Can anyone freeze my transfer?'
  ];

  const filteredPresets = activeCategory === 'all' 
    ? QA_PRESETS 
    : QA_PRESETS.filter(p => p.category === activeCategory);

  const scrollToBottom = () => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (activeTab === 'chat') {
      scrollToBottom();
    }
  }, [messages, isTyping, activeTab]);

  const handleSaveWorkerUrl = (url: string) => {
    setCfWorkerUrl(url);
    localStorage.setItem('solana_cf_worker_url', url);
    setSavedUrlNotification(true);
    setTimeout(() => setSavedUrlNotification(false), 2500);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    if (activeTab !== 'chat') {
      setActiveTab('chat');
    }

    // Check if user has configured custom Cloudflare Worker AI Endpoint
    if (cfWorkerUrl && cfWorkerUrl.startsWith('http')) {
      try {
        const response = await fetch(cfWorkerUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: query,
            language: lang,
            history: messages.slice(-4)
          })
        });

        if (response.ok) {
          const data = await response.json();
          const replyText = data.response || data.reply || data.text || JSON.stringify(data);
          
          setMessages(prev => [
            ...prev,
            {
              id: (Date.now() + 1).toString(),
              sender: 'assistant',
              text: replyText,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]);
          setIsTyping(false);
          return;
        }
      } catch (err) {
        console.warn('Cloudflare Worker fallback:', err);
      }
    }

    // Built-in Intelligent AI Response Engine
    setTimeout(() => {
      let matchedResponse = '';
      const lowerQuery = query.toLowerCase();

      for (const item of SMART_AI_KNOWLEDGE_BASE) {
        const hasKeyword = item.keywords.some(k => lowerQuery.includes(k));
        if (hasKeyword) {
          matchedResponse = item.response[lang];
          break;
        }
      }

      if (!matchedResponse) {
        matchedResponse = lang === 'ua'
          ? `💡 **Відповідь на ваше запитання про "${query}"**:\n\nSolana — це високопродуктивна децентралізована мережа, яка об'єднує понад 2,000 комп'ютерів для миттєвої передачі вартості (400 мс) з комісією менше $0.00025. Вона повністю усуває посередників (банки, черги, дозволи) і надає прямий контроль над коштами власнику через криптографічні ключі.`
          : `💡 **Answer regarding "${query}"**:\n\nSolana is a high-throughput decentralized blockchain network uniting over 2,000 validator nodes worldwide for sub-second settlement (400ms) with micro-fees under $0.00025. It eliminates traditional banking bottlenecks and gives users sovereign control over their digital assets.`;
      }

      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: matchedResponse,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 600);
  };

  const handleAskPreset = (preset: QAPreset) => {
    setActiveTab('chat');
    handleSendMessage(preset.question[lang]);
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#070709] text-white overflow-hidden select-none relative">
      
      {/* Top Bar Navigation */}
      <div className="w-full h-[52px] sm:h-[58px] border-b border-white/10 bg-black/60 backdrop-blur-md px-3 sm:px-6 flex items-center justify-between flex-shrink-0 z-40">
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onBackToPresentation}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs sm:text-sm font-bold text-white transition-all active:scale-95 shadow-md"
          >
            <ArrowLeft className="w-4 h-4 text-[#14F195]" />
            <span className="hidden xs:inline">{lang === 'ua' ? 'До 3D презентації' : 'To 3D Story'}</span>
            <span className="xs:hidden">{lang === 'ua' ? 'Назад' : 'Back'}</span>
          </button>
          
          <div className="h-4 w-[1px] bg-white/20 mx-0.5 sm:mx-1" />

          <div className="flex items-center gap-1.5 text-xs sm:text-sm font-black font-display tracking-wide text-[#14F195]">
            <Sparkles className="w-4 h-4 text-[#14F195] animate-pulse" />
            <span className="hidden sm:inline">{lang === 'ua' ? 'База знань & AI Помічник' : 'Knowledge Hub & AI Assistant'}</span>
            <span className="sm:hidden">{lang === 'ua' ? 'Q&A & AI' : 'Q&A & AI'}</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Settings Modal Toggle */}
          <button
            onClick={() => setShowSettings(s => !s)}
            className={`p-2 rounded-xl border transition-all active:scale-95 ${
              cfWorkerUrl 
                ? 'bg-[#14F195]/20 border-[#14F195] text-[#14F195]' 
                : 'bg-white/10 border-white/15 text-white/80 hover:text-white'
            }`}
            title={lang === 'ua' ? 'Налаштування Cloudflare AI Worker' : 'Cloudflare AI Worker Settings'}
          >
            <Settings2 className="w-4 h-4" />
          </button>

          {/* Replay Presentation Button */}
          <button
            onClick={onReplay}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs sm:text-sm font-bold text-white transition-all active:scale-95"
            title={lang === 'ua' ? 'Почати спочатку' : 'Restart Presentation'}
          >
            <RotateCcw className="w-3.5 h-3.5 text-cyan-300" />
            <span className="hidden md:inline">{lang === 'ua' ? 'Спочатку' : 'Replay'}</span>
          </button>
        </div>
      </div>

      {/* Cloudflare Worker Settings Overlay */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-[58px] inset-x-0 z-50 bg-black/95 border-b border-cyan-500/40 p-4 sm:p-5 shadow-2xl backdrop-blur-2xl"
          >
            <div className="max-w-2xl mx-auto flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm sm:text-base font-black text-cyan-300">
                  <Bot className="w-5 h-5 text-[#14F195]" />
                  <span>{lang === 'ua' ? 'Підключення Cloudflare AI Worker' : 'Cloudflare AI Worker Endpoint'}</span>
                </div>
                <button 
                  onClick={() => setShowSettings(false)}
                  className="text-xs text-white/60 hover:text-white px-2 py-1 rounded bg-white/10"
                >
                  ✕ {lang === 'ua' ? 'Закрити' : 'Close'}
                </button>
              </div>

              <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                {lang === 'ua' 
                  ? 'Введіть URL вашого Cloudflare Worker (з моделлю Llama 3, DeepSeek чи іншою). Якщо поле порожнє, працюватиме швидкий вбудований AI-рушій.'
                  : 'Enter your Cloudflare Worker URL endpoint. If left empty, the built-in smart AI engine answers all questions instantly.'}
              </p>

              <div className="flex items-center gap-2 mt-1">
                <input
                  type="url"
                  value={cfWorkerUrl}
                  onChange={e => handleSaveWorkerUrl(e.target.value)}
                  placeholder="https://my-solana-ai.workers.dev/api/chat"
                  className="flex-1 px-3 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-xs sm:text-sm focus:outline-none focus:border-[#14F195] font-mono"
                />
                <button
                  onClick={() => handleSaveWorkerUrl(cfWorkerUrl)}
                  className="px-4 py-2 rounded-xl bg-[#14F195] text-black font-black text-xs sm:text-sm active:scale-95 transition-all shadow-[0_0_15px_rgba(20,241,149,0.5)] flex items-center gap-1"
                >
                  <Check className="w-4 h-4" />
                  <span>{lang === 'ua' ? 'Зберегти' : 'Save'}</span>
                </button>
              </div>

              {savedUrlNotification && (
                <div className="text-xs text-[#14F195] font-bold flex items-center gap-1.5 animate-pulse">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{lang === 'ua' ? '✓ Налаштування успішно збережено!' : '✓ Endpoint saved successfully!'}</span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Layout (Split or Tabs) */}
      <div className="flex-1 min-h-0 flex flex-col md:flex-row overflow-hidden relative">
        
        {/* Mobile View Tabs Header */}
        <div className="flex md:hidden w-full border-b border-white/10 bg-black/40 flex-shrink-0">
          <button
            onClick={() => setActiveTab('faq')}
            className={`flex-1 py-2.5 flex items-center justify-center gap-2 text-xs font-black uppercase tracking-wider transition-all ${
              activeTab === 'faq' 
                ? 'text-[#14F195] border-b-2 border-[#14F195] bg-[#14F195]/10' 
                : 'text-white/60 hover:text-white'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>{lang === 'ua' ? 'Швидкі відповіді (FAQ)' : 'FAQ Presets'}</span>
          </button>
          
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex-1 py-2.5 flex items-center justify-center gap-2 text-xs font-black uppercase tracking-wider transition-all relative ${
              activeTab === 'chat' 
                ? 'text-cyan-300 border-b-2 border-cyan-400 bg-cyan-400/10' 
                : 'text-white/60 hover:text-white'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>{lang === 'ua' ? 'AI Співрозмовник' : 'AI Assistant'}</span>
            <span className="w-2 h-2 rounded-full bg-[#14F195] animate-pulse" />
          </button>
        </div>

        {/* LEFT COLUMN: FAQ PRESETS (Always visible on desktop, tabbed on mobile) */}
        <div className={`w-full md:w-1/2 lg:w-7/12 h-full flex flex-col border-r border-white/10 overflow-hidden ${
          isMobile && activeTab !== 'faq' ? 'hidden md:flex' : 'flex'
        }`}>
          
          {/* Filter Pills Header */}
          <div className="p-3 sm:p-4 border-b border-white/10 bg-black/30 flex-shrink-0">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm sm:text-base font-black text-white flex items-center gap-2 font-display">
                <HelpCircle className="w-4 h-4 text-[#14F195]" />
                <span>{lang === 'ua' ? 'Популярні запитання та відповіді' : 'Key Questions & Answers'}</span>
              </h2>
              <span className="text-[10px] sm:text-xs text-white/50 font-mono">
                {filteredPresets.length} {lang === 'ua' ? 'тем' : 'topics'}
              </span>
            </div>

            {/* Scrollable category pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                    activeCategory === cat.id
                      ? 'bg-[#14F195] text-black shadow-[0_0_12px_rgba(20,241,149,0.4)]'
                      : 'bg-white/10 text-white/80 hover:bg-white/20'
                  }`}
                >
                  {cat.label[lang]}
                </button>
              ))}
            </div>
          </div>

          {/* Presets Accordion List */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2.5 sm:space-y-3 custom-scrollbar">
            {filteredPresets.map((preset) => {
              const isExpanded = expandedPresetId === preset.id;
              const IconComp = iconMap[preset.icon] || HelpCircle;
              const content = preset.fullAnswer[lang];

              return (
                <motion.div
                  key={preset.id}
                  layout
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isExpanded 
                      ? 'bg-gradient-to-b from-[#14F195]/10 via-black/80 to-black/90 border-[#14F195]/60 shadow-[0_0_25px_rgba(20,241,149,0.15)]' 
                      : 'bg-white/[0.04] hover:bg-white/[0.08] border-white/10'
                  }`}
                >
                  {/* Preset Question Header */}
                  <button
                    onClick={() => setExpandedPresetId(isExpanded ? null : preset.id)}
                    className="w-full p-3 sm:p-4 flex items-start justify-between gap-3 text-left"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div className={`p-2 rounded-xl flex-shrink-0 mt-0.5 ${
                        isExpanded ? 'bg-[#14F195] text-black' : 'bg-white/10 text-cyan-300'
                      }`}>
                        <IconComp className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <div className="text-xs sm:text-sm font-bold text-white leading-snug">
                          {preset.question[lang]}
                        </div>
                        {!isExpanded && (
                          <div className="text-[11px] sm:text-xs text-white/60 line-clamp-1 mt-1 font-medium">
                            {preset.shortAnswer[lang]}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="p-1 rounded-lg bg-white/5 text-white/70 flex-shrink-0 mt-1">
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-[#14F195]" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {/* Expanded Rich Answer */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="px-3 pb-3 sm:px-4 sm:pb-4 pt-1 flex flex-col gap-3 border-t border-white/10"
                      >
                        {/* Summary */}
                        <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
                          {content.summary}
                        </p>

                        {/* Analogy Box */}
                        <div className="p-2.5 sm:p-3 rounded-xl bg-purple-950/40 border border-purple-500/40 flex items-start gap-2.5 text-xs sm:text-sm text-purple-200">
                          <Lightbulb className="w-4 h-4 text-purple-300 flex-shrink-0 mt-0.5" />
                          <div className="font-semibold leading-snug">{content.analogy}</div>
                        </div>

                        {/* Key Points Checklist */}
                        <div className="space-y-1.5">
                          {content.keyPoints.map((point, pIdx) => (
                            <div key={pIdx} className="flex items-start gap-2 text-xs sm:text-sm text-white/80">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#14F195] flex-shrink-0 mt-0.5" />
                              <span>{point}</span>
                            </div>
                          ))}
                        </div>

                        {/* Takeaway & Action */}
                        <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="text-[11px] sm:text-xs text-cyan-300 font-bold">
                            ✨ {content.takeaway}
                          </div>

                          <button
                            onClick={() => handleAskPreset(preset)}
                            className="self-end sm:self-auto px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/50 text-cyan-200 text-xs font-bold flex items-center gap-1.5 active:scale-95 transition-all"
                          >
                            <Bot className="w-3.5 h-3.5 text-cyan-300" />
                            <span>{lang === 'ua' ? 'Запитати у AI' : 'Ask AI More'}</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: INTERACTIVE AI CHAT (Always visible on desktop, tabbed on mobile) */}
        <div className={`w-full md:w-1/2 lg:w-5/12 h-full flex flex-col bg-black/40 overflow-hidden ${
          isMobile && activeTab !== 'chat' ? 'hidden md:flex' : 'flex'
        }`}>
          
          {/* Chat Header */}
          <div className="p-3 sm:p-4 border-b border-white/10 bg-black/60 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#14F195] to-cyan-400 flex items-center justify-center text-black font-black shadow-[0_0_15px_rgba(20,241,149,0.5)]">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-black text-white flex items-center gap-1.5">
                  <span>Solana AI Companion</span>
                  <span className="w-2 h-2 rounded-full bg-[#14F195] animate-pulse" />
                </div>
                <div className="text-[10px] text-white/50">
                  {cfWorkerUrl ? 'Cloudflare Worker AI' : (lang === 'ua' ? 'Вбудований AI експерт' : 'Built-in AI Expert')}
                </div>
              </div>
            </div>

            <button
              onClick={() => setMessages([messages[0]])}
              className="text-[11px] text-white/60 hover:text-white px-2 py-1 rounded bg-white/5 hover:bg-white/10 transition-all"
            >
              {lang === 'ua' ? 'Очистити' : 'Clear'}
            </button>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 custom-scrollbar">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    isUser 
                      ? 'bg-cyan-500 text-black' 
                      : 'bg-gradient-to-br from-[#14F195] to-purple-600 text-black shadow-md'
                  }`}>
                    {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-slate-950" />}
                  </div>

                  <div className={`max-w-[85%] rounded-2xl p-3 sm:p-3.5 text-xs sm:text-sm leading-relaxed shadow-lg ${
                    isUser 
                      ? 'bg-cyan-600/90 text-white rounded-tr-none border border-cyan-400/40' 
                      : 'bg-white/10 text-white/95 rounded-tl-none border border-white/15 whitespace-pre-line'
                  }`}>
                    {msg.text}
                    <div className={`text-[9px] mt-1 text-right font-mono ${isUser ? 'text-cyan-200/70' : 'text-white/40'}`}>
                      {msg.timestamp}
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {isTyping && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-xs text-[#14F195]">
                <Bot className="w-4 h-4 animate-bounce" />
                <span className="animate-pulse">{lang === 'ua' ? 'AI генерує відповідь...' : 'AI is thinking...'}</span>
              </motion.div>
            )}

            <div ref={chatBottomRef} />
          </div>

          {/* Quick Prompts Chips */}
          <div className="px-3 pt-2 pb-1 bg-black/40 border-t border-white/5 flex items-center gap-1.5 overflow-x-auto scrollbar-none flex-shrink-0">
            {quickPrompts.map((prompt, pIdx) => (
              <button
                key={pIdx}
                onClick={() => handleSendMessage(prompt)}
                className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-[#14F195]/20 hover:border-[#14F195]/50 border border-white/10 text-[11px] text-white/80 hover:text-white whitespace-nowrap transition-all flex-shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
            className="p-3 sm:p-3.5 border-t border-white/10 bg-black/80 flex items-center gap-2 flex-shrink-0"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder={lang === 'ua' ? 'Запитайте що завгодно про Solana & Web3...' : 'Ask anything about Solana & Web3...'}
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-xs sm:text-sm focus:outline-none focus:border-[#14F195] transition-all"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim() || isTyping}
              className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#14F195] to-cyan-400 text-black flex items-center justify-center font-bold active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-[0_0_15px_rgba(20,241,149,0.5)] flex-shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>

      </div>

    </div>
  );
}
