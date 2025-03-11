import { motion } from 'framer-motion';

const Bismillah = () => {
  return (
    <motion.div 
      className="text-center mb-6 sm:mb-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      <motion.h1 
        className="text-3xl sm:text-6xl md:text-7xl lg:text-8xl text-[#ffd54f] font-['Amiri'] leading-relaxed tracking-wider"
        style={{
          textShadow: '0 0 30px rgba(255, 213, 79, 0.3)',
          fontFeatureSettings: '"arab"'
        }}
      >
        ﷽
      </motion.h1>
      <motion.div 
        className="h-0.5 w-16 sm:w-48 md:w-64 mx-auto mt-3 sm:mt-8 rounded-full"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255, 213, 79, 0.6), transparent)'
        }}
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />
    </motion.div>
  );
};

export default Bismillah;
