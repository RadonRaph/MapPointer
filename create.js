//var a = new point(150, 300, "rgb(255,0,0)", 10, "test", "test");
//var b = new point(550, 700, "rgb(0,255,0)", 7, "test", "test");
//var points = [a, b];

var pointsFile = "assets/points.json";
var tool = "point";
var points = [];


function changeTool(choosenTool) {
  if (choosenTool == "point"){
    tool = "point";
  }else if(choosenTool == "square"){
    tool = "square";
  }else if(choosenTool == "polygon"){
    tool = "polygon";
  }else if(choosenTool == "circle"){
    tool = "circle";
  }
}

var isDrawing = false;
var isFinishDrawing = false;

function draw(e){
  if (menuToggle == true){
    return;
  }

  var radius = document.getElementById('radius').value;

  var posX = e.clientX;
  var posY = e.clientY;

  var svg = "";
  var svgBonus = "";



  if (tool == "point"){
    if (isDrawing == true){
      if (points.length == 1){
        svg += "<circle cx='" + points[0].x + "' cy='" + points[0].y + "' r='" + radius + "'" + getSvgStyle() + "/>";
        isFinishDrawing = true;
      }else{
        points = [];
        isDrawing = false;
      }
    }else{
      svg += "<circle cx='" + posX + "' cy='" + posY + "' r='" + radius + "'" + getSvgStyle() + "/>"
    }
  }else if (tool == "square"){
    if (isDrawing == true){
      if (points.length == 1){
        var x1;
        var y1;

        var x2;
        var y2;

      if (points[0].x > posX){
        x1 = points[0].x;
        x2 = posX;
      }else{
        x1 = posX;
        x2 = points[0].x;
      }

      if (points[0].y > posY){
        y1 = points[0].y;
        y2 = posY;
      }else{
        y1 = posY;
        y2 = points[0].y;
      }


        var width = x1 - x2;
        var height = y1 - y2;

        svg = "<rect x='" + x2 + "' y='" + y2+ "' width='" + width + "' height='" + height  + "'" + getSvgStyle() + "/>";
      }else if (points.length==2){
        var x1;
        var y1;

        var x2;
        var y2;

        if (points[0].x > points[1].x){
          x1 = points[0].x;
          x2 = points[1].x;
        }else{
          x1 = points[1].x;
          x2 = points[0].x;
        }

        if (points[0].y > points[1].y){
          y1 = points[0].y;
          y2 = points[1].y;
        }else{
          y1 = points[1].y;
          y2 = points[0].y;
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
      svgBonus = "<text x='" + posX + "' y='" + posY + "'>Cliquer pour le premier angle</text>";
    }
  }else if (tool == "polygon"){
    if (isDrawing == true){
      if (isFinishDrawing == false){
        svg = "<polygon points='";
        for (var i = 0; i < points.length; i++) {
          svg += points[i].x;
          svg += ",";
          svg += points[i].y;
          svg += " ";
        }
        svg += posX;
        svg += ",";
        svg += posY;
        svg += "'" + getSvgStyle() + "/>";
        svgBonus = "<text x='" + posX + "' y='" + posY + "'>Clique droit pour finir</text>";
      }else{
        svg = "<polygon points='";
        for (var i = 0; i < points.length; i++) {
          svg += points[i].x;
          svg += ",";
          svg += points[i].y;
          svg += " ";
        }
        svg += "'" + getSvgStyle() + "/>";
      }
    }else{
      svgBonus = "<text x='" + posX + "' y='" + posY + "'>Cliquer pour le premier point</text>";
    }
  }

  var svgC2 = document.getElementById('svgC');
  svgC2.innerHTML = svg;
  svgC2.innerHTML += svgBonus;

  document.getElementById('formSvg').value = svg;

  if (isFinishDrawing == true && menuToggle==false)
  menuOpen();
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
  var posX = e.clientX;
  var posY = e.clientY;
  var p = new point(posX, posY);
  isDrawing = true;
  points.push(p);


}


function savePoint() {
  var newPoint = new point();

  newPoint.x = document.getElementById("formX").value;
  newPoint.y = document.getElementById("formY").value;

  newPoint.name = document.getElementById("formName").value;

  newPoint.radius = document.getElementById("formRadius").value;

  newPoint.color = document.getElementById("formColor").value;

  newPoint.content = document.getElementById("formContent").value;

  var xhr = new XMLHttpRequest();
  xhr.open("POST", 'savePoint.php', true);

  //Send the proper header information along with the request
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.onreadystatechange = function() { // Call a function when the state changes.
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
          location.reload();
    }
  }
  xhr.send("name=" + newPoint.name + "&x=" + newPoint.x + "&y=" + newPoint.y + "&color=" + newPoint.color + "&radius=" + newPoint.radius + "&content=" + newPoint.content);

}
