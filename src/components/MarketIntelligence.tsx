export default function MarketIntelligence() {
  const news = [
    { title: 'OPEC+ Extends Production Cuts Through Q2 2025', time: '2 hours ago', source: 'Reuters' },
    { title: 'Brent Crude Rises 2.3% on Supply Concerns', time: '5 hours ago', source: 'Bloomberg' },
    { title: 'Natural Gas Demand Surges in Asian Markets', time: '8 hours ago', source: 'Financial Times' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700 p-6">
        <h3 className="text-2xl font-bold text-white mb-6">Market Intelligence</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-slate-800 rounded-lg p-4">
            <div className="text-slate-400 text-sm mb-4">Price Trends (30 Days)</div>
            <div className="space-y-3">
              {['Crude Oil', 'Natural Gas', 'Jet Fuel'].map((product, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white">{product}</span>
                    <span className="text-green-400">+{(Math.random() * 5).toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-[#00D4FF] to-[#D4AF37] h-2 rounded-full"
                      style={{ width: `${60 + Math.random() * 30}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-800 rounded-lg p-4">
            <div className="text-slate-400 text-sm mb-4">Trading Volume</div>
            <div className="space-y-3">
              {['Today', 'This Week', 'This Month'].map((period, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <span className="text-white">{period}</span>
                  <span className="text-[#D4AF37] font-bold">${(Math.random() * 50 + 10).toFixed(1)}M</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg p-4">
          <div className="text-slate-400 text-sm mb-4">Latest OPEC News</div>
          <div className="space-y-3">
            {news.map((item, idx) => (
              <div key={idx} className="border-l-2 border-[#D4AF37] pl-4 py-2">
                <div className="text-white font-semibold mb-1">{item.title}</div>
                <div className="text-slate-400 text-xs">{item.source} • {item.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
