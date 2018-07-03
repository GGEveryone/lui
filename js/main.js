
var week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var current = 1;
var mainPage = true;
var slide1;
var slide2;
var indc1;
var indc2;
var popup;
var fullcard;
// var menu;
var photos;

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
	// menu = document.getElementById("menu");

	// jQuery("#gallery").unitegallery({});
	// photos = document.getElementById("gallery").unitegalleryMain();
	// $(document).ready(function(){ 
		// photos = $("#gallery").unitegalleryMain(); 
	// }); 
}

function setInfobox(){
	let day = document.getElementById("day");
	let time = document.getElementById("time");
	let weather = document.getElementById("weather");
	let date = new Date;
	day.innerHTML = week[date.getDay()];
	let hour = date.getHours();
	let end;
	if (hour > 12){
		end = "pm";
		hour -= 12;
	} else {
		end = "am";
	}
	let minute;
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

function click(right,bottom) {
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

function hoverOn(card) {
	var selected_card = document.getElementById(card);
	selected_card.classList.remove('animate-box','fadeInUp','animated-fast');
	selected_card.classList.add('animated','jello');
	// console.log("jello has been added");
}

function hoverOff(card) {
	var unselected_card = document.getElementById(card);
	if (unselected_card.classList.contains('jello')) {
		unselected_card.classList.remove('animated','jello');
		// unselected_card.classList.add('animate-box','fadeInUp','animated-fast');
	}
}

function openUp(num) {
	// menuRender(false);
	var fullcard = document.getElementById("full"+num);
	console.log("OPENED", fullcard);
	contentClear();

	// card.style.animation = "full-scale 1s";
	if (fullcard.classList.contains('content-hidden')) {
		fullcard.classList.remove('content-hidden');
	}
	fullcard.classList.add('content-full');
	popup.style.display = "flex";

	indc1.style.display = "none";
	indc2.style.display = "none";

	// // specific actions for each card
	switch (num) {
		case 1:
			var pswpElement = document.querySelectorAll('.pswp')[0];

			// build items array
			var items = [
				{
					src: 'https://placekitten.com/600/400',
					w: 600,
					h: 400
				},
				{
					src: 'https://placekitten.com/1200/900',
					w: 1200,
					h: 900
				}
			];

			// define options (if needed)
			var options = {
				// optionName: 'option value'
				// for example:
				index: 0 // start at first slide
			};

			// Initializes and opens PhotoSwipe
			var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
			gallery.init();
			break;

		case 2:
			console.log(num);
			break;

		case 3:
			console.log(num);
			break;

		case 4:
			console.log(num);
			break;

		case 5:
			console.log(num);
			var PALM_MAP_TYPE_THRESHOLD = 150;
			var PALM_MAP_MOVE_THRESHOLD = 100;
			var data = {};
			var map;
			function initialize() {
				var mapOptions = {
					zoom: 8,
					center: new google.maps.LatLng(-34.397, 150.644)
				};
				map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
			}

			google.maps.event.addDomListener(window, 'load', initialize);
			// google.maps.event.addDomListener(window, 'load', initialize);

			let controller = new Leap.Controller({enableGestures:true});
			controller.on('frame', function(frame){
				data = frame;
				if(data && data.hands.length > 0){
					if(data.hands[0].palmPosition[1] < PALM_MAP_MOVE_THRESHOLD){
						map.panBy(data.hands[0].palmPosition[0]/10,data.hands[0].palmPosition[2]/10);
					}else if(data.hands[0].palmPosition[1] > PALM_MAP_TYPE_THRESHOLD){
						checkFingers(data);
					}
				}
			});

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

			controller.connect();

			break;


		case 6:
			console.log(num);
			break;

		case 7:
			console.log(num);
			break

		case 8:
			console.log(num);
			break;

		case 9:
			console.log(num);
			break;

		case 10:
			console.log(num);
			break;

		case 11:
			console.log(num);
			break;

		case 12:
			console.log(num);
			break;

		default:
			console.log("DEFAULT");
	}
}

function contentClear(){
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

// function menuRender(show) {
// 	var heading = document.getElementsByTagName("header")[0];
// 	if (show) {
// 		while (heading.classList.contains('slide1-out')){
// 			heading.classList.remove('slide1-out')
// 		}
// 		// while (fullcard.classList.contains('slide1-out')){
// 		// 	fullcard.classList.remove('slide1-out')
// 		// }
// 		heading.classList.add('slide1-in');
// 		// fullcard.classList.add('slide1-in');
// 		heading.style.display = 'flex';
// 		menu.style.display = "none";
// 		// ignore = true;
// 		// console.log('open');
// 	} else {
// 		while (heading.classList.contains('slide1-in')){
// 			heading.classList.remove('slide1-in')
// 		}
// 		// while (fullcard.classList.contains('slide1-in')){
// 		// 	fullcard.classList.remove('slide1-in')
// 		// }
// 		heading.classList.add('slide1-out');
// 		// fullcard.classList.add('slide1-out');
// 		heading.style.display = '';
// 		menu.style.display = "";
// 		// clearTimeout(ignoreDelay);
// 		// ignore = true;
// 		// pinched = false;
// 		// opened = true;
// 		// ignoreDelay = setTimeout(function() {
// 		// 	ignore = false;
// 		// }, 1000);
// 	}
// }

function backToMain() {
	popup.style.display = '';
	indc1.style.display = "";
	indc2.style.display = "";
	mainPage = true;
	openedCard = 0;
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
