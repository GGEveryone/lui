// Store frame for motion functions
var previousFrame = null;

// Setup Leap loop with frame callback function
var controllerOptions = {enableGestures: true};

// canvas 
var canvas = document.getElementById("canvas");
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
var ctx = canvas.getContext("2d");
ctx.globalAlpha = 0.2;
// var tempPositions = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]];
var last;
var fingers = ["#9bcfed", "#B2EBF2", "#80DEEA", "#4DD0E1", "#26C6DA"];
var clickable = false;

// hand/fingers initial default
var hand;
var velocity = 0;
var index_position = 0;
var velocityPalm = 0;
var pinch = 0;
var select;
var touches = {0: [], 1: [], 2: [], 3: [], 4: [] };

// window initial defualt
var currentSlide = 1;
var openedCard = 0;
//get dimension information of all the cards
var card_dimensions = [];
for (var i = 1; i <= 12; i++) {
	card_dimensions[i] = document.getElementById("card"+i).getBoundingClientRect();
	// console.log("Dimension of card "+i);
	// console.log(card_dimensions[i]);
}

// var mainPage = true;


// map
var PALM_MAP_TYPE_THRESHOLD = 150;
var PALM_MAP_MOVE_THRESHOLD = 100;
var data = {};
var map;

// check intervals 
setInterval(function() {
	if (mainPage) {
		checkMovementMain();
	} else {
		checkMovementFull();
	}
}, 100);

// google.maps.event.addDomListener(window, 'load', mapInit());

