import { motion } from 'framer-motion';

const ContactPage = () => {
  return (
    <div className="min-h-[calc(100vh-8rem)] py-6">
      <motion.div 
        className="max-w-3xl mx-auto px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h1 className="text-[#ffd54f] text-3xl mb-6">Contact Us</h1>
        <div className="space-y-6">
          <div className="bg-[rgba(255,213,79,0.1)] p-6 rounded-lg">
            <h2 className="text-[#ffd54f] text-xl mb-4">Get in Touch</h2>
            <p className="text-gray-300 mb-4">
              For support or inquiries, you can reach us at:
            </p>
            <a 
              href="mailto:mohannadessam54@gmail.com" 
              className="text-[#ffd54f] hover:text-[rgba(255,213,79,0.8)]"
            >
              Mohannadessam54@gmail.com
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactPage;
