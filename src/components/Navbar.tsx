import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { title: 'Home', path: '/' },
    { title: 'Quran', path: '/selection' },
    { title: 'Progress', path: '/progress' },
    { title: 'Bookmarks', path: '/bookmarks' },
    { title: 'Settings', path: '/settings' },
  ];

  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="h-14 sm:h-16 max-w-7xl mx-auto px-4">
        <div className="h-full flex items-center justify-between">
          {/* Logo - Different versions for mobile and desktop */}
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            {/* Mobile Logo (simple version) */}
            <Link to="/" className="flex items-center gap-2 sm:hidden">
              <motion.span 
                className="text-[#ffd54f] text-2xl font-['Amiri']"
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              >﷽</motion.span>
              <span className="text-[#ffd54f] text-sm font-semibold">Quran</span>
            </Link>

            {/* Desktop Logo (original version) */}
            <motion.div 
              className="hidden sm:flex items-center gap-4"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-center h-16 px-4">
                <span 
                  className="text-[#ffd54f] text-4xl font-['Amiri'] leading-none rtl"
                  style={{
                    textShadow: '0 0 15px rgba(255, 213, 79, 0.3)',
                    fontFeatureSettings: '"arab"'
                  }}
                >
                  ﷽
                </span>
              </div>
              <div className="h-8 w-px bg-gradient-to-b from-transparent via-[rgba(255,213,79,0.3)] to-transparent" />
              <span className="text-[#ffd54f] text-xl font-bold tracking-wide">QuranTracker</span>
            </motion.div>
          </motion.div>

          {/* Desktop Menu - Updated hover effect */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.div key={item.path}>
                <Link
                  to={item.path}
                  className="text-[#ffd54f] hover:text-[rgba(255,213,79,0.8)] relative group 
                           text-left px-2 py-1 transition-colors duration-200"
                >
                  {item.title}
                  <span className="absolute inset-0 bg-[rgba(255,213,79,0.1)] rounded-lg 
                                scale-0 group-hover:scale-100 transition-transform duration-200" />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center"
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            <div className={`w-5 h-0.5 bg-[#ffd54f] rounded-full transition-all duration-300 
              ${isOpen ? 'transform rotate-45 translate-y-1' : 'transform rotate-0'}`} 
            />
            <div className={`w-5 h-0.5 bg-[#ffd54f] rounded-full my-1 transition-all duration-300 
              ${isOpen ? 'opacity-0' : 'opacity-100'}`} 
            />
            <div className={`w-5 h-0.5 bg-[#ffd54f] rounded-full transition-all duration-300 
              ${isOpen ? 'transform -rotate-45 -translate-y-1' : 'transform rotate-0'}`} 
            />
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div 
        className="md:hidden fixed inset-x-0 top-14 sm:top-16 bg-black/95 backdrop-blur-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ 
          opacity: isOpen ? 1 : 0,
          y: isOpen ? 0 : -20,
          height: isOpen ? 'auto' : 0
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <motion.div className="py-2 px-4">
          {navItems.map((item, index) => (
            <motion.div
              key={item.path}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: isOpen ? 0 : -20, opacity: isOpen ? 1 : 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="block py-3 text-[#ffd54f] text-lg border-b border-[#ffd54f]/10
                         hover:bg-[#ffd54f]/10 rounded-lg px-4 transition-all duration-300"
              >
                {item.title}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
