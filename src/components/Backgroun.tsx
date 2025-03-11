import { motion } from 'framer-motion';

const Background = () => {
  return (
    <div className="fixed inset-0 overflow-hidden bg-gradient-to-br from-[#0a0f3d] via-[#141852] to-[#1a237e]">
      <motion.div
        className="absolute w-[60px] h-[60px] top-10 left-10"
        initial={{ y: 0 }}
        animate={{ y: [-15, 0, -15] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-full h-full rounded-full shadow-[15px_15px_0_0_rgba(255,213,79,0.6)] transform rotate-[20deg]" />
      </motion.div>

      <motion.div
        className="absolute w-[40px] h-[60px] top-20 right-20"
        initial={{ y: 0 }}
        animate={{ y: [-10, 0, -10] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-full h-full rounded-lg bg-[rgba(255,152,0,0.3)] shadow-[0_0_20px_rgba(255,152,0,0.2)]
          before:content-[''] before:absolute before:top-[-10px] before:left-[15px] before:w-[10px] before:h-[10px] 
          before:bg-[rgba(255,152,0,0.4)] before:rounded-full
          after:content-[''] after:absolute after:bottom-[-5px] after:left-[10px] after:w-[20px] after:h-[5px] 
          after:bg-[rgba(255,152,0,0.4)] after:rounded-b-lg" />
      </motion.div>

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
