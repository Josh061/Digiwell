import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-slate-900 overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="https://d64gsuwffb70l.cloudfront.net/68ad070189652538d760a575_1756170038879_9b2ddc15.webp"
          alt="Energy Trading Platform"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/60"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="mb-4 bg-blue-500/20 text-blue-400 border-blue-500/30">
              Blockchain Energy Trading
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Trade Energy
              <span className="bg-gradient-to-r from-blue-400 to-yellow-400 bg-clip-text text-transparent"> Globally</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Process crude oil and natural gas sales on the blockchain with Digiwell tokens. 
              Only 2% processing fee with international market standards compliance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-yellow-500 hover:from-blue-600 hover:to-yellow-600 text-white px-8">
                Start Trading
              </Button>
              <Button size="lg" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                View Markets
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-800">
              <div>
                <div className="text-2xl font-bold text-white">$2.4B+</div>
                <div className="text-sm text-slate-400">Trading Volume</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">2%</div>
                <div className="text-sm text-slate-400">Processing Fee</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-sm text-slate-400">Global Markets</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;