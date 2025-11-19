import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ComplianceSection: React.FC = () => {
  const certifications = [
    {
      title: 'ISO 27001',
      description: 'Information Security Management',
      status: 'Certified'
    },
    {
      title: 'SOC 2 Type II',
      description: 'Security & Availability Controls',
      status: 'Audited'
    },
    {
      title: 'CFTC Registered',
      description: 'Commodity Futures Trading Commission',
      status: 'Licensed'
    },
    {
      title: 'GDPR Compliant',
      description: 'European Data Protection',
      status: 'Compliant'
    }
  ];

  return (
    <section className="bg-slate-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-green-500/20 text-green-400 border-green-500/30">
            Regulatory Compliance
          </Badge>
          <h2 className="text-3xl font-bold text-white mb-4">
            Trusted & Regulated Platform
          </h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Digiwell operates under strict regulatory oversight with full compliance 
            to international energy trading standards and financial regulations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {certifications.map((cert, index) => (
            <Card key={index} className="bg-slate-800 border-slate-700 text-center">
              <CardHeader>
                <div className="text-2xl mb-2">✅</div>
                <CardTitle className="text-white text-lg">{cert.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 text-sm mb-2">{cert.description}</p>
                <Badge className="bg-green-500/20 text-green-400">{cert.status}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-slate-800 rounded-lg p-8 border border-slate-700">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-white mb-2">$50M+</div>
              <div className="text-slate-400">Insurance Coverage</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-2">99.9%</div>
              <div className="text-slate-400">Platform Uptime</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-2">150+</div>
              <div className="text-slate-400">Countries Supported</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComplianceSection;