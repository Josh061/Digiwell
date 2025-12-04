import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/supabase';
import { Upload, CheckCircle, XCircle, Clock, AlertCircle, User, Building2, FileText, Shield, Flame, ArrowRight, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

export default function KYCVerification() {
  const [status, setStatus] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
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

  const steps = [
    { id: 1, title: 'Personal Info', icon: User },
    { id: 2, title: 'Business Details', icon: Building2 },
    { id: 3, title: 'Documents', icon: FileText },
    { id: 4, title: 'Review', icon: Shield }
  ];

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
      pending: { variant: 'secondary', icon: Clock, text: 'Pending Review', color: 'text-yellow-400 bg-yellow-500/20' },
      approved: { variant: 'default', icon: CheckCircle, text: 'Approved', color: 'text-green-400 bg-green-500/20' },
      rejected: { variant: 'destructive', icon: XCircle, text: 'Rejected', color: 'text-red-400 bg-red-500/20' }
    };
    const config = variants[status] || variants.pending;
    const Icon = config.icon;
    return <span className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 ${config.color}`}><Icon className="w-4 h-4" />{config.text}</span>;
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  if (status) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-flame-dark to-flame-dark/80 border border-flame-core/30 rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-flame-core/20 to-flame-hot/20 p-6 border-b border-flame-core/20">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-flame-core/20 rounded-xl">
                <Shield className="h-8 w-8 text-flame-hot" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-flame-light">KYC Verification Status</h2>
                <p className="text-flame-light/60">Your verification request status</p>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between p-4 bg-flame-dark/50 rounded-xl border border-flame-core/20">
              <span className="font-medium text-flame-light">Status:</span>
              {getStatusBadge(status.status)}
            </div>
            <div className="p-4 bg-flame-dark/50 rounded-xl border border-flame-core/20">
              <span className="font-medium text-flame-light block mb-1">Submitted:</span>
              <p className="text-flame-light/60">{new Date(status.submitted_at).toLocaleString()}</p>
            </div>
            {status.rejection_reason && (
              <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/30">
                <p className="text-sm font-medium text-red-400 mb-1">Rejection Reason:</p>
                <p className="text-red-300">{status.rejection_reason}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-flame-core/20 rounded-full mb-4">
          <Flame className="h-5 w-5 text-flame-hot animate-pulse" />
          <span className="text-flame-hot font-semibold">Identity Verification</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-flame-light mb-2">Complete Your KYC</h1>
        <p className="text-flame-light/60">Verify your identity for petroleum trading compliance</p>
      </div>

      {/* Progress Steps */}
      <div className="flex justify-between items-center mb-8 px-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className={`flex flex-col items-center`}>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                currentStep >= step.id
                  ? 'bg-gradient-to-br from-flame-core to-flame-hot shadow-lg shadow-flame-core/30'
                  : 'bg-flame-dark/50 border border-flame-core/30'
              }`}>
                <step.icon className={`h-5 w-5 ${currentStep >= step.id ? 'text-white' : 'text-flame-light/40'}`} />
              </div>
              <span className={`text-xs mt-2 font-medium ${currentStep >= step.id ? 'text-flame-hot' : 'text-flame-light/40'}`}>
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={`w-16 md:w-24 h-1 mx-2 rounded-full transition-all duration-300 ${
                currentStep > step.id ? 'bg-gradient-to-r from-flame-core to-flame-hot' : 'bg-flame-dark/50'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Form Card */}
      <div className="bg-gradient-to-br from-flame-dark to-flame-dark/80 border border-flame-core/30 rounded-2xl overflow-hidden">
        <form onSubmit={handleSubmit}>
          {/* Step 1: Personal Info */}
          {currentStep === 1 && (
            <div className="p-6 md:p-8 space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-flame-core/20 rounded-lg">
                  <User className="h-5 w-5 text-flame-hot" />
                </div>
                <h3 className="text-xl font-bold text-flame-light">Personal Information</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-flame-light/80">Full Name *</Label>
                  <Input
                    required
                    value={formData.userName}
                    onChange={(e) => setFormData({...formData, userName: e.target.value})}
                    className="bg-flame-dark/50 border-flame-core/30 text-flame-light placeholder:text-flame-light/40 focus:border-flame-hot focus:ring-flame-hot/20"
                    placeholder="Enter your full legal name"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-flame-light/80">Email Address *</Label>
                  <Input
                    type="email"
                    required
                    value={formData.userEmail}
                    onChange={(e) => setFormData({...formData, userEmail: e.target.value})}
                    className="bg-flame-dark/50 border-flame-core/30 text-flame-light placeholder:text-flame-light/40 focus:border-flame-hot focus:ring-flame-hot/20"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Business Details */}
          {currentStep === 2 && (
            <div className="p-6 md:p-8 space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-flame-core/20 rounded-lg">
                  <Building2 className="h-5 w-5 text-flame-hot" />
                </div>
                <h3 className="text-xl font-bold text-flame-light">Business Details</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-flame-light/80">Business Name</Label>
                  <Input
                    value={formData.businessName}
                    onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                    className="bg-flame-dark/50 border-flame-core/30 text-flame-light placeholder:text-flame-light/40 focus:border-flame-hot focus:ring-flame-hot/20"
                    placeholder="Your company name"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-flame-light/80">Business Type</Label>
                  <Input
                    value={formData.businessType}
                    onChange={(e) => setFormData({...formData, businessType: e.target.value})}
                    className="bg-flame-dark/50 border-flame-core/30 text-flame-light placeholder:text-flame-light/40 focus:border-flame-hot focus:ring-flame-hot/20"
                    placeholder="e.g., Trading, Distribution"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Documents */}
          {currentStep === 3 && (
            <div className="p-6 md:p-8 space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-flame-core/20 rounded-lg">
                  <FileText className="h-5 w-5 text-flame-hot" />
                </div>
                <h3 className="text-xl font-bold text-flame-light">Upload Documents</h3>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-flame-dark/50 rounded-xl border border-flame-core/20 border-dashed hover:border-flame-hot/50 transition-colors">
                  <Label className="text-flame-light/80 block mb-2">ID Document (Passport/Driver's License) *</Label>
                  <Input
                    type="file"
                    required
                    onChange={(e) => setFiles({...files, idDocument: e.target.files?.[0] || null})}
                    className="bg-transparent border-none text-flame-light file:bg-flame-core/20 file:text-flame-hot file:border-0 file:rounded-lg file:px-4 file:py-2 file:mr-4 file:cursor-pointer"
                  />
                  {files.idDocument && <p className="text-green-400 text-sm mt-2 flex items-center gap-1"><CheckCircle className="h-4 w-4" /> {files.idDocument.name}</p>}
                </div>
                <div className="p-4 bg-flame-dark/50 rounded-xl border border-flame-core/20 border-dashed hover:border-flame-hot/50 transition-colors">
                  <Label className="text-flame-light/80 block mb-2">Proof of Address (Utility Bill/Bank Statement) *</Label>
                  <Input
                    type="file"
                    required
                    onChange={(e) => setFiles({...files, addressDocument: e.target.files?.[0] || null})}
                    className="bg-transparent border-none text-flame-light file:bg-flame-core/20 file:text-flame-hot file:border-0 file:rounded-lg file:px-4 file:py-2 file:mr-4 file:cursor-pointer"
                  />
                  {files.addressDocument && <p className="text-green-400 text-sm mt-2 flex items-center gap-1"><CheckCircle className="h-4 w-4" /> {files.addressDocument.name}</p>}
                </div>
                <div className="p-4 bg-flame-dark/50 rounded-xl border border-flame-core/20 border-dashed hover:border-flame-hot/50 transition-colors">
                  <Label className="text-flame-light/80 block mb-2">Business Registration (Optional)</Label>
                  <Input
                    type="file"
                    onChange={(e) => setFiles({...files, businessDocument: e.target.files?.[0] || null})}
                    className="bg-transparent border-none text-flame-light file:bg-flame-core/20 file:text-flame-hot file:border-0 file:rounded-lg file:px-4 file:py-2 file:mr-4 file:cursor-pointer"
                  />
                  {files.businessDocument && <p className="text-green-400 text-sm mt-2 flex items-center gap-1"><CheckCircle className="h-4 w-4" /> {files.businessDocument.name}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {currentStep === 4 && (
            <div className="p-6 md:p-8 space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-flame-core/20 rounded-lg">
                  <Shield className="h-5 w-5 text-flame-hot" />
                </div>
                <h3 className="text-xl font-bold text-flame-light">Review & Submit</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-flame-dark/50 rounded-xl border border-flame-core/20">
                  <p className="text-flame-light/60 text-sm">Full Name</p>
                  <p className="text-flame-light font-semibold">{formData.userName || '-'}</p>
                </div>
                <div className="p-4 bg-flame-dark/50 rounded-xl border border-flame-core/20">
                  <p className="text-flame-light/60 text-sm">Email</p>
                  <p className="text-flame-light font-semibold">{formData.userEmail || '-'}</p>
                </div>
                <div className="p-4 bg-flame-dark/50 rounded-xl border border-flame-core/20">
                  <p className="text-flame-light/60 text-sm">Business Name</p>
                  <p className="text-flame-light font-semibold">{formData.businessName || '-'}</p>
                </div>
                <div className="p-4 bg-flame-dark/50 rounded-xl border border-flame-core/20">
                  <p className="text-flame-light/60 text-sm">Business Type</p>
                  <p className="text-flame-light font-semibold">{formData.businessType || '-'}</p>
                </div>
              </div>
              <div className="p-4 bg-flame-dark/50 rounded-xl border border-flame-core/20">
                <p className="text-flame-light/60 text-sm mb-2">Documents Uploaded</p>
                <div className="space-y-1">
                  <p className={`text-sm flex items-center gap-2 ${files.idDocument ? 'text-green-400' : 'text-flame-light/40'}`}>
                    {files.idDocument ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />} ID Document
                  </p>
                  <p className={`text-sm flex items-center gap-2 ${files.addressDocument ? 'text-green-400' : 'text-flame-light/40'}`}>
                    {files.addressDocument ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />} Address Proof
                  </p>
                  <p className={`text-sm flex items-center gap-2 ${files.businessDocument ? 'text-green-400' : 'text-flame-light/40'}`}>
                    {files.businessDocument ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />} Business Registration
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between p-6 border-t border-flame-core/20 bg-flame-dark/30">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="border-flame-core/30 text-flame-light hover:bg-flame-core/20 disabled:opacity-30"
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Previous
            </Button>
            {currentStep < 4 ? (
              <Button
                type="button"
                onClick={nextStep}
                className="bg-gradient-to-r from-flame-core to-flame-hot hover:from-flame-hot hover:to-flame-core text-white"
              >
                Next <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-flame-core to-flame-hot hover:from-flame-hot hover:to-flame-core text-white shadow-lg shadow-flame-core/30"
              >
                <Upload className="w-4 h-4 mr-2" />
                {loading ? 'Submitting...' : 'Submit KYC'}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
