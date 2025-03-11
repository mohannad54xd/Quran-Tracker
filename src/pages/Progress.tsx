import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { quranApi, type Surah } from '../services/quranApi';

const Progress = () => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [completedSurahs, setCompletedSurahs] = useState<number[]>(
    JSON.parse(localStorage.getItem('completedSurahs') || '[]')
  );
  
  useEffect(() => {
    const loadSurahs = async () => {
      const data = await quranApi.getSurahs();
      setSurahs(data);
    };
    loadSurahs();
  }, []);

  const toggleSurahCompletion = (surahNumber: number) => {
    setCompletedSurahs(prev => {
      const newCompleted = prev.includes(surahNumber)
        ? prev.filter(num => num !== surahNumber)
        : [...prev, surahNumber];
      
      localStorage.setItem('completedSurahs', JSON.stringify(newCompleted));
      return newCompleted;
    });
  };

  const totalProgress = (completedSurahs.length / 114) * 100;

  return (
    <div className="min-h-[calc(100vh-8rem)] py-6">
      <motion.div 
        className="max-w-6xl mx-auto px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Progress Overview */}
        <div className="bg-[rgba(255,213,79,0.1)] p-6 rounded-lg mb-6">
          <h2 className="text-[#ffd54f] text-2xl mb-4">Reading Progress</h2>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#ffd54f] transition-all duration-500"
                  style={{ width: `${totalProgress}%` }}
                />
              </div>
            </div>
            <span className="text-[#ffd54f] font-medium">
              {Math.round(totalProgress)}%
            </span>
          </div>
          <div className="mt-2 text-gray-400">
            {completedSurahs.length} of 114 Surahs completed
          </div>
        </div>

        {/* Surah Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {surahs.map(surah => (
            <motion.button
              key={surah.number}
              onClick={() => toggleSurahCompletion(surah.number)}
              className={`p-4 rounded-lg border transition-all duration-300 ${
                completedSurahs.includes(surah.number)
                  ? 'bg-[rgba(255,213,79,0.2)] border-[rgba(255,213,79,0.6)]'
                  : 'bg-[rgba(255,213,79,0.1)] border-[rgba(255,213,79,0.3)]'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-[#ffd54f] text-lg font-medium">
                {surah.number}. {surah.englishName}
              </div>
              <div className="text-gray-400 text-sm">
                {surah.numberOfAyahs} Ayahs
              </div>
              {completedSurahs.includes(surah.number) && (
                <div className="text-[#ffd54f] text-sm mt-2">✓ Completed</div>
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Progress;
