import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useRamadan } from '../contexts/RamadanContext';

const HomePage = () => {
  const navigate = useNavigate();
  const { currentProgress, pagesPerDay, todayPages } = useRamadan();

  const boxes = [
    {
      title: "Listen to Quran",
      description: "Listen to your favorite reciter",
      icon: "🎧",
      color: "from-[#FFD54F]/20 to-[#FFD54F]/5",
      link: "/quran/listen",
      stats: null
    },
    {
      title: "Read Quran",
      description: "Continue your daily reading",
      icon: "📖",
      color: "from-[#4CAF50]/20 to-[#4CAF50]/5",
      link: "/quran",
      stats: {
        main: `${todayPages}/${pagesPerDay}`,
        label: "Today's pages"
      }
    },
    {
      title: "Track Progress",
      description: "View your reading progress",
      icon: "📈",
      color: "from-[#2196F3]/20 to-[#2196F3]/5",
      link: "/progress",
      stats: {
        main: `${Math.round((currentProgress / 604) * 100)}%`,
        label: "Completed"
      }
    }
  ];

  return (
    <div className="min-h-[calc(100vh-8rem)] py-6 sm:py-12">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl text-[#ffd54f] font-bold mb-4 px-2">
            Welcome to QuranTracker
          </h1>
          <p className="text-[rgba(255,213,79,0.8)] text-lg">
            Start your daily Quran journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {boxes.map((box, index) => (
            <motion.div
              key={box.title}
              className={`bg-gradient-to-br ${box.color} backdrop-blur-sm 
                         border border-white/10 rounded-xl p-6 cursor-pointer
                         hover:border-[#ffd54f]/30 transition-all duration-300`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { delay: index * 0.1 }
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(box.link)}
            >
              <div className="flex flex-col h-full">
                <div className="text-3xl mb-4">{box.icon}</div>
                <h2 className="text-[#ffd54f] text-xl font-bold mb-2">
                  {box.title}
                </h2>
                <p className="text-[rgba(255,213,79,0.6)] mb-4">
                  {box.description}
                </p>
                {box.stats && (
                  <div className="mt-auto pt-4 border-t border-white/10">
                    <div className="text-[#ffd54f] text-2xl font-bold">
                      {box.stats.main}
                    </div>
                    <div className="text-[rgba(255,213,79,0.6)] text-sm">
                      {box.stats.label}
                    </div>
                  </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

        <div className="text-center px-4">
          <motion.button
            onClick={() => navigate('/selection')}
            className="w-full sm:w-auto bg-[rgba(255,213,79,0.2)] text-[#ffd54f] 
                     px-8 sm:px-12 py-3 sm:py-4 rounded-full border border-[rgba(255,213,79,0.3)]
                     hover:bg-[rgba(255,213,79,0.3)] transition-all duration-300
                     font-bold text-lg sm:text-xl group inline-flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Journey
            <span className="inline-block ml-2 transform group-hover:translate-x-1 transition-transform">
              →
            </span>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
