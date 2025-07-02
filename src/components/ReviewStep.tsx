
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  FileText, 
  Target, 
  Shield, 
  Database, 
  Settings, 
  Edit3,
  CheckCircle 
} from 'lucide-react';

interface SRSData {
  projectInfo: {
    name: string;
    version: string;
    description: string;
    stakeholders: string;
    scope: string;
  };
  functionalRequirements: {
    userStories: string[];
    systemFeatures: string[];
    businessRules: string[];
  };
  nonFunctionalRequirements: {
    performance: string;
    security: string;
    usability: string;
    reliability: string;
    scalability: string;
  };
  systemArchitecture: {
    overview: string;
    components: string[];
    dataFlow: string;
    interfaces: string;
  };
  constraints: {
    technical: string[];
    business: string[];
    regulatory: string[];
  };
}

interface ReviewStepProps {
  data: SRSData;
  onEditStep: (stepIndex: number) => void;
}

const ReviewStep = ({ data, onEditStep }: ReviewStepProps) => {
  const sections = [
    {
      title: 'Project Information',
      icon: <FileText className="w-5 h-5" />,
      stepIndex: 0,
      content: (
        <div className="space-y-3">
          <div>
            <span className="font-medium">Project Name:</span> {data.projectInfo.name}
          </div>
          <div>
            <span className="font-medium">Version:</span> {data.projectInfo.version}
          </div>
          <div>
            <span className="font-medium">Description:</span>
            <p className="mt-1 text-gray-700">{data.projectInfo.description}</p>
          </div>
          {data.projectInfo.stakeholders && (
            <div>
              <span className="font-medium">Stakeholders:</span>
              <p className="mt-1 text-gray-700">{data.projectInfo.stakeholders}</p>
            </div>
          )}
          <div>
            <span className="font-medium">Scope:</span>
            <p className="mt-1 text-gray-700">{data.projectInfo.scope}</p>
          </div>
        </div>
      )
    },
    {
      title: 'Functional Requirements',
      icon: <Target className="w-5 h-5" />,
      stepIndex: 1,
      content: (
        <div className="space-y-4">
          <div>
            <span className="font-medium">User Stories:</span>
            <ul className="mt-2 space-y-1">
              {data.functionalRequirements.userStories.filter(story => story.trim()).map((story, index) => (
                <li key={index} className="text-gray-700 pl-2 border-l-2 border-blue-200">
                  {story}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className="font-medium">System Features:</span>
            <ul className="mt-2 space-y-1">
              {data.functionalRequirements.systemFeatures.filter(feature => feature.trim()).map((feature, index) => (
                <li key={index} className="text-gray-700">• {feature}</li>
              ))}
            </ul>
          </div>
          {data.functionalRequirements.businessRules.some(rule => rule.trim()) && (
            <div>
              <span className="font-medium">Business Rules:</span>
              <ul className="mt-2 space-y-1">
                {data.functionalRequirements.businessRules.filter(rule => rule.trim()).map((rule, index) => (
                  <li key={index} className="text-gray-700 pl-2 border-l-2 border-green-200">
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )
    },
    {
      title: 'Non-Functional Requirements',
      icon: <Shield className="w-5 h-5" />,
      stepIndex: 2,
      content: (
        <div className="space-y-3">
          {data.nonFunctionalRequirements.performance && (
            <div>
              <span className="font-medium">Performance:</span>
              <p className="mt-1 text-gray-700">{data.nonFunctionalRequirements.performance}</p>
            </div>
          )}
          {data.nonFunctionalRequirements.security && (
            <div>
              <span className="font-medium">Security:</span>
              <p className="mt-1 text-gray-700">{data.nonFunctionalRequirements.security}</p>
            </div>
          )}
          {data.nonFunctionalRequirements.usability && (
            <div>
              <span className="font-medium">Usability:</span>
              <p className="mt-1 text-gray-700">{data.nonFunctionalRequirements.usability}</p>
            </div>
          )}
          {data.nonFunctionalRequirements.reliability && (
            <div>
              <span className="font-medium">Reliability:</span>
              <p className="mt-1 text-gray-700">{data.nonFunctionalRequirements.reliability}</p>
            </div>
          )}
          {data.nonFunctionalRequirements.scalability && (
            <div>
              <span className="font-medium">Scalability:</span>
              <p className="mt-1 text-gray-700">{data.nonFunctionalRequirements.scalability}</p>
            </div>
          )}
        </div>
      )
    },
    {
      title: 'System Architecture',
      icon: <Database className="w-5 h-5" />,
      stepIndex: 3,
      content: (
        <div className="space-y-3">
          {data.systemArchitecture.overview && (
            <div>
              <span className="font-medium">Overview:</span>
              <p className="mt-1 text-gray-700">{data.systemArchitecture.overview}</p>
            </div>
          )}
          {data.systemArchitecture.components.some(comp => comp.trim()) && (
            <div>
              <span className="font-medium">Components:</span>
              <ul className="mt-2 space-y-1">
                {data.systemArchitecture.components.filter(comp => comp.trim()).map((component, index) => (
                  <li key={index} className="text-gray-700">• {component}</li>
                ))}
              </ul>
            </div>
          )}
          {data.systemArchitecture.dataFlow && (
            <div>
              <span className="font-medium">Data Flow:</span>
              <p className="mt-1 text-gray-700">{data.systemArchitecture.dataFlow}</p>
            </div>
          )}
          {data.systemArchitecture.interfaces && (
            <div>
              <span className="font-medium">External Interfaces:</span>
              <p className="mt-1 text-gray-700">{data.systemArchitecture.interfaces}</p>
            </div>
          )}
        </div>
      )
    },
    {
      title: 'Constraints & Dependencies',
      icon: <Settings className="w-5 h-5" />,
      stepIndex: 4,
      content: (
        <div className="space-y-4">
          {data.constraints.technical.some(constraint => constraint.trim()) && (
            <div>
              <span className="font-medium">Technical Constraints:</span>
              <ul className="mt-2 space-y-1">
                {data.constraints.technical.filter(constraint => constraint.trim()).map((constraint, index) => (
                  <li key={index} className="text-gray-700">• {constraint}</li>
                ))}
              </ul>
            </div>
          )}
          {data.constraints.business.some(constraint => constraint.trim()) && (
            <div>
              <span className="font-medium">Business Constraints:</span>
              <ul className="mt-2 space-y-1">
                {data.constraints.business.filter(constraint => constraint.trim()).map((constraint, index) => (
                  <li key={index} className="text-gray-700">• {constraint}</li>
                ))}
              </ul>
            </div>
          )}
          {data.constraints.regulatory.some(constraint => constraint.trim()) && (
            <div>
              <span className="font-medium">Regulatory Constraints:</span>
              <ul className="mt-2 space-y-1">
                {data.constraints.regulatory.filter(constraint => constraint.trim()).map((constraint, index) => (
                  <li key={index} className="text-gray-700">• {constraint}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
          <h3 className="text-2xl font-bold text-gray-900">Review Your SRS</h3>
        </div>
        <p className="text-gray-600">
          Review all sections before generating your Software Requirements Specification document
        </p>
      </div>

      <ScrollArea className="h-[600px] pr-4">
        <div className="space-y-6">
          {sections.map((section, index) => (
            <Card key={index} className="transition-all duration-200 hover:shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                      {section.icon}
                    </div>
                    <span>{section.title}</span>
                  </div>
                  <button
                    onClick={() => onEditStep(section.stepIndex)}
                    className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {section.content}
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ReviewStep;
