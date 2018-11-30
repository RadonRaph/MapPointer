function displayPoint(e) {

    var posX = e.clientX;
    var posY = e.clientY;
  var newPoint = "";
  for (var i = 0; i < points.length; i++) {
    if (posX < points[i].x + points[i].radius && posX > points[i].x - points[i].radius){
      if (posY < points[i].y + points[i].radius && posY > points[i].y - points[i].radius){
        newPoint = points[i];
      }
    }
  }
  if (newPoint != ""){
    menuOpen();
    if(newPoint.name)
    document.getElementById("pointName").innerHTML = newPoint.name;
    else
    document.getElementById("pointName").innerHTML = "";

    if(newPoint.content)
    document.getElementById("pointContent").innerHTML = newPoint.content;
    else
    document.getElementById("pointContent").innerHTML = "";
  }
}
