var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;
var lastPressed = false;
var Clickstart;
var sky;
var character;
var life = 3;
var point = 0;
const Over = document.querySelector(".over")

/* this is for character moving code*/

function keyup(event) {
	var player = document.getElementById('player');
	if (event.keyCode == 37) {
		leftPressed = false;
		lastPressed = 'left';
	}
	if (event.keyCode == 39) {
		rightPressed = false;
		lastPressed = 'right';
	}
	if (event.keyCode == 38) {
		upPressed = false;
		lastPressed = 'up';
	}
	if (event.keyCode == 40) {
		downPressed = false;
		lastPressed = 'down';
	}
	player.className = 'character stand ' + lastPressed;
}


function move() {
	var player = document.getElementById('player');
	var positionLeft = player.offsetLeft;
	var positionTop = player.offsetTop;
	if (downPressed) {
		var newTop = positionTop + 1;

		var element = document.elementFromPoint(player.offsetLeft, newTop + 32);
		if (element.classList.contains('sky') == false) {
			player.style.top = newTop + 'px';
		}

		if (leftPressed == false) {
			if (rightPressed == false) {
				player.className = 'character walk down';
			}
		}
	}
	if (upPressed) {
		var newTop = positionTop - 1;

		var element = document.elementFromPoint(0, newTop);
		if (element.classList.contains('sky') == false) {
			player.style.top = newTop + 'px';
		}

		if (leftPressed == false) {
			if (rightPressed == false) {
				player.className = 'character walk up';
			}
		}
	}
	if (leftPressed) {
		var newLeft = positionLeft - 1;

		var element = document.elementFromPoint(newLeft, player.offsetTop);
		if (element.classList.contains('sky') == false) {
			player.style.left = newLeft + 'px';
		}


		player.className = 'character walk left';
	}
	if (rightPressed) {
		var newLeft = positionLeft + 1;

		var element = document.elementFromPoint(newLeft + 32, player.offsetTop);
		if (element.classList.contains('sky') == false) {
			player.style.left = newLeft + 'px';
		}

		player.className = 'character walk right';
	}

}


function keydown(event) {
	if (event.keyCode == 37) {
		leftPressed = true;
	}
	if (event.keyCode == 39) {
		rightPressed = true;
	}
	if (event.keyCode == 38) {
		upPressed = true;
	}
	if (event.keyCode == 40) {
		downPressed = true;
	}
}

/* for start button*/

function myLoadFunction() {
	timeout = setInterval(move, 10);
	document.addEventListener('keydown', keydown);
	document.addEventListener('keyup', keyup);
	Clickstart = document.getElementsByClassName('start')[0];
	Clickstart.addEventListener('click', play);
	sky = document.getElementsByClassName('sky')[0];
	character = document.getElementById('player');
}

function play(){
	var element = document.getElementById('start');
    element.style.display = 'none';
	 setInterval(falling, 1000);

}
function stop(){
	var element = document.getElementById('start');
	 element.addEventListener('click', play);
}
document.addEventListener('DOMContentLoaded', stop);

/* to drop a bomb*/

function falling() {
	var missile = document.createElement('div');
	var lifeline = document.getElementsByClassName('health')[0];
    var number = Math.floor(Math.random() * window.innerWidth);
	missile.style.left =  number + 'px';
	missile.className = 'bomb';
	document.body.appendChild(missile);
	var random = Math.floor(Math.random() * (window.innerHeight - sky.offsetHeight)) + sky.offsetHeight;
	var drop = setInterval(function () {
		missile.style.top = missile.offsetTop + 1 + 'px';
		if (missile.offsetTop > random) {
			missile.className = 'explosion';

		if(!(missile.offsetTop + missile.offsetHeight > character.offsetTop && missile.offsetTop < character.offsetTop + character.offsetHeight && missile.offsetLeft + missile.offsetLeft + missile.offsetWidth > character.offsetLeft && missile.offsetLeft < character.offsetLeft + character.offsetWidth))	
        {
        	point = point + 1;
        } 
        document.getElementById('bombsdodged').innerHTML = point;
        console.log("SCORE: "+ point)
			clearInterval(drop);
			setTimeout(function () {
				missile.remove();
			}, 100);
			if (missile.offsetTop + missile.offsetHeight > character.offsetTop && missile.offsetTop < character.offsetTop + character.offsetHeight && missile.offsetLeft + missile.offsetWidth > character.offsetLeft && missile.offsetLeft < character.offsetLeft + character.offsetWidth) {
				
				life = life - 1;
				lifeline.removeChild(lifeline.lastElementChild);

				console.log("Life remaining: " + life);
			if(life<=0){
					setTimeout(function () {	
					location.reload();
					var name = prompt("Enter your name: ", "");
					alert("Total Score of " + name + " is: " + point);
					alert('YOUR GAME IS OVER');
				}, 300);

					Clickstart.style.display = 'block';
					Clickstart.innerHTML = " GAME OVER";
					
               }
			}
		}
	}, 5);

}
function NUCLEAR (){
	setInterval(falling, 7);
}


document.addEventListener('DOMContentLoaded', myLoadFunction);
