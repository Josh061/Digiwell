import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EscrowCard from '@/components/EscrowCard';
import CreateEscrowModal from '@/components/CreateEscrowModal';
import DisputeModal from '@/components/DisputeModal';
import GPSTracker from '@/components/GPSTracker';
import { toast } from 'sonner';
import { Shield, Plus, Flame } from 'lucide-react';

export default function EscrowDashboard() {
  const [escrows, setEscrows] = useState<any[]>([]);
  const [userRole, setUserRole] = useState<'buyer' | 'seller'>('buyer');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDisputeModal, setShowDisputeModal] = useState(false);
  const [selectedEscrowId, setSelectedEscrowId] = useState('');
  const [showTracking, setShowTracking] = useState(false);
  const [trackingOrderId, setTrackingOrderId] = useState('');

  useEffect(() => {
    // Load mock escrow data
    setEscrows([
      {
        escrowId: 'ESC-2025-001',
        status: 'funds_held',
        amount: 500000,
        productType: 'Crude Oil',
        quantity: '10,000 barrels',
        createdAt: new Date().toISOString(),
        trackingNumber: 'TRK-ABC123XYZ'
      },
      {
        escrowId: 'ESC-2025-002',
        status: 'in_transit',
        amount: 750000,
        productType: 'Natural Gas',
        quantity: '15,000 MMBtu',
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        trackingNumber: 'TRK-DEF456UVW'
      }
    ]);
  }, []);

  const handleCreateEscrow = async (formData: any) => {
    try {
      const { data, error } = await supabase.functions.invoke('escrow-transaction', {
        body: {
          action: 'create',
          buyerId: userRole === 'buyer' ? 'USER-001' : formData.counterpartyId,
          sellerId: userRole === 'seller' ? 'USER-001' : formData.counterpartyId,
          amount: parseFloat(formData.amount),
          productType: formData.productType,
          quantity: formData.quantity
        }
      });

      if (error) throw error;
      setEscrows([...escrows, data]);
      toast.success('Escrow created successfully!');
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleConfirmShipment = async (escrowId: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('escrow-transaction', {
        body: { action: 'confirm_shipment', escrowId }
      });
      if (error) throw error;
      setEscrows(escrows.map(e => e.escrowId === escrowId ? {...e, ...data} : e));
      toast.success('Shipment confirmed!');
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleConfirmDelivery = async (escrowId: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('escrow-transaction', {
        body: { action: 'confirm_delivery', escrowId }
      });
      if (error) throw error;
      setEscrows(escrows.map(e => e.escrowId === escrowId ? {...e, ...data} : e));
      toast.success('Delivery confirmed! Funds will be released in 24 hours.');
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleRaiseDispute = (escrowId: string) => {
    setSelectedEscrowId(escrowId);
    setShowDisputeModal(true);
  };

  const handleSubmitDispute = async (escrowId: string, reason: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('escrow-transaction', {
        body: { action: 'raise_dispute', escrowId, disputeReason: reason }
      });
      if (error) throw error;
      setEscrows(escrows.map(e => e.escrowId === escrowId ? {...e, ...data} : e));
      toast.success('Dispute raised successfully!');
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleViewTracking = (escrowId: string) => {
    setTrackingOrderId(escrowId);
    setShowTracking(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-flame-core to-flame-hot rounded-xl shadow-lg shadow-flame-core/30">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-flame-light">Escrow Dashboard</h2>
            <p className="text-flame-light/60">Secure petroleum trading with automated fund release</p>
          </div>
        </div>
        <Button
          onClick={() => setShowCreateModal(true)}
          className="bg-gradient-to-r from-flame-core to-flame-hot hover:from-flame-hot hover:to-flame-core text-white shadow-lg shadow-flame-core/30"
        >
          <Plus className="h-4 w-4 mr-2" /> Create Escrow
        </Button>
      </div>

      {/* Role Toggle */}
      <div className="flex gap-3 p-1 bg-flame-dark/50 rounded-xl border border-flame-core/20 w-fit">
        <Button
          variant="ghost"
          onClick={() => setUserRole('buyer')}
          className={`${userRole === 'buyer'
            ? 'bg-gradient-to-r from-flame-core to-flame-hot text-white shadow-lg'
            : 'text-flame-light/60 hover:text-flame-light hover:bg-flame-core/10'}`}
        >
          Buyer View
        </Button>
        <Button
          variant="ghost"
          onClick={() => setUserRole('seller')}
          className={`${userRole === 'seller'
            ? 'bg-gradient-to-r from-flame-core to-flame-hot text-white shadow-lg'
            : 'text-flame-light/60 hover:text-flame-light hover:bg-flame-core/10'}`}
        >
          Seller View
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="active" className="space-y-4">
        <TabsList className="bg-flame-dark/50 border border-flame-core/20 p-1">
          <TabsTrigger value="active" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-flame-core data-[state=active]:to-flame-hot data-[state=active]:text-white">Active</TabsTrigger>
          <TabsTrigger value="completed" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-flame-core data-[state=active]:to-flame-hot data-[state=active]:text-white">Completed</TabsTrigger>
          <TabsTrigger value="disputed" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-flame-core data-[state=active]:to-flame-hot data-[state=active]:text-white">Disputed</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="space-y-4">
          {escrows.filter(e => ['funds_held', 'in_transit', 'delivered'].includes(e.status)).map(escrow => (
            <EscrowCard
              key={escrow.escrowId}
              escrow={escrow}
              userRole={userRole}
              onConfirmShipment={handleConfirmShipment}
              onConfirmDelivery={handleConfirmDelivery}
              onRaiseDispute={handleRaiseDispute}
              onViewTracking={handleViewTracking}
            />
          ))}
        </TabsContent>
        <TabsContent value="completed">
          {escrows.filter(e => e.status === 'completed').length === 0 ? (
            <div className="text-center py-12 bg-flame-dark/30 rounded-2xl border border-flame-core/20">
              <Flame className="h-12 w-12 text-flame-core/40 mx-auto mb-3" />
              <p className="text-flame-light/40">No completed transactions</p>
            </div>
          ) : null}
        </TabsContent>
        <TabsContent value="disputed">
          {escrows.filter(e => e.status === 'disputed').length === 0 ? (
            <div className="text-center py-12 bg-flame-dark/30 rounded-2xl border border-flame-core/20">
              <Flame className="h-12 w-12 text-flame-core/40 mx-auto mb-3" />
              <p className="text-flame-light/40">No disputed transactions</p>
            </div>
          ) : null}
        </TabsContent>
      </Tabs>

      <CreateEscrowModal 
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateEscrow}
        userRole={userRole}
      />

      <DisputeModal 
        isOpen={showDisputeModal}
        onClose={() => setShowDisputeModal(false)}
        escrowId={selectedEscrowId}
        onSubmit={handleSubmitDispute}
      />

      {showTracking && (
        <GPSTracker 
          orderId={trackingOrderId}
          onClose={() => setShowTracking(false)}
        />
      )}
    </div>
  );
}