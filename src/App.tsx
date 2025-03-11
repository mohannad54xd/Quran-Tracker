import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <Router>
      <SettingsProvider>
        <RamadanProvider>
          <Layout>
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
            </Routes>
          </Layout>
        </RamadanProvider>
      </SettingsProvider>
    </Router>
  );
}

export default App;
