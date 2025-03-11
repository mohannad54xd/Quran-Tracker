import React, { createContext, useContext, useState } from 'react';

interface RamadanContextType {
  daysLeft: number;
  totalPages: number;
  currentProgress: number;
  updateProgress: (pages: number) => void;
  pagesPerDay: number;
  todayPages: number;
}

const RamadanContext = createContext<RamadanContextType | null>(null);

export const RamadanProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentProgress, setCurrentProgress] = useState(0);
  const [todayPages, setTodayPages] = useState(0);
  
  // Fixed values
  const totalPages = 604;
  const daysLeft = 30;  // Fixed to 30 days
  const pagesPerDay = 20;  // Fixed daily goal

  const updateProgress = (pages: number) => {
    setTodayPages(prev => prev + pages);
    setCurrentProgress(prev => Math.min(totalPages, prev + pages));
  };

  return (
    <RamadanContext.Provider value={{
      daysLeft,
      totalPages,
      currentProgress,
      updateProgress,
      pagesPerDay,
      todayPages
    }}>
      {children}
    </RamadanContext.Provider>
  );
};

export const useRamadan = () => {
  const context = useContext(RamadanContext);
  if (!context) throw new Error('useRamadan must be used within RamadanProvider');
  return context;
};
