<?php
$file = "assets/points.json";

$current = file_get_contents($file);

if (isset($_POST['name'])){
  file_put_contents($file, $current . "\r\n" . "§". $_POST['name'] . "£" . $_POST['x']. "£" . $_POST['y']. "£" . $_POST['radius']. "£" . $_POST['color'] . "£" . $_POST['content']);
}


$points = explode("§", $current);
array_shift($points);
if (count($points) > 0)
for ($i=0; $i < count($points); $i++) {
  $params = explode("£", $points[$i]);
  $name = $params[0];
  $x = $params[1];
  $y = $params[2];
  $radius = $params[3];
  $color = $params[4];
  $content = $params[5];
  echo "<div name='point' style='display: none;'> <span id='name'>".$name."</span><span id='x'>".$x."</span><span id='y'>".$y."</span><span id='radius'>".$radius."</span><span id='color'>".$color."</span><span id='content'>".$content."</span></div>";
}

 ?>
