import { useLocation } from 'react-router-dom';
import Background from './Background';
import Footer from './Footer';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
  onSecretTriggered: () => void;
}

const Layout = ({ children, onSecretTriggered }: LayoutProps) => {
  const location = useLocation();
  const hideFooter = location.pathname === '/quran/listen' || location.pathname === '/quran';

  return (
    <div className="flex flex-col min-h-screen font-['Cairo']">
      <Background />
      <Navbar />
      <main className="relative z-10 flex-grow pt-20 sm:pt-24">
        {children}
      </main>
      {!hideFooter && <Footer onSecretTriggered={onSecretTriggered} />}
    </div>
  );
};

export default Layout;
