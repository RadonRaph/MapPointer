//var a = new point(150, 300, "rgb(255,0,0)", 10, "test", "test");
//var b = new point(550, 700, "rgb(0,255,0)", 7, "test", "test");
//var points = [a, b];

var pointsFile = "assets/points.json";

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
        // Request finished. Do processing here.
    }
  }
  xhr.send("name=" + newPoint.name + "&x=" + newPoint.x + "&y=" + newPoint.y + "&color=" + newPoint.color + "&radius=" + newPoint.radius + "&content=" + newPoint.content);
}
