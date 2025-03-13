import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { tafseerApi, type TafseerText } from '../services/tafseerApi';

interface TafseerModalProps {
  isOpen: boolean;
  onClose: () => void;
  surahNumber: number;
  ayahNumber: number;
  ayahText: string;
}

const TafseerModal = ({ isOpen, onClose, surahNumber, ayahNumber, ayahText }: TafseerModalProps) => {
  const [tafseerText, setTafseerText] = useState<TafseerText | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const loadTafseer = async () => {
      try {
        setError("");
        setLoading(true);
        const text = await tafseerApi.getTafseerByAyah(surahNumber, ayahNumber);
        if (text) {
          setTafseerText(text);
        } else {
          setError("لا يوجد تفسير لهذه الآية");
        }
      } catch (err) {
        setError("حدث خطأ في تحميل التفسير");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      loadTafseer();
    }
  }, [surahNumber, ayahNumber, isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
          
          <motion.div 
            className="relative bg-[rgba(255,213,79,0.1)] border border-[rgba(255,213,79,0.2)] 
                       rounded-lg w-full max-w-3xl max-h-[80vh] overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl text-[#ffd54f]">التفسير الميسر</h2>
                <button onClick={onClose} className="text-[#ffd54f] hover:text-[#ffd54f]/80">✕</button>
              </div>
              
              <div className="mb-6">
                <p className="text-xl text-[#ffd54f] font-['Amiri'] text-right leading-loose mb-4">
                  {ayahText}
                </p>
              </div>

              <div className="max-h-[50vh] overflow-y-auto">
                {loading ? (
                  <div className="text-center py-8">
                    <span className="text-[#ffd54f]">جاري تحميل التفسير...</span>
                  </div>
                ) : error ? (
                  <div className="text-center py-8 text-red-400">{error}</div>
                ) : tafseerText ? (
                  <div className="bg-[rgba(255,213,79,0.05)] p-4 rounded-lg">
                    <p className="text-gray-300 leading-relaxed text-right">{tafseerText.text}</p>
                  </div>
                ) : null}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TafseerModal;