Leap.loop({frameEventName: "animationFrame"}, function(frame) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	if (frame.hands.length >0) {
		hand = frame.hands[0];
		velocityPalm = hand.palmVelocity;

		// TODO: update pinch function
		if (!mainPage) {
			if (pinch > 0.8 && hand.pinchStrength < 0.3) {
				// console.log(pinch, hand.pinchStrength)
				backToMain();
			} else {
				// console.log(0, hand.pinchStrength);
				pinch = hand.pinchStrength;
			}
		}

		// draw trace
		Object.keys(touches).forEach(function(key){
			let toTrace = touches[key];
			if (toTrace.length > 5){
				toTrace = toTrace.slice(-5);
				clickable = true;
			}
			if (toTrace.length > 0){
				// trace(toTrace, fingers[key]);
			}
		});

		let xTot = 0;
		let yTot = 0;
		let xAvg;
		let yAvg;
		frame.pointables.forEach(function(pointable){
			let color = fingers[pointable.type];
			let position = pointable.stabilizedTipPosition;
			let normalized = frame.interactionBox.normalizePoint(position);
			let x = ctx.canvas.width * normalized[0];
			let y = ctx.canvas.height * (1 - normalized[1]);
			let radius = Math.min(20 / Math.abs(pointable.touchDistance), 50);
			let point = {center: [x,y], radius: radius};
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

	// specific actions for each card
	switch (openedCard) {
		case 1:
			console.log(openedCard);
			break;

		case 2:
			console.log(openedCard);
			break;

		case 3:
			console.log(openedCard);
			break;

		case 4:
			console.log(openedCard);
			break;

		case 5:
			// console.log("JERE");
			// google.maps.event.addDomListener(window, 'load', mapInit());
			console.log(map);

			// if (map.classList.contains('content-hidden')) {
			// 	map.classList.remove('content-hidden');
			// 	map.classList.add('content-full');
			// }
	 	// 	// google.maps.event.addDomListener(window, 'load', mapInit());

			// data = frame;
			// if(data && data.hands.length > 0){
			// 	if(data.hands[0].palmPosition[1] < PALM_MAP_MOVE_THRESHOLD){
			// 		map.panBy(data.hands[0].palmPosition[0]/10,data.hands[0].palmPosition[2]/10);
			// 	}else if(data.hands[0].palmPosition[1] > PALM_MAP_TYPE_THRESHOLD){
			// 		checkFingers(data);
			// 	}
			// }

			function checkFingers(frame){
				switch(frame.pointables.length){
					case 1:
						map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
						break;
					case 2:
						map.setMapTypeId(google.maps.MapTypeId.TERRAIN);
						break;
					default:
						break;
				}
			}	

			break;


		case 6:
			console.log(openedCard);
			break;

		case 7:
			console.log(openedCard);
			break

		case 8:
			console.log(openedCard);
			break;

		case 9:
			console.log(openedCard);
			break;

		case 10:
			console.log(openedCard);
			break;

		case 11:
			console.log(openedCard);
			break;

		case 12:
			console.log(openedCard);
			break;

		default:
			// console.log("DEFAULT");
	}

});

function drawCircle(center, radius, color, fill) {
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

function currentLocation() {
	if (currentSlide == 1) {
		for (let i = 1; i <= 6; i++) {
			let card_rect = card_dimensions[i];
			if (index_position[0] > card_rect.left && index_position[0] < card_rect.right &&
				index_position[1] > card_rect.top && index_position[1] < card_rect.bottom) {
				return i;
			}
		}
	} else {
		for (let i = 7; i <= 12; i++) {
			let card_rect = card_dimensions[i];
			if (index_position[0] > card_rect.left - canvas.width && index_position[0] < card_rect.right -canvas.width &&
				index_position[1] > card_rect.top && index_position[1] < card_rect.bottom) {
				return i;

			} 
		}
	}
}

function checkMovementMain() {
	// swipe left or right
	// console.log(velocityPalm[0]);
	// console.log(index_position)
	if (Math.abs(velocityPalm[0])>500) { 
		if(velocityPalm[0] < -400){
			swipeLeft();
			currentSlide = 2;
		} else if (velocityPalm[0] > 400) {
			swipeRight();
			currentSlide = 1;
		}
	} 

	// click event
	else if(velocity[2] < -300 && select){
		// click(select[0], select[1]); // in main.js file
		openedCard= currentLocation();
		openUp(openedCard);

		// if (currentSlide == 1) {
		// 	for (let i = 1; i <= 6; i++) {
		// 		let card_rect = card_dimensions[i];
		// 		if (index_position[0] > card_rect.left && index_position[0] < card_rect.right &&
		// 			index_position[1] > card_rect.top && index_position[1] < card_rect.bottom) {
		// 			openUp(i);
		// 		}
		// 	}
		// } else {
		// 	for (let i = 7; i <= 12; i++) {
		// 		let card_rect = card_dimensions[i];
		// 		if (index_position[0] > card_rect.left - canvas.width && index_position[0] < card_rect.right -canvas.width &&
		// 			index_position[1] > card_rect.top && index_position[1] < card_rect.bottom) {
		// 			openUp(i);

		// 		} 
		// 	}
		// }
		mainPage = false;
	}

	// hovering
	else {
		if (currentSlide == 1) {
			for (let i = 1; i <= 6; i++) {
				let card_rect = card_dimensions[i];
				//if the finger falls in the
				if (index_position[0] > card_rect.left && index_position[0] < card_rect.right &&
					index_position[1] > card_rect.top && index_position[1] < card_rect.bottom) {
					// console.log("The finger is on card " + i);
					// console.log(index_position)
					hoverOn("card"+i);
				} else {
					hoverOff("card"+i);
					// console.log("The finger moves off card " + i);
				}
			}
		} else if (currentSlide == 2) {
			for (let i = 7; i <= 12; i++) {
				let card_rect = card_dimensions[i];
				//if the finger falls in the
				if (index_position[0] > card_rect.left - canvas.width && index_position[0] < card_rect.right -canvas.width &&
					index_position[1] > card_rect.top && index_position[1] < card_rect.bottom) {
					// console.log("The finger is on card " + i);
					// console.log(index_position)
					hoverOn("card"+i);
				} else {
					hoverOff("card"+i);
					// console.log("The finger moves off card " + i);
				}
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
}

function mapInit() {
	var mapOptions = {
		zoom: 8,
		center: new google.maps.LatLng(-34.397, 150.644)
	};
	map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
}

// function findPinchingFinger(hand){
// 	var pincher;
// 	var closest = 500;
// 	for(var f = 1; f < 5; f++) {
// 		var finger = hand.fingers[f];
// 		distance = Leap.vec3.distance(hand.thumb.tipPosition, finger.tipPosition);
// 		if(current != hand.thumb && distance < closest) {
// 			closest = distance;
// 			pincher = current;
// 		}
// 	}
// 	return pincher;
// }


// function leapToScene(position) {
//   var x = position[0];
//   var y = position[1];
//   var x = canvas.width/2 + position[0];
//   var y =  canvas.height - position[1];
//   last  = [x,y];
//   return [x,y];
// }

