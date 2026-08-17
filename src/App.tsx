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
    <div className="w-full h-[100dvh] bg-[#0A0A0B] overflow-hidden select-none flex flex-col">
      <div 
        id="app-container"
        className="relative w-full h-full bg-[#0A0A0B] overflow-hidden flex flex-col"
      >
        <MainStage isMobile={isMobile} />
      </div>
    </div>
  );
}



