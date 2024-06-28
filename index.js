const socket = new WebSocket("ws://127.0.0.1:6960")
var used = 0
var free = 0

function sipot(input) {
  input = input.split("").reverse().join().replaceAll(",", "")
  const regex = /.{1,3}/g;
  const parts = input.match(regex)
  const formatted = parts.join().split("").reverse().join('')
  return formatted + " bytes";
}

function drawChart() {

  var data = google.visualization.arrayToDataTable([
    ['Task', 'Disk Space Visualization'],
    ['Used',      used - 0],
    ['Free',      free - 0]
  ]);

  var options = {
    title: '',
    pieHole: 0.6,
    pieStartAngle: 270,
    colors: [
      "#23a0db",
      "#acacac"
    ],
    pieSliceText: 'none',
    enableInteractivity: false,
    pieSliceBorderColor: 'transparent',
    legend: 'none',
    backgroundColor: "transparent",
  };

  var chart = new google.visualization.PieChart(document.getElementById('piechart'));

  chart.draw(data, options);
}

function load(used,free) {
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);
}

socket.onmessage = (function(e) {
  const msg = e.data.split(" ")
  used = msg[0]
  free = msg[1]

  console.log(msg)
  load(msg[0], msg[1])
  document.getElementById("free").textContent = "Free space: " + sipot(msg[1])
  document.getElementById("used").textContent = "Used space: " + sipot(msg[0])
  dragElement(document.getElementById("menu"));
})

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "-header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "-header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    console.log(pos3 + " " + pos4)
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}