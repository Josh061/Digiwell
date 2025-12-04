import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import MarketTicker from '@/components/MarketTicker';
import DigitalWallet from '@/components/DigitalWallet';
import ApplicationModal from '@/components/ApplicationModal';
import GPSTracker from '@/components/GPSTracker';
import AdminDashboard from '@/components/AdminDashboard';
import MarketIntelligence from '@/components/MarketIntelligence';
import EscrowDashboard from '@/components/EscrowDashboard';
import TokenMarketplace from '@/components/TokenMarketplace';
import KYCVerification from '@/components/KYCVerification';
import KYCAdminPanel from '@/components/KYCAdminPanel';
import Login from '@/components/Login';
import Signup from '@/components/Signup';
import UserProfile from '@/components/UserProfile';
import { RoleManagement } from '@/components/RoleManagement';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Home, User, Shield, Wallet, TrendingUp, Settings, Flame, Zap, MapPin, Lock } from 'lucide-react';



export default function AppLayout() {
  const { user, userProfile, loading, signOut, hasRole } = useAuth();
  const isMobile = useIsMobile();
  const [showWallet, setShowWallet] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showTracker, setShowTracker] = useState(false);
  const [activeTab, setActiveTab] = useState('products');
  const [authView, setAuthView] = useState<'login' | 'signup'>('login');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tabs = [
    { id: 'products', label: 'Products', icon: Home, roles: ['admin', 'trader', 'viewer'] },
    { id: 'profile', label: 'Profile', icon: User, roles: ['admin', 'trader', 'viewer'] },
    { id: 'kyc', label: 'KYC', icon: Shield, roles: ['admin', 'trader', 'viewer'] },
    { id: 'tokenization', label: 'Tokenization', icon: Wallet, roles: ['admin', 'trader'] },
    { id: 'escrow', label: 'Escrow', icon: Wallet, roles: ['admin', 'trader'] },
    { id: 'market', label: 'Market', icon: TrendingUp, roles: ['admin', 'trader', 'viewer'] },
    { id: 'admin', label: 'Admin', icon: Settings, roles: ['admin'] },
    { id: 'kyc-admin', label: 'KYC Admin', icon: Shield, roles: ['admin'] },
    { id: 'role-management', label: 'Roles', icon: Settings, roles: ['admin'] }
  ];

  const visibleTabs = tabs.filter(tab => hasRole(tab.roles));



  if (loading) {
    return (
      <div className="min-h-screen gradient-flame-hero flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 animate-fade-in">
          <div className="relative">
            <Flame className="h-16 w-16 text-flame-hot animate-flame-flicker" />
            <div className="absolute inset-0 bg-flame-core/30 blur-xl rounded-full"></div>
          </div>
          <div className="text-flame-light text-xl font-flame tracking-wider">Loading...</div>
          <div className="w-48 h-1 bg-flame-dark rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-flame-ember via-flame-core to-flame-hot animate-shimmer"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen gradient-flame-hero flex items-center justify-center p-6 relative overflow-hidden">
        {/* Animated ember particles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="ember-particle" style={{ top: '20%', left: '10%' }}></div>
          <div className="ember-particle" style={{ top: '40%', left: '85%' }}></div>
          <div className="ember-particle" style={{ top: '70%', left: '25%' }}></div>
          <div className="ember-particle" style={{ top: '30%', left: '70%' }}></div>
          <div className="ember-particle" style={{ top: '80%', left: '60%' }}></div>
        </div>
        <div className="animate-fade-in relative z-10">
        {authView === 'login' ? (
          <Login onSwitchToSignup={() => setAuthView('signup')} />
        ) : (
          <Signup onSwitchToLogin={() => setAuthView('login')} />
        )}
        </div>
      </div>
    );
  }

  const handleApplicationSubmit = (data: any) => {
    alert(`Application submitted for ${data.product.name}!\nPayment Method: ${data.paymentMethod}\nTotal: $${(data.product.price * data.quantity * (data.paymentMethod === 'digicoin' ? 1.015 : 1.025)).toLocaleString()}`);
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen gradient-flame-hero pb-20 md:pb-0 safe-area-inset">
      {/* Hero Section */}
      <div className="relative h-[420px] md:h-[580px] overflow-hidden pt-safe">
        {/* Animated Background Layers */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-flame-dark via-flame-ember/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-flame-core/20 via-flame-hot/10 to-transparent animate-flame-flicker"></div>
          <div className="absolute inset-0 bg-[url('https://d64gsuwffb70l.cloudfront.net/69138b477443873c621b20e5_1762888613603_6f97c63b.webp')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        </div>

        {/* Floating ember particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="ember-particle" style={{ bottom: '30%', left: '15%' }}></div>
          <div className="ember-particle" style={{ bottom: '50%', left: '75%' }}></div>
          <div className="ember-particle" style={{ bottom: '20%', left: '45%' }}></div>
          <div className="ember-particle" style={{ bottom: '60%', left: '30%' }}></div>
        </div>

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 md:px-6 w-full">
            <div className="max-w-3xl animate-fade-in">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-flame-light mb-4 md:mb-6 leading-tight">
                <span className="inline-flex items-center gap-3 md:gap-4">
                  <span className="relative inline-flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-2xl glass-flame animate-ember-glow">
                    <Flame className="h-7 w-7 md:h-8 md:w-8 text-flame-hot animate-flame-flicker" />
                  </span>
                  <span className="flex flex-col items-start">
                    <span className="uppercase tracking-[0.3em] text-xs md:text-sm text-flame-hot font-flame">
                      Digiwell
                    </span>
                    <span className="font-flame">
                      <span className="text-flame-light">Energy</span>{' '}
                      <span className="text-flame">Trading Hub</span>
                    </span>
                  </span>
                </span>
              </h1>
              <p className="text-base md:text-xl lg:text-2xl text-flame-light/80 mb-6 md:mb-10 leading-relaxed">
                <span className="text-flame-hot">Flame-fast</span> petroleum deals • <span className="text-flame-glow">Tokenized</span> payments • <span className="text-flame-hot">Live</span> logistics
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <Button
                  onClick={() => {
                    setActiveTab('products');
                    setMobileMenuOpen(false);
                  }}
                  size="xl"
                  className="group"
                >
                  <Zap className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                  Start Trading
                </Button>
                <Button
                  onClick={() => setShowWallet(true)}
                  variant="outline"
                  size="xl"
                >
                  <Wallet className="mr-2 h-5 w-5" />
                  Open Wallet
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MarketTicker />

      {/* Navigation Tabs - Desktop */}
      {!isMobile && (
        <div className="glass-flame border-b border-flame-core/20 shadow-lg sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-4 py-3">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src="/image/digiwell%20logo.png"
                  alt="Digiwell"
                  className="h-9 md:h-10 w-auto rounded-xl bg-flame-dark/50 p-1.5 shadow-ember border border-flame-core/30"
                />
              </div>
              <div className="hidden md:block text-flame-hot font-flame font-semibold tracking-wider text-sm">
                DIGIWELL
              </div>
            </div>
            <div className="flex gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {visibleTabs.map(tab => {
              const Icon = tab.icon;
              return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                  className={`px-4 md:px-5 py-2.5 font-semibold transition-all whitespace-nowrap rounded-xl touch-manipulation min-h-[44px] flex items-center gap-2 ${
                  activeTab === tab.id
                      ? 'bg-gradient-to-r from-flame-core to-flame-hot text-flame-dark shadow-flame'
                      : 'text-flame-light/80 hover:text-flame-hot hover:bg-flame-core/10'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
              );
            })}
          </div>
            <div className="flex items-center gap-3 md:gap-4">
            {userProfile && (
                <Badge className="bg-flame-ember/80 text-flame-light capitalize px-4 py-2 rounded-full font-semibold text-xs border border-flame-core/30 shadow-glow">{userProfile.role}</Badge>
            )}
            <Button
              onClick={signOut}
              variant="ember"
              size="sm"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
      )}

      {/* Mobile Menu Button */}
      {isMobile && (
        <div className="glass-flame border-b border-flame-core/20 shadow-lg sticky top-0 z-40 safe-area-top">
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center py-3">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-flame-hot hover:bg-flame-core/10 min-w-[44px] min-h-[44px]"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] bg-gradient-to-br from-flame-dark via-flame-smoke to-flame-dark border-flame-core/30">
                <SheetHeader>
                  <SheetTitle className="text-flame-hot text-left font-flame flex items-center gap-2">
                    <Flame className="h-5 w-5" />
                    Menu
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-2">
                  {visibleTabs.map(tab => {
                    const Icon = tab.icon || Home;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setActiveTab(tab.id);
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all touch-manipulation min-h-[48px] ${
                          activeTab === tab.id
                            ? 'bg-gradient-to-r from-flame-core to-flame-hot text-flame-dark shadow-flame'
                            : 'text-flame-light/80 hover:text-flame-hot hover:bg-flame-core/10'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                  <div className="pt-4 border-t border-flame-core/20 mt-4">
                    {userProfile && (
                      <div className="px-4 py-2 mb-2">
                        <Badge className="bg-flame-ember/80 text-flame-light capitalize w-full justify-center py-2 border border-flame-core/30">{userProfile.role}</Badge>
                      </div>
                    )}
                    <Button
                      onClick={() => {
                        signOut();
                        setMobileMenuOpen(false);
                      }}
                      variant="ember"
                      className="w-full min-h-[48px]"
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <div className="flex items-center gap-3">
              <img
                src="/image/digiwell%20logo.png"
                alt="Digiwell"
                className="h-8 w-auto rounded-xl bg-flame-dark/50 p-1 shadow-ember border border-flame-core/30"
              />
              {userProfile && (
                <Badge className="bg-flame-ember/80 text-flame-light capitalize px-3 py-1.5 rounded-full font-semibold text-xs border border-flame-core/30">{userProfile.role}</Badge>
              )}
            </div>
          </div>
        </div>
      )}





      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-16">
        {activeTab === 'products' && (
          <>
            <div className="text-center mb-8 md:mb-16 animate-fade-in">
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-flame-light mb-3 md:mb-4 font-flame">
                <span className="text-flame">Digiwell</span> Products Catalog
              </h2>
              <p className="text-flame-light/70 text-sm md:text-lg lg:text-xl px-4">
                <span className="text-flame-hot">High-velocity</span> petroleum trading • <span className="text-flame-glow">Instant</span> allocation • <span className="text-flame-hot">Secure</span> settlements
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
              {products.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onApply={setSelectedProduct}
                />
              ))}
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-12 md:mb-16">
              <div className="ember-card p-6 md:p-8 rounded-2xl hover:scale-[1.02] transition-all duration-300 touch-manipulation group">
                <div className="w-16 h-16 bg-gradient-to-br from-flame-core/30 to-flame-hot/20 rounded-2xl flex items-center justify-center mb-6 group-hover:animate-ember-glow">
                  <Flame className="w-8 h-8 text-flame-hot" />
                </div>
                <h3 className="text-xl font-bold text-flame-light mb-3 font-flame">Flame Wallet</h3>
                <p className="text-flame-light/70 leading-relaxed">Multi-currency wallet optimized for high-frequency petroleum trades.</p>
              </div>
              <div className="ember-card p-6 md:p-8 rounded-2xl hover:scale-[1.02] transition-all duration-300 touch-manipulation group">
                <div className="w-16 h-16 bg-gradient-to-br from-flame-hot/30 to-flame-glow/20 rounded-2xl flex items-center justify-center mb-6 group-hover:animate-ember-glow">
                  <MapPin className="w-8 h-8 text-flame-glow" />
                </div>
                <h3 className="text-xl font-bold text-flame-light mb-3 font-flame">GPS Tracking</h3>
                <p className="text-flame-light/70 leading-relaxed mb-4">Real-time delivery tracking with accurate ETA calculations</p>
                <button
                  onClick={() => setShowTracker(true)}
                  className="text-flame-hot hover:text-flame-glow font-semibold text-sm transition-colors flex items-center gap-1"
                >
                  View Demo Tracking
                  <Zap className="h-4 w-4" />
                </button>
              </div>
              <div className="ember-card p-6 md:p-8 rounded-2xl hover:scale-[1.02] transition-all duration-300 touch-manipulation group">
                <div className="w-16 h-16 bg-gradient-to-br from-flame-glow/30 to-flame-light/20 rounded-2xl flex items-center justify-center mb-6 group-hover:animate-ember-glow">
                  <Lock className="w-8 h-8 text-flame-light" />
                </div>
                <h3 className="text-xl font-bold text-flame-light mb-3 font-flame">Secure Payments</h3>
                <p className="text-flame-light/70 leading-relaxed">Card, bank transfer, LOC, and crypto with 1% DigiCoin savings</p>
              </div>
            </div>
          </>
        )}

        {activeTab === 'profile' && <UserProfile />}
        {activeTab === 'kyc' && <KYCVerification />}
        {activeTab === 'tokenization' && hasRole(['admin', 'trader']) && <TokenMarketplace />}
        {activeTab === 'escrow' && hasRole(['admin', 'trader']) && <EscrowDashboard />}
        {activeTab === 'market' && <MarketIntelligence />}
        {activeTab === 'admin' && hasRole('admin') && <AdminDashboard />}
        {activeTab === 'kyc-admin' && hasRole('admin') && <KYCAdminPanel />}
        {activeTab === 'role-management' && hasRole('admin') && <RoleManagement />}

        {/* Access Denied Message */}
        {!hasRole(tabs.find(t => t.id === activeTab)?.roles || []) && (
          <div className="text-center py-12">
            <div className="ember-card border-destructive/50 p-8 max-w-md mx-auto">
              <div className="w-16 h-16 bg-destructive/20 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <Shield className="w-8 h-8 text-destructive" />
              </div>
              <h3 className="text-2xl font-bold text-flame-light mb-2 font-flame">Access Denied</h3>
              <p className="text-flame-light/70">You don't have permission to access this feature.</p>
              <p className="text-flame-hot/60 text-sm mt-2">Current role: {userProfile?.role}</p>
            </div>
          </div>
        )}



      </div>


      {/* Bottom Navigation - Mobile */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 glass-flame border-t border-flame-core/30 z-50 safe-area-bottom">
          <div className="max-w-7xl mx-auto px-2 py-2">
            <div className="flex justify-around items-center">
              {visibleTabs.slice(0, 5).map(tab => {
                const Icon = tab.icon || Home;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all touch-manipulation min-h-[56px] min-w-[56px] ${
                      activeTab === tab.id
                        ? 'text-flame-dark bg-gradient-to-t from-flame-core to-flame-hot shadow-glow'
                        : 'text-flame-light/70 hover:text-flame-hot'
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${activeTab === tab.id ? 'animate-pulse' : ''}`} />
                    <span className="text-xs font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-flame-dark/90 backdrop-blur-md border-t border-flame-core/20 mt-12 md:mt-20 relative overflow-hidden">
        {/* Subtle flame glow at top */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-flame-core/50 to-transparent"></div>
        <div className="absolute top-0 left-1/4 right-1/4 h-20 bg-flame-core/5 blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-16 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <div>
              <h3 className="text-flame font-flame font-bold text-2xl mb-4 flex items-center gap-2">
                <Flame className="h-6 w-6 text-flame-hot" />
                Digiwell
              </h3>
              <p className="text-flame-light/60 text-sm leading-relaxed">
                A next-generation petroleum trading hub with flame-fast execution, blockchain settlement, and real-time logistics.
              </p>
            </div>
            <div>
              <h4 className="text-flame-light font-semibold mb-6">Products</h4>
              <ul className="space-y-3 text-flame-light/60 text-sm">
                <li><a href="#" className="hover:text-flame-hot transition-colors">Crude Oil</a></li>
                <li><a href="#" className="hover:text-flame-hot transition-colors">Natural Gas</a></li>
                <li><a href="#" className="hover:text-flame-hot transition-colors">Aviation Fuel</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-flame-light font-semibold mb-6">Company</h4>
              <ul className="space-y-3 text-flame-light/60 text-sm">
                <li><a href="#" className="hover:text-flame-hot transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-flame-hot transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-flame-hot transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-flame-light font-semibold mb-6">Legal</h4>
              <ul className="space-y-3 text-flame-light/60 text-sm">
                <li><a href="#" className="hover:text-flame-hot transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-flame-hot transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-flame-hot transition-colors">Compliance</a></li>
              </ul>
            </div>
          </div>
          <div className="flame-divider my-8"></div>
          <div className="text-center text-flame-light/50 text-sm">
            © 2025 Digiwell. All rights reserved. <span className="text-flame-hot">Powered by Flame Technology</span>
          </div>
        </div>
      </footer>

      {showWallet && <DigitalWallet onClose={() => setShowWallet(false)} />}
      {selectedProduct && (
        <ApplicationModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)}
          onSubmit={handleApplicationSubmit}
        />
      )}
      {showTracker && <GPSTracker orderId="ORD-2025-1001" onClose={() => setShowTracker(false)} />}
    </div>
  );
}
