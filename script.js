var timeSince = Number(getCookie("savedTimeSince"));
var shownVar = document.getElementById("timeSinceVariable");
var buildingOneCount = Number(getCookie("buildingOneCount"));
var incrementValue = 0;
var buildingOneProduction = null;
var buildingOneCost = Number(getCookie("buildingOneCost"));

//speed at which time passes, base 1 second
var incrementSpeed = 1000;

//update building costs

function updateBuildingCost() {

  buildingOneCost = Math.round(buildingOneCount**1.8);

}

//amount of seconds added per time value and update every 1 sec
function updateIncrementValue() {

incrementValue = buildingOneCount;

}

//production statistics functions
function updateStatistics() {

  buildingOneProduction = buildingOneCount;

}


//update all variables
function increment() {

    updateIncrementValue();
    timeSince +=incrementValue;
    updateStatistics();
    updateVisual();

}

setInterval(increment, incrementSpeed);

//add seconds every time you click
var clickValue = 1;

document.getElementById("timeText").onclick = function addClick() {

    timeSince +=clickValue;

}

document.getElementById("buildingOneBuy").onclick = function () {

  if (buildingOneCost <= timeSince) {
  timeSince -= buildingOneCost;
  buildingOneCount +=1;
  updateBuildingCost();
  updateStatistics();
  updateVisual();
  } else {
    alert("Not enough time!");
  }   
}

  //disables buttons

function disableButtons() {

  if (buildingOneCost > timeSince) {

    document.getElementById("buildingOneBuy").disabled = true;

  } else {

    document.getElementById("buildingOneBuy").disabled = false;

    }

  }





//cookies

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  
function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function saveCookie() {
    
  setCookie("savedTimeSince",timeSince,5000);
  setCookie("buildingOneCount",buildingOneCount,5000);
  setCookie("buildingOneCost",buildingOneCost,5000);

}

// refresh cookie every 1 sec
setInterval(saveCookie,1000);


//resetbutton resets game 100%
document.getElementById("resetGame").onclick = function resetGame () {

  timeSince = 0;
  buildingOneCount = 0;
  buildingOneCost = 10;

}



// updates the shown variables every 100 ms
function updateVisual() {

  shownVar.innerHTML = timeSince;
  document.getElementById("buildingOneCountHTML").innerHTML = buildingOneCount;
  document.getElementById("buildingOneProductionHTML").innerHTML = buildingOneProduction;
  document.getElementById("buildingOneCostHTML").innerHTML = buildingOneCost;
  disableButtons();


}

setInterval(updateVisual,10);


