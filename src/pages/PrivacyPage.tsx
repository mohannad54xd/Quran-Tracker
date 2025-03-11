import { motion } from 'framer-motion';

const PrivacyPage = () => {
  return (
    <div className="min-h-[calc(100vh-8rem)] py-6">
      <motion.div 
        className="max-w-3xl mx-auto px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h1 className="text-[#ffd54f] text-3xl mb-6">Privacy Policy</h1>
        <div className="space-y-6 text-gray-300">
          <p>
            Your privacy is important to us. This privacy policy explains how we collect,
            use, and protect your personal information.
          </p>
          <div>
            <h2 className="text-[#ffd54f] text-xl mb-2">Data Storage</h2>
            <p>
              All your reading progress and bookmarks are stored locally on your device.
              We do not collect or store any personal information on our servers.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PrivacyPage;
