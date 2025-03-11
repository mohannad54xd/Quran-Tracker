import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { quranApi, type Surah, type Ayah, availableQaris, type Qari } from '../services/quranApi';
import Bismillah from '../components/Bismillah';
import AudioControls from '../components/AudioControls';

interface Bookmark {
  surahNumber: number;
  ayahNumber: number;
  timestamp: number;
  note?: string;
}

const QuranListen = () => {
  const [selectedSurah, setSelectedSurah] = useState<number>(0);
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [currentAyahs, setCurrentAyahs] = useState<Ayah[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAyahIndex, setCurrentAyahIndex] = useState(0);
  const [currentSurahIndex, setCurrentSurahIndex] = useState<number>(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [selectedStyle, setSelectedStyle] = useState<'Murattal' | 'Mujawwad'>('Murattal');
  const [selectedQari, setSelectedQari] = useState<Qari>(availableQaris.Murattal[0]);
  const [audioError, setAudioError] = useState<string>('');
  const ayahRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [nextAudioUrl, setNextAudioUrl] = useState<string>('');
  const [surahSearch, setSurahSearch] = useState('');
  const [qariSearch, setQariSearch] = useState('');
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(
    JSON.parse(localStorage.getItem('quranBookmarks') || '[]')
  );
  const [isQariDropdownOpen, setIsQariDropdownOpen] = useState(false);
  const [isSurahDropdownOpen, setIsSurahDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredSurahs = surahs.filter(surah => 
    surah.name.toLowerCase().includes(surahSearch.toLowerCase()) ||
    surah.englishName.toLowerCase().includes(surahSearch.toLowerCase()) ||
    surah.number.toString().includes(surahSearch) ||
    surah.englishNameTranslation.toLowerCase().includes(surahSearch.toLowerCase())
  );

  const filteredQaris = availableQaris[selectedStyle].filter(qari =>
    qari.name.toLowerCase().includes(qariSearch.toLowerCase())
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsQariDropdownOpen(false);
        setIsSurahDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const loadSurah = async (surahNumber: number) => {
    try {
      setLoading(true);
      const data = await quranApi.getSurah(surahNumber);
      setCurrentAyahs(data.ayahs);
      setCurrentAyahIndex(0);
      setCurrentAudio('');
      setIsPlaying(false);
    } catch (error) {
      console.error('Error loading surah:', error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToAyah = (index: number) => {
    ayahRefs.current[index]?.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  };

  const playAyah = async (ayahNumber: number) => {
    if (!selectedSurah) return;
    try {
      setAudioError('');
      const audioUrl = await quranApi.getAudioByAyah(selectedSurah, ayahNumber, selectedQari.identifier);
      
      // Preload next ayah if available
      let nextAudioUrl = '';
      if (ayahNumber < currentAyahs.length) {
        nextAudioUrl = await quranApi.getAudioByAyah(selectedSurah, ayahNumber + 1, selectedQari.identifier);
      }

      setCurrentAudio(audioUrl);
      setCurrentAyahIndex(ayahNumber - 1);
      setIsPlaying(true);
      scrollToAyah(ayahNumber - 1);
      
      // Store next audio URL for preloading
      setNextAudioUrl(nextAudioUrl);
    } catch (error) {
      console.error('Error loading audio:', error);
      setAudioError('Failed to load audio. Please try again.');
      setIsPlaying(false);
    }
  };

  const playFullSurah = () => {
    if (currentAyahs.length > 0) {
      playAyah(currentAyahs[0].numberInSurah);
    }
  };

  const playNextSurah = async () => {
    if (currentSurahIndex < surahs.length - 1) {
      const nextSurahNumber = surahs[currentSurahIndex + 1].number;
      setCurrentSurahIndex(currentSurahIndex + 1);
      setSelectedSurah(nextSurahNumber);
      await loadSurah(nextSurahNumber);
      playAyah(1); // Play first ayah of next surah
    }
  };

  const handleAyahEnd = () => {
    if (currentAyahIndex < currentAyahs.length - 1) {
      // Play next ayah in current surah
      playAyah(currentAyahs[currentAyahIndex + 1].numberInSurah);
    } else if (isAutoPlay) {
      // Move to next surah if auto-play is enabled
      playNextSurah();
    }
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {
          setAudioError('Failed to play audio. Please try again.');
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleQariChange = async (newQari: Qari) => {
    setSelectedQari(newQari);
    if (currentAyahIndex >= 0 && selectedSurah) {
      setIsPlaying(false);
      await playAyah(currentAyahs[currentAyahIndex].numberInSurah);
    }
  };

  const handleStyleChange = (style: 'Murattal' | 'Mujawwad') => {
    setSelectedStyle(style);
    const newQari = availableQaris[style][0];
    handleQariChange(newQari);
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
    <div className="min-h-[calc(100vh-8rem)] py-4 sm:py-6 pb-24">
      <motion.div className="max-w-6xl mx-auto px-2 sm:px-4">
        <Bismillah />
        
        <div className="w-full">
          {/* Main Container */}
          <div className="bg-[rgba(255,213,79,0.1)] p-6 rounded-lg">
            {/* Show error message if exists */}
            {audioError && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400">
                {audioError}
              </div>
            )}
            
            <div className="flex flex-col gap-3 sm:gap-4 mb-4 sm:mb-6">
              {/* Style and Qari Selection */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4" ref={dropdownRef}>
                <select 
                  className="bg-[rgba(255,213,79,0.2)] text-lg p-2 rounded-md border border-[rgba(255,213,79,0.3)]"
                  onChange={(e) => handleStyleChange(e.target.value as 'Murattal' | 'Mujawwad')}
                  value={selectedStyle}
                >
                  <option value="Murattal">Murattal Style</option>
                  <option value="Mujawwad">Mujawwad Style</option>
                </select>

                <div className="relative">
                  <div 
                    onClick={() => setIsQariDropdownOpen(!isQariDropdownOpen)}
                    className="w-full bg-[rgba(255,213,79,0.2)] text-lg p-2 rounded-md 
                              border border-[rgba(255,213,79,0.3)] cursor-pointer flex justify-between items-center"
                  >
                    <span className="truncate">{selectedQari.name}</span>
                    <span className="ml-2">▼</span>
                  </div>
                  
                  {isQariDropdownOpen && (
                    <div className="absolute z-50 w-full mt-1 max-h-60 overflow-y-auto 
                                bg-black/90 backdrop-blur-lg rounded-md border border-[rgba(255,213,79,0.2)]">
                      <input
                        type="text"
                        placeholder="Search reciters..."
                        value={qariSearch}
                        onChange={(e) => setQariSearch(e.target.value)}
                        className="w-full bg-[rgba(255,213,79,0.1)] p-2 border-b border-[rgba(255,213,79,0.2)]
                                  text-[#ffd54f] placeholder-[#ffd54f]/50"
                        onClick={(e) => e.stopPropagation()}
                      />
                      {filteredQaris.map((qari) => (
                        <button
                          key={qari.identifier}
                          className="w-full text-left px-3 py-2 hover:bg-[rgba(255,213,79,0.1)] 
                                  text-[#ffd54f] flex items-center justify-between"
                          onClick={() => {
                            handleQariChange(qari);
                            setQariSearch('');
                            setIsQariDropdownOpen(false);
                          }}
                        >
                          <span className="truncate">{qari.name}</span>
                          {selectedQari.identifier === qari.identifier && <span>✓</span>}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative">
                  <div 
                    onClick={() => setIsSurahDropdownOpen(!isSurahDropdownOpen)}
                    className="w-full bg-[rgba(255,213,79,0.2)] text-lg p-2 rounded-md 
                              border border-[rgba(255,213,79,0.3)] cursor-pointer flex justify-between items-center"
                  >
                    <span className="truncate">
                      {selectedSurah ? `${selectedSurah}. ${surahs.find(s => s.number === selectedSurah)?.englishName}` : 'Select Surah'}
                    </span>
                    <span className="ml-2">▼</span>
                  </div>

                  {isSurahDropdownOpen && (
                    <div className="absolute z-50 w-full mt-1 max-h-60 overflow-y-auto 
                                bg-black/90 backdrop-blur-lg rounded-md border border-[rgba(255,213,79,0.2)]">
                      <input
                        type="text"
                        placeholder="Search by number or name..."
                        value={surahSearch}
                        onChange={(e) => setSurahSearch(e.target.value)}
                        className="w-full bg-[rgba(255,213,79,0.1)] p-2 border-b border-[rgba(255,213,79,0.2)]
                                  text-[#ffd54f] placeholder-[#ffd54f]/50"
                        onClick={(e) => e.stopPropagation()}
                      />
                      {filteredSurahs.map((surah) => (
                        <button
                          key={surah.number}
                          className="w-full text-left px-3 py-2 hover:bg-[rgba(255,213,79,0.1)] 
                                  text-[#ffd54f] flex items-center justify-between"
                          onClick={() => {
                            setSelectedSurah(surah.number);
                            loadSurah(surah.number);
                            setSurahSearch('');
                            setIsSurahDropdownOpen(false);
                          }}
                        >
                          <span className="truncate">
                            {surah.number}. {surah.englishName} - {surah.name}
                          </span>
                          {selectedSurah === surah.number && <span>✓</span>}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Controls Row */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <motion.button
                  onClick={() => setIsAutoPlay(!isAutoPlay)}
                  className={`px-4 py-2 rounded-lg border ${
                    isAutoPlay 
                      ? 'bg-[rgba(255,213,79,0.3)] border-[rgba(255,213,79,0.6)]' 
                      : 'bg-[rgba(255,213,79,0.1)] border-[rgba(255,213,79,0.3)]'
                  } text-[#ffd54f]`}
                >
                  {isAutoPlay ? '🔄 Auto-Play On' : '📑 Auto-Play Off'}
                </motion.button>

                <motion.button
                  onClick={playFullSurah}
                  disabled={!selectedSurah || loading}
                  className="w-12 h-12 flex items-center justify-center text-2xl
                    bg-[rgba(255,213,79,0.2)] hover:bg-[rgba(255,213,79,0.3)]
                    rounded-full border border-[rgba(255,213,79,0.4)]
                    text-[#ffd54f] disabled:opacity-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ▶
                </motion.button>
              </div>
            </div>

            {/* Ayahs Display */}
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <span className="text-[#ffd54f] text-xl">Loading...</span>
              </div>
            ) : (
              <div className="space-y-6">
                {currentAyahs.map((ayah, index) => (
                  <motion.div
                    key={ayah.number}
                    ref={el => { ayahRefs.current[index] = el; }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`p-4 rounded-lg ${
                      currentAyahIndex === index ? 'bg-[rgba(255,213,79,0.2)]' : ''
                    }`}
                  >
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => playAyah(ayah.numberInSurah)}
                          disabled={loading}
                          className="w-12 h-12 flex items-center justify-center text-2xl
                            bg-[rgba(255,213,79,0.2)] hover:bg-[rgba(255,213,79,0.3)] 
                            rounded-full border border-[rgba(255,213,79,0.4)]
                            text-[#ffd54f] transition-all duration-300
                            disabled:opacity-50"
                        >
                          {currentAyahIndex === index && isPlaying ? '⏸' : '▶'}
                        </button>
                        
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
                      <span className="text-[rgba(255,213,79,0.6)] bg-[rgba(255,213,79,0.1)] 
                        px-4 py-2 rounded-full text-sm">
                        {ayah.numberInSurah}
                      </span>
                    </div>
                    <p className="text-[#ffd54f] text-2xl font-['Amiri'] text-right leading-loose">
                      {ayah.text}
                    </p>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {currentAudio && (
          <AudioControls
            audioUrl={currentAudio}
            ayahNumber={currentAyahIndex + 1}
            totalAyahs={currentAyahs.length}
            qariName={selectedQari.name}
            surahName={surahs[selectedSurah - 1]?.name || ''}
            isPlaying={isPlaying}
            audioRef={audioRef}
            onPlayPause={togglePlayPause}
            onNext={() => {
              if (currentAyahIndex < currentAyahs.length - 1) {
                playAyah(currentAyahs[currentAyahIndex + 1].numberInSurah);
              }
            }}
            onPrevious={() => {
              if (currentAyahIndex > 0) {
                playAyah(currentAyahs[currentAyahIndex - 1].numberInSurah);
              }
            }}
            onEnded={handleAyahEnd}
            onError={() => {
              setAudioError('Failed to load audio. Please try another reciter.');
              setIsPlaying(false);
            }}
            onSeek={(ayahNumber) => {
              playAyah(ayahNumber);
            }}
            nextAudioUrl={nextAudioUrl}
          />
        )}
      </motion.div>
    </div>
  );
};

export default QuranListen;
