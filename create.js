//var a = new point(150, 300, "rgb(255,0,0)", 10, "test", "test");
//var b = new point(550, 700, "rgb(0,255,0)", 7, "test", "test");
//var points = [a, b];

var menuToggle = false;

function addPoint(e){
  menu = document.getElementById('menu');
  if (menuToggle == false){
    menu.style.display = "block";
    menuToggle = true;
  }else{
    return;
  }

  var posX = e.clientX;
  var posY = e.clientY;

  var newPoint = new point();
  newPoint.x = posX;
  newPoint.y = posY;
  for (var i = 0; i < points.length; i++) {
    if (posX < points[i].x + points[i].radius && posX > points[i].x - points[i].radius){
      if (posY < points[i].y + points[i].radius && posY > points[i].y - points[i].radius){
        newPoint = points[i];
      }
    }
  }

  if(newPoint.name)
  document.getElementById("formName").value = newPoint.name;
  else
  document.getElementById("formName").value = "";

  document.getElementById("formX").value = newPoint.x;
  document.getElementById("formY").value = newPoint.y;

  if(newPoint.radius)
  document.getElementById("formRadius").value = newPoint.radius;
  else
  document.getElementById("formRadius").value = 1;

  if(newPoint.color)
  document.getElementById("formColor").value = newPoint.color;
  else
  document.getElementById("formColor").value = "#000000";

  if(newPoint.content)
  document.getElementById("formContent").value = newPoint.content;
  else
  document.getElementById("formContent").value = "";

}
