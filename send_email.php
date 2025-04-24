<?php
// Form submission handling
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Validate and sanitize input
    $firstName = filter_input(INPUT_POST, 'first-name', FILTER_SANITIZE_STRING);
    $lastName = filter_input(INPUT_POST, 'last-name', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $phone = filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_STRING);
    $vision = filter_input(INPUT_POST, 'vision', FILTER_SANITIZE_STRING);
    
    // Additional validation
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die("Invalid email format");
    }
    
    // Email recipient - replace with your business email
    $to = "info@diamonddistrictza.com";
    $subject = "Diamond District: New Custom Ring Inquiry";
    
    // Email content
    $message = "
    <html>
    <head>
        <title>New Custom Ring Inquiry</title>
        <style>
            body { font-family: Arial, sans-serif; }
            .container { padding: 20px; }
            .header { background-color: #d4af37; color: #1a1a1a; padding: 10px; }
            .content { padding: 20px 0; }
            .footer { font-size: 12px; color: #666; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>New Custom Ring Inquiry from Diamond District Website</h2>
                <p>Submitted on: " . date("Y-m-d H:i:s") . "</p>
            </div>
            <div class='content'>
                <p><strong>Name:</strong> $firstName $lastName</p>
                <p><strong>Email:</strong> $email</p>
                <p><strong>Phone:</strong> $phone</p>
                <p><strong>Customer Vision:</strong><br>$vision</p>
            </div>
            <div class='footer'>
                <p>This is an automated message from your Diamond District website.</p>
            </div>
        </div>
    </body>
    </html>
    ";
    
    // Email headers
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: $email" . "\r\n";
    $headers .= "Reply-To: $email" . "\r\n";
    
    // Send email
    if(mail($to, $subject, $message, $headers)) {
        // Success! Redirect with success parameter
        header("Location: index.html?submission=success#contact");
    } else {
        // Error handling
        header("Location: index.html?submission=error#contact");
    }
    exit;
}
?>