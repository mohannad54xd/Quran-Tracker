import { motion } from 'framer-motion';

const FloatingHeart = ({ delay = 0, style }: { delay?: number; style?: React.CSSProperties }) => (
  <motion.div
    className="absolute text-pink-400/20 text-4xl pointer-events-none"
    style={style}
    initial={{ y: 0, x: "-50%" }}
    animate={{
      y: [-20, 20, -20],
      opacity: [0.2, 0.5, 0.2],
    }}
    transition={{
      y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
      opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" },
      delay
    }}
  >
    ❤️
  </motion.div>
);

const SecretPage = () => {
  return (
    <div className="min-h-[calc(100vh-8rem)] py-12 px-4 flex items-center justify-center relative overflow-hidden">
      {/* Background floating hearts */}
      <FloatingHeart delay={0} style={{ left: "20%", top: "20%" }} />
      <FloatingHeart delay={1} style={{ left: "80%", top: "30%" }} />
      <FloatingHeart delay={2} style={{ left: "40%", top: "70%" }} />
      <FloatingHeart delay={1.5} style={{ left: "70%", top: "60%" }} />
      
      <motion.div
        className="bg-gradient-to-b from-[rgba(255,105,180,0.15)] to-[rgba(255,105,180,0.05)] 
                   p-10 rounded-3xl border border-[rgba(255,105,180,0.3)]
                   backdrop-blur-md relative overflow-hidden text-center
                   shadow-2xl shadow-pink-500/10 max-w-lg w-full
                   hover:shadow-pink-500/20 transition-shadow duration-500"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div 
          className="mb-8 relative"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", delay: 0.3, stiffness: 60 }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-pink-400/20 to-transparent rounded-full" />
          <img 
            src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzAwM2U1cTJkamUyMHN2OW9jNDdjd2lrbG5hZDUyZ3AwMzkwNzc4bSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/osjgQPWRx3cac/giphy.gif"
            alt="Heart Animation"
            className="w-56 h-56 mx-auto rounded-full object-cover 
                     border-4 border-pink-400/30 shadow-lg shadow-pink-500/20
                     hover:border-pink-400/50 transition-all duration-300"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <motion.h2 
            className="text-4xl font-semibold bg-gradient-to-r from-pink-400 to-pink-300 
                       bg-clip-text text-transparent mb-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Jana
          </motion.h2>
          <motion.p 
            className="text-pink-300/80 text-lg font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            شكرا لرأيك في الموقع🫶
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default SecretPage;
