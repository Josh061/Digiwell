import React from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { useIsMobile } from '@/hooks/use-mobile';
import Header from './Header';
import HeroSection from './HeroSection';
import MarketTicker from './MarketTicker';
import TradingDashboard from './TradingDashboard';
import WalletSection from './WalletSection';
import FeaturesSection from './FeaturesSection';
import MobileApp from './MobileApp';
import ComplianceSection from './ComplianceSection';
import Footer from './Footer';

const AppLayout: React.FC = () => {
  const { sidebarOpen, toggleSidebar } = useAppContext();
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      <MarketTicker />
      <HeroSection />
      <TradingDashboard />
      <WalletSection />
      <FeaturesSection />
      <MobileApp />
      <ComplianceSection />
      <Footer />
    </div>
  );
};

export default AppLayout;
