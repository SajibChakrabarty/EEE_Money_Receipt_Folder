async function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF('landscape');
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  const logoImg = new Image();
  logoImg.src = 'img/logo.png';

  await new Promise((resolve) => {
    logoImg.onload = resolve;
    logoImg.onerror = resolve;
  });

  if (logoImg.complete && logoImg.naturalHeight !== 0) {
    doc.addImage(logoImg, 'PNG', 10, 10, 30, 30);
  }

  doc.setFontSize(16);
  doc.setTextColor(213, 83, 79);
  doc.text("EEE ALUMNI ASSOCIATION", 50, 18);
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text("Department of Electrical & Electronic Engineering", 50, 26);
  doc.text("Gono Bishwabidyalay", 50, 34);

  doc.setFontSize(18);
  doc.setTextColor(0, 123, 255);
  doc.text("MONEY RECEIPT", pageWidth / 2, 50, { align: "center" });

  const data = {
    receiptNo: document.getElementById('receiptNo').value,
    date: document.getElementById('date').value,
    name: document.getElementById('name').value,
    batch: document.getElementById('batch').value,
    contact: document.getElementById('contact').value,
    amount: document.getElementById('amount').value,
    inWords: document.getElementById('inWords').value,
    purpose: document.getElementById('purpose').value,
    otherPurpose: document.getElementById('otherPurpose').value,
    paymentMethod: document.getElementById('paymentMethod').value,
    transactionId: document.getElementById('transactionId').value,
    paymentDate: document.getElementById('paymentDate').value,
    receiver: document.getElementById('receiver').value,
    designation: document.getElementById('designation').value,
    seal: document.getElementById('seal').value
  };

  const purpose = data.purpose === 'Others' && data.otherPurpose.trim() !== '' ? data.otherPurpose : data.purpose;

  const rows = [
    ["Receipt No", data.receiptNo, "Date", data.date],
    ["Received From", data.name, "", ""],
    ["Session / Batch", data.batch, "Contact", data.contact],
    ["Amount (BDT)", data.amount, "In Words", data.inWords],
    ["Purpose of Payment", purpose, "", ""],
    ["Payment Method", data.paymentMethod, "", ""],
    ["Transaction ID", data.transactionId, "Payment Date", data.paymentDate],
    ["Received By", data.receiver, "Designation", data.designation],
    ["Official Seal", data.seal, "", ""]
  ];

  doc.autoTable({
    startY: 60,
    head: [],
    body: rows,
    styles: { fontSize: 11 },
    columnStyles: {
      0: { cellWidth: 50 },
      1: { cellWidth: 90 },
      2: { cellWidth: 50 },
      3: { cellWidth: 90 }
    },
    theme: 'grid'
  });

  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text("Design By -Sajib Chakrabarty-", pageWidth / 2, pageHeight - 10, { align: "center" });

  const safeName = data.name ? data.name.replace(/\s+/g, '_') : 'EEE_Money_Receipt';
  doc.save(`${safeName}_Receipt.pdf`);
}
