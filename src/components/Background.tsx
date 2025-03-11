import { motion } from 'framer-motion';

const Background = () => {
  return (
    <div className="fixed inset-0 bg-[#1a1a1a] overflow-hidden">
      {/* Moon */}
      <div className="absolute right-20 top-32 w-32 h-32 rounded-full bg-[#ffd54f] opacity-20 blur-2xl" />
      
      {/* Lantern */}
      <div className="absolute -left-16 top-40 w-64 h-64 rounded-full bg-[#ffd54f] opacity-10 blur-3xl" />
      
      {/* Additional decorative elements */}
      <div className="absolute right-1/4 top-96 w-24 h-24 rounded-full bg-[#ffd54f] opacity-5 blur-xl" />
      <div className="absolute left-1/3 top-1/2 w-16 h-16 rounded-full bg-[#ffd54f] opacity-10 blur-lg" />
      
      <Stars />
    </div>
  );
};

const Stars = () => {
  return (
    <div className="absolute inset-0">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-[2px] h-[2px] bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          initial={{ opacity: 0.3 }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

export default Background;
