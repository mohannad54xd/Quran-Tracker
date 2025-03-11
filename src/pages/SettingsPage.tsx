import { motion } from 'framer-motion';
import { useSettings } from '../contexts/SettingsContext';

const SettingsPage = () => {
  const { settings, updateSetting } = useSettings();

  return (
    <div className="min-h-[calc(100vh-8rem)] py-6 relative">
      {/* Blur Overlay */}
      <div className="absolute inset-0 z-50 backdrop-blur-md bg-black/50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold text-[#ffd54f] mb-4">Coming Soon</h2>
          <p className="text-[rgba(255,213,79,0.8)] text-lg">
            Settings page is under development
          </p>
        </motion.div>
      </div>

      {/* Existing Settings Content (Blurred) */}
      <motion.div 
        className="max-w-3xl mx-auto px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h1 className="text-[#ffd54f] text-3xl mb-8">Settings</h1>

        <div className="space-y-6">
          {/* Appearance */}
          <motion.div className="bg-[rgba(255,213,79,0.1)] p-6 rounded-lg">
            <h2 className="text-[#ffd54f] text-xl mb-4">Appearance</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Theme</span>
                <select
                  value={settings.theme}
                  onChange={(e) => updateSetting('theme', e.target.value as 'dark' | 'light')}
                  className="bg-[rgba(255,213,79,0.2)] text-[#ffd54f] p-2 rounded-md"
                >
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Font Size</span>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min={16}
                    max={32}
                    value={settings.fontSize}
                    onChange={(e) => updateSetting('fontSize', Number(e.target.value))}
                    className="w-32"
                  />
                  <span className="text-[#ffd54f] w-12">{settings.fontSize}px</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Reading Preferences */}
          <motion.div className="bg-[rgba(255,213,79,0.1)] p-6 rounded-lg">
            <h2 className="text-[#ffd54f] text-xl mb-4">Reading Preferences</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Daily Reading Goal (pages)</span>
                <input
                  type="number"
                  min={1}
                  max={30}
                  value={settings.readingGoal}
                  onChange={(e) => updateSetting('readingGoal', Number(e.target.value))}
                  className="bg-[rgba(255,213,79,0.2)] text-[#ffd54f] p-2 rounded-md w-24"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Auto-scroll while playing audio</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.autoScroll}
                    onChange={(e) => updateSetting('autoScroll', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:bg-[#ffd54f] 
                                peer-checked:after:translate-x-full after:content-[''] after:absolute 
                                after:top-0.5 after:left-[2px] after:bg-black after:rounded-full 
                                after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
            </div>
          </motion.div>

          {/* Notifications */}
          <motion.div className="bg-[rgba(255,213,79,0.1)] p-6 rounded-lg">
            <h2 className="text-[#ffd54f] text-xl mb-4">Notifications</h2>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Enable Notifications</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications}
                  onChange={(e) => updateSetting('notifications', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:bg-[#ffd54f] 
                              peer-checked:after:translate-x-full after:content-[''] after:absolute 
                              after:top-0.5 after:left-[2px] after:bg-black after:rounded-full 
                              after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default SettingsPage;
