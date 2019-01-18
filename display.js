var mapUrl = "assets/map.png";
var map = new Image();
map.src = mapUrl;

var canvas;
var ctx;

var zoom =1;

var svgC;

var mouseDown = false;
var mapAnchorX;
var mapAnchorY;
var mapOffsetX = 0;
var mapOffsetY = 0;

class marker {
  constructor(svg, name, content){
    this.svg = svg;
    this.name = name;
    this.content = content;
  }
}



class point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getX() {
    return ((this.x) *zoom+mapOffsetX);
  }

  getY(){
    return ((this.y)*zoom+mapOffsetY);
  }
}



function initialize() {
  console.log("init");
  //canvas = document.getElementById('canvas');
  //canvas.width = map.width;
  //canvas.height = map.height;
  canvas = document.getElementById('map');
  canvas.style.backgroundImage = "url('"+mapUrl+"')";
  canvas.style.backgroundRepeat = "no-repeat";
  canvas.style.backgroundSize = (map.width * zoom) + "px " + (map.height * zoom) + "px";
  //svgC = document.getElementById('svgC');
  //svgC.style.width = map.width;
  //svgC.style.height = map.height;


  //ctx = canvas.getContext("2d");
  //ctx.drawImage(map, 0, 0);

//  drawPoints();
}

function mapZoom(newZoom){
  if (newZoom < 0.25 || newZoom > 5)
  return null;

  zoom = newZoom;
  document.getElementById('zoomValue').innerHTML = zoom;
  document.getElementById('zoomSlider').value = zoom;
  canvas.style.backgroundSize = (map.width * zoom) + "px " + (map.height * zoom) + "px";
}

function wheelZoom(e){
  var nZoom = zoom + 0.25*Math.round(e.deltaY/100);
  mapZoom(nZoom);
}

function mapAnchor(e){
  mapAnchorX = e.clientX - window.pageXOffset;
  mapAnchorY= posY = e.clientY - window.pageYOffset;
}



// function drawPoints() {
//   var pointsElements = document.getElementsByName('point');
//
//   for (var i = 0; i < pointsElements.length; i++) {
//     var pointsParams;
//     pointsParams = pointsElements[i].children;
//     var newPoint = new point();
//     for (var i2 = 0; i2 < pointsParams.length; i2++) {
//       switch (i2) {
//         case 0:
//         newPoint.name = pointsParams[i2].innerHTML;
//           break;
//         case 1:
//           newPoint.x = parseInt(pointsParams[i2].innerHTML);
//           break;
//         case 2:
//           newPoint.y = parseInt(pointsParams[i2].innerHTML);
//           break;
//         case 3:
//           newPoint.radius = parseInt(pointsParams[i2].innerHTML);
//           break;
//         case 4:
//           newPoint.color = pointsParams[i2].innerHTML;
//           break;
//         case 5:
//           newPoint.content = pointsParams[i2].innerHTML;
//           break;
//         default:
//           break;
//       }
//
//     }
//     points.push(newPoint);
//   }
//
//   for (var i = 0; i < points.length; i++) {
//     ctx.beginPath();
//     ctx.arc(points[i].x, points[i].y, points[i].radius,0,2*Math.PI);
//     ctx.fillStyle = points[i].color;
//     ctx.fill();
//     ctx.font = String(3*points[i].radius) + "px Arial";
//     ctx.fillText(points[i].name, points[i].x + 2*points[i].radius, points[i].y);
//     ctx.stroke();
//   }
// }

// function detectPointsHover(e) {
//       var posX = e.clientX;
//       var posY = e.clientY;
//       var pointCount = 0;
//
//       for (var i = 0; i < points.length; i++) {
//         if (posX < points[i].x + points[i].radius && posX > points[i].x - points[i].radius){
//           if (posY < points[i].y + points[i].radius && posY > points[i].y - points[i].radius){
//             canvas.style.cursor = "pointer";
//             pointCount += 1;
//           }
//         }
//       }
//       if (pointCount == 0)
//         canvas.style.cursor = "auto";
//
// }

var menuToggle = false;
function menuOpen(){
  menu = document.getElementById('menu');
  if (menuToggle == false){
    menu.style.display = "block";
    menuToggle = true;
  }else{
    menu.style.display = "none";
    menuToggle = false;
  }
}





function close(event) {
    var x = event.keyCode;
    if (x == 27) {  // 27 is the ESC key
      menu();
    }
}


// var req = new XMLHttpRequest();
// req.open('GET', 'savePoint.php', true);
// req.send(null);
// var reqText;
// req.onreadystatechange = function() { // Call a function when the state changes.
//   if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
//       reqText = req.responseText;
//       document.getElementById('points').innerHTML = reqText;
//       initialize();
//       console.log("pointsRecup");
//   }
// }
