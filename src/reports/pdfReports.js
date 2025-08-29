const PDFDocument = require("pdfkit");
const fs = require("fs");

function generatePDF(data) {
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream("sales.pdf"));
  doc.fontSize(20).text("Sales Report", 100, 100);
  data.forEach((item, i) => {
    doc.text(`${item.id}: ${item.amount} - ${item.status}`, 100, 150 + i * 20);
  });
  doc.end();
  console.log("PDF gerado!");
}

// Exemplo de uso
generatePDF([
  { id: 1, amount: 100, status: "paid" },
  { id: 2, amount: 200, status: "paid" },
]);
