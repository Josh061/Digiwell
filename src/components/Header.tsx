import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-900 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-yellow-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">DW</span>
              </div>
              <span className="text-white font-bold text-xl">Digiwell</span>
            </div>
            <Badge variant="secondary" className="bg-green-500/20 text-green-400">
              Live Market
            </Badge>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-slate-300 hover:text-white transition-colors">Trading</a>
            <a href="#" className="text-slate-300 hover:text-white transition-colors">Wallet</a>
            <a href="#" className="text-slate-300 hover:text-white transition-colors">Markets</a>
            <a href="#" className="text-slate-300 hover:text-white transition-colors">Analytics</a>
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
              Connect Wallet
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-blue-500 to-yellow-500 hover:from-blue-600 hover:to-yellow-600">
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;