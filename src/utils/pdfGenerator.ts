import * as jspdf from 'jspdf';

export const generateProjectPDF = (formData: any) => {
  const doc = new (jspdf as any).jsPDF();
  
  // Set title
  doc.setFontSize(20);
  doc.text('Project Booking Details', 20, 20);
  
  // Add content
  doc.setFontSize(12);
  let y = 40;
  
  const addField = (label: string, value: string) => {
    doc.text(`${label}: ${value}`, 20, y);
    y += 10;
  };

  addField('Project Name', formData.projectName);
  addField('Website Type', formData.websiteType);
  addField('Purpose', formData.purpose);
  addField('Duration', formData.duration);
  addField('Estimated Fees', `₹${formData.estimatedFees}`);
  addField('Payment Type', formData.paymentType);
  addField('Client Name', formData.name);
  addField('Email', formData.email);
  addField('Phone', formData.phone);
  
  if (formData.additionalInfo) {
    doc.text('Additional Information:', 20, y);
    y += 10;
    const splitText = doc.splitTextToSize(formData.additionalInfo, 170);
    doc.text(splitText, 20, y);
  }

  return doc;
};