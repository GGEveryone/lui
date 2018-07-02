
var week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var current = 1;
var mainPage = true;
var slide1;
var slide2;
var indc1;
var indc2;
var popup;
var fullcard;
var menu;
// var ignore;
// var ignoreDelay;

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
	console.log("swipe left to right");
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
	console.log("swipe right to left")
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

// function click(right,bottom) {
// 	var currentSlide = document.getElementById("slide"+String(current));
// 	var cards = currentSlide.getElementsByClassName('cards');
// 	var index;
// 	if (right) {
// 		if (bottom) {
// 			index = 3;
// 		} else {
// 			index = 1;
// 		}
// 	} else {
// 		if (bottom) {
// 			index = 2;
// 		} else {
// 			index = 0;
// 		}
// 	}
// 	card = cards[index];
// 	openUp(card, card.id.charAt(4));
// }

//Add the animation when index finger hovers on the icon
function hoverOn(card) {
	var selected_card = document.getElementById(card);
	selected_card.classList.remove('animate-box','fadeInUp','animated-fast');
	selected_card.classList.add('animated','jello');
	console.log("jello has been added");
}

//deactivate the hover on animation
function hoverOff(card) {
	var unselected_card = document.getElementById(card);
	if (unselected_card.classList.contains('jello')) {
		unselected_card.classList.remove('animated','jello');
		// unselected_card.classList.add('animate-box','fadeInUp','animated-fast');
	}
}

function openUp(num) {
	// reset
	menuRender(false);
	var content = document.getElementById("full"+num);
	fullcard = content;
	console.log(fullcard);
	contentClear(popup);
	// card.style.animation = "full-scale 1s";
	content.classList.add('card-expand');
	setTimeout(function(){},5000);
	content.classList.remove('content-hidden');
	content.classList.add('content-full','animated','zoomIn');
	console.log("content full has been added");
	popup.style.display = "flex";

	indc1.style.display = "none";
	indc2.style.display = "none";

	// reset pinching
	// ignore = false;
	// pinched = false;
	// opened = true;
	// console.log("disabled");
	// setTimeout(function() {
	// 	console.log("now");
	// 	ignore = false;
	// 	// console.log("now");
	// }, 5000);
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
		while (heading.classList.contains('slide1-out')){
			heading.classList.remove('slide1-out')
		}
		// while (fullcard.classList.contains('slide1-out')){
		// 	fullcard.classList.remove('slide1-out')
		// }
		heading.classList.add('slide1-in');
		// fullcard.classList.add('slide1-in');
		heading.style.display = 'flex';
		menu.style.display = "none";
		// ignore = true;
		// console.log('open');
	} else {
		while (heading.classList.contains('slide1-in')){
			heading.classList.remove('slide1-in')
		}
		// while (fullcard.classList.contains('slide1-in')){
		// 	fullcard.classList.remove('slide1-in')
		// }
		heading.classList.add('slide1-out');
		// fullcard.classList.add('slide1-out');
		heading.style.display = '';
		menu.style.display = "";
		// clearTimeout(ignoreDelay);
		// ignore = true;
		// pinched = false;
		// opened = true;
		// ignoreDelay = setTimeout(function() {
		// 	ignore = false;
		// }, 1000);
	}
}

function backToMain() {
	popup.style.display = '';
	indc1.style.display = "";
	indc2.style.display = "";
	mainPage = true;
	// ignore = true;
	// pinched = false;
	// opened = true;
	// clearTimeout(ignoreDelay);
}

// Additional Javascript for Animation
;(function () {

	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {

				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated-fast');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated-fast');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated-fast');
							} else {
								el.addClass('fadeInUp animated-fast');
							}

							el.removeClass('item-animate');
						},  k * 200, 'easeInOutExpo' );
					});

				}, 100);

			}

		} , { offset: '85%' } );
	};


	$(function(){
		contentWayPoint();
	});


}());
