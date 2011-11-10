<?php

$services = array();
print_r($_POST);
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

print "Name: " . $_POST["name"] . "\r\n";

echo "Email: " . $_POST["email"];
print isset($_POST["prefer-email"]) ? " (ok to contact)" : "" . "\r\n";

if($_POST["phone"] != "Phone Number") {
  echo "Phone: " . $_POST["phone"];
  print isset($_POST["prefer-phone"]) ? " (ok to contact)" : "" . "\r\n";
}
print "\r\nServices: " . implode(", ", $services) . "\r\n";

?>
