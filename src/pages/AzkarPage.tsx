import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { azkarData, type Zikr } from '../data/azkar';

const AzkarCard = ({ zikr, completedCount, onRepeat }: {
  zikr: Zikr;
  completedCount: number;
  onRepeat: () => void;
}) => (
  <motion.div
    className="bg-[rgba(255,213,79,0.1)] p-6 rounded-lg"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <div className="mb-4">
      <p className="text-2xl text-[#ffd54f] font-['Amiri'] text-right leading-loose">
        {zikr.arabic}
      </p>
      {zikr.transliteration && (
        <p className="text-[rgba(255,213,79,0.8)] mt-2 italic">
          {zikr.transliteration}
        </p>
      )}
      <p className="text-gray-300 mt-2">{zikr.translation || "Translation not available"}</p>
      {zikr.source && (
        <p className="text-[rgba(255,213,79,0.6)] text-sm mt-2">
          Source: {zikr.source}
        </p>
      )}
      {zikr.audio && (
        <audio 
          controls 
          className="mt-4 w-full h-8" 
          src={zikr.audio}
        >
          Your browser does not support the audio element.
        </audio>
      )}
    </div>

    <div className="flex items-center justify-between">
      <div className="text-[rgba(255,213,79,0.6)]">
        Repeat: {zikr.repetitions}x
      </div>
      <button
        onClick={onRepeat}
        className={`px-4 py-2 rounded-lg transition-colors ${
          completedCount >= zikr.repetitions
            ? 'bg-[rgba(255,213,79,0.3)] text-[#ffd54f]'
            : 'bg-[rgba(255,213,79,0.1)] text-[#ffd54f] hover:bg-[rgba(255,213,79,0.2)]'
        }`}
      >
        {completedCount} / {zikr.repetitions}
      </button>
    </div>
  </motion.div>
);

const AzkarPage = () => {
  const [displayedAzkar, setDisplayedAzkar] = useState<Zikr[]>([]);
  const [completedAzkar, setCompletedAzkar] = useState<Record<number, number>>({});

  useEffect(() => {
    setDisplayedAzkar(azkarData.filter(zikr => zikr.category === 'أذكار الصباح والمساء'));
  }, []);

  const handleRepetition = (zikrId: number, maxRepetitions: number) => {
    setCompletedAzkar(prev => {
      const current = prev[zikrId] || 0;
      if (current >= maxRepetitions) return prev;
      return { ...prev, [zikrId]: current + 1 };
    });
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] py-6">
      <motion.div 
        className="max-w-4xl mx-auto px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h1 className="text-3xl text-[#ffd54f] mb-6"> اذكار الصباح والمساء وادعيه</h1>
        
        {/* Azkar List */}
        <div className="space-y-4">
          {displayedAzkar.map((zikr) => (
            <AzkarCard
              key={zikr.id}
              zikr={zikr}
              completedCount={completedAzkar[zikr.id] || 0}
              onRepeat={() => handleRepetition(zikr.id, zikr.repetitions)}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AzkarPage;
