import { Link } from 'react-router-dom';
import { useState } from 'react';

interface FooterProps {
  onSecretTriggered: () => void;
}

const Footer = ({ onSecretTriggered }: FooterProps) => {
  const [secretClickCount, setSecretClickCount] = useState(0);

  const handleSecretClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const newCount = secretClickCount + 1;
    setSecretClickCount(newCount);
    
    if (newCount === 3) {
      onSecretTriggered();
      setSecretClickCount(0);
    }
  };

  return (
    <footer className="bg-gradient-to-t from-black/95 to-black/60 backdrop-blur-md py-4 sm:py-0 h-auto sm:h-[80px]">
      <div className="h-full max-w-7xl mx-auto px-3 sm:px-4">
        <div className="h-full flex flex-col sm:flex-row items-center gap-4 sm:gap-0 sm:justify-between">
          {/* Logo & Copyright - Stack on mobile */}
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2">
            <span className="text-[#ffd54f] text-xl sm:text-2xl font-['Amiri']">﷽</span>
            <p className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
              © {new Date().getFullYear()} QuranTracker
            </p>
          </div>

          {/* Links & Social - Center on mobile */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-4 sm:gap-6">
              <Link to="/about" className="text-gray-400 hover:text-[#ffd54f] text-xs sm:text-sm">
                About
              </Link>
              <Link to="/privacy" className="text-gray-400 hover:text-[#ffd54f] text-xs sm:text-sm">
                Privacy
              </Link>
              <Link to="/contact" className="text-gray-400 hover:text-[#ffd54f] text-xs sm:text-sm">
                Contact
              </Link>
              <Link 
                to="/special-thanks" 
                className="text-[#ffd54f] hover:text-[#ffd54f]/80 text-xs sm:text-sm 
                           px-3 py-1 rounded-full border border-[#ffd54f]/30 
                           hover:border-[#ffd54f]/60 transition-all duration-300"
              >
                Special Thanks ✨
              </Link>
              <Link 
                to="#"
                onClick={handleSecretClick} 
                className="text-gray-400 hover:text-[#ffd54f]/80 text-xs sm:text-sm
                           px-3 py-1 rounded-full border border-gray-400/30 
                           hover:border-[#ffd54f]/60 transition-all duration-300"
              >
                {secretClickCount > 0 ? "❤️".repeat(secretClickCount) : "❤️"}
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <a 
                href="https://www.instagram.com/trz_mohannad112/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#ffd54f] relative group"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/90 
                               text-[#ffd54f] text-xs rounded opacity-0 group-hover:opacity-100 
                               transition-opacity whitespace-nowrap">
                  @trz_mohannad112
                </span>
              </a>
              <a 
                href="https://www.instagram.com/in.the.seif.zone/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#ffd54f] relative group"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/90 
                               text-[#ffd54f] text-xs rounded opacity-0 group-hover:opacity-100 
                               transition-opacity whitespace-nowrap">
                  @in.the.seif.zone
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
