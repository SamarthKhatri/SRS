
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Zap, Users, RefreshCw, TrendingUp } from 'lucide-react';

interface NonFunctionalRequirementsData {
  performance: string;
  security: string;
  usability: string;
  reliability: string;
  scalability: string;
}

interface NonFunctionalRequirementsStepProps {
  data: NonFunctionalRequirementsData;
  onChange: (field: string, value: string) => void;
}

const NonFunctionalRequirementsStep = ({ data, onChange }: NonFunctionalRequirementsStepProps) => {
  const requirements = [
    {
      key: 'performance',
      title: 'Performance Requirements',
      icon: <Zap className="w-5 h-5" />,
      placeholder: 'Specify response times, throughput, load capacity, etc. Example: System should respond within 2 seconds for 95% of requests...',
      required: true
    },
    {
      key: 'security',
      title: 'Security Requirements',
      icon: <Shield className="w-5 h-5" />,
      placeholder: 'Define authentication, authorization, data protection, encryption requirements, etc.',
      required: true
    },
    {
      key: 'usability',
      title: 'Usability Requirements',
      icon: <Users className="w-5 h-5" />,
      placeholder: 'Describe user interface standards, accessibility requirements, user experience goals...',
      required: false
    },
    {
      key: 'reliability',
      title: 'Reliability Requirements',
      icon: <RefreshCw className="w-5 h-5" />,
      placeholder: 'Specify uptime requirements, fault tolerance, backup and recovery procedures...',
      required: false
    },
    {
      key: 'scalability',
      title: 'Scalability Requirements',
      icon: <TrendingUp className="w-5 h-5" />,
      placeholder: 'Define how the system should handle growth in users, data, and load over time...',
      required: false
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Define Quality Attributes
        </h3>
        <p className="text-gray-600">
          Specify how well your system should perform across different quality dimensions
        </p>
      </div>

      <div className="grid gap-6">
        {requirements.map((req) => (
          <Card key={req.key} className="transition-all duration-200 hover:shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-3 text-lg">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  {req.icon}
                </div>
                <span>
                  {req.title}
                  {req.required && <span className="text-red-500 ml-1">*</span>}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder={req.placeholder}
                value={data[req.key as keyof NonFunctionalRequirementsData]}
                onChange={(e) => onChange(req.key, e.target.value)}
                rows={4}
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NonFunctionalRequirementsStep;
