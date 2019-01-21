//var a = new point(150, 300, "rgb(255,0,0)", 10, "test", "test");
//var b = new point(550, 700, "rgb(0,255,0)", 7, "test", "test");
//var points = [a, b];

var pointsFile = "assets/points.json";
var tool = "";
var points = [];


var canMove = true;

function mapMove(e){
  var posX = e.clientX - window.pageXOffset;
  var posY = e.clientY - window.pageYOffset;
  if (canMove == true && mouseDown == true){
    mapOffsetX += (posX -mapAnchorX)/25;
    mapOffsetY += (posY -mapAnchorY)/25;
  }


  canvas.style.backgroundPosition = mapOffsetX + "px " + mapOffsetY + "px";
}





function changeTool(choosenTool) {
  canMove = false;
  document.getElementById('svgC').style.cursor = "crosshair";


  var toolMove = document.getElementById("toolMove");
  var toolPoint = document.getElementById("toolPoint");
  var toolSquare = document.getElementById("toolSquare");
  var toolPolygon = document.getElementById("toolPolygon");
  var toolCircle = document.getElementById("toolCircle");

  toolMove.classList.remove("selected");
  toolPoint.classList.remove("selected");
  toolSquare.classList.remove("selected");
  toolPolygon.classList.remove("selected");
  toolCircle.classList.remove("selected");


  if (choosenTool == "point"){
    tool = "point";
    toolPoint.classList.add("selected");
  }else if(choosenTool == "square"){
    tool = "square";
    toolSquare.classList.add("selected");
  }else if(choosenTool == "polygon"){
    tool = "polygon";
    toolPolygon.classList.add("selected");
  }else if(choosenTool == "circle"){
    tool = "circle";
    toolCircle.classList.add("selected");
  }else if (choosenTool == "move"){
    document.getElementById('svgC').style.cursor = "grab";
    toolMove.classList.add("selected");
    tool = "move";
    canMove = true;
  }
}

var isDrawing = false;
var isFinishDrawing = false;

function draw(e){


  var radius = document.getElementById('radius').value;

  var posX = e.clientX - window.pageXOffset;
  var posY = e.clientY - window.pageYOffset;

  var svg = "";
  var svgBonus = "";



  if (tool == "point"){
    if (isDrawing == true){
      if (points.length == 1){
        svg += "<circle cx='" + points[0].getX() + "' cy='" + points[0].getY() + "' r='" + 10 + "'" + getSvgStyle() + "/>";
        isFinishDrawing = true;
      }else{
        points = [];
        isDrawing = false;
      }
    }else{
      svg += "<circle cx='" + posX + "' cy='" + posY + "' r='" + 10 + "'" + getSvgStyle() + "/>"
    }
  }else if (tool == "square"){
    if (isDrawing == true){
      if (points.length == 1){
        var x1;
        var y1;

        var x2;
        var y2;

      if (points[0].getX() > posX){
        x1 = points[0].getX();
        x2 = posX;
      }else{
        x1 = posX;
        x2 = points[0].getX();
      }

      if (points[0].getY() > posY){
        y1 = points[0].getY();
        y2 = posY;
      }else{
        y1 = posY;
        y2 = points[0].getY();
      }


        var width = x1 - x2;
        var height = y1 - y2;

        svg = "<rect x='" + x2 + "' y='" + y2+ "' width='" + width + "' height='" + height  + "'" + getSvgStyle() + "/>";
      }else if (points.length==2){
        var x1;
        var y1;

        var x2;
        var y2;

        if (points[0].getX() > points[1].getX()){
          x1 = points[0].getX();
          x2 = points[1].getX();
        }else{
          x1 = points[1].getX();
          x2 = points[0].getX();
        }

        if (points[0].getY() > points[1].getY()){
          y1 = points[0].getY();
          y2 = points[1].getY();
        }else{
          y1 = points[1].getY();
          y2 = points[0].getY();
        }

        var width = x1 - x2;
        var height = y1 - y2;

        svg = "<rect x='" + x2 + "' y='" + y2+ "' width='" + width + "' height='" + height  + "'" + getSvgStyle() + "/>";
        isFinishDrawing = true;
      }else{
        points = [];
        isDrawing = false;
      }

    }else{
      svgBonus = "<text x='" + (posX+20) + "' y='" + posY + "'>Cliquer pour le premier angle</text>";
    }
  }else if (tool == "polygon"){
    if (isDrawing == true){
      if (isFinishDrawing == false){
        svg = "<polyline points='";
        for (var i = 0; i < points.length; i++) {
          svg += points[i].getX();
          svg += ",";
          svg += points[i].getY();
          svg += " ";
        }
        svg += posX;
        svg += ",";
        svg += posY;
        svg += "'" + getSvgStyle() + "/>";
        svgBonus = "<text x='" + posX+10 + "' y='" + posY + "'>Clique droit pour finir</text>";
      }else{
        svg = "<polyline points='";
        for (var i = 0; i < points.length; i++) {
          svg += points[i].getX();
          svg += ",";
          svg += points[i].getY();
          svg += " ";
        }
        svg += "'" + getSvgStyle() + "/>";
      }
    }else{
      svgBonus = "<text x='" + (posX+20) + "' y='" + posY + "'>Cliquer pour le premier point</text>";
    }
  }else if(tool == "circle"){
    if (isDrawing == true){
      if (points.length == 1){
        var _x = Math.abs(points[0].getX() - posX);
        var _y = Math.abs(points[0].getY() - posY);
        var d = Math.round(Math.sqrt(_x + _y)*10);


        svg += "<circle cx='" + points[0].getX() + "' cy='" + points[0].getY() + "' r='" + d + "'" + getSvgStyle() + "/>";
      }else if (points.length == 2){
        var _x = Math.abs(points[0].getX() - points[1].getX())*zoom;
        var _y = Math.abs(points[0].getY() - points[1].getY())*zoom;
        var d = Math.round(Math.sqrt(_x + _y)*10);


        svg += "<circle cx='" + points[0].getX() + "' cy='" + points[0].getY() + "' r='" + d + "'" + getSvgStyle() + "/>";
        isFinishDrawing = true;
      }else{
        points = [];
        isDrawing = false;
      }
    }else{
      svgBonus = "<text x='" + (posX+20) + "' y='" + posY + "'>Cliquer pour le centre du cercle</text>";
    }
  }
  drawMarkers();
  var svgC2 = document.getElementById('svgC');
  svgC2.innerHTML += svg;
  svgC2.innerHTML += svgBonus;

  var scale = 1/zoom;
  document.getElementById('formSvg').value = svg;
  document.getElementById('formOffsetX').value = mapOffsetX * scale;
  document.getElementById('formOffsetY').value = mapOffsetY * scale;

  if (isFinishDrawing == true && menuToggle==false){
    menuOpen();

  }

}



