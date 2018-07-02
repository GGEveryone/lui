// Store frame for motion functions
var previousFrame = null;

// Setup Leap loop with frame callback function
var controllerOptions = {enableGestures: true};

var canvas = document.getElementById("canvas");
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
var ctx = canvas.getContext("2d");
ctx.globalAlpha = 0.2;
var tempPositions = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]];
var last;
var fingers = ["#9bcfed", "#B2EBF2", "#80DEEA", "#4DD0E1", "#26C6DA"];
var clickable = false;

// console.log(canvas.width,canvas.height);

// check movement every 200ms
var hand;
var velocity = 0;
var index_position = 0;
var velocityPalm = 0;
var pinch = 0;
var opened = true;
var first = true;

setInterval(function() {
	if (mainPage) {
		checkMovementMain();
	} else {
		checkMovementFull();
	}
	// velocity = 0;
	// hand = 0;
}, 100);

var select;
var touchesInit = {0: [], 1: [], 2: [], 3: [], 4: [] };
var touches = {0: [], 1: [], 2: [], 3: [], 4: [] };

//get dimension information of all the cards
var card_dimensions = [];
for (var i = 1; i <= 12; i++) {
	card_dimensions[i] = document.getElementById("card"+i).getBoundingClientRect();
	// console.log("Dimension of card "+i);
	// console.log(card_dimensions[i]);
}

var currentSlide = 1;

Leap.loop({frameEventName: "animationFrame"}, function(frame) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	if (frame.hands.length >0) {
		hand = frame.hands[0];
		velocityPalm = hand.palmVelocity;

		// pinched = pinched || hand.pinchStrength > 0.9;
		// opened = hand.pinchStrength < 0.1;
		// console.log(hand.pinchStrength);
		if (!mainPage) {


			if (pinch > 0.8 && hand.pinchStrength < 0.3) {
				// console.log(pinch, hand.pinchStrength)
				backToMain();
			} else {
				// console.log(0, hand.pinchStrength);
				pinch = hand.pinchStrength;
			}
			// if(hand.pinchStrength > 0.9){
			// 	if (findPinchingFinger(hand) == hand.index){
			// 		pinched = true;
			// 	}
			// }
			// opened = hand.pinchStrength == 0;
		}
		// draw trace
		Object.keys(touches).forEach(function(key){
			var toTrace = touches[key];
			if (toTrace.length > 5){
				toTrace = toTrace.slice(-5);
				clickable = true;
			}
			if (toTrace.length > 0){
				// trace(toTrace, fingers[key]);
			}
		});

		var xTot = 0;
		var yTot = 0;
		var xAvg;
		var yAvg;
		frame.pointables.forEach(function(pointable){
			var color = fingers[pointable.type];
			var position = pointable.stabilizedTipPosition;
			var normalized = frame.interactionBox.normalizePoint(position);
			var x = ctx.canvas.width * normalized[0];
			var y = ctx.canvas.height * (1 - normalized[1]);
			var radius = Math.min(20 / Math.abs(pointable.touchDistance), 50);
			// console.log(radius);
			// var radius = 30;
			var point = {center: [x,y], radius: radius};
			touches[pointable.type].push(point);
			drawCircle([x,y], radius, fingers[pointable.type], false);
			xTot += x;
			yTot += y;
			if (pointable.type == 1){
				drawCircle([x,y], radius, fingers[pointable.type], true);
				velocity = pointable.tipVelocity;
				index_position = [x, y];
				xAvg = x;
				yAvg = y;
			}
		});
		// var xAvg = xTot / frame.fingers.length;
		// var yAvg = yTot / frame.fingers.length;
		select = [xAvg > canvas.width/2, yAvg > canvas.height/2];
	}
});

function drawCircle(center, radius, color, fill) {
  // Make an closed arc with a complete rotation
	ctx.beginPath();
	ctx.arc(center[0], center[1], radius, 0, 2*Math.PI);
	ctx.closePath();
	ctx.lineWidth = 10;
	if (fill) {
	  ctx.fillStyle = color;
	  ctx.fill();
	} else {
	  ctx.strokeStyle = color;
	  ctx.stroke();
	}
}

function trace(toTrace, color){
	var cp1x = toTrace[Math.floor(toTrace.length/3)].center[0];
	var cp1y = toTrace[Math.floor(toTrace.length/3)].center[1];
	var cp2x = toTrace[Math.floor(2*toTrace.length/3)].center[0];
	var cp2y = toTrace[Math.floor(2*toTrace.length/3)].center[1];
	var x = toTrace[toTrace.length-1].center[0];
	var y = toTrace[toTrace.length-1].center[1];

	ctx.beginPath();
	ctx.moveTo(toTrace[0].center[0], toTrace[0].center[1]);
	ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
	ctx.strokeStyle = color;
	ctx.lineWidth = 80;
	ctx.lineJoin = 'round';
	ctx.lineCap = 'round';
	ctx.stroke();
}

function checkMovementMain() {
	// swipe left or right
	if (Math.abs(velocityPalm[0])>500) { // to make it less sensitive
		if(velocityPalm[0] < -400){
			swipeLeft();
			currentSlide = 2;
		} else if (velocityPalm[0] > 400) {
			swipeRight();
			currentSlide = 1;
		}
	}
	if (currentSlide == 1) {
		for (var i = 1; i <= 6; i++) {
			var card_rect = card_dimensions[i];
			//if the finger falls in the card div dimension for card 1-6
			if (index_position[0] > card_rect.left && index_position[0] < card_rect.right &&
				index_position[1] > card_rect.top && index_position[1] < card_rect.bottom) {
				hoverOn("card"+i);
				console.log(velocity)
				if (velocity[1] < -300) {
					openUp(i)
					mainPage = false;
				}
			} else {
				hoverOff("card"+i);
			}
		}
	} else if (currentSlide == 2) {
		for (var i = 7; i <= 12; i++) {
			var card_rect = card_dimensions[i];
			//if the finger falls in the card div dimension for card 7-12
			if (index_position[0] > card_rect.left - canvas.width && index_position[0] < card_rect.right -canvas.width &&
				index_position[1] > card_rect.top && index_position[1] < card_rect.bottom) {
				// console.log("The finger is on card " + i);
				// console.log(index_position)
				hoverOn("card"+i);
				if (velocity[1] < -300) {
					openUp(i)
					mainPage = false;
				}
			} else {
				hoverOff("card"+i);
				// console.log("The finger moves off card " + i);
			}
		}
	}

}

function checkMovementFull () {
	// swipe left or right
	if (fullcard) {
		if(velocityPalm[0] < -400){
			menuRender(false);
		} else if (velocityPalm[0] > 400) {
			menuRender(true);
		}
	}
	// if (pinched == true && opened == true && !ignore == true){
	// 	console.log("close", pinched, opened, ignore);
	// 	backToMain();
	// }
}

function findPinchingFinger(hand){
	var pincher;
	var closest = 500;
	for(var f = 1; f < 5; f++) {
		var finger = hand.fingers[f];
		distance = Leap.vec3.distance(hand.thumb.tipPosition, finger.tipPosition);
		if(current != hand.thumb && distance < closest) {
			closest = distance;
			pincher = current;
		}
	}
	return pincher;
}


function leapToScene(position) {
  var x = position[0];
  var y = position[1];
  var x = canvas.width/2 + position[0];
  var y =  canvas.height - position[1];
  last  = [x,y];
  return [x,y];
}
