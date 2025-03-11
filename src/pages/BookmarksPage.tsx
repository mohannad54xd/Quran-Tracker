import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { quranApi, type Surah, type Ayah } from '../services/quranApi';

interface Bookmark {
  surahNumber: number;
  ayahNumber: number;
  timestamp: number;
  note?: string;
}

const BookmarksPage = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [bookmarkedAyahs, setBookmarkedAyahs] = useState<Map<string, Ayah>>(new Map());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // Load surahs
        const surahsData = await quranApi.getSurahs();
        setSurahs(surahsData);

        // Load and validate bookmarks from localStorage
        const savedBookmarks = localStorage.getItem('quranBookmarks');
        let parsedBookmarks: Bookmark[] = [];
        
        if (savedBookmarks) {
          try {
            const parsed = JSON.parse(savedBookmarks);
            if (Array.isArray(parsed)) {
              parsedBookmarks = parsed.filter(bookmark => 
                bookmark && 
                typeof bookmark.surahNumber === 'number' && 
                typeof bookmark.ayahNumber === 'number' &&
                bookmark.timestamp
              );
            }
          } catch (e) {
            console.error('Error parsing bookmarks:', e);
          }
        }

        setBookmarks(parsedBookmarks.sort((a, b) => b.timestamp - a.timestamp));

        // Load ayahs for valid bookmarks only
        const ayahsMap = new Map<string, Ayah>();
        for (const bookmark of parsedBookmarks) {
          try {
            const surahData = await quranApi.getSurah(bookmark.surahNumber);
            if (surahData && surahData.ayahs && bookmark.ayahNumber <= surahData.ayahs.length) {
              const ayah = surahData.ayahs[bookmark.ayahNumber - 1];
              if (ayah) {
                ayahsMap.set(`${bookmark.surahNumber}-${bookmark.ayahNumber}`, ayah);
              }
            }
          } catch (error) {
            console.error(`Error loading ayah for surah ${bookmark.surahNumber}:`, error);
          }
        }
        setBookmarkedAyahs(ayahsMap);
      } catch (error) {
        console.error('Error loading bookmarks:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const removeBookmark = (surahNumber: number, ayahNumber: number) => {
    const newBookmarks = bookmarks.filter(
      b => !(b.surahNumber === surahNumber && b.ayahNumber === ayahNumber)
    );
    setBookmarks(newBookmarks);
    localStorage.setItem('quranBookmarks', JSON.stringify(newBookmarks));
  };

  const updateNote = (surahNumber: number, ayahNumber: number, note: string) => {
    const newBookmarks = bookmarks.map(b => {
      if (b.surahNumber === surahNumber && b.ayahNumber === ayahNumber) {
        return { ...b, note };
      }
      return b;
    });
    setBookmarks(newBookmarks);
    localStorage.setItem('quranBookmarks', JSON.stringify(newBookmarks));
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] py-6">
      <motion.div 
        className="max-w-6xl mx-auto px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h1 className="text-[#ffd54f] text-3xl mb-6">Bookmarks</h1>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <span className="text-[#ffd54f] text-xl">Loading bookmarks...</span>
          </div>
        ) : bookmarks.length === 0 ? (
          <div className="bg-[rgba(255,213,79,0.1)] p-6 rounded-lg text-center">
            <p className="text-[#ffd54f] mb-4">No bookmarks yet</p>
            <Link 
              to="/selection" 
              className="inline-block px-4 py-2 bg-[rgba(255,213,79,0.2)] 
                         hover:bg-[rgba(255,213,79,0.3)] rounded-lg 
                         border border-[rgba(255,213,79,0.4)] text-[#ffd54f]
                         transition-all duration-300"
            >
              Start Reading
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {bookmarks.map(bookmark => {
              const ayah = bookmarkedAyahs.get(`${bookmark.surahNumber}-${bookmark.ayahNumber}`);
              const surah = surahs.find(s => s.number === bookmark.surahNumber);

              if (!ayah || !surah) return null;

              return (
                <motion.div
                  key={`${bookmark.surahNumber}-${bookmark.ayahNumber}`}
                  className="bg-[rgba(255,213,79,0.1)] p-6 rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-[#ffd54f] text-xl">
                        {surah.englishName} ({surah.name})
                      </h3>
                      <p className="text-gray-400">Ayah {bookmark.ayahNumber}</p>
                    </div>
                    <button
                      onClick={() => removeBookmark(bookmark.surahNumber, bookmark.ayahNumber)}
                      className="text-red-400 hover:text-red-300 p-2"
                    >
                      ✕
                    </button>
                  </div>

                  <p className="text-[#ffd54f] text-2xl font-['Amiri'] text-right leading-loose mb-4">
                    {ayah.text}
                  </p>

                  <textarea
                    value={bookmark.note || ''}
                    onChange={(e) => updateNote(bookmark.surahNumber, bookmark.ayahNumber, e.target.value)}
                    placeholder="Add a note..."
                    className="w-full bg-[rgba(255,213,79,0.1)] text-gray-300 p-2 rounded-md 
                             border border-[rgba(255,213,79,0.3)] placeholder-gray-500
                             focus:outline-none focus:border-[rgba(255,213,79,0.6)]"
                    rows={2}
                  />

                  <div className="mt-2 text-gray-500 text-sm">
                    Bookmarked on {new Date(bookmark.timestamp).toLocaleDateString()}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default BookmarksPage;
