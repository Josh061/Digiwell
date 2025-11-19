import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const TradingDashboard: React.FC = () => {
  const commodities = [
    {
      name: 'Crude Oil (Brent)',
      symbol: 'BRENT',
      price: '$82.45',
      change: '+1.23%',
      volume: '2.4M barrels',
      image: 'https://d64gsuwffb70l.cloudfront.net/68ad070189652538d760a575_1756170043317_5b170af9.webp',
      positive: true
    },
    {
      name: 'Natural Gas',
      symbol: 'NATGAS',
      price: '$3.42',
      change: '-0.45%',
      volume: '1.8M MMBtu',
      image: 'https://d64gsuwffb70l.cloudfront.net/68ad070189652538d760a575_1756170048139_f9f722fa.webp',
      positive: false
    }
  ];

  return (
    <section className="bg-slate-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Global Energy Markets</h2>
          <p className="text-slate-300 text-lg">Trade crude oil and natural gas with blockchain technology</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {commodities.map((commodity, index) => (
            <Card key={index} className="bg-slate-800 border-slate-700 hover:border-slate-600 transition-colors">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={commodity.image} 
                      alt={commodity.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <CardTitle className="text-white">{commodity.name}</CardTitle>
                      <p className="text-slate-400">{commodity.symbol}</p>
                    </div>
                  </div>
                  <Badge 
                    variant={commodity.positive ? "default" : "destructive"}
                    className={commodity.positive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}
                  >
                    {commodity.change}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <div className="text-2xl font-bold text-white">{commodity.price}</div>
                  <div className="text-slate-400">Vol: {commodity.volume}</div>
                </div>
                <div className="flex space-x-3">
                  <Button className="flex-1 bg-green-600 hover:bg-green-700">Buy</Button>
                  <Button variant="outline" className="flex-1 border-red-500 text-red-400 hover:bg-red-500/10">Sell</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TradingDashboard;