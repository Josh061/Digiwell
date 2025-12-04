import { TrendingUp, BarChart3, Newspaper, Flame, DollarSign } from 'lucide-react';

export default function MarketIntelligence() {
  const news = [
    { title: 'OPEC+ Extends Production Cuts Through Q2 2025', time: '2 hours ago', source: 'Reuters' },
    { title: 'Brent Crude Rises 2.3% on Supply Concerns', time: '5 hours ago', source: 'Bloomberg' },
    { title: 'Natural Gas Demand Surges in Asian Markets', time: '8 hours ago', source: 'Financial Times' }
  ];

  const products = [
    { name: 'Crude Oil', change: '+3.2%', progress: 78 },
    { name: 'Natural Gas', change: '+1.8%', progress: 65 },
    { name: 'Jet Fuel', change: '+2.5%', progress: 72 }
  ];

  const volumes = [
    { period: 'Today', amount: '$24.5M' },
    { period: 'This Week', amount: '$156.2M' },
    { period: 'This Month', amount: '$892.7M' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-3 bg-gradient-to-br from-flame-core to-flame-hot rounded-xl shadow-lg shadow-flame-core/30">
          <BarChart3 className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-flame-light">Market Intelligence</h2>
          <p className="text-flame-light/60">Real-time petroleum market insights</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-gradient-to-br from-flame-dark to-flame-dark/80 rounded-2xl border border-flame-core/20 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Price Trends */}
          <div className="bg-flame-dark/50 rounded-xl p-5 border border-flame-core/10">
            <div className="flex items-center gap-2 text-flame-light/60 text-sm mb-4">
              <TrendingUp className="h-4 w-4 text-flame-hot" />
              Price Trends (30 Days)
            </div>
            <div className="space-y-4">
              {products.map((product, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-flame-light font-medium">{product.name}</span>
                    <span className="text-green-400 font-semibold bg-green-500/10 px-2 py-0.5 rounded-full text-xs">{product.change}</span>
                  </div>
                  <div className="w-full bg-flame-dark rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-flame-core to-flame-hot h-2.5 rounded-full transition-all"
                      style={{ width: `${product.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trading Volume */}
          <div className="bg-flame-dark/50 rounded-xl p-5 border border-flame-core/10">
            <div className="flex items-center gap-2 text-flame-light/60 text-sm mb-4">
              <DollarSign className="h-4 w-4 text-flame-hot" />
              Trading Volume
            </div>
            <div className="space-y-4">
              {volumes.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 bg-flame-dark/50 rounded-lg border border-flame-core/10 hover:border-flame-core/30 transition-colors">
                  <span className="text-flame-light">{item.period}</span>
                  <span className="text-flame-hot font-bold text-lg">{item.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* News Section */}
        <div className="bg-flame-dark/50 rounded-xl p-5 border border-flame-core/10">
          <div className="flex items-center gap-2 text-flame-light/60 text-sm mb-4">
            <Newspaper className="h-4 w-4 text-flame-hot" />
            Latest OPEC News
          </div>
          <div className="space-y-3">
            {news.map((item, idx) => (
              <div key={idx} className="border-l-2 border-flame-hot pl-4 py-3 hover:bg-flame-core/5 rounded-r-lg transition-colors">
                <div className="text-flame-light font-semibold mb-1">{item.title}</div>
                <div className="text-flame-light/50 text-xs flex items-center gap-2">
                  <span className="text-flame-hot">{item.source}</span>
                  <span>•</span>
                  <span>{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
