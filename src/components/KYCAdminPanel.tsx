import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/lib/supabase';
import { CheckCircle, XCircle, Clock, Eye, Shield, Flame, FileCheck } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function KYCAdminPanel() {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);
  const [reviewNotes, setReviewNotes] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    try {
      const { data } = await supabase.functions.invoke('kyc-verification-trigger', {
        body: { action: 'list_all' }
      });
      if (data?.submissions) setSubmissions(data.submissions);
    } catch (error) {
      toast.error('Failed to load submissions');
    } finally {
      setLoading(false);
    }
  };

  const handleReview = async (submissionId: string, status: string) => {
    try {
      await supabase.functions.invoke('kyc-verification-trigger', {
        body: {
          action: 'review',
          submissionId,
          status,
          reviewerId: 'admin_' + Math.random().toString(36).substr(2, 9),
          rejectionReason: status === 'rejected' ? rejectionReason : null,
          verificationNotes: reviewNotes
        }
      });
      toast.success(`KYC ${status === 'approved' ? 'approved' : 'rejected'} successfully`);
      setSelectedSubmission(null);
      loadSubmissions();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const getStatusBadge = (status: string) => {
    const config: any = {
      pending: { color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', icon: Clock },
      approved: { color: 'bg-green-500/20 text-green-400 border-green-500/30', icon: CheckCircle },
      rejected: { color: 'bg-red-500/20 text-red-400 border-red-500/30', icon: XCircle }
    };
    const { color, icon: Icon } = config[status] || config.pending;
    return <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 border ${color}`}><Icon className="w-3 h-3" />{status}</span>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-3 bg-gradient-to-br from-flame-core to-flame-hot rounded-xl shadow-lg shadow-flame-core/30">
          <Shield className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-flame-light">KYC Admin Panel</h2>
          <p className="text-flame-light/60">Review and manage verification requests</p>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-gradient-to-br from-flame-dark to-flame-dark/80 rounded-2xl border border-flame-core/20 overflow-hidden">
        <div className="p-6 border-b border-flame-core/20 bg-gradient-to-r from-flame-core/10 to-transparent">
          <h3 className="text-lg font-semibold text-flame-light flex items-center gap-2">
            <FileCheck className="h-5 w-5 text-flame-hot" />
            Pending Submissions
          </h3>
        </div>
        <div className="p-6">
          {loading ? (
            <div className="text-center py-12">
              <Flame className="h-12 w-12 text-flame-core/40 mx-auto mb-3 animate-pulse" />
              <p className="text-flame-light/40">Loading submissions...</p>
            </div>
          ) : submissions.length === 0 ? (
            <div className="text-center py-12">
              <Flame className="h-12 w-12 text-flame-core/40 mx-auto mb-3" />
              <p className="text-flame-light/40">No submissions to review</p>
            </div>
          ) : (
            <div className="space-y-3">
              {submissions.map((sub) => (
                <div key={sub.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-flame-dark/50 border border-flame-core/10 rounded-xl hover:border-flame-core/30 transition-colors gap-4">
                  <div>
                    <p className="font-semibold text-flame-light">{sub.user_name}</p>
                    <p className="text-sm text-flame-light/60">{sub.user_email}</p>
                    <p className="text-xs text-flame-light/40 mt-1">{new Date(sub.submitted_at).toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusBadge(sub.status)}
                    <Button
                      size="sm"
                      onClick={() => setSelectedSubmission(sub)}
                      className="bg-flame-core/20 text-flame-hot hover:bg-flame-core/30 border border-flame-core/30"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Review
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Review Dialog */}
      <Dialog open={!!selectedSubmission} onOpenChange={() => setSelectedSubmission(null)}>
        <DialogContent className="max-w-2xl bg-flame-dark border-flame-core/30">
          <DialogHeader>
            <DialogTitle className="text-flame-light flex items-center gap-2">
              <Shield className="h-5 w-5 text-flame-hot" />
              Review KYC Submission
            </DialogTitle>
          </DialogHeader>
          {selectedSubmission && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-flame-dark/50 rounded-lg border border-flame-core/10">
                  <p className="text-xs text-flame-light/50 mb-1">Name</p>
                  <p className="text-flame-light font-medium">{selectedSubmission.user_name}</p>
                </div>
                <div className="p-3 bg-flame-dark/50 rounded-lg border border-flame-core/10">
                  <p className="text-xs text-flame-light/50 mb-1">Email</p>
                  <p className="text-flame-light font-medium">{selectedSubmission.user_email}</p>
                </div>
                <div className="p-3 bg-flame-dark/50 rounded-lg border border-flame-core/10">
                  <p className="text-xs text-flame-light/50 mb-1">Business</p>
                  <p className="text-flame-light font-medium">{selectedSubmission.business_name || 'N/A'}</p>
                </div>
                <div className="p-3 bg-flame-dark/50 rounded-lg border border-flame-core/10">
                  <p className="text-xs text-flame-light/50 mb-1">Type</p>
                  <p className="text-flame-light font-medium">{selectedSubmission.business_type || 'N/A'}</p>
                </div>
              </div>
              <div className="p-3 bg-flame-dark/50 rounded-lg border border-flame-core/10">
                <p className="text-xs text-flame-light/50 mb-2">Documents</p>
                <div className="space-y-1">
                  <p className={`text-sm flex items-center gap-2 ${selectedSubmission.id_document_url ? 'text-green-400' : 'text-flame-light/40'}`}>
                    {selectedSubmission.id_document_url ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />} ID Document
                  </p>
                  <p className={`text-sm flex items-center gap-2 ${selectedSubmission.address_document_url ? 'text-green-400' : 'text-flame-light/40'}`}>
                    {selectedSubmission.address_document_url ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />} Address Proof
                  </p>
                  <p className={`text-sm flex items-center gap-2 ${selectedSubmission.business_document_url ? 'text-green-400' : 'text-flame-light/40'}`}>
                    {selectedSubmission.business_document_url ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />} Business Registration
                  </p>
                </div>
              </div>
              <Textarea
                placeholder="Review notes..."
                value={reviewNotes}
                onChange={(e) => setReviewNotes(e.target.value)}
                className="bg-flame-dark/50 border-flame-core/30 text-flame-light placeholder:text-flame-light/40 focus:border-flame-hot"
              />
              <Textarea
                placeholder="Rejection reason (if rejecting)..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="bg-flame-dark/50 border-flame-core/30 text-flame-light placeholder:text-flame-light/40 focus:border-flame-hot"
              />
              <div className="flex gap-3">
                <Button
                  onClick={() => handleReview(selectedSubmission.id, 'approved')}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve
                </Button>
                <Button
                  onClick={() => handleReview(selectedSubmission.id, 'rejected')}
                  className="flex-1 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
