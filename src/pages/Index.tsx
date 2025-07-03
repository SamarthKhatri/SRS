import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  FileText, 
  Download, 
  Edit3, 
  CheckCircle, 
  ArrowLeft, 
  ArrowRight, 
  Copy, 
  Code,
  Settings,
  Users,
  Target,
  Shield,
  Zap,
  Database,
  Globe,
  Smartphone
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import jsPDF from 'jspdf';

// Import step components
import FunctionalRequirementsStep from '@/components/FunctionalRequirementsStep';
import NonFunctionalRequirementsStep from '@/components/NonFunctionalRequirementsStep';
import SystemArchitectureStep from '@/components/SystemArchitectureStep';
import ConstraintsStep from '@/components/ConstraintsStep';
import ReviewStep from '@/components/ReviewStep';

interface SRSData {
  projectInfo: {
    companyName: string;
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

const Index = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [srsData, setSrsData] = useState<SRSData>({
    projectInfo: {
      companyName: '',
      name: '',
      version: '1.0',
      description: '',
      stakeholders: '',
      scope: ''
    },
    functionalRequirements: {
      userStories: [''],
      systemFeatures: [''],
      businessRules: ['']
    },
    nonFunctionalRequirements: {
      performance: '',
      security: '',
      usability: '',
      reliability: '',
      scalability: ''
    },
    systemArchitecture: {
      overview: '',
      components: [''],
      dataFlow: '',
      interfaces: ''
    },
    constraints: {
      technical: [''],
      business: [''],
      regulatory: ['']
    }
  });
  
  const [showCodeCanvas, setShowCodeCanvas] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const codeRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      id: 0,
      title: 'Project Information',
      icon: <FileText className="w-5 h-5" />,
      description: 'Basic project details and scope'
    },
    {
      id: 1,
      title: 'Functional Requirements',
      icon: <Target className="w-5 h-5" />,
      description: 'User stories, features, and business rules'
    },
    {
      id: 2,
      title: 'Non-Functional Requirements',
      icon: <Shield className="w-5 h-5" />,
      description: 'Performance, security, and quality attributes'
    },
    {
      id: 3,
      title: 'System Architecture',
      icon: <Database className="w-5 h-5" />,
      description: 'System design and technical architecture'
    },
    {
      id: 4,
      title: 'Constraints & Dependencies',
      icon: <Settings className="w-5 h-5" />,
      description: 'Technical, business, and regulatory constraints'
    },
    {
      id: 5,
      title: 'Review & Generate',
      icon: <CheckCircle className="w-5 h-5" />,
      description: 'Review your SRS and generate PDF'
    }
  ];

  const calculateProgress = () => {
    return Math.round((completedSteps.length / (steps.length - 1)) * 100);
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return srsData.projectInfo.companyName && srsData.projectInfo.name && srsData.projectInfo.description && srsData.projectInfo.scope;
      case 1:
        return srsData.functionalRequirements.userStories.some(story => story.trim()) &&
               srsData.functionalRequirements.systemFeatures.some(feature => feature.trim());
      case 2:
        return srsData.nonFunctionalRequirements.performance && 
               srsData.nonFunctionalRequirements.security;
      case 3:
        return srsData.systemArchitecture.overview && srsData.systemArchitecture.dataFlow;
      case 4:
        return srsData.constraints.technical.some(constraint => constraint.trim()) ||
               srsData.constraints.business.some(constraint => constraint.trim());
      default:
        return true;
    }
  };

  const generatePDF = () => {
    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.width;
      const pageHeight = doc.internal.pageSize.height;
      const margin = 20;
      let yPosition = 40;
      
      // Company branding function
      const addHeader = (pageNumber: number) => {
        // Company name at top of every page - bold
        doc.setFontSize(12);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(0, 0, 0);
        const companyName = srsData.projectInfo.companyName || 'SRS Generator Pro';
        doc.text(companyName, pageWidth - margin, 15, { align: 'right' });
        
        // Page number
        if (pageNumber > 1) {
          doc.setFont(undefined, 'normal');
          doc.setFontSize(10);
          doc.setTextColor(100, 100, 100);
          doc.text(`Page ${pageNumber}`, pageWidth - margin, pageHeight - 10, { align: 'right' });
        }
        
        // Horizontal line under header
        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(0.5);
        doc.line(margin, 25, pageWidth - margin, 25);
      };
      
      // Add header to first page
      addHeader(1);
      let currentPage = 1;
      
      // Main title - centered and prominent
      doc.setFontSize(24);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text('Software Requirements Specification', pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 10;
      
      // Project name subtitle - centered
      if (srsData.projectInfo.name) {
        doc.setFontSize(16);
        doc.setFont(undefined, 'normal');
        doc.setTextColor(60, 60, 60);
        doc.text(`Project: ${srsData.projectInfo.name}`, pageWidth / 2, yPosition, { align: 'center' });
        yPosition += 15;
      }
      
      // Decorative line
      doc.setDrawColor(66, 139, 202);
      doc.setLineWidth(2);
      doc.line(margin + 50, yPosition, pageWidth - margin - 50, yPosition);
      yPosition += 25;
      
      // Function to add new page with header
      const addNewPage = () => {
        doc.addPage();
        currentPage++;
        addHeader(currentPage);
        yPosition = 40;
      };
      
      // Function to check if we need a new page
      const checkPageSpace = (requiredSpace: number) => {
        if (yPosition + requiredSpace > pageHeight - 40) {
          addNewPage();
        }
      };
      
      // Section 1: Project Information
      checkPageSpace(60);
      doc.setFontSize(18);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(0, 0, 0); // Main headings in black
      doc.text('1. Project Information', margin, yPosition);
      yPosition += 15;
      
      doc.setFontSize(12);
      doc.setFont(undefined, 'normal');
      doc.setTextColor(0, 0, 0);
      
      if (srsData.projectInfo.companyName) {
        doc.setFont(undefined, 'bold');
        doc.setTextColor(66, 139, 202); // Sub-headings in blue
        doc.text('Company Name:', margin, yPosition);
        doc.setFont(undefined, 'normal');
        doc.setTextColor(0, 0, 0);
        doc.text(srsData.projectInfo.companyName, margin + 35, yPosition);
        yPosition += 10;
      }
      
      if (srsData.projectInfo.name) {
        doc.setFont(undefined, 'bold');
        doc.setTextColor(66, 139, 202); // Sub-headings in blue
        doc.text('Project Name:', margin, yPosition);
        doc.setFont(undefined, 'normal');
        doc.setTextColor(0, 0, 0);
        doc.text(srsData.projectInfo.name, margin + 35, yPosition);
        yPosition += 10;
      }
      
      if (srsData.projectInfo.version) {
        doc.setFont(undefined, 'bold');
        doc.setTextColor(66, 139, 202); // Sub-headings in blue
        doc.text('Version:', margin, yPosition);
        doc.setFont(undefined, 'normal');
        doc.setTextColor(0, 0, 0);
        doc.text(srsData.projectInfo.version, margin + 25, yPosition);
        yPosition += 10;
      }
      
      if (srsData.projectInfo.description) {
        doc.setFont(undefined, 'bold');
        doc.setTextColor(66, 139, 202); // Sub-headings in blue
        doc.text('Description:', margin, yPosition);
        yPosition += 8;
        doc.setFont(undefined, 'normal');
        doc.setTextColor(0, 0, 0);
        const descLines = doc.splitTextToSize(srsData.projectInfo.description, pageWidth - 2 * margin);
        doc.text(descLines, margin, yPosition);
        yPosition += descLines.length * 6 + 5;
      }
      
      if (srsData.projectInfo.stakeholders) {
        checkPageSpace(30);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(66, 139, 202); // Sub-headings in blue
        doc.text('Stakeholders:', margin, yPosition);
        yPosition += 8;
        doc.setFont(undefined, 'normal');
        doc.setTextColor(0, 0, 0);
        const stakeholderLines = doc.splitTextToSize(srsData.projectInfo.stakeholders, pageWidth - 2 * margin);
        doc.text(stakeholderLines, margin, yPosition);
        yPosition += stakeholderLines.length * 6 + 5;
      }
      
      if (srsData.projectInfo.scope) {
        checkPageSpace(30);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(66, 139, 202); // Sub-headings in blue
        doc.text('Scope:', margin, yPosition);
        yPosition += 8;
        doc.setFont(undefined, 'normal');
        doc.setTextColor(0, 0, 0);
        const scopeLines = doc.splitTextToSize(srsData.projectInfo.scope, pageWidth - 2 * margin);
        doc.text(scopeLines, margin, yPosition);
        yPosition += scopeLines.length * 6 + 15;
      }
      
      // Section 2: Functional Requirements
      checkPageSpace(60);
      doc.setFontSize(18);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(0, 0, 0); // Main headings in black
      doc.text('2. Functional Requirements', margin, yPosition);
      yPosition += 15;
      
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      
      if (srsData.functionalRequirements.userStories.some(story => story.trim())) {
        doc.setFont(undefined, 'bold');
        doc.setTextColor(66, 139, 202); // Sub-headings in blue
        doc.text('User Stories:', margin, yPosition);
        yPosition += 8;
        doc.setTextColor(0, 0, 0);
        doc.setFont(undefined, 'normal');
        
        srsData.functionalRequirements.userStories.forEach((story) => {
          if (story.trim()) {
            checkPageSpace(15);
            const storyLines = doc.splitTextToSize(`• ${story}`, pageWidth - 2 * margin - 10);
            doc.text(storyLines, margin + 5, yPosition);
            yPosition += storyLines.length * 6 + 3;
          }
        });
        yPosition += 5;
      }
      
      if (srsData.functionalRequirements.systemFeatures.some(feature => feature.trim())) {
        checkPageSpace(20);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(66, 139, 202); // Sub-headings in blue
        doc.text('System Features:', margin, yPosition);
        yPosition += 8;
        doc.setTextColor(0, 0, 0);
        doc.setFont(undefined, 'normal');
        
        srsData.functionalRequirements.systemFeatures.forEach((feature) => {
          if (feature.trim()) {
            checkPageSpace(15);
            const featureLines = doc.splitTextToSize(`• ${feature}`, pageWidth - 2 * margin - 10);
            doc.text(featureLines, margin + 5, yPosition);
            yPosition += featureLines.length * 6 + 3;
          }
        });
        yPosition += 5;
      }
      
      if (srsData.functionalRequirements.businessRules.some(rule => rule.trim())) {
        checkPageSpace(20);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(66, 139, 202); // Sub-headings in blue
        doc.text('Business Rules:', margin, yPosition);
        yPosition += 8;
        doc.setTextColor(0, 0, 0);
        doc.setFont(undefined, 'normal');
        
        srsData.functionalRequirements.businessRules.forEach((rule) => {
          if (rule.trim()) {
            checkPageSpace(15);
            const ruleLines = doc.splitTextToSize(`• ${rule}`, pageWidth - 2 * margin - 10);
            doc.text(ruleLines, margin + 5, yPosition);
            yPosition += ruleLines.length * 6 + 3;
          }
        });
        yPosition += 10;
      }
      
      // Section 3: Non-Functional Requirements
      checkPageSpace(60);
      doc.setFontSize(18);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(0, 0, 0); // Main headings in black
      doc.text('3. Non-Functional Requirements', margin, yPosition);
      yPosition += 15;
      
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      
      const nfrSections = [
        { key: 'performance', title: 'Performance Requirements' },
        { key: 'security', title: 'Security Requirements' },
        { key: 'usability', title: 'Usability Requirements' },
        { key: 'reliability', title: 'Reliability Requirements' },
        { key: 'scalability', title: 'Scalability Requirements' }
      ];
      
      nfrSections.forEach(section => {
        const value = srsData.nonFunctionalRequirements[section.key as keyof typeof srsData.nonFunctionalRequirements];
        if (value) {
          checkPageSpace(25);
          doc.setFont(undefined, 'bold');
          doc.setTextColor(66, 139, 202); // Sub-headings in blue
          doc.text(`${section.title}:`, margin, yPosition);
          yPosition += 8;
          doc.setFont(undefined, 'normal');
          doc.setTextColor(0, 0, 0);
          const lines = doc.splitTextToSize(value, pageWidth - 2 * margin);
          doc.text(lines, margin, yPosition);
          yPosition += lines.length * 6 + 8;
        }
      });
      
      // Section 4: System Architecture
      if (srsData.systemArchitecture.overview || srsData.systemArchitecture.dataFlow) {
        checkPageSpace(60);
        doc.setFontSize(18);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(0, 0, 0); // Main headings in black
        doc.text('4. System Architecture', margin, yPosition);
        yPosition += 15;
        
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        
        if (srsData.systemArchitecture.overview) {
          doc.setFont(undefined, 'bold');
          doc.setTextColor(66, 139, 202); // Sub-headings in blue
          doc.text('Architecture Overview:', margin, yPosition);
          yPosition += 8;
          doc.setFont(undefined, 'normal');
          doc.setTextColor(0, 0, 0);
          const overviewLines = doc.splitTextToSize(srsData.systemArchitecture.overview, pageWidth - 2 * margin);
          doc.text(overviewLines, margin, yPosition);
          yPosition += overviewLines.length * 6 + 8;
        }
        
        if (srsData.systemArchitecture.components.some(comp => comp.trim())) {
          checkPageSpace(20);
          doc.setFont(undefined, 'bold');
          doc.setTextColor(66, 139, 202); // Sub-headings in blue
          doc.text('System Components:', margin, yPosition);
          yPosition += 8;
          doc.setFont(undefined, 'normal');
          doc.setTextColor(0, 0, 0);
          
          srsData.systemArchitecture.components.forEach((component) => {
            if (component.trim()) {
              checkPageSpace(10);
              const compLines = doc.splitTextToSize(`• ${component}`, pageWidth - 2 * margin - 10);
              doc.text(compLines, margin + 5, yPosition);
              yPosition += compLines.length * 6 + 3;
            }
          });
          yPosition += 5;
        }
        
        if (srsData.systemArchitecture.dataFlow) {
          checkPageSpace(20);
          doc.setFont(undefined, 'bold');
          doc.setTextColor(66, 139, 202); // Sub-headings in blue
          doc.text('Data Flow:', margin, yPosition);
          yPosition += 8;
          doc.setFont(undefined, 'normal');
          doc.setTextColor(0, 0, 0);
          const dataFlowLines = doc.splitTextToSize(srsData.systemArchitecture.dataFlow, pageWidth - 2 * margin);
          doc.text(dataFlowLines, margin, yPosition);
          yPosition += dataFlowLines.length * 6 + 8;
        }
        
        if (srsData.systemArchitecture.interfaces) {
          checkPageSpace(20);
          doc.setFont(undefined, 'bold');
          doc.setTextColor(66, 139, 202); // Sub-headings in blue
          doc.text('External Interfaces:', margin, yPosition);
          yPosition += 8;
          doc.setFont(undefined, 'normal');
          doc.setTextColor(0, 0, 0);
          const interfaceLines = doc.splitTextToSize(srsData.systemArchitecture.interfaces, pageWidth - 2 * margin);
          doc.text(interfaceLines, margin, yPosition);
          yPosition += interfaceLines.length * 6 + 8;
        }
      }
      
      // Section 5: Constraints & Dependencies
      const hasConstraints = srsData.constraints.technical.some(c => c.trim()) || 
                           srsData.constraints.business.some(c => c.trim()) || 
                           srsData.constraints.regulatory.some(c => c.trim());
      
      if (hasConstraints) {
        checkPageSpace(60);
        doc.setFontSize(18);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(0, 0, 0); // Main headings in black
        doc.text('5. Constraints & Dependencies', margin, yPosition);
        yPosition += 15;
        
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        
        const constraintSections = [
          { key: 'technical', title: 'Technical Constraints' },
          { key: 'business', title: 'Business Constraints' },
          { key: 'regulatory', title: 'Regulatory Constraints' }
        ];
        
        constraintSections.forEach(section => {
          const constraints = srsData.constraints[section.key as keyof typeof srsData.constraints];
          if (constraints.some((constraint: string) => constraint.trim())) {
            checkPageSpace(20);
            doc.setFont(undefined, 'bold');
            doc.setTextColor(66, 139, 202); // Sub-headings in blue
            doc.text(`${section.title}:`, margin, yPosition);
            yPosition += 8;
            doc.setFont(undefined, 'normal');
            doc.setTextColor(0, 0, 0);
            
            constraints.forEach((constraint: string) => {
              if (constraint.trim()) {
                checkPageSpace(10);
                const constraintLines = doc.splitTextToSize(`• ${constraint}`, pageWidth - 2 * margin - 10);
                doc.text(constraintLines, margin + 5, yPosition);
                yPosition += constraintLines.length * 6 + 3;
              }
            });
            yPosition += 5;
          }
        });
      }
      
      // Footer on last page
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      const footerCompanyName = srsData.projectInfo.companyName || 'SRS Generator Pro';
      doc.text(`Generated by ${footerCompanyName}`, pageWidth / 2, pageHeight - 15, { align: 'center' });
      doc.text(new Date().toLocaleDateString(), pageWidth / 2, pageHeight - 5, { align: 'center' });
      
      // Save the PDF
      const fileName = srsData.projectInfo.name ? 
        `${srsData.projectInfo.name.replace(/[^a-z0-9]/gi, '_')}_SRS.pdf` : 
        'SRS_Document.pdf';
      
      doc.save(fileName);
      
      toast({
        title: "Professional SRS Generated!",
        description: `Your enhanced SRS document has been downloaded as ${fileName}`,
      });
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "PDF Generation Failed",
        description: "There was an error generating your PDF. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep]);
      }
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    } else {
      toast({
        title: "Incomplete Section",
        description: "Please fill in all required fields before proceeding.",
        variant: "destructive"
      });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const addArrayItem = (section: keyof SRSData, field: string) => {
    setSrsData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: [...(prev[section] as any)[field], '']
      }
    }));
  };

  const updateArrayItem = (section: keyof SRSData, field: string, index: number, value: string) => {
    setSrsData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: (prev[section] as any)[field].map((item: string, i: number) => 
          i === index ? value : item
        )
      }
    }));
  };

  const removeArrayItem = (section: keyof SRSData, field: string, index: number) => {
    setSrsData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: (prev[section] as any)[field].filter((_: any, i: number) => i !== index)
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">SRS Generator</h1>
                <p className="text-sm text-gray-500">Professional Requirements Documentation</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="hidden sm:flex">
                Step {currentStep + 1} of {steps.length}
              </Badge>
              
              <Dialog open={showCodeCanvas} onOpenChange={setShowCodeCanvas}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="hidden md:flex">
                    <Code className="w-4 h-4 mr-2" />
                    View Code
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh]">
                  <DialogHeader>
                    <DialogTitle className="flex items-center space-x-2">
                      <Code className="w-5 h-5" />
                      <span>Complete Source Code</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          if (codeRef.current) {
                            navigator.clipboard.writeText(codeRef.current.textContent || '');
                            toast({
                              title: "Code Copied!",
                              description: "The complete source code has been copied to clipboard."
                            });
                          }
                        }}
                      >
                        <Copy className="w-4 h-4 mr-1" />
                        Copy All
                      </Button>
                    </DialogTitle>
                  </DialogHeader>
                  <ScrollArea className="h-[60vh]">
                    <div ref={codeRef} className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <div className="text-gray-400 mb-4">// SRS Generator - Complete React/TypeScript Implementation</div>
                      <div className="text-blue-400">import</div> <span className="text-yellow-400">React</span> <div className="text-blue-400">from</div> <span className="text-green-300">'react'</span>;
                      <br />
                      <div className="text-gray-400">// ... (This is a preview - full implementation continues...)</div>
                    </div>
                  </ScrollArea>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white/60 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm text-gray-500">{calculateProgress()}% Complete</span>
          </div>
          <Progress value={calculateProgress()} className="h-2" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="sticky top-32">
              <CardHeader>
                <CardTitle className="text-lg">Steps</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {steps.map((step, index) => (
                  <div
                    key={step.id}
                    className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                      currentStep === index
                        ? 'bg-blue-50 border-2 border-blue-200'
                        : completedSteps.includes(index)
                        ? 'bg-green-50 border border-green-200'
                        : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                    }`}
                    onClick={() => {
                      if (completedSteps.includes(index) || index <= currentStep) {
                        setCurrentStep(index);
                      }
                    }}
                  >
                    <div className={`p-2 rounded-full ${
                      currentStep === index
                        ? 'bg-blue-100 text-blue-600'
                        : completedSteps.includes(index)
                        ? 'bg-green-100 text-green-600'
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      {completedSteps.includes(index) ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        step.icon
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium truncate ${
                        currentStep === index ? 'text-blue-900' : 'text-gray-900'
                      }`}>
                        {step.title}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card className="min-h-[600px]">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  {steps[currentStep].icon}
                  <div>
                    <CardTitle className="text-2xl">{steps[currentStep].title}</CardTitle>
                    <p className="text-gray-600 mt-1">{steps[currentStep].description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Step Content */}
                {currentStep === 0 && (
                  <ProjectInfoStep 
                    data={srsData.projectInfo}
                    onChange={(field, value) => 
                      setSrsData(prev => ({
                        ...prev,
                        projectInfo: { ...prev.projectInfo, [field]: value }
                      }))
                    }
                  />
                )}

                {currentStep === 1 && (
                  <FunctionalRequirementsStep
                    data={srsData.functionalRequirements}
                    onUpdateArray={(field, index, value) => 
                      updateArrayItem('functionalRequirements', field, index, value)
                    }
                    onAddArrayItem={(field) => addArrayItem('functionalRequirements', field)}
                    onRemoveArrayItem={(field, index) => 
                      removeArrayItem('functionalRequirements', field, index)
                    }
                  />
                )}

                {currentStep === 2 && (
                  <NonFunctionalRequirementsStep
                    data={srsData.nonFunctionalRequirements}
                    onChange={(field, value) =>
                      setSrsData(prev => ({
                        ...prev,
                        nonFunctionalRequirements: { ...prev.nonFunctionalRequirements, [field]: value }
                      }))
                    }
                  />
                )}

                {currentStep === 3 && (
                  <SystemArchitectureStep
                    data={srsData.systemArchitecture}
                    onChange={(field, value) =>
                      setSrsData(prev => ({
                        ...prev,
                        systemArchitecture: { ...prev.systemArchitecture, [field]: value }
                      }))
                    }
                    onUpdateArray={(field, index, value) => 
                      updateArrayItem('systemArchitecture', field, index, value)
                    }
                    onAddArrayItem={(field) => addArrayItem('systemArchitecture', field)}
                    onRemoveArrayItem={(field, index) => 
                      removeArrayItem('systemArchitecture', field, index)
                    }
                  />
                )}

                {currentStep === 4 && (
                  <ConstraintsStep
                    data={srsData.constraints}
                    onUpdateArray={(field, index, value) => 
                      updateArrayItem('constraints', field, index, value)
                    }
                    onAddArrayItem={(field) => addArrayItem('constraints', field)}
                    onRemoveArrayItem={(field, index) => 
                      removeArrayItem('constraints', field, index)
                    }
                  />
                )}

                {currentStep === 5 && (
                  <ReviewStep
                    data={srsData}
                    onEditStep={(stepIndex) => setCurrentStep(stepIndex)}
                  />
                )}
                
                {/* Navigation Buttons */}
                <div className="flex justify-between items-center mt-8 pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                    className="flex items-center space-x-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </Button>
                  
                  <div className="flex items-center space-x-2">
                    {currentStep < steps.length - 1 ? (
                      <Button
                        onClick={handleNext}
                        disabled={!validateCurrentStep()}
                        className="flex items-center space-x-2"
                      >
                        <span>Next</span>
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    ) : (
                      <Button
                        onClick={generatePDF}
                        className="flex items-center space-x-2 bg-green-600 hover:bg-green-700"
                      >
                        <Download className="w-4 h-4" />
                        <span>Generate PDF</span>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

// Project Information Step Component
const ProjectInfoStep = ({ data, onChange }: { 
  data: SRSData['projectInfo'], 
  onChange: (field: string, value: string) => void 
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="companyName" className="text-sm font-medium">
            Company Name *
          </Label>
          <Input
            id="companyName"
            placeholder="Enter your company name"
            value={data.companyName}
            onChange={(e) => onChange('companyName', e.target.value)}
            className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="projectName" className="text-sm font-medium">
            Project Name *
          </Label>
          <Input
            id="projectName"
            placeholder="Enter your project name"
            value={data.name}
            onChange={(e) => onChange('name', e.target.value)}
            className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="version" className="text-sm font-medium">
          Version
        </Label>
        <Input
          id="version"
          placeholder="1.0"
          value={data.version}
          onChange={(e) => onChange('version', e.target.value)}
          className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm font-medium">
          Project Description *
        </Label>
        <Textarea
          id="description"
          placeholder="Provide a comprehensive description of your software project..."
          value={data.description}
          onChange={(e) => onChange('description', e.target.value)}
          rows={4}
          className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="stakeholders" className="text-sm font-medium">
          Key Stakeholders
        </Label>
        <Textarea
          id="stakeholders"
          placeholder="List the key stakeholders and their roles..."
          value={data.stakeholders}
          onChange={(e) => onChange('stakeholders', e.target.value)}
          rows={3}
          className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="scope" className="text-sm font-medium">
          Project Scope *
        </Label>
        <Textarea
          id="scope"
          placeholder="Define what is included and excluded from the project scope..."
          value={data.scope}
          onChange={(e) => onChange('scope', e.target.value)}
          rows={4}
          className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

export default Index;
