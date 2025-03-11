import { motion } from 'framer-motion';
import { useState } from 'react';
import { Ayah } from '../services/quranApi';

interface QuranDisplayProps {
  ayahs: Ayah[];
  loading: boolean;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

const QuranDisplay = ({ ayahs, loading, isExpanded, onToggleExpand }: QuranDisplayProps) => {
  const [fontSize, setFontSize] = useState(40); // Start with 40px font size

  const groupAyahsByPage = (ayahs: Ayah[]) => {
    const groups: { [key: number]: Ayah[] } = {};
    ayahs.forEach(ayah => {
      if (!groups[ayah.page]) {
        groups[ayah.page] = [];
      }
      groups[ayah.page].push(ayah);
    });
    return groups;
  };

  const pageGroups = groupAyahsByPage(ayahs);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-[#ffd54f] text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Font size controls - now sticky */}
      <div className="sticky top-0 z-10 flex items-center justify-between gap-4 p-3 bg-[rgba(10,15,61,0.95)] border-b border-[rgba(255,213,79,0.2)]">
        <button
          onClick={onToggleExpand}
          className="text-[#ffd54f] hover:bg-[rgba(255,213,79,0.1)] p-2 rounded flex items-center gap-2"
        >
          <span>{isExpanded ? '⟵' : '⟶'}</span>
          <span className="text-sm">{isExpanded ? 'Collapse' : 'Expand'}</span>
        </button>

        <div className="flex items-center gap-4">
          <span className="text-[rgba(255,213,79,0.8)]">Font Size:</span>
          <button
            onClick={() => setFontSize(prev => Math.max(32, prev - 4))}
            className="text-[#ffd54f] hover:bg-[rgba(255,213,79,0.1)] p-2 rounded"
          >
            -
          </button>
          <span className="text-[#ffd54f] w-12 text-center">{fontSize}px</span>
          <button
            onClick={() => setFontSize(prev => Math.min(60, prev + 4))}
            className="text-[#ffd54f] hover:bg-[rgba(255,213,79,0.1)] p-2 rounded"
          >
            +
          </button>
        </div>
      </div>

      {/* Scrollable container with proper height */}
      <div className="flex-1 overflow-y-auto overscroll-contain">
        <div className="p-6 min-h-full">
          {Object.entries(pageGroups).map(([page, pageAyahs]) => (
            <div key={page} className="relative mb-12">
              <div className="sticky top-16 left-0 mb-4">
                <span className="text-[rgba(255,213,79,0.6)] text-sm bg-[rgba(10,15,61,0.95)] px-3 py-1 rounded-full">
                  Page {page}
                </span>
              </div>
              {pageAyahs.map(ayah => (
                <motion.div
                  key={ayah.number}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center"
                >
                  <p 
                    className="arabic-text text-[#ffd54f] font-['Amiri'] leading-[2] tracking-wide my-6 mx-auto"
                    style={{ 
                      fontSize: `${fontSize}px`,
                      maxWidth: isExpanded ? '1800px' : '1200px'
                    }}
                    dir="rtl"
                  >
                    {ayah.text}
                    <span className="inline-block opacity-60 mx-2" style={{ fontSize: `${fontSize * 0.6}px` }}>
                      ﴿{ayah.numberInSurah}﴾
                    </span>
                  </p>
                </motion.div>
              ))}
            </div>
          ))}
          {isExpanded ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed bottom-20 right-8 flex gap-4"  // Changed from bottom-8 to bottom-20
            >
              {/* ...existing progress panel code... */}
            </motion.div>
          ) : (
            <div>
              {/* ...existing sidebar code... */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuranDisplay;
