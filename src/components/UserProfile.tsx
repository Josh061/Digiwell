import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { User, Mail, Phone, Building2, Flame, Save } from 'lucide-react';

export default function UserProfile() {
  const { user, updateProfile } = useAuth();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      supabase.from('users').select('*').eq('id', user.id).single().then(({ data }) => {
        if (data) {
          setFullName(data.full_name || '');
          setPhone(data.phone || '');
          setCompany(data.company || '');
        }
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await updateProfile({ full_name: fullName, phone, company });
    if (error) {
      toast.error('Failed to update profile');
    } else {
      toast.success('Profile updated successfully!');
    }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Profile Header */}
      <div className="text-center mb-8">
        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-flame-core to-flame-hot p-1">
          <div className="w-full h-full rounded-full bg-flame-dark flex items-center justify-center">
            <User className="h-10 w-10 text-flame-hot" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-flame-light">{fullName || 'Your Profile'}</h1>
        <p className="text-flame-light/60">{user?.email}</p>
      </div>

      {/* Profile Card */}
      <div className="bg-gradient-to-br from-flame-dark to-flame-dark/80 border border-flame-core/30 rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-flame-core/20 to-flame-hot/10 p-6 border-b border-flame-core/20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-flame-core/20 rounded-xl">
              <Flame className="h-5 w-5 text-flame-hot" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-flame-light">Profile Settings</h2>
              <p className="text-flame-light/60 text-sm">Manage your account information</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-2">
            <Label className="text-flame-light/80 flex items-center gap-2">
              <Mail className="h-4 w-4 text-flame-core" /> Email
            </Label>
            <Input
              value={user?.email || ''}
              disabled
              className="bg-flame-dark/50 border-flame-core/20 text-flame-light/60 cursor-not-allowed"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-flame-light/80 flex items-center gap-2">
              <User className="h-4 w-4 text-flame-core" /> Full Name
            </Label>
            <Input
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="bg-flame-dark/50 border-flame-core/30 text-flame-light placeholder:text-flame-light/40 focus:border-flame-hot focus:ring-flame-hot/20"
              placeholder="Enter your full name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-flame-light/80 flex items-center gap-2">
              <Phone className="h-4 w-4 text-flame-core" /> Phone
            </Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="bg-flame-dark/50 border-flame-core/30 text-flame-light placeholder:text-flame-light/40 focus:border-flame-hot focus:ring-flame-hot/20"
              placeholder="Enter your phone number"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company" className="text-flame-light/80 flex items-center gap-2">
              <Building2 className="h-4 w-4 text-flame-core" /> Company
            </Label>
            <Input
              id="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="bg-flame-dark/50 border-flame-core/30 text-flame-light placeholder:text-flame-light/40 focus:border-flame-hot focus:ring-flame-hot/20"
              placeholder="Enter your company name"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-flame-core to-flame-hot hover:from-flame-hot hover:to-flame-core text-white shadow-lg shadow-flame-core/30"
          >
            <Save className="h-4 w-4 mr-2" />
            {loading ? 'Updating...' : 'Save Changes'}
          </Button>
        </form>
      </div>
    </div>
  );
}
