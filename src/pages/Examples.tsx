
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  ArrowLeft,
  ExternalLink,
  Smartphone,
  ShoppingCart,
  Users,
  Building,
  Calendar,
  MessageSquare
} from 'lucide-react';
import SampleSRSViewer from '@/components/SampleSRSViewer';

const Examples = () => {
  const navigate = useNavigate();
  const [selectedExample, setSelectedExample] = useState<any>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const examples = [
    {
      title: "E-Commerce Platform SRS",
      description: "Complete requirements specification for an online shopping platform with user management, product catalog, and payment processing.",
      category: "Web Application",
      icon: <ShoppingCart className="w-6 h-6" />,
      features: ["User Authentication", "Product Management", "Payment Gateway", "Order Tracking", "Admin Dashboard"],
      complexity: "High",
      pages: "45 pages"
    },
    {
      title: "Mobile Banking App SRS",
      description: "Comprehensive requirements for a secure mobile banking application with account management and transaction features.",
      category: "Mobile Application",
      icon: <Smartphone className="w-6 h-6" />,
      features: ["Biometric Authentication", "Fund Transfer", "Bill Payment", "Account Statements", "Security Features"],
      complexity: "High",
      pages: "52 pages"
    },
    {
      title: "Employee Management System SRS",
      description: "Requirements specification for an HR management system handling employee records, payroll, and performance tracking.",
      category: "Enterprise Software",
      icon: <Users className="w-6 h-6" />,
      features: ["Employee Records", "Payroll Management", "Performance Tracking", "Leave Management", "Reporting"],
      complexity: "Medium",
      pages: "38 pages"
    },
    {
      title: "Hospital Management System SRS",
      description: "Detailed requirements for a comprehensive hospital management system covering patient care and administrative functions.",
      category: "Healthcare Software",
      icon: <Building className="w-6 h-6" />,
      features: ["Patient Registration", "Appointment Scheduling", "Medical Records", "Billing System", "Inventory Management"],
      complexity: "High",
      pages: "67 pages"
    },
    {
      title: "Event Management Platform SRS",
      description: "Requirements for an event planning and management platform with booking, scheduling, and attendee management.",
      category: "Web Application",
      icon: <Calendar className="w-6 h-6" />,
      features: ["Event Creation", "Ticket Booking", "Venue Management", "Speaker Management", "Analytics Dashboard"],
      complexity: "Medium",
      pages: "32 pages"
    },
    {
      title: "Chat Application SRS",
      description: "Simple requirements specification for a real-time messaging application with basic chat functionality.",
      category: "Mobile/Web App",
      icon: <MessageSquare className="w-6 h-6" />,
      features: ["Real-time Messaging", "User Profiles", "Group Chats", "File Sharing", "Push Notifications"],
      complexity: "Low",
      pages: "24 pages"
    }
  ];

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'High': return 'bg-red-100 text-red-700 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const handleViewSample = (example: any) => {
    setSelectedExample(example);
    setIsViewerOpen(true);
  };

  const handleCloseViewer = () => {
    setIsViewerOpen(false);
    setSelectedExample(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/')}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </Button>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">SRS Examples</h1>
                <p className="text-sm text-gray-500">Sample Requirements Documents</p>
              </div>
            </div>
            
            <Button 
              onClick={() => navigate('/generator')}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              Create Your SRS
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            SRS Document Examples
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore professionally crafted Software Requirements Specifications across different domains and complexity levels. 
            Use these as inspiration for your own projects.
          </p>
        </div>

        {/* Examples Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {examples.map((example, index) => (
            <Card key={index} className="transition-all duration-300 hover:shadow-lg hover:scale-105 border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-start justify-between mb-3">
                  <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-3 rounded-lg">
                    <div className="text-blue-600">
                      {example.icon}
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <Badge variant="outline" className="text-xs">
                      {example.category}
                    </Badge>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getComplexityColor(example.complexity)}`}
                    >
                      {example.complexity}
                    </Badge>
                  </div>
                </div>
                <CardTitle className="text-lg leading-tight">
                  {example.title}
                </CardTitle>
                <p className="text-sm text-gray-600 mt-2">
                  {example.description}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Features:</h4>
                    <div className="flex flex-wrap gap-1">
                      {example.features.slice(0, 3).map((feature, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                      {example.features.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{example.features.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t">
                    <span className="text-sm text-gray-500">{example.pages}</span>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-xs"
                      onClick={() => handleViewSample(example)}
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      View Sample
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-white/50 backdrop-blur-sm rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Create Your Own SRS?
          </h2>
          <p className="text-gray-600 mb-6">
            Use these examples as inspiration and create your own professional SRS document with our guided process.
          </p>
          <Button 
            size="lg"
            onClick={() => navigate('/generator')}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            Start Creating Your SRS
          </Button>
        </div>
      </div>

      {/* Sample SRS Viewer */}
      {selectedExample && (
        <SampleSRSViewer
          isOpen={isViewerOpen}
          onClose={handleCloseViewer}
          example={selectedExample}
        />
      )}
    </div>
  );
};

export default Examples;
