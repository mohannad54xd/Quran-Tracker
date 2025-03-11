import React, { createContext, useContext, useState, useEffect } from 'react';

interface Settings {
  theme: 'dark' | 'light';
  language: 'en' | 'ar';
  notifications: boolean;
  autoScroll: boolean;
  fontSize: number;
  readingGoal: number;
}

interface SettingsContextType {
  settings: Settings;
  updateSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
}

const defaultSettings: Settings = {
  theme: 'dark',
  language: 'en',
  notifications: true,
  autoScroll: true,
  fontSize: 24,
  readingGoal: 4
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(() => {
    try {
      const saved = localStorage.getItem('quranSettings');
      return saved ? JSON.parse(saved) : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  useEffect(() => {
    try {
      // Apply theme
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(settings.theme);
      
      // Apply font size
      document.documentElement.style.setProperty('--font-size', `${settings.fontSize}px`);
      
      // Save settings
      localStorage.setItem('quranSettings', JSON.stringify(settings));
    } catch (error) {
      console.error('Error applying settings:', error);
    }
  }, [settings]);

  const updateSetting = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSetting }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
