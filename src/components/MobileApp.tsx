import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const MobileApp: React.FC = () => {
  return (
    <section className="bg-slate-800 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <Badge className="mb-4 bg-green-500/20 text-green-400 border-green-500/30">
              Mobile App
            </Badge>
            <h2 className="text-3xl font-bold text-white mb-6">
              Trade On The Go
            </h2>
            <p className="text-slate-300 text-lg mb-8">
              Download Digiwell for iOS and Android. Access global energy markets, 
              manage your digital wallet, and execute trades from anywhere in the world.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-slate-300">Real-time market data</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-slate-300">Biometric security</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-slate-300">Push notifications</span>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-yellow-500 hover:from-blue-600 hover:to-yellow-600">
                📱 App Store
              </Button>
              <Button size="lg" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                🤖 Google Play
              </Button>
            </div>
          </div>

          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative">
              <img 
                src="https://d64gsuwffb70l.cloudfront.net/68ad070189652538d760a575_1756170051869_7e3fe030.webp"
                alt="Digiwell Mobile App"
                className="w-80 h-auto rounded-2xl shadow-2xl"
              />
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-blue-500 to-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">DW</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <Card className="bg-slate-900 border-slate-700 text-center">
            <CardHeader>
              <div className="text-3xl mb-2">⭐</div>
              <CardTitle className="text-white">4.8 Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300">Over 50,000 downloads</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-700 text-center">
            <CardHeader>
              <div className="text-3xl mb-2">🔒</div>
              <CardTitle className="text-white">Bank-Level Security</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300">Multi-layer encryption</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-700 text-center">
            <CardHeader>
              <div className="text-3xl mb-2">🌍</div>
              <CardTitle className="text-white">Global Access</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300">Available in 150+ countries</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default MobileApp;