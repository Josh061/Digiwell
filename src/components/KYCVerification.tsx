import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/supabase';
import { Upload, CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function KYCVerification() {
  const [status, setStatus] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    businessName: '',
    businessType: ''
  });
  const [files, setFiles] = useState({
    idDocument: null as File | null,
    addressDocument: null as File | null,
    businessDocument: null as File | null
  });

  useEffect(() => {
    checkKYCStatus();
  }, []);

  const checkKYCStatus = async () => {
    try {
      const { data } = await supabase.functions.invoke('kyc-verification-trigger', {
        body: { action: 'get_status', userId: 'user_' + Math.random().toString(36).substr(2, 9) }
      });
      if (data?.submission) setStatus(data.submission);
    } catch (error) {
      console.log('No KYC submission found');
    }
  };

  const uploadFile = async (file: File, path: string) => {
    const { data, error } = await supabase.storage
      .from('kyc-documents')
      .upload(path, file);
    if (error) throw error;
    const { data: { publicUrl } } = supabase.storage
      .from('kyc-documents')
      .getPublicUrl(path);
    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userId = 'user_' + Math.random().toString(36).substr(2, 9);
      const documents: any = {};

      if (files.idDocument) {
        documents.idDocument = await uploadFile(files.idDocument, `${userId}/id_${Date.now()}`);
      }
      if (files.addressDocument) {
        documents.addressDocument = await uploadFile(files.addressDocument, `${userId}/address_${Date.now()}`);
      }
      if (files.businessDocument) {
        documents.businessDocument = await uploadFile(files.businessDocument, `${userId}/business_${Date.now()}`);
      }

      const { data, error } = await supabase.functions.invoke('kyc-verification-trigger', {
        body: {
          action: 'submit',
          userId,
          ...formData,
          documents
        }
      });

      if (error) throw error;

      toast.success('KYC documents submitted successfully!');
      setStatus(data.submission);
    } catch (error: any) {
      toast.error(error.message || 'Failed to submit KYC documents');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: any = {
      pending: { variant: 'secondary', icon: Clock, text: 'Pending Review' },
      approved: { variant: 'default', icon: CheckCircle, text: 'Approved' },
      rejected: { variant: 'destructive', icon: XCircle, text: 'Rejected' }
    };
    const config = variants[status] || variants.pending;
    const Icon = config.icon;
    return <Badge variant={config.variant}><Icon className="w-3 h-3 mr-1" />{config.text}</Badge>;
  };

  if (status) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>KYC Verification Status</CardTitle>
          <CardDescription>Your verification request status</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">Status:</span>
            {getStatusBadge(status.status)}
          </div>
          <div>
            <span className="font-medium">Submitted:</span>
            <p className="text-sm text-muted-foreground">{new Date(status.submitted_at).toLocaleString()}</p>
          </div>
          {status.rejection_reason && (
            <div className="p-3 bg-destructive/10 rounded-lg">
              <p className="text-sm font-medium text-destructive">Rejection Reason:</p>
              <p className="text-sm">{status.rejection_reason}</p>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>KYC Verification</CardTitle>
        <CardDescription>Complete your identity verification for petroleum trading compliance</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Full Name</Label>
              <Input required value={formData.userName} onChange={(e) => setFormData({...formData, userName: e.target.value})} />
            </div>
            <div>
              <Label>Email</Label>
              <Input type="email" required value={formData.userEmail} onChange={(e) => setFormData({...formData, userEmail: e.target.value})} />
            </div>
            <div>
              <Label>Business Name</Label>
              <Input value={formData.businessName} onChange={(e) => setFormData({...formData, businessName: e.target.value})} />
            </div>
            <div>
              <Label>Business Type</Label>
              <Input value={formData.businessType} onChange={(e) => setFormData({...formData, businessType: e.target.value})} />
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <Label>ID Document (Passport/Driver's License)</Label>
              <Input type="file" required onChange={(e) => setFiles({...files, idDocument: e.target.files?.[0] || null})} />
            </div>
            <div>
              <Label>Proof of Address (Utility Bill/Bank Statement)</Label>
              <Input type="file" required onChange={(e) => setFiles({...files, addressDocument: e.target.files?.[0] || null})} />
            </div>
            <div>
              <Label>Business Registration (Optional)</Label>
              <Input type="file" onChange={(e) => setFiles({...files, businessDocument: e.target.files?.[0] || null})} />
            </div>
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            <Upload className="w-4 h-4 mr-2" />
            {loading ? 'Submitting...' : 'Submit KYC Documents'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
