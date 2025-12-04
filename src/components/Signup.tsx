import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Flame, Mail, Lock, User, Eye, EyeOff, ArrowLeft, Zap } from 'lucide-react';

interface SignupProps {
  onSwitchToLogin: () => void;
}

export default function Signup({ onSwitchToLogin }: SignupProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signUp, signInWithGoogle } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signUp(email, password, fullName);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Account created! Please check your email to verify.');
    }
    setLoading(false);
  };

  return (
    <div className="relative max-w-sm w-full mx-auto rounded-3xl overflow-hidden ember-card animate-fade-in">
      {/* Top header with flame design */}
      <div className="bg-gradient-to-br from-flame-dark via-flame-smoke to-flame-dark px-6 pt-6 pb-8 relative overflow-hidden">
        {/* Animated flame glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-24 bg-flame-hot/20 blur-3xl"></div>

        <div className="flex items-center justify-between mb-6 relative z-10">
          <button
            type="button"
            className="w-10 h-10 rounded-xl border border-flame-core/30 flex items-center justify-center text-flame-hot hover:bg-flame-core/10 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex-1 flex justify-center gap-6 text-sm font-semibold">
            <button
              type="button"
              className="border-b-2 border-flame-hot text-flame-hot pb-1"
            >
              Sign Up
            </button>
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-flame-light/60 hover:text-flame-hot transition-colors"
            >
              Sign In
            </button>
          </div>
          <span className="w-10" />
        </div>
        <div className="flex flex-col items-center gap-3 relative z-10">
          <div className="w-16 h-16 rounded-2xl glass-flame flex items-center justify-center animate-ember-glow">
            <Zap className="h-8 w-8 text-flame-glow animate-pulse" />
          </div>
          <p className="text-flame-light text-xl font-flame font-semibold text-center">Create Account</p>
          <p className="text-flame-light/60 text-sm">Join the energy trading revolution</p>
        </div>
      </div>

      {/* Form content */}
      <div className="bg-gradient-to-b from-flame-smoke to-flame-dark px-6 pt-6 pb-8 space-y-5">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-xs font-medium text-flame-light/70">
                Full Name
              </Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-flame-hot/60">
                  <User className="h-4 w-4" />
                </span>
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  placeholder="Enter your full name"
                  className="pl-11 h-12 rounded-xl bg-flame-dark/80 border-flame-core/20 text-flame-light placeholder:text-flame-light/30 focus:border-flame-core focus:ring-flame-core/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-medium text-flame-light/70">
                Email Address
              </Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-flame-hot/60">
                  <Mail className="h-4 w-4" />
                </span>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                  className="pl-11 h-12 rounded-xl bg-flame-dark/80 border-flame-core/20 text-flame-light placeholder:text-flame-light/30 focus:border-flame-core focus:ring-flame-core/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs font-medium text-flame-light/70">
                Password
              </Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-flame-hot/60">
                  <Lock className="h-4 w-4" />
                </span>
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Create a strong password"
                  className="pl-11 pr-11 h-12 rounded-xl bg-flame-dark/80 border-flame-core/20 text-flame-light placeholder:text-flame-light/30 focus:border-flame-core focus:ring-flame-core/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-flame-hot/60 hover:text-flame-hot transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Flame className="h-4 w-4 animate-flame-flicker" />
                Creating Account...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Create Account
              </span>
            )}
          </Button>
        </form>

        <div className="flex items-center gap-3 text-xs text-flame-light/40 pt-2">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-flame-core/30 to-transparent" />
          <span>Or continue with</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-flame-core/30 to-transparent" />
        </div>

        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={signInWithGoogle}
            className="flex items-center gap-2 px-5 h-11 rounded-xl border border-flame-core/20 bg-flame-dark/50 text-sm font-medium text-flame-light hover:bg-flame-core/10 hover:border-flame-core/40 transition-all"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M5.27 9.76A7.08 7.08 0 0 1 12 5.5c1.82 0 3.38.64 4.62 1.7l3.48-3.47A11.95 11.95 0 0 0 12 0C7.39 0 3.4 2.6 1.39 6.41l3.88 3.35z"/>
              <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58l3.86 2.99c2.26-2.09 3.56-5.17 3.56-8.81z"/>
              <path fill="#FBBC05" d="M5.27 14.24l-3.88 3.35C3.4 21.4 7.39 24 12 24c3.24 0 5.95-1.07 7.93-2.91l-3.86-2.99c-1.07.72-2.44 1.16-4.07 1.16a7.08 7.08 0 0 1-6.73-5.02z"/>
              <path fill="#34A853" d="M12 24c4.61 0 8.6-2.6 10.61-6.41l-3.88-3.35A7.08 7.08 0 0 1 12 18.5a7.08 7.08 0 0 1-6.73-5.02l-3.88 3.35C3.4 21.4 7.39 24 12 24z"/>
            </svg>
            Google
          </button>
          <button
            type="button"
            className="flex items-center gap-2 px-5 h-11 rounded-xl border border-[#1877F2]/50 bg-[#1877F2] text-sm font-medium text-white hover:bg-[#1877F2]/90 transition-all"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Facebook
          </button>
        </div>
      </div>
    </div>
  );
}
