import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/supabase';
import TokenizationModal from './TokenizationModal';
import InvestmentModal from './InvestmentModal';

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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Token Marketplace</h2>
          <p className="text-gray-600">Invest in tokenized petroleum assets with Digicoin</p>
        </div>
        <Button onClick={() => setShowTokenizeModal(true)} size="lg">
          Tokenize Asset
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {tokens.map((token) => (
          <Card key={token.tokenId} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{token.assetName}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{token.tokenSymbol}</p>
                </div>
                <Badge>{token.investmentType}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-700">{token.description}</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Asset Value</p>
                  <p className="font-semibold">${(token.assetValue / 1000000).toFixed(1)}M</p>
                </div>
                <div>
                  <p className="text-gray-600">Price per Token</p>
                  <p className="font-semibold">{token.pricePerToken} DGC</p>
                </div>
                <div>
                  <p className="text-gray-600">Total Tokens</p>
                  <p className="font-semibold">{token.totalTokens.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-600">Available</p>
                  <p className="font-semibold">{token.availableTokens.toLocaleString()}</p>
                </div>
              </div>
              <Button onClick={() => setSelectedToken(token)} className="w-full">
                Invest Now
              </Button>
            </CardContent>
          </Card>
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