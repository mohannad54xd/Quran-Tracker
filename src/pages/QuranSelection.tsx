import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Bismillah from '../components/Bismillah';

const QuranSelection = () => {
  return (
    <div className="min-h-[calc(100vh-8rem)] py-6">
      <div className="max-w-6xl mx-auto px-4">
        {/* Center Bismillah with proper spacing */}
        <div className="flex flex-col items-center mb-8">
          <Bismillah />
        </div>
        <motion.div 
          className="max-w-4xl mx-auto px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <SelectionCard
              title="Read Quran"
              description="Choose a surah, read with translation, and track your daily progress in Ramadan"
              icon="📖"
              to="/quran"
            />
            <SelectionCard
              title="Listen to Quran"
              description="Listen to beautiful recitations from your favorite Qaris while following along"
              icon="🎧"
              to="/quran/listen"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const SelectionCard = ({ title, description, icon, to }: {
  title: string;
  description: string;
  icon: string;
  to: string;
}) => (
  <motion.div
    className="h-full"
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <Link to={to} className="h-full block">
      <div className="bg-[rgba(255,213,79,0.1)] p-8 rounded-lg border border-[rgba(255,213,79,0.2)] 
        hover:bg-[rgba(255,213,79,0.15)] transition-all duration-300 h-full flex flex-col items-center justify-between">
        <div className="flex flex-col items-center text-center">
          <span className="text-6xl mb-8">{icon}</span>
          <h2 className="text-2xl text-[#ffd54f] mb-4 font-bold">{title}</h2>
          <p className="text-[rgba(255,213,79,0.8)] text-lg leading-relaxed">{description}</p>
        </div>
        <motion.div 
          className="mt-8 w-12 h-12 rounded-full bg-[rgba(255,213,79,0.2)] flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
        >
          <span className="text-2xl text-[#ffd54f]">→</span>
        </motion.div>
      </div>
    </Link>
  </motion.div>
);

export default QuranSelection;
