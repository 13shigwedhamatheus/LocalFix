window.jsPDF = window.jspdf.jsPDF;

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
}