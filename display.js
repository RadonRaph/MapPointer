var mapUrl = "assets/map.jpeg";
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
var markers = [];

class marker {
  constructor(name, offsetX, offsetY, svg, content, lored, clickable){

    this.name = name;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.svg = svg;
    this.content = content;
    this.lored = lored;
    this.clickable = clickable;
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
  newZoom = parseFloat(newZoom);
  if (newZoom < 0.25 || newZoom > 2)
  return null;

  zoom = newZoom;
  document.getElementById('zoomValue').innerHTML = zoom;
  document.getElementById('zoomSlider').value = zoom;
  canvas.style.backgroundSize = (map.width * zoom) + "px " + (map.height * zoom) + "px";

  drawMarkers();
}

function wheelZoom(e){
  var nZoom = zoom - 0.25*Math.round(e.deltaY/100);
  mapZoom(nZoom);
}

function mapAnchor(e){
  mapAnchorX = e.clientX - window.pageXOffset;
  mapAnchorY= posY = e.clientY - window.pageYOffset;
}

function mapMove(e){
  var posX = e.clientX - window.pageXOffset;
  var posY = e.clientY - window.pageYOffset;
  if (mouseDown == true){
    mapOffsetX += (posX -mapAnchorX)/25;
    mapOffsetY += (posY -mapAnchorY)/25;
  }


  document.getElementById('map').style.backgroundPosition = mapOffsetX + "px " + mapOffsetY + "px";

  drawMarkers();
}

function loadMarkers() {
  var markersElements = document.getElementsByName('marker');

  for (var i = 0; i < markersElements.length; i++) {
    var markersParams;
    markersParams = markersElements[i].children;
    var newmarker = new marker();
    for (var i2 = 0; i2 < markersParams.length; i2++) {
      switch (i2) {
        case 0:
        newmarker.name = markersParams[i2].innerHTML;
        break;
        case 1:
        newmarker.offsetX = parseInt(markersParams[i2].innerHTML);
        break;
        case 2:
        newmarker.offsetY = parseInt(markersParams[i2].innerHTML);
        break;
        case 3:
        newmarker.svg = markersParams[i2].innerHTML;
        break;
        case 4:
        newmarker.content = markersParams[i2].innerHTML;
        break;
        case 5:
        newmarker.lored = markersParams[i2].innerHTML;
        break;
        case 6:
        newmarker.clickable = markersParams[i2].innerHTML;
        break;
        default:
        break;
      }

    }
    markers.push(newmarker);
  }
  drawMarkers();
}

function drawMarkers() {
  document.getElementById('svgC').innerHTML = "";
  for (var i = 0; i < markers.length; i++) {

    var x = (mapOffsetX - (markers[i].offsetX*zoom));
    var y = (mapOffsetY-(markers[i].offsetY*zoom));

    var foo = "<g transform='translate(";
    foo += x;
    foo += "," + y;
    foo += ") scale(";
    foo += zoom + "," + zoom;
    foo += ")'>";
    foo += markers[i].svg;
    foo += "</g>";

    document.getElementById('svgC').innerHTML += foo;
  }
  if (document.getElementsByName('svgRect').length > 0){
    var rects = document.getElementsByName('svgRect');
    for (var i = 0; i < rects.length; i++) {
      rects[i].setAttribute("width", rects[i].getAttribute("width") * (1/rects[i].getAttribute("zoom")));
      rects[i].setAttribute("height", rects[i].getAttribute("height") * (1/rects[i].getAttribute("zoom")));
    }
  }

  if (document.getElementsByName('svgCircle').length > 0){
    var circles = document.getElementsByName('svgCircle');
    for (var i = 0; i < circles.length; i++) {
      circles[i].setAttribute("r", circles[i].getAttribute("r") * (1/circles[i].getAttribute("zoom")));
    }
  }


  if (document.getElementsByName('svgPolyline').length > 0){
    var polylines = document.getElementsByName('svgPolyline');
    for (var i = 0; i < polylines.length; i++) {
      var scale = 1/polylines[i].getAttribute("zoom");
      polylines[i].setAttribute("transform",  "scale(" + scale + "," + scale + ")");
    }
  }
}

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


var req = new XMLHttpRequest();
req.open('GET', 'savePoint.php', true);
req.send(null);
var reqText;
req.onreadystatechange = function() { // Call a function when the state changes.
  if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
    reqText = req.responseText;
    document.getElementById('points').innerHTML = reqText;
    //initialize();
    loadMarkers();
    console.log("pointsRecup");
  }
}
