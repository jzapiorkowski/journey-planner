import { jsPDF } from 'jspdf';

function generatePDF(
  originAddress,
  destinationAddress,
  distance,
  routeInstructions,
  cost
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

  doc.setFont(undefined, 'bold');
  doc.text('Estimated cost:', 20, 140);

  doc.setFont(undefined, 'normal');
  doc.text(`${cost}$`, 20, 150);

  doc.setFont(undefined, 'bold');
  doc.text('Route instructions:', 20, 160);

  doc.setFont(undefined, 'normal');
  console.log(routeInstructions.length);

  doc.text(routeInstructions.slice(0, 21).join('\n'), 20, 170);

  const numberOfPages = Math.ceil((routeInstructions.length - 21) / 48);

  for (let i = 0; i < numberOfPages; i++) {
    doc.addPage();

    doc.text(
      routeInstructions.slice(21 + i * 48, 69 + i * 48).join('\n'),
      20,
      20
    );
  }

  doc.save('a4.pdf');
  return doc;
}

export default generatePDF;
