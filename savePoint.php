<?php
$file = "assets/points.json";

$current = file_get_contents($file);

if (isset($_POST['name'])){
  file_put_contents($file, $current . "\r\n" . "§". $_POST['name'] . "£" . $_POST['offsetX'] . "£" . $_POST['offsetY'] . "£" . $_POST['svg']. "£" . $_POST['content']. "£" . $_POST['lored']. "£" . $_POST['clickable']);
}


$points = explode("§", $current);
array_shift($points);
if (count($points) > 0)
for ($i=0; $i < count($points); $i++) {
  $params = explode("£", $points[$i]);
  $name = $params[0];
  $x = $params[1];
  $y = $params[2];
  $svg = $params[3];
  $content = $params[4];
  $lored = $params[5];
  $clickable = $params[6];
  echo "<div name='marker' style='display: none;'> <span id='name'>".$name."</span><span id='offsetX'>".$x."</span><span id='offsetY'>".$y."</span><span id='svg'>".$svg."</span><span id='content'>".$content."</span><span id='lored'>".$lored."</span><span id='clickable'>".$clickable."</span></div>";
}

 ?>
