import React, { useState } from 'react';

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (password: string) => void;
}

const PasswordModal = ({ isOpen, onClose, onSubmit }: PasswordModalProps) => {
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(password);
    setPassword('');
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[9999]">
      <div className="bg-[#1a1a1a]/90 p-8 rounded-2xl shadow-2xl border border-[#ffd54f]/30 w-[90%] max-w-sm
                    backdrop-blur-md transform transition-all duration-300 ease-out animate-fadeIn">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-[#ffd54f] text-2xl font-semibold mb-6 text-center">Enter Password ✨</h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#2a2a2a] text-white px-4 py-3 rounded-lg border border-gray-600 
                     focus:border-[#ffd54f] focus:outline-none text-center text-lg"
            autoFocus
            placeholder="• • • •"
          />
          <div className="flex justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-gray-300 hover:text-white transition-colors 
                       border border-gray-600 rounded-lg hover:border-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#ffd54f] text-black rounded-lg 
                       hover:bg-[#ffd54f]/90 transition-colors font-medium"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordModal;