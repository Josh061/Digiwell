import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      title: 'Blockchain Security',
      description: 'Enterprise-grade security with multi-signature wallets and smart contract automation.',
      icon: '🔐'
    },
    {
      title: '2% Processing Fee',
      description: 'Industry-leading low fees for all energy commodity transactions and settlements.',
      icon: '💰'
    },
    {
      title: 'Global Compliance',
      description: 'Full compliance with international energy trading standards and regulations.',
      icon: '🌍'
    },
    {
      title: 'Real-time Settlement',
      description: 'Instant blockchain-based settlement for all crude oil and natural gas trades.',
      icon: '⚡'
    },
    {
      title: 'Market Analytics',
      description: 'Advanced trading tools with real-time market data and price predictions.',
      icon: '📊'
    },
    {
      title: '24/7 Trading',
      description: 'Round-the-clock access to global energy markets with automated execution.',
      icon: '🕒'
    }
  ];

  return (
    <section className="bg-slate-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-blue-500/20 text-blue-400 border-blue-500/30">
            Platform Features
          </Badge>
          <h2 className="text-3xl font-bold text-white mb-4">
            Revolutionary Energy Trading
          </h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Experience the future of energy commodity trading with blockchain technology 
            and international market standards.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-slate-800 border-slate-700 hover:border-slate-600 transition-colors">
              <CardHeader>
                <div className="text-4xl mb-4">{feature.icon}</div>
                <CardTitle className="text-white">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <img 
            src="https://d64gsuwffb70l.cloudfront.net/68ad070189652538d760a575_1756170057762_0e9342e3.webp"
            alt="Professional Trading"
            className="mx-auto rounded-lg shadow-2xl max-w-2xl w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;