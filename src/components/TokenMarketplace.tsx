import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import TokenizationModal from './TokenizationModal';
import InvestmentModal from './InvestmentModal';
import { Coins, Plus, TrendingUp, Flame, Zap } from 'lucide-react';

export default function TokenMarketplace() {
  const [tokens, setTokens] = useState<any[]>([]);
  const [showTokenizeModal, setShowTokenizeModal] = useState(false);
  const [selectedToken, setSelectedToken] = useState<any>(null);

  useEffect(() => {
    loadTokens();
  }, []);

  const loadTokens = async () => {
    const mockTokens = [
      {
        tokenId: 'TKN-001',
        assetName: 'West Texas Crude Oil Reserve',
        assetType: 'petroleum',
        tokenSymbol: 'DGC-WTC',
        totalTokens: 1000000,
        availableTokens: 750000,
        pricePerToken: 100,
        investmentType: 'IPO',
        assetValue: 100000000,
        description: 'Premium crude oil reserve in Texas'
      },
      {
        tokenId: 'TKN-002',
        assetName: 'Brent Crude Oil Futures',
        assetType: 'petroleum',
        tokenSymbol: 'DGC-BRT',
        totalTokens: 500000,
        availableTokens: 320000,
        pricePerToken: 150,
        investmentType: 'Investor Trading',
        assetValue: 75000000,
        description: 'Brent crude oil futures contract'
      },
      {
        tokenId: 'TKN-003',
        assetName: 'Natural Gas Pipeline',
        assetType: 'petroleum',
        tokenSymbol: 'DGC-NGP',
        totalTokens: 2000000,
        availableTokens: 1800000,
        pricePerToken: 50,
        investmentType: 'FDI',
        assetValue: 100000000,
        description: 'Major natural gas pipeline infrastructure'
      },
      {
        tokenId: 'TKN-004',
        assetName: 'Refinery Expansion Project',
        assetType: 'petroleum',
        tokenSymbol: 'DGC-REF',
        totalTokens: 800000,
        availableTokens: 650000,
        pricePerToken: 200,
        investmentType: 'Seed Investment',
        assetValue: 160000000,
        description: 'New refinery expansion in Middle East'
      }
    ];
    setTokens(mockTokens);
  };

  const getInvestmentBadgeColor = (type: string) => {
    switch(type) {
      case 'IPO': return 'from-green-500 to-emerald-500';
      case 'Investor Trading': return 'from-flame-core to-flame-hot';
      case 'FDI': return 'from-blue-500 to-cyan-500';
      case 'Seed Investment': return 'from-purple-500 to-pink-500';
      default: return 'from-flame-core to-flame-hot';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-flame-core to-flame-hot rounded-xl shadow-lg shadow-flame-core/30">
            <Coins className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-flame-light">Token Marketplace</h2>
            <p className="text-flame-light/60">Invest in tokenized petroleum assets with Digicoin</p>
          </div>
        </div>
        <Button
          onClick={() => setShowTokenizeModal(true)}
          size="lg"
          className="bg-gradient-to-r from-flame-core to-flame-hot hover:from-flame-hot hover:to-flame-core text-white shadow-lg shadow-flame-core/30"
        >
          <Plus className="h-4 w-4 mr-2" /> Tokenize Asset
        </Button>
      </div>

      {/* Token Cards Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {tokens.map((token) => (
          <div
            key={token.tokenId}
            className="bg-gradient-to-br from-flame-dark to-flame-dark/80 border border-flame-core/20 rounded-2xl overflow-hidden hover:border-flame-core/40 transition-all group"
          >
            {/* Card Header */}
            <div className="p-6 border-b border-flame-core/20">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-flame-light group-hover:text-flame-hot transition-colors">{token.assetName}</h3>
                  <p className="text-flame-hot font-mono text-sm mt-1">{token.tokenSymbol}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getInvestmentBadgeColor(token.investmentType)}`}>
                  {token.investmentType}
                </span>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6 space-y-4">
              <p className="text-flame-light/70 text-sm">{token.description}</p>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-flame-dark/50 rounded-xl border border-flame-core/10">
                  <p className="text-flame-light/50 text-xs mb-1">Asset Value</p>
                  <p className="font-bold text-flame-core text-lg">${(token.assetValue / 1000000).toFixed(1)}M</p>
                </div>
                <div className="p-3 bg-flame-dark/50 rounded-xl border border-flame-core/10">
                  <p className="text-flame-light/50 text-xs mb-1">Price per Token</p>
                  <p className="font-bold text-flame-hot text-lg flex items-center gap-1">
                    <Zap className="h-4 w-4" /> {token.pricePerToken} DGC
                  </p>
                </div>
                <div className="p-3 bg-flame-dark/50 rounded-xl border border-flame-core/10">
                  <p className="text-flame-light/50 text-xs mb-1">Total Tokens</p>
                  <p className="font-semibold text-flame-light">{token.totalTokens.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-flame-dark/50 rounded-xl border border-flame-core/10">
                  <p className="text-flame-light/50 text-xs mb-1">Available</p>
                  <p className="font-semibold text-green-400">{token.availableTokens.toLocaleString()}</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-flame-light/50">Sold</span>
                  <span className="text-flame-hot">{Math.round((1 - token.availableTokens / token.totalTokens) * 100)}%</span>
                </div>
                <div className="w-full h-2 bg-flame-dark/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-flame-core to-flame-hot rounded-full transition-all"
                    style={{ width: `${(1 - token.availableTokens / token.totalTokens) * 100}%` }}
                  />
                </div>
              </div>

              <Button
                onClick={() => setSelectedToken(token)}
                className="w-full bg-gradient-to-r from-flame-core to-flame-hot hover:from-flame-hot hover:to-flame-core text-white"
              >
                <TrendingUp className="h-4 w-4 mr-2" /> Invest Now
              </Button>
            </div>
          </div>
        ))}
      </div>

      <TokenizationModal
        open={showTokenizeModal}
        onClose={() => setShowTokenizeModal(false)}
        onSuccess={loadTokens}
      />

      {selectedToken && (
        <InvestmentModal
          open={!!selectedToken}
          onClose={() => setSelectedToken(null)}
          token={selectedToken}
        />
      )}
    </div>
  );
}