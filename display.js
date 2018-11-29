var mapUrl = "assets/map.png";
var map = new Image();
map.src = mapUrl;

var canvas;
var ctx;

class point {
  constructor(x, y, color, radius, name, content) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = radius;
    this.name = name;
    this.content = content;
  }
}
var a = new point(150, 300, "#ff0000", 10, "test", "test");
var b = new point(550, 700, "#33dd2b", 7, "test", "test");
var points = [a, b];

function initialize() {
  const req = new XMLHttpRequest();
  req.open('GET', 'savePoint.php', true);
  req.send(null);

// if (req.status === 0) {}

  console.log(req.responseText);


  canvas = document.getElementById('canvas');
  canvas.width = map.width;
  canvas.height = map.height;
  ctx = canvas.getContext("2d");
  ctx.drawImage(map, 0, 0);

  drawPoints();

}


function drawPoints() {
  for (var i = 0; i < points.length; i++) {
    ctx.beginPath();
    ctx.arc(points[i].x, points[i].y, points[i].radius,0,2*Math.PI);
    ctx.fillStyle = points[i].color;
    ctx.fill();
    ctx.font = String(3*points[i].radius) + "px Arial";
    ctx.fillText(points[i].name, points[i].x + 2*points[i].radius, points[i].y);
    ctx.stroke();
  }
}

function detectPointsHover(e) {
      var posX = e.clientX;
      var posY = e.clientY;
      var pointCount = 0;

      for (var i = 0; i < points.length; i++) {
        if (posX < points[i].x + points[i].radius && posX > points[i].x - points[i].radius){
          if (posY < points[i].y + points[i].radius && posY > points[i].y - points[i].radius){
            canvas.style.cursor = "pointer";
            pointCount += 1;
          }
        }
      }
      if (pointCount == 0)
        canvas.style.cursor = "auto";

}
