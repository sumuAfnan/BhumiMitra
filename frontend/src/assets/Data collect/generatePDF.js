import jsPDF from "jspdf";
import pic from "../images/stamp-2.jpg"; 

export const generatePDF = ({ applicationId, name, nid, khatian, landArea, fee }) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  //  Seal 
  const imageWidth = 190;
  const imageHeight = 90;
  const imageX = (pageWidth - imageWidth) / 2;
  const imageY = 10;
  doc.addImage(pic, "JPEG", imageX, imageY, imageWidth, imageHeight);

  // Title Section 
  const textStartY = imageY + imageHeight + 10;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("People's Republic of Bangladesh", pageWidth / 2, textStartY, { align: "center" });

  doc.setFontSize(13);
  doc.text("Land Registration Certificate", pageWidth / 2, textStartY + 10, { align: "center" });

  // Main Body Paragraph (Justified-style)
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  const bodyText = `This certificate is hereby issued to confirm that the person or organization named below has successfully completed the registration process for land ownership, as per the records and verification procedures of the Government of Bangladesh. This document serves as a preliminary confirmation pending final legal registration.`;
  const maxLineWidth = 170;
  const lines = doc.splitTextToSize(bodyText, maxLineWidth);
  const lineSpacing = 7;
  let textY = textStartY + 25;

  lines.forEach(line => {
    doc.text(line, 20, textY);
    textY += lineSpacing;
  });

  // Bullet Section
  const yStart = textY + 10;
  const lineHeight = 10;
  const details = [
    `Applicant Name: ${name}`,
    `Khatian No.: ${khatian}`,
    `Land Area: ${landArea} square`,
    `Registration Fee: ${fee} BDT`,
    `National ID (NID): ${nid}`
  ];

  details.forEach((line, i) => {
    const y = yStart + i * lineHeight;
    doc.circle(18, y - 2, 1, 'F'); // Bullet
    doc.text(line, 22, y);
  });

  
  const afterDetailsY = yStart + details.length * lineHeight + 5;
  doc.setFontSize(13);
  doc.text(`Land is registered by name ${name} `, pageWidth / 2, afterDetailsY, { align: "center" });

  const signatureY = afterDetailsY + 20;
  doc.line(20, signatureY, 80, signatureY);
  doc.text("Authorized Officer Signature", 22, signatureY + 5);


  doc.setFontSize(9);
  doc.text(
    "This certificate has been digitally issued by the Government of Bangladesh and is valid without a physical signature.",
    pageWidth / 2,
    280,
    { align: "center" }
  );

  
  doc.save(`Land_Certificate_${applicationId}.pdf`);
};
