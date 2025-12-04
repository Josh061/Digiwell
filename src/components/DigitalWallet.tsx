import { useState } from 'react';
import { Flame, X, ArrowDownLeft, ArrowUpRight, Coins, Zap } from 'lucide-react';

interface WalletProps {
  onClose: () => void;
}

export default function DigitalWallet({ onClose }: WalletProps) {
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  const balances = {
    USD: 125430.50,
    EUR: 98765.20,
    GBP: 87654.30,
    NGN: 52340000,
    DIGICOIN: 1250.75
  };

  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar', icon: '🇺🇸' },
    { code: 'EUR', symbol: '€', name: 'Euro', icon: '🇪🇺' },
    { code: 'GBP', symbol: '£', name: 'British Pound', icon: '🇬🇧' },
    { code: 'NGN', symbol: '₦', name: 'Nigerian Naira', icon: '🇳🇬' },
    { code: 'DIGICOIN', symbol: 'Ð', name: 'DigiCoin Token', icon: '🔥' }
  ];

  return (
    <div className="fixed inset-0 bg-flame-dark/95 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      {/* Background flame glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-flame-core/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-flame-hot/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="ember-card rounded-3xl max-w-2xl w-full relative z-10 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-flame-core/20 flex justify-between items-center bg-gradient-to-r from-flame-dark to-flame-smoke">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-flame-core to-flame-hot flex items-center justify-center animate-ember-glow">
              <Flame className="h-5 w-5 text-flame-dark" />
            </div>
            <h2 className="text-2xl font-flame font-bold text-flame-light">Flame Wallet</h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl border border-flame-core/30 flex items-center justify-center text-flame-hot hover:bg-flame-core/10 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 bg-gradient-to-b from-flame-smoke to-flame-dark">
          {/* Balance Card */}
          <div className="relative bg-gradient-to-br from-flame-core via-flame-hot to-flame-glow rounded-2xl p-6 mb-6 overflow-hidden shadow-flame-lg">
            {/* Animated background elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-flame-dark/20 rounded-full blur-xl"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-2 text-flame-dark/70 text-sm mb-2">
                <Coins className="h-4 w-4" />
                Total Balance
              </div>
              <div className="text-4xl font-flame font-bold text-flame-dark mb-1 animate-pulse">
                {currencies.find(c => c.code === selectedCurrency)?.symbol}
                {balances[selectedCurrency as keyof typeof balances].toLocaleString()}
              </div>
              <div className="text-flame-dark/80 text-sm flex items-center gap-2">
                <span>{currencies.find(c => c.code === selectedCurrency)?.icon}</span>
                {currencies.find(c => c.code === selectedCurrency)?.name}
              </div>
            </div>
          </div>

          {/* Currency Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
            {currencies.map(curr => (
              <button
                key={curr.code}
                onClick={() => setSelectedCurrency(curr.code)}
                className={`p-4 rounded-xl border-2 transition-all duration-300 group ${
                  selectedCurrency === curr.code
                    ? 'border-flame-core bg-flame-core/20 shadow-glow'
                    : 'border-flame-core/20 bg-flame-dark/50 hover:border-flame-core/40 hover:bg-flame-core/10'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{curr.icon}</span>
                  <span className={`text-2xl font-bold ${selectedCurrency === curr.code ? 'text-flame-hot' : 'text-flame-light/70'}`}>
                    {curr.symbol}
                  </span>
                </div>
                <div className={`font-bold text-sm ${selectedCurrency === curr.code ? 'text-flame-light' : 'text-flame-light/80'}`}>
                  {balances[curr.code as keyof typeof balances].toLocaleString()}
                </div>
                <div className="text-flame-light/50 text-xs">{curr.code}</div>
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button className="flex-1 bg-gradient-to-r from-flame-core to-flame-hot text-flame-dark font-bold py-4 rounded-xl hover:shadow-flame-lg transition-all flex items-center justify-center gap-2 group">
              <ArrowDownLeft className="h-5 w-5 group-hover:animate-bounce" />
              Deposit
            </button>
            <button className="flex-1 bg-flame-dark border-2 border-flame-core/30 text-flame-light font-bold py-4 rounded-xl hover:border-flame-core hover:bg-flame-core/10 transition-all flex items-center justify-center gap-2 group">
              <ArrowUpRight className="h-5 w-5 group-hover:animate-bounce" />
              Withdraw
            </button>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 p-4 rounded-xl bg-flame-dark/50 border border-flame-core/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-flame-light/70">
                <Zap className="h-4 w-4 text-flame-hot" />
                <span className="text-sm">Quick Trade</span>
              </div>
              <button className="text-flame-hot text-sm font-semibold hover:text-flame-glow transition-colors">
                View All →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
