import { jsPDF } from 'jspdf';

function generatePDF(
  originAddress,
  destinationAddress,
  distance,
  routeInstructions
) {
  const doc = new jsPDF();

  const pageWidth = doc.internal.pageSize.getWidth();

  doc.setFontSize(25).setFont(undefined, 'bold');
  doc.text('Route Summary', pageWidth / 2, 20, { align: 'center' });

  doc.setFontSize(14);
  doc.text('Origin address:', 20, 40);

  doc.setFont(undefined, 'normal');
  doc.text(originAddress, 20, 50);

  doc.setFont(undefined, 'bold');
  doc.text('Destination address:', 20, 80);

  doc.setFont(undefined, 'normal');
  doc.text(destinationAddress, 20, 90);

  doc.setFont(undefined, 'bold');
  doc.text('Distance:', 20, 120);

  doc.setFont(undefined, 'normal');
  doc.text(`${distance} km`, 20, 130);

  routeInstructions = routeInstructions.join('\n');

  doc.setFont(undefined, 'bold');
  doc.text('Route instructions:', 20, 140);

  doc.setFont(undefined, 'normal');
  doc.text(routeInstructions, 20, 150);

  doc.save('a4.pdf');
  return doc;
}

export default generatePDF;
