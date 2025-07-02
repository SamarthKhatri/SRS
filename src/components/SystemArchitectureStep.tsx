
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, X, Database, Network, Globe } from 'lucide-react';

interface SystemArchitectureData {
  overview: string;
  components: string[];
  dataFlow: string;
  interfaces: string;
}

interface SystemArchitectureStepProps {
  data: SystemArchitectureData;
  onChange: (field: string, value: string) => void;
  onUpdateArray: (field: string, index: number, value: string) => void;
  onAddArrayItem: (field: string) => void;
  onRemoveArrayItem: (field: string, index: number) => void;
}

const SystemArchitectureStep = ({ 
  data, 
  onChange, 
  onUpdateArray, 
  onAddArrayItem, 
  onRemoveArrayItem 
}: SystemArchitectureStepProps) => {
  return (
    <div className="space-y-8">
      {/* System Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="w-5 h-5 text-blue-600" />
            <span>System Overview *</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Provide a high-level overview of your system architecture. Describe the overall structure, key patterns, and architectural decisions..."
            value={data.overview}
            onChange={(e) => onChange('overview', e.target.value)}
            rows={5}
            className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
          />
        </CardContent>
      </Card>

      {/* System Components */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Network className="w-5 h-5 text-blue-600" />
              <span>System Components</span>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onAddArrayItem('components')}
              className="flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Component</span>
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            List the major components, modules, or services that make up your system
          </p>
          {data.components.map((component, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Input
                placeholder={`Component ${index + 1}: Frontend Web App, Authentication Service, Database Layer, etc.`}
                value={component}
                onChange={(e) => onUpdateArray('components', index, e.target.value)}
                className="flex-1"
              />
              {data.components.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => onRemoveArrayItem('components', index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Data Flow */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="w-5 h-5 text-blue-600" />
            <span>Data Flow *</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Describe how data flows through your system. Include data sources, processing steps, storage, and output..."
            value={data.dataFlow}
            onChange={(e) => onChange('dataFlow', e.target.value)}
            rows={4}
            className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
          />
        </CardContent>
      </Card>

      {/* External Interfaces */}
      <Card>
        <CardHeader>
          <CardTitle>External Interfaces</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Describe interfaces with external systems, APIs, third-party services, hardware interfaces, etc."
            value={data.interfaces}
            onChange={(e) => onChange('interfaces', e.target.value)}
            rows={4}
            className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemArchitectureStep;
