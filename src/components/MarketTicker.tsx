import { useEffect, useState } from 'react';
import { Flame, TrendingUp, TrendingDown, Zap } from 'lucide-react';

export default function MarketTicker() {
  const [prices, setPrices] = useState([
    { symbol: 'CRUDE', price: 82.45, change: 1.2, hot: true },
    { symbol: 'NATGAS', price: 3.25, change: -0.5, hot: false },
    { symbol: 'JETFUEL', price: 95.80, change: 0.8, hot: true },
    { symbol: 'PMS', price: 78.30, change: 1.5, hot: false },
    { symbol: 'LPG', price: 42.60, change: -0.3, hot: false },
    { symbol: 'AGO', price: 85.90, change: 0.9, hot: true }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrices(prev => prev.map(p => ({
        ...p,
        price: p.price + (Math.random() - 0.5) * 0.5,
        change: (Math.random() - 0.5) * 2,
        hot: Math.abs(p.change) > 1
      })));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative bg-flame-dark/80 backdrop-blur-md border-y border-flame-core/30 py-3 overflow-hidden">
      {/* Flame glow effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-flame-core/5 via-transparent to-flame-hot/5 pointer-events-none"></div>
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-flame-dark to-transparent z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-flame-dark to-transparent z-10"></div>

      {/* Live indicator */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex items-center gap-2">
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-flame-core/20 border border-flame-core/30">
          <Zap className="h-3 w-3 text-flame-hot animate-pulse" />
          <span className="text-[10px] font-semibold text-flame-hot uppercase">Live</span>
        </div>
      </div>

      <div className="flex animate-scroll whitespace-nowrap pl-24">
        {[...prices, ...prices].map((item, idx) => (
          <div
            key={idx}
            className={`inline-flex items-center mx-6 px-4 py-1.5 rounded-full transition-all duration-300 ${
              item.hot ? 'bg-flame-core/10 border border-flame-core/20' : 'bg-flame-dark/50'
            }`}
          >
            {/* Symbol with flame indicator for hot items */}
            <div className="flex items-center gap-1.5 mr-3">
              {item.hot && (
                <Flame className="h-3 w-3 text-flame-hot animate-flame-flicker" />
              )}
              <span className={`font-flame font-bold ${item.hot ? 'text-flame-hot' : 'text-flame-glow'}`}>
                {item.symbol}
              </span>
            </div>

            {/* Price */}
            <span className="text-flame-light font-mono mr-3">${item.price.toFixed(2)}</span>

            {/* Change indicator */}
            <span className={`text-sm flex items-center gap-1 ${
              item.change >= 0
                ? 'text-emerald-400'
                : 'text-flame-core'
            }`}>
              {item.change >= 0 ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              <span className="font-semibold">{Math.abs(item.change).toFixed(2)}%</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
