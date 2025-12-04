import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/lib/supabase';

interface InvestmentModalProps {
  open: boolean;
  onClose: () => void;
  token: any;
}

export default function InvestmentModal({ open, onClose, token }: InvestmentModalProps) {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const tokensToReceive = amount ? Math.floor(parseFloat(amount) / token.pricePerToken) : 0;

  const handleInvest = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid investment amount');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('asset-tokenization', {
        body: {
          action: 'invest',
          userId: 'user-123',
          tokenId: token.tokenId,
          purchaseAmount: parseFloat(amount),
          pricePerToken: token.pricePerToken
        }
      });

      if (error) throw error;
      alert(`Investment successful! You received ${data.tokensReceived} ${token.tokenSymbol} tokens. Transaction ID: ${data.transactionId}`);
      onClose();
    } catch (error: any) {
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invest in {token.assetName}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Token Symbol:</span>
              <span className="font-semibold">{token.tokenSymbol}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Price per Token:</span>
              <span className="font-semibold">{token.pricePerToken} DGC</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Available Tokens:</span>
              <span className="font-semibold">{token.availableTokens.toLocaleString()}</span>
            </div>
          </div>

          <div>
            <Label>Investment Amount (Digicoin)</Label>
            <Input 
              type="number" 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount in Digicoin"
            />
          </div>

          {amount && (
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">You will receive:</p>
              <p className="text-2xl font-bold text-green-700">{tokensToReceive} {token.tokenSymbol}</p>
            </div>
          )}

          <Button onClick={handleInvest} disabled={loading} className="w-full">
            {loading ? 'Processing...' : 'Confirm Investment'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}