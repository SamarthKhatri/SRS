
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Download, Printer, X } from 'lucide-react';
import jsPDF from 'jspdf';

interface SampleSRSViewerProps {
  isOpen: boolean;
  onClose: () => void;
  example: {
    title: string;
    description: string;
    category: string;
    features: string[];
    complexity: string;
    pages: string;
  };
}

const SampleSRSViewer: React.FC<SampleSRSViewerProps> = ({ isOpen, onClose, example }) => {
  const generateSampleSRS = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 20;
    let yPosition = margin;

    // Company Header at top right with line
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('TechCorp Solutions Ltd.', pageWidth - margin, 15, { align: 'right' });
    
    // Horizontal line below company name
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(margin, 25, pageWidth - margin, 25);
    
    yPosition = 35;

    // Title
    doc.setFontSize(20);
    doc.text(example.title, pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 30;

    // Table of Contents
    doc.setFontSize(16);
    doc.text('Table of Contents', margin, yPosition);
    yPosition += 15;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    const tocItems = [
      '1. Introduction',
      '2. Overall Description',
      '3. System Features',
      '4. External Interface Requirements',
      '5. Non-functional Requirements',
      '6. Other Requirements'
    ];

    tocItems.forEach((item) => {
      doc.text(item, margin + 10, yPosition);
      yPosition += 8;
    });

    yPosition += 20;

    // Check if we need a new page
    if (yPosition > pageHeight - 40) {
      doc.addPage();
      
      // Add company header to new page
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text('TechCorp Solutions Ltd.', pageWidth - margin, 15, { align: 'right' });
      doc.setDrawColor(0, 0, 0);
      doc.setLineWidth(0.5);
      doc.line(margin, 25, pageWidth - margin, 25);
      
      yPosition = 35;
    }

    // 1. Introduction
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('1. Introduction', margin, yPosition);
    yPosition += 15;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(0, 100, 200);
    doc.text('1.1 Purpose', margin, yPosition);
    yPosition += 10;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    const purposeText = `This document specifies the requirements for the ${example.title}. It provides a comprehensive overview of the system's functionality, performance criteria, and design constraints.`;
    const splitPurpose = doc.splitTextToSize(purposeText, pageWidth - 2 * margin);
    doc.text(splitPurpose, margin, yPosition);
    yPosition += splitPurpose.length * 6 + 10;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(0, 100, 200);
    doc.text('1.2 Scope', margin, yPosition);
    yPosition += 10;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    const scopeText = `The ${example.title} is a ${example.category.toLowerCase()} designed to provide ${example.description.toLowerCase()}. The system will include the following key features: ${example.features.join(', ')}.`;
    const splitScope = doc.splitTextToSize(scopeText, pageWidth - 2 * margin);
    doc.text(splitScope, margin, yPosition);
    yPosition += splitScope.length * 6 + 20;

    // Check if we need a new page
    if (yPosition > pageHeight - 60) {
      doc.addPage();
      
      // Add company header to new page
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text('TechCorp Solutions Ltd.', pageWidth - margin, 15, { align: 'right' });
      doc.setDrawColor(0, 0, 0);
      doc.setLineWidth(0.5);
      doc.line(margin, 25, pageWidth - margin, 25);
      
      yPosition = 35;
    }

    // 2. Overall Description
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text('2. Overall Description', margin, yPosition);
    yPosition += 15;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(0, 100, 200);
    doc.text('2.1 Product Perspective', margin, yPosition);
    yPosition += 10;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    const perspectiveText = `The ${example.title} is a standalone ${example.category.toLowerCase()} that will operate independently while integrating with existing systems as needed.`;
    const splitPerspective = doc.splitTextToSize(perspectiveText, pageWidth - 2 * margin);
    doc.text(splitPerspective, margin, yPosition);
    yPosition += splitPerspective.length * 6 + 15;

    // 3. System Features
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text('3. System Features', margin, yPosition);
    yPosition += 15;

    example.features.forEach((feature, index) => {
      if (yPosition > pageHeight - 40) {
        doc.addPage();
        
        // Add company header to new page
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0);
        doc.text('TechCorp Solutions Ltd.', pageWidth - margin, 15, { align: 'right' });
        doc.setDrawColor(0, 0, 0);
        doc.setLineWidth(0.5);
        doc.line(margin, 25, pageWidth - margin, 25);
        
        yPosition = 35;
      }

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(0, 100, 200);
      doc.text(`3.${index + 1} ${feature}`, margin, yPosition);
      yPosition += 10;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      const featureDesc = `This feature provides comprehensive ${feature.toLowerCase()} functionality with user-friendly interface and robust security measures.`;
      const splitFeature = doc.splitTextToSize(featureDesc, pageWidth - 2 * margin);
      doc.text(splitFeature, margin, yPosition);
      yPosition += splitFeature.length * 6 + 15;
    });

    return doc;
  };

  const handleDownload = () => {
    const doc = generateSampleSRS();
    doc.save(`${example.title.replace(/\s+/g, '_')}_SRS.pdf`);
  };

  const handlePrint = () => {
    const doc = generateSampleSRS();
    doc.autoPrint();
    window.open(doc.output('bloburl'), '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">
              {example.title} - Sample SRS
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* PDF Preview Content */}
          <div className="bg-white border rounded-lg p-6 shadow-sm">
            <div className="flex justify-end mb-4">
              <div className="text-right">
                <h1 className="text-lg font-bold">TechCorp Solutions Ltd.</h1>
                <hr className="mt-2 border-gray-400" />
              </div>
            </div>
            
            <div className="text-center mb-8">
              <h2 className="text-xl font-semibold">{example.title}</h2>
              <p className="text-gray-600 mt-2">Software Requirements Specification</p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-3">Table of Contents</h3>
                <ul className="space-y-1 text-sm text-gray-700 ml-4">
                  <li>1. Introduction</li>
                  <li>2. Overall Description</li>
                  <li>3. System Features</li>
                  <li>4. External Interface Requirements</li>
                  <li>5. Non-functional Requirements</li>
                  <li>6. Other Requirements</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-3">1. Introduction</h3>
                <h4 className="text-base font-semibold text-blue-600 mb-2">1.1 Purpose</h4>
                <p className="text-sm text-gray-700 mb-4">
                  This document specifies the requirements for the {example.title}. 
                  It provides a comprehensive overview of the system's functionality, 
                  performance criteria, and design constraints.
                </p>
                
                <h4 className="text-base font-semibold text-blue-600 mb-2">1.2 Scope</h4>
                <p className="text-sm text-gray-700">
                  The {example.title} is a {example.category.toLowerCase()} designed to provide {example.description.toLowerCase()}. 
                  The system will include the following key features: {example.features.join(', ')}.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-3">2. Overall Description</h3>
                <h4 className="text-base font-semibold text-blue-600 mb-2">2.1 Product Perspective</h4>
                <p className="text-sm text-gray-700">
                  The {example.title} is a standalone {example.category.toLowerCase()} that will 
                  operate independently while integrating with existing systems as needed.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-3">3. System Features</h3>
                {example.features.map((feature, index) => (
                  <div key={index} className="mb-4">
                    <h4 className="text-base font-semibold text-blue-600 mb-2">
                      3.{index + 1} {feature}
                    </h4>
                    <p className="text-sm text-gray-700">
                      This feature provides comprehensive {feature.toLowerCase()} functionality 
                      with user-friendly interface and robust security measures.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4 pt-4 border-t">
            <Button onClick={handleDownload} className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </Button>
            <Button onClick={handlePrint} variant="outline" className="flex items-center space-x-2">
              <Printer className="w-4 h-4" />
              <span>Print PDF</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SampleSRSViewer;
