
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, X, Settings, Briefcase, Shield } from 'lucide-react';

interface ConstraintsData {
  technical: string[];
  business: string[];
  regulatory: string[];
}

interface ConstraintsStepProps {
  data: ConstraintsData;
  onUpdateArray: (field: string, index: number, value: string) => void;
  onAddArrayItem: (field: string) => void;
  onRemoveArrayItem: (field: string, index: number) => void;
}

const ConstraintsStep = ({ 
  data, 
  onUpdateArray, 
  onAddArrayItem, 
  onRemoveArrayItem 
}: ConstraintsStepProps) => {
  const constraintSections = [
    {
      key: 'technical',
      title: 'Technical Constraints',
      icon: <Settings className="w-5 h-5" />,
      description: 'Technology limitations, platform requirements, compatibility issues',
      placeholder: 'Must use existing database, Limited to specific programming language, etc.'
    },
    {
      key: 'business',
      title: 'Business Constraints',
      icon: <Briefcase className="w-5 h-5" />,
      description: 'Budget limitations, timeline constraints, resource availability',
      placeholder: 'Budget limit of $50,000, Must launch by Q2 2024, Team of 3 developers, etc.'
    },
    {
      key: 'regulatory',
      title: 'Regulatory Constraints',
      icon: <Shield className="w-5 h-5" />,
      description: 'Legal requirements, compliance standards, industry regulations',
      placeholder: 'GDPR compliance required, HIPAA compliance, SOX compliance, etc.'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Project Constraints & Dependencies
        </h3>
        <p className="text-gray-600">
          Identify limitations and external factors that will impact your project
        </p>
      </div>

      {constraintSections.map((section) => (
        <Card key={section.key}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  {section.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{section.title}</h3>
                  <p className="text-sm text-gray-600 font-normal">
                    {section.description}
                  </p>
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onAddArrayItem(section.key)}
                className="flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add</span>
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {data[section.key as keyof ConstraintsData].map((constraint, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  placeholder={section.placeholder}
                  value={constraint}
                  onChange={(e) => onUpdateArray(section.key, index, e.target.value)}
                  className="flex-1"
                />
                {data[section.key as keyof ConstraintsData].length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => onRemoveArrayItem(section.key, index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ConstraintsStep;
