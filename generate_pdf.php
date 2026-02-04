<?php
require_once 'db.php';
if (file_exists(__DIR__ . '/vendor/autoload.php')) {
    require_once __DIR__ . '/vendor/autoload.php';
} elseif (file_exists(__DIR__ . '/dompdf/autoload.inc.php')) {
    require_once __DIR__ . '/dompdf/autoload.inc.php';
}
use Dompdf\Dompdf;

if (isset($_GET['id'])) {
    $id = (int) $_GET['id'];

    $stmt = $conn->prepare("SELECT * FROM tasks WHERE id = ?");
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $result = $stmt->get_result();
    if (!$result || $result->num_rows === 0) {
        http_response_code(404);
        echo "Task not found.";
        exit;
    }
    $task = $result->fetch_assoc();

    if ($task) {
        $dompdf = new Dompdf();

        // Design the PDF layout using HTML/CSS
        $html = "
        <style>
            body { font-family: sans-serif; }
            .header { text-align: center; border-bottom: 2px solid #007bff; padding-bottom: 10px; }
            .details { margin-top: 20px; }
            .price { font-size: 24px; color: #28a745; font-weight: bold; }
            .footer { margin-top: 50px; font-size: 12px; color: #777; }
        </style>
        <div class='header'>
            <h1>LocalFix Quotation</h1>
            <p>Professional Service Request</p>
        </div>
        <div class='details'>
            <h2>" . $task['title'] . "</h2>
            <p><strong>Description:</strong> " . $task['description'] . "</p>
            <p class='price'>Estimated Budget: $" . $task['budget'] . "</p>
            <p><strong>Contact Info:</strong> " . $task['contact'] . "</p>
        </div>
        <div class='footer'>
            <p>Generated on: " . date("Y-m-d H:i:s") . "</p>
            <p>Thank you for using LocalFix!</p>
        </div>";

        $dompdf->loadHtml($html);
        $dompdf->setPaper('A4', 'portrait');
        $dompdf->render();
        
        // Output the generated PDF to Browser
        $dompdf->stream("LocalFix_Quote_" . $id . ".pdf", ["Attachment" => false]);
    }
}
?>