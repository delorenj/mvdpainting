<?php
include 'Mail.php';

$services = array();

foreach($_POST as $param=>$val) {
  switch($param) {
    case "interior-painting":
    case "exterior-painting":
    case "power-washing":
    case "wallpaper":
    case "wallpaper-removal":
    case "other":
      $services[] = $param;
      break;
  }
}

$text = "Name: " . $_POST["name"] . "\r\n";

$text .= "Email: " . $_POST["email"];
$text .= isset($_POST["prefer-email"]) ? " (ok to contact)\r\n" : "" . "\r\n";

if($_POST["phone"] != "Phone Number") {
  $text .= "Phone: " . $_POST["phone"];
  $text .= isset($_POST["prefer-phone"]) ? " (ok to contact)\r\n" : "" . "\r\n";
}

$text .= "\r\nServices: " . implode(", ", $services) . "\r\n";


$to      = 'jaradd@gmail.com,mvdelorenzo@gmail.com';
$subject = 'Quote Request';
$message = $text;
$headers = 'From: quotes@mvdpainting.com' . "\r\n" .
    'Reply-To: jaradd@gmail.com' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

mail($to, $subject, $message, $headers);


?>