function getSvgStyle(){
  var r = "";
  var fill = document.getElementById('fill').checked;
  var fillColor = document.getElementById('fillColor').value;
  var stroke = document.getElementById('stroke').checked;
  var strokeColor = document.getElementById('strokeColor').value;
  var radius = document.getElementById('radius').value;

  if (fill == true)
    r += " fill='"+fillColor+"'";
  else {
    r += " fill='transparent'";
  }
  if (stroke == true)
    r += " stroke='"+strokeColor+"'";
  else{
    r += " stroke='transparent'";
  }
  r += " stroke-width='"+radius+"'";

  return r;

}
















function addPoint(e){
  if (menuToggle == true || canMove == true){
    return;
  }
  var posX = e.clientX - window.pageXOffset - mapOffsetX;
  var posY = e.clientY - window.pageYOffset - mapOffsetY;
  var scale = 1/zoom;
  posX = posX*scale;
  posY = posY*scale;


  var p = new point(posX, posY);
  isDrawing = true;
  points.push(p);


}


function saveMarker() {
  var newMarker = new marker();

  newMarker.name = document.getElementById("formName").value;

  newMarker.offsetX = document.getElementById("formOffsetX").value;

  newMarker.offsetY = document.getElementById("formOffsetY").value;

  newMarker.svg = document.getElementById("formSvg").value;

  newMarker.content = document.getElementById("formContent").value;

  newMarker.lored = document.getElementById('formLored').checked;

  newMarker.clickable = document.getElementById('formClickable').checked;

  var xhr = new XMLHttpRequest();
  xhr.open("POST", 'savePoint.php', true);

  //Send the proper header information along with the request
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.onreadystatechange = function() { // Call a function when the state changes.
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
          location.reload();
    }
  }
  xhr.send("name=" + newMarker.name + "&offsetX=" + newMarker.offsetX + "&offsetY=" + newMarker.offsetY + "&svg=" + newMarker.svg + "&content=" + newMarker.content + "&lored=" + newMarker.lored + "&clickable=" + newMarker.clickable);

}
