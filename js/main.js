
var week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var current = 1;
var mainPage = true;
var slide1;
var slide2;
var indc1;
var indc2;
var popup;
var menu;
var ignoreTimeout;

window.onload = function() {
	setInfobox();

	// slides
	slide1 = document.getElementById("slide1");
	slide2 = document.getElementById("slide2");

	// indicators
	indc1 = document.getElementById("indicator1");
	indc2 = document.getElementById("indicator2");

	// popup related
	popup = document.getElementById("popup");
	menu = document.getElementById("menu");
}	

function setInfobox(){
	// set variables
	var day = document.getElementById("day");
	var time = document.getElementById("time");
	var weather = document.getElementById("weather");
	var date = new Date;
	day.innerHTML = week[date.getDay()];
	var hour = date.getHours();
	var end;
	if (hour > 12){
		end = "pm";
		hour -= 12;
	} else {
		end = "am";
	}
	var minute;
	if (date.getMinutes()<10){
		minute = "0"+String(date.getMinutes());
	} else {
		minute = String(date.getMinutes());
	}
	time.innerHTML = String(hour) + " : " + minute + " " + end;
	weather.src = "image/sunny.png";
}

function swipeRight(){	
	// console.log("swipe left to right");
	if (slide1.classList.contains("slide1-out")){
		slide1.classList.remove("slide1-out");
	}

	if (slide2.classList.contains("slide2-in")){
		slide2.classList.remove("slide2-in");
	}

	if (current != 1) {
		slide2.classList.add("slide2-out");
		slide1.classList.add("slide1-in");
		current = 1;
		indc1.className = "active";
		indc2.className = "";
	}
}

function swipeLeft(){
	// console.log("swipe right to left")
	if (slide1.classList.contains("slide1-in")){
		slide1.classList.remove("slide1-in");
	}

	if (slide2.classList.contains("slide2-out")){
		slide2.classList.remove("slide2-out");
	}

	if (current != 2) {
		slide1.classList.add("slide1-out");
		slide2.classList.add("slide2-in");
		current = 2;
		indc2.className = "active";
		indc1.className = "";
	}
}

function click(right,bottom) {
	console.log(current, "slide"+String(current));
	var currentSlide = document.getElementById("slide"+String(current));
	var cards = currentSlide.getElementsByClassName('cards');
	var index;
	if (right) {
		if (bottom) {
			index = 3;
		} else {
			index = 1;
		}
	} else {
		if (bottom) {
			index = 2;
		} else {
			index = 0;
		}
	}
	card = cards[index];
	openUp(card, card.id.charAt(4));
}


function openUp(card, num) {
	// reset
	menuRender(false);
	var content = document.getElementById("full"+num);
	contentClear(popup);
	
	content.classList.remove('content-hidden');
	content.classList.add('content-full');
	popup.style.display = "flex";

	indc1.style.display = "none";
	indc2.style.display = "none";

	ignore = true;
	ignoreTimeout = setTimeout(function() {
		ignore = false;
	}, 5000);
}

function contentClear(popup){
	var cards = popup.getElementsByTagName('div');
	for (var i = 0; i < cards.length; i++) {
		var card = cards[i];
		if (card.classList.contains('content-full')) {
			card.classList.remove('content-full');
		}

		if (! card.classList.contains('content-hidden')){
			card.classList.add('content-hidden');
		}
	}
}

function menuRender(show) {
	var heading = document.getElementsByTagName("header")[0];
	if (show) {
		heading.style.display = 'flex';
		menu.style.display = "none";
		// console.log('open');
	} else {
		heading.style.display = '';
		menu.style.display = "";
	}
}

function backToMain() {
	popup.style.display = '';
	indc1.style.display = "";
	indc2.style.display = "";
	mainPage = true;
	clearTimeout(ignoreTimeout);
}

