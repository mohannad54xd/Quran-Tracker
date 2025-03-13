import { motion } from 'framer-motion';

const SpecialThanksPage = () => {
  const contributors = [
    {
      name: "Mohannad Essam",
      role: "Project Lead & Developer",
      githubUrl: "https://github.com/mohannadessam",
      instagramUrl: "https://www.instagram.com/trz_mohannad112/"
    },
    {
      name: "Seif Shawky",
      role: "idea ",
      instagramUrl: "https://www.instagram.com/in.the.seif.zone/"
    }
  ];

  const communitySuggestions = [
    {
      name: "@Ziad Ali",
      suggestion: "Add a feature to keep ayahs", 
      instagramUrl: "https://www.instagram.com/ziadalianas.10"
    },
    {
      name: "@Belal Yasser",
      suggestion: "Add Douaa ",
      instagramUrl: "https://www.instagram.com/666_belal_666"
    },
    {
      name: "@Mands",
      suggestion: "Add tafseer for each ayah",
      instagramUrl: "https://www.instagram.com/_mands_s_"
    },
    {
      name: "@Youssef Ahmed",
      suggestion: "Add Azkar for each day",
      instagramUrl: "https://www.instagram.com/__youssefsoliman__"
    },
    {
      name: "@Mahmoud",
      suggestion: "Add a feature to bookmark ayahs",
      instagramUrl: "https://www.instagram.com/ma7moud__1_1"
    },

  ];

  return (
    <div className="min-h-[calc(100vh-8rem)] py-6">
      <motion.div 
        className="max-w-4xl mx-auto px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Special Title */}
        <motion.div 
          className="text-center mb-12"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl sm:text-6xl font-bold mb-4 
                         bg-gradient-to-r from-[#ffd54f] to-[#ff9f43] bg-clip-text text-transparent">
            Special Thanks
          </h1>
          <div className="flex justify-center gap-2">
            <span className="text-4xl">✨</span>
            <span className="text-4xl">🌙</span>
            <span className="text-4xl">✨</span>
          </div>
        </motion.div>

        <div className="space-y-8">
          {/* Core Team Section */}
          <motion.div
            className="bg-[rgba(255,213,79,0.15)] p-8 rounded-2xl border border-[rgba(255,213,79,0.3)]
                       backdrop-blur-sm relative overflow-hidden"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            {/* Decorative elements */}
            <div className="absolute -top-12 -right-12 w-24 h-24 bg-[#ffd54f] opacity-10 rounded-full blur-2xl" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[#ffd54f] opacity-10 rounded-full blur-2xl" />

            <h2 className="text-3xl text-[#ffd54f] mb-6 font-bold relative">
              Core Team 
              <span className="ml-2">👥</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contributors.map((contributor, index) => (
                <motion.div
                  key={contributor.name}
                  className="bg-[rgba(255,213,79,0.1)] p-6 rounded-xl hover:bg-[rgba(255,213,79,0.15)]
                           transition-all duration-300 border border-[rgba(255,213,79,0.2)]
                           hover:border-[rgba(255,213,79,0.4)]"
                  initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="text-2xl text-[#ffd54f] mb-2">{contributor.name}</h3>
                  <p className="text-gray-300 mb-4">{contributor.role}</p>
                  <div className="flex gap-4">
                    {contributor.githubUrl && (
                      <a
                        href={contributor.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-400 hover:text-[#ffd54f] 
                                 transition-colors px-3 py-1.5 rounded-full
                                 border border-[rgba(255,213,79,0.3)] hover:border-[rgba(255,213,79,0.6)]"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        GitHub
                      </a>
                    )}
                    {contributor.instagramUrl && (
                      <a
                        href={contributor.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-400 hover:text-[#ffd54f] 
                                 transition-colors px-3 py-1.5 rounded-full
                                 border border-[rgba(255,213,79,0.3)] hover:border-[rgba(255,213,79,0.6)]"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                        Instagram
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Add Community Suggestions Section */}
          <motion.div
            className="bg-[rgba(255,213,79,0.15)] p-8 rounded-2xl border border-[rgba(255,213,79,0.3)]
                       backdrop-blur-sm relative overflow-hidden mt-8"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <div className="absolute -top-12 -right-12 w-24 h-24 bg-[#ffd54f] opacity-10 rounded-full blur-2xl" />
            
            <h2 className="text-3xl text-[#ffd54f] mb-6 font-bold">
              Community Ideas 
              <span className="ml-2">💡</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {communitySuggestions.map((person, index) => (
                <motion.div
                  key={person.name}
                  className="bg-[rgba(255,213,79,0.1)] p-4 rounded-xl border border-[rgba(255,213,79,0.2)]
                           hover:border-[rgba(255,213,79,0.4)] transition-all duration-300"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[#ffd54f] font-medium">{person.name}</p>
                      <p className="text-gray-400 text-sm mt-1">"{person.suggestion}"</p>
                    </div>
                    <a
                      href={person.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-[#ffd54f] transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Resources Section with new styling */}
          <motion.div
            className="bg-[rgba(255,213,79,0.15)] p-8 rounded-2xl border border-[rgba(255,213,79,0.3)]
                       backdrop-blur-sm relative overflow-hidden"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="absolute -top-12 -left-12 w-24 h-24 bg-[#ffd54f] opacity-10 rounded-full blur-2xl" />
            
            <h2 className="text-3xl text-[#ffd54f] mb-6 font-bold">
              Resources & APIs 
              <span className="ml-2">🛠️</span>
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { name: "Quran.com API", desc: "Quran text and translations", icon: "📖" },
                { name: "EveryAyah.com", desc: "Quran audio recitations", icon: "🎵" },
                { name: "QuranEnc.com", desc: "Tafseer and interpretations", icon: "📚" },
                { name: "HisnMuslim", desc: "Comprehensive Azkar collection", icon: "🤲" }
              ].map((resource, index) => (
                <motion.div
                  key={resource.name}
                  className="bg-[rgba(255,213,79,0.1)] p-4 rounded-xl border border-[rgba(255,213,79,0.2)]
                           hover:border-[rgba(255,213,79,0.4)] transition-all duration-300"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="text-2xl mb-2 block">{resource.icon}</span>
                  <h3 className="text-[#ffd54f] font-medium mb-1">{resource.name}</h3>
                  <p className="text-gray-400 text-sm">{resource.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default SpecialThanksPage;
