import React, { useState, useEffect } from 'react';
import { MainStage } from './MainStage';

export default function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full h-[100dvh] flex items-center justify-center bg-[#050505] overflow-hidden p-0 sm:p-2 md:p-3 lg:p-4 select-none">
      <div 
        id="app-container"
        className="relative w-full h-full max-w-7xl max-h-[100dvh] sm:max-h-[96dvh] bg-[#0A0A0B] shadow-2xl overflow-hidden sm:border sm:border-white/10 sm:rounded-2xl flex flex-col"
      >
        <MainStage isMobile={isMobile} />
      </div>
    </div>
  );
}



