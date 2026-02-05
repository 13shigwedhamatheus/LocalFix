window.jsPDF = window.jspdf.jsPDF;

function generatePDF() {
    const doc = new jsPDF();

    // Get Form Values
    const name = document.getElementById('clientName').value;
    const task = document.getElementById('taskDesc').value;
    const rate = document.getElementById('rate').value;
    const hours = document.getElementById('hours').value;
    const total = rate * hours;

    // Add Content to PDF
    doc.setFontSize(20);
    doc.text("LocalFix", 20, 10);


    doc.setFontSize(20);
    doc.text("Project Quotation", 20, 20);
    
    doc.setFontSize(12);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 30);
    doc.text(`Client: ${name}`, 20, 40);
    
    doc.line(20, 45, 190, 45); // Draw a line

    doc.text("Task Description:", 20, 55);
    doc.text(task, 20, 65, { maxWidth: 160 });

    doc.text(`Rate: $${rate}/hr`, 20, 85);
    doc.text(`Hours: ${hours}`, 20, 95);
    
    doc.setFontSize(14);
    doc.text(`Total Estimate: $${total}`, 20, 110);

    // Save the PDF
    doc.save(`Quote_${name}.pdf`);
}