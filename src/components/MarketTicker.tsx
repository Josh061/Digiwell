import React from 'react';
import { Badge } from '@/components/ui/badge';

const MarketTicker: React.FC = () => {
  const marketData = [
    { symbol: 'BRENT', price: '$82.45', change: '+1.23%', positive: true },
    { symbol: 'WTI', price: '$78.92', change: '+0.87%', positive: true },
    { symbol: 'NATGAS', price: '$3.42', change: '-0.45%', positive: false },
    { symbol: 'DW TOKEN', price: '$1.00', change: '+2.15%', positive: true },
  ];

  return (
    <div className="bg-slate-800 border-y border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-12 space-x-8 overflow-x-auto">
          <span className="text-slate-400 text-sm font-medium whitespace-nowrap">Live Prices:</span>
          {marketData.map((item, index) => (
            <div key={index} className="flex items-center space-x-2 whitespace-nowrap">
              <span className="text-white font-medium">{item.symbol}</span>
              <span className="text-slate-300">{item.price}</span>
              <Badge 
                variant={item.positive ? "default" : "destructive"}
                className={`text-xs ${item.positive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}
              >
                {item.change}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketTicker;