
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, X } from 'lucide-react';

interface FunctionalRequirementsData {
  userStories: string[];
  systemFeatures: string[];
  businessRules: string[];
}

interface FunctionalRequirementsStepProps {
  data: FunctionalRequirementsData;
  onUpdateArray: (field: string, index: number, value: string) => void;
  onAddArrayItem: (field: string) => void;
  onRemoveArrayItem: (field: string, index: number) => void;
}

const FunctionalRequirementsStep = ({ 
  data, 
  onUpdateArray, 
  onAddArrayItem, 
  onRemoveArrayItem 
}: FunctionalRequirementsStepProps) => {
  return (
    <div className="space-y-8">
      {/* User Stories Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-lg font-semibold">User Stories *</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onAddArrayItem('userStories')}
            className="flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Story</span>
          </Button>
        </div>
        <p className="text-sm text-gray-600">
          Define user stories in the format: "As a [user type], I want [goal] so that [benefit]"
        </p>
        {data.userStories.map((story, index) => (
          <div key={index} className="flex items-start space-x-2">
            <Textarea
              placeholder={`User Story ${index + 1}: As a user, I want to...`}
              value={story}
              onChange={(e) => onUpdateArray('userStories', index, e.target.value)}
              rows={2}
              className="flex-1"
            />
            {data.userStories.length > 1 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onRemoveArrayItem('userStories', index)}
                className="mt-1 text-red-600 hover:text-red-700"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        ))}
      </div>

      {/* System Features Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-lg font-semibold">System Features *</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onAddArrayItem('systemFeatures')}
            className="flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Feature</span>
          </Button>
        </div>
        <p className="text-sm text-gray-600">
          List the main features and capabilities your system will provide
        </p>
        {data.systemFeatures.map((feature, index) => (
          <div key={index} className="flex items-start space-x-2">
            <Input
              placeholder={`Feature ${index + 1}: Authentication system, Data export, etc.`}
              value={feature}
              onChange={(e) => onUpdateArray('systemFeatures', index, e.target.value)}
              className="flex-1"
            />
            {data.systemFeatures.length > 1 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onRemoveArrayItem('systemFeatures', index)}
                className="text-red-600 hover:text-red-700"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        ))}
      </div>

      {/* Business Rules Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-lg font-semibold">Business Rules</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onAddArrayItem('businessRules')}
            className="flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Rule</span>
          </Button>
        </div>
        <p className="text-sm text-gray-600">
          Define business logic, constraints, and rules that govern system behavior
        </p>
        {data.businessRules.map((rule, index) => (
          <div key={index} className="flex items-start space-x-2">
            <Textarea
              placeholder={`Business Rule ${index + 1}: Users must verify email before...`}
              value={rule}
              onChange={(e) => onUpdateArray('businessRules', index, e.target.value)}
              rows={2}
              className="flex-1"
            />
            {data.businessRules.length > 1 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onRemoveArrayItem('businessRules', index)}
                className="mt-1 text-red-600 hover:text-red-700"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FunctionalRequirementsStep;
