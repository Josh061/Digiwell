import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const WalletSection: React.FC = () => {
  const tokens = [
    {
      name: 'Digiwell Token',
      symbol: 'DW',
      balance: '1,250.00',
      value: '$1,250.00',
      image: 'https://d64gsuwffb70l.cloudfront.net/68ad070189652538d760a575_1756170062279_104a7993.webp'
    },
    {
      name: 'Oil Futures Token',
      symbol: 'OFT',
      balance: '45.5',
      value: '$3,752.25',
      image: 'https://d64gsuwffb70l.cloudfront.net/68ad070189652538d760a575_1756170064507_34e85e80.webp'
    },
    {
      name: 'Gas Futures Token',
      symbol: 'GFT',
      balance: '128.2',
      value: '$438.28',
      image: 'https://d64gsuwffb70l.cloudfront.net/68ad070189652538d760a575_1756170066507_868a6f5b.webp'
    }
  ];

  return (
    <section className="bg-slate-800 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="mb-4 bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
              Digital Wallet
            </Badge>
            <h2 className="text-3xl font-bold text-white mb-6">
              Secure Token Management
            </h2>
            <p className="text-slate-300 text-lg mb-8">
              Store and manage your Digiwell tokens with enterprise-grade security. 
              Process energy trades with just 2% fees and instant settlement.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-slate-300">Multi-signature security</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-slate-300">Instant blockchain settlement</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-slate-300">International compliance</span>
              </div>
            </div>

            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-yellow-500 hover:from-blue-600 hover:to-yellow-600">
              Connect Wallet
            </Button>
          </div>

          <div className="space-y-4">
            <Card className="bg-slate-900 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Portfolio Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white mb-2">$5,440.53</div>
                <Badge className="bg-green-500/20 text-green-400">+12.4% this month</Badge>
              </CardContent>
            </Card>

            {tokens.map((token, index) => (
              <Card key={index} className="bg-slate-900 border-slate-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={token.image} 
                        alt={token.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <div className="text-white font-medium">{token.name}</div>
                        <div className="text-slate-400 text-sm">{token.symbol}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-medium">{token.balance}</div>
                      <div className="text-slate-400 text-sm">{token.value}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WalletSection;