import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { RamadanProvider } from './contexts/RamadanContext';
import { SettingsProvider } from './contexts/SettingsContext';
import Layout from './components/Layout';
import HomePage from './pages/Home';
import QuranPage from './pages/Quran';
import QuranSelection from './pages/QuranSelection';
import QuranListen from './pages/QuranListen';
import Progress from './pages/Progress';
import BookmarksPage from './pages/BookmarksPage';
import SettingsPage from './pages/SettingsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import AzkarPage from './pages/AzkarPage';
import SpecialThanksPage from './pages/SpecialThanksPage';
import SecretPage from './pages/SecretPage';
import PasswordModal from './components/PasswordModal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePasswordSubmit = (password: string) => {
    if (password === '2008') {
      window.location.href = '/secret';
    } else {
      alert('Incorrect password');
    }
    setIsModalOpen(false);
  };

  return (
    <Router>
      <SettingsProvider>
        <RamadanProvider>
          <Layout onSecretTriggered={() => setIsModalOpen(true)}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/selection" element={<QuranSelection />} />
              <Route path="/quran" element={<QuranPage />} />
              <Route path="/quran/listen" element={<QuranListen />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="/bookmarks" element={<BookmarksPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/azkar" element={<AzkarPage />} />
              <Route path="/special-thanks" element={<SpecialThanksPage />} />
              <Route path="/secret" element={<SecretPage />} />
            </Routes>
            <PasswordModal 
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onSubmit={handlePasswordSubmit}
            />
          </Layout>
        </RamadanProvider>
      </SettingsProvider>
    </Router>
  );
}

export default App;
