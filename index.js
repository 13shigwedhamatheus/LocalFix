/*window.jsPDF = window.jspdf.jsPDF;

function generatePDF() {
    const doc = new jsPDF();

    // 1. Gather Data
    const client = document.getElementById('clientName').value || "Valued Client";
    const task = document.getElementById('taskDesc').value;
    const rate = parseFloat(document.getElementById('rate').value);
    const hours = parseFloat(document.getElementById('hours').value);
    const total = (rate * hours).toFixed(2);

    // 2. Add Header Info
    doc.setFontSize(15);
    doc.setTextColor(40);
    doc.text("LOCALFIX", 14, 10);

    doc.setFontSize(22);
    doc.setTextColor(40);
    doc.text("OFFICIAL QUOTE", 14, 20);
    
    doc.setFontSize(10);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 30);
    doc.text(`Client: ${client}`, 14, 35);

    // 3. Create the Table
    // Columns: [Title, Data Key]
    const columns = ["Description", "Quantity/Hours", "Unit Price", "Total"];
    const rows = [
        [task, hours, `$${rate}`, `$${total}`]
    ];

    doc.autoTable({
        startY: 45,
        head: [columns],
        body: rows,
        theme: 'striped', // Makes rows alternating colors
        headStyles: { fillColor: [40, 167, 69] }, // Professional Green
        margin: { top: 20 }
    });

    // 4. Summary Section
    const finalY = doc.lastAutoTable.finalY + 10; // Get position where table ended
    doc.setFontSize(12);
    doc.text(`Grand Total: $${total}`, 14, finalY);
    
    // 5. Save
    doc.save(`Quote_${client.replace(/\s+/g, '_')}.pdf`);
}*/
window.jsPDF = window.jspdf.jsPDF;

function generatePDF() {
    const doc = new jsPDF();
    
    // Grab all values
    const client = document.getElementById('clientName').value || "Client";
    const email = document.getElementById('clientEmail').value || "N/A";
    const quoteNum = document.getElementById('quoteNum').value;
    const validity = document.getElementById('validity').value;
    const task = document.getElementById('taskDesc').value;
    const rate = parseFloat(document.getElementById('rate').value);
    const hours = parseFloat(document.getElementById('hours').value);
    const total = (rate * hours).toLocaleString('en-US', { minimumFractionDigits: 2 });

    // --- Header Section ---
    doc.setFontSize(24);
    doc.setTextColor(33, 37, 41);
    doc.text("QUOTATION", 14, 25);

    // Business Info (Your details)
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("LOCALFIX.INC", 140, 20);
    doc.text("666 Creative Street, Tech City", 140, 25);
    doc.text("Email: hello@localfix.com", 140, 30);

    // Quote & Client Info
    doc.setTextColor(0);
    doc.text(`Quote Number: ${quoteNum}`, 14, 45);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 50);
    doc.text(`Validity: ${validity}`, 14, 55);

    doc.setFont("helvetica", "bold");
    doc.text("BILL TO:", 14, 70);
    doc.setFont("helvetica", "normal");
    doc.text(`${client}`, 14, 75);
    doc.text(`Email: ${email}`, 14, 80);

    // --- Table Section ---
    doc.autoTable({
        startY: 90,
        head: [['Service Description', 'Qty/Hrs', 'Unit Price', 'Subtotal']],
        body: [
            [task, hours, `$${rate}`, `$${total}`]
        ],
        theme: 'grid',
        headStyles: { fillColor: [44, 62, 80], textColor: [255, 255, 255] },
        styles: { fontSize: 10, cellPadding: 5 }
    });

    // --- Summary & Notes ---
    let finalY = doc.lastAutoTable.finalY + 15;
    
    doc.setFont("helvetica", "bold");
    doc.text(`TOTAL AMOUNT DUE: $${total}`, 14, finalY);
    
    finalY += 20;
    doc.setFontSize(9);
    doc.setTextColor(100);
    doc.setFont("helvetica", "italic");
    doc.text("Notes & Terms:", 14, finalY);
    doc.text("1. Please pay within the validity period mentioned above.", 14, finalY + 5);
    doc.text("2. 50% upfront deposit required to commence work.", 14, finalY + 10);
    doc.text("3. Transfer details: Bank Name | AC: 123456789 | SWIFT: XXXX", 14, finalY + 15);

    // --- Signature Area ---
    finalY += 40;
    doc.setDrawColor(200);
    doc.line(14, finalY, 70, finalY); // Signature line
    doc.text("Authorized Signature", 14, finalY + 5);

    // Save
    doc.save(`${quoteNum}_${client}.pdf`);
}