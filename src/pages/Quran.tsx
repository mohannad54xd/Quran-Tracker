import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRamadan } from '../contexts/RamadanContext';
import Bismillah from '../components/Bismillah';
import { quranApi, type Surah, type Ayah } from '../services/quranApi';
import QuranDisplay from '../components/QuranDisplay';

interface Bookmark {
  surahNumber: number;
  ayahNumber: number;
  timestamp: number;
  note?: string;
}

const QuranPage = () => {
  const { 
    currentProgress, 
    updateProgress, 
    pagesPerDay,
    todayPages
  } = useRamadan();
  const [selectedSurah, setSelectedSurah] = useState<number>(0);
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [currentAyahs, setCurrentAyahs] = useState<Ayah[]>([]);
  const [loading, setLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(
    JSON.parse(localStorage.getItem('quranBookmarks') || '[]')
  );

  useEffect(() => {
    const loadSurahs = async () => {
      try {
        const data = await quranApi.getSurahs();
        setSurahs(data);
      } catch (error) {
        console.error('Error loading surahs:', error);
      }
    };
    loadSurahs();
  }, []);

  const loadSurah = async (surahNumber: number) => {
    try {
      setLoading(true);
      const data = await quranApi.getSurah(surahNumber);
      setCurrentAyahs(data.ayahs);
    } catch (error) {
      console.error('Error loading surah:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPageFromAyah = (ayah: Ayah) => {
    return ayah.page;
  };

  const toggleBookmark = (surahNumber: number, ayahNumber: number) => {
    const existingBookmarkIndex = bookmarks.findIndex(
      b => b.surahNumber === surahNumber && b.ayahNumber === ayahNumber
    );

    let newBookmarks;
    if (existingBookmarkIndex >= 0) {
      newBookmarks = bookmarks.filter((_, index) => index !== existingBookmarkIndex);
    } else {
      newBookmarks = [...bookmarks, {
        surahNumber,
        ayahNumber,
        timestamp: Date.now(),
        note: ''
      }];
    }

    setBookmarks(newBookmarks);
    localStorage.setItem('quranBookmarks', JSON.stringify(newBookmarks));
  };

  const isBookmarked = (surahNumber: number, ayahNumber: number) => {
    return bookmarks.some(b => b.surahNumber === surahNumber && b.ayahNumber === ayahNumber);
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] py-4 sm:py-6">
      <motion.div 
        className="max-w-[98rem] mx-auto px-2 sm:px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Bismillah />
        
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 mb-6">
          <motion.div 
            className={`${isExpanded ? 'lg:col-span-12' : 'lg:col-span-10'} bg-[rgba(255,213,79,0.1)] p-3 sm:p-4 rounded-lg border border-[rgba(255,213,79,0.2)] min-h-[600px]`}
            layout
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl text-[#ffd54f]">Surah Selection</h2>
              <select 
                className="w-full sm:w-auto bg-[rgba(255,213,79,0.2)] text-base sm:text-lg p-2 rounded-md border border-[rgba(255,213,79,0.3)]"
                onChange={(e) => {
                  const surahNumber = Number(e.target.value);
                  setSelectedSurah(surahNumber);
                  loadSurah(surahNumber);
                }}
                value={selectedSurah}
              >
                <option value="">Select Surah</option>
                {surahs.map(surah => (
                  <option key={surah.number} value={surah.number}>
                    {surah.englishName} - {surah.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="h-[calc(100vh-16rem)] bg-[rgba(255,213,79,0.05)] rounded-lg overflow-hidden">
              <QuranDisplay 
                ayahs={currentAyahs} 
                loading={loading}
                isExpanded={isExpanded}
                onToggleExpand={() => setIsExpanded(prev => !prev)}
              />
            </div>
          </motion.div>

          {/* Progress Panel - shows either as sidebar or floating overlay */}
          {isExpanded ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed bottom-20 sm:bottom-24 right-4 sm:right-8 z-20"
            >
              <motion.div 
                className="bg-black/95 backdrop-blur-sm p-3 sm:p-4 rounded-lg border border-[rgba(255,213,79,0.2)] shadow-lg"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6">
                  <div className="flex items-center gap-3">
                    <span className="text-[rgba(255,213,79,0.8)]">Today:</span>
                    <span className="text-[#ffd54f] text-xl font-bold">{pagesPerDay}p</span>
                  </div>
                  <div className="h-8 w-px bg-[rgba(255,213,79,0.2)]" />
                  <div className="flex items-center gap-3">
                    <span className="text-[rgba(255,213,79,0.8)]">Progress:</span>
                    <span className="text-[#ffd54f] text-xl font-bold">{currentProgress}/604</span>
                  </div>
                  <div 
                    className="w-32 h-2 bg-[rgba(255,213,79,0.1)] rounded-full overflow-hidden"
                  >
                    <div 
                      className="h-full bg-[#ffd54f] transition-all duration-300"
                      style={{ width: `${(currentProgress / 604) * 100}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            // Original sidebar progress content
            <motion.div className={`lg:col-span-2 space-y-4`} layout>
              <motion.div 
                className="bg-[rgba(255,213,79,0.1)] p-4 sm:p-6 rounded-lg border border-[rgba(255,213,79,0.2)]"
                whileHover={{ scale: 1.02 }}
              >
                <h2 className="text-2xl text-[#ffd54f] mb-4">Today's Goal</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[rgba(255,213,79,0.8)]">Daily Goal:</span>
                    <span className="text-[#ffd54f] text-xl">{pagesPerDay} pages</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[rgba(255,213,79,0.8)]">Read Today:</span>
                    <span className="text-[#ffd54f] text-xl">{todayPages} pages</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[rgba(255,213,79,0.8)]">Current Page:</span>
                    <span className="text-[#ffd54f] text-xl">
                      {currentAyahs.length > 0 ? getPageFromAyah(currentAyahs[0]) : '-'}
                    </span>
                  </div>
                  <div className="text-[rgba(255,213,79,0.6)] text-sm">
                    Page numbers are shown automatically based on the Surah you're reading
                  </div>
                  <motion.button
                    className="w-full bg-[rgba(255,213,79,0.2)] border border-[rgba(255,213,79,0.6)] 
                      py-2 rounded-md text-[#ffd54f] mt-4"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => updateProgress(1)}
                  >
                    Mark Page Complete
                  </motion.button>
                </div>
              </motion.div>

              <motion.div 
                className="bg-[rgba(255,213,79,0.1)] p-4 sm:p-6 rounded-lg border border-[rgba(255,213,79,0.2)]"
                whileHover={{ scale: 1.02 }}
              >
                <h2 className="text-2xl text-[#ffd54f] mb-4">Progress</h2>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[rgba(255,213,79,0.8)]">Completed:</span>
                  <span className="text-[#ffd54f]">{currentProgress} pages</span>
                </div>
                <div className="w-full bg-[rgba(255,213,79,0.1)] rounded-full h-2">
                  <div 
                    className="bg-[#ffd54f] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(currentProgress / 604) * 100}%` }}
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
        <div className="space-y-4 sm:space-y-6">
          {currentAyahs.map((ayah) => (
            <motion.div
              key={ayah.number}
              className="p-4 rounded-lg bg-[rgba(255,213,79,0.1)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-[rgba(255,213,79,0.6)] bg-[rgba(255,213,79,0.1)] 
                          px-4 py-2 rounded-full text-sm">
                    {ayah.numberInSurah}
                  </span>
                  <button
                    onClick={() => toggleBookmark(selectedSurah, ayah.numberInSurah)}
                    className={`w-8 h-8 flex items-center justify-center
                      ${isBookmarked(selectedSurah, ayah.numberInSurah)
                        ? 'text-[#ffd54f]'
                        : 'text-gray-400 hover:text-[#ffd54f]'
                      } transition-colors`}
                  >
                    <span className="text-xl">★</span>
                  </button>
                </div>
              </div>
              <p className="text-[#ffd54f] text-2xl font-['Amiri'] text-right leading-loose">
                {ayah.text}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default QuranPage;
