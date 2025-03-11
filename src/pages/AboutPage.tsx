import { motion } from 'framer-motion';

const AboutPage = () => {
  return (
    <div className="min-h-[calc(100vh-8rem)] py-6">
      <motion.div 
        className="max-w-3xl mx-auto px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h1 className="text-[#ffd54f] text-3xl mb-6">About QuranTracker</h1>
        <div className="space-y-6 text-gray-300">
          <p>
            QuranTracker is a digital platform designed to enhance your Quran reading experience. 
            Our mission is to make the Quran more accessible and help track your reading progress.
          </p>
          <p>
            Features include:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Daily reading tracker</li>
            <li>Multiple Qari recitations</li>
            <li>Bookmark system</li>
            <li>Progress monitoring</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutPage;
