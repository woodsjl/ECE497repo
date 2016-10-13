#!/usr/bin/env node
// Josh Woods 10/11/2016
// this is for hw06 


// initialize all of the need variables 
var b =  require('bonescript');
var m1 = 'P9_11';
var m2 = 'P9_13';
var m3 = 'P9_15';
var m4 = 'P9_16';
var startBtn = 'P9_21';
var interval = 0;
var steps = 0;
var fullRotation = 21;
var a0 = 'P9_39';
var a1 = 'P9_40';
// var hasScanned = 0;
// var didClock = 0;
// var didCounterClock = 0;

// set start button pin to input
b.pinMode(startBtn, b.INPUT);

// set motor control pins to output
b.pinMode(m1,b.OUTPUT);
b.pinMode(m2,b.OUTPUT);
b.pinMode(m3,b.OUTPUT);
b.pinMode(m4,b.OUTPUT);
// b.pinMode(a0,b.ANALOG_INPUT);
// b.pinMode(a1,b.ANALOG_INPUT);

// initialize interrupt for start button
b.attachInterrupt(startBtn, startTracking, b.RISING);

console.log("running");

// event handler functions 
function startTracking() {
    console.log("inside start tracking method");
	// setStage4();
	// interval = setInterval(trackClockwise,100); // every 100 ms
	setInterval(printAnalogValues,500);
	// while(true){
	// scanArea();   
	// }
}

function printAnalogValues(){
	console.log("left value = "+b.analogRead(a0));
	console.log("right value = "+b.analogRead(a1));
}

var position = 0;

// function scanArea() {
// 	console.log("inside scanArea");
// 	interval = setInterval(trackClockwise,100); // every 500 ms
// 	// while((didClock + didCounterClock) < 2){
// 	// 	if(steps === fullRotation) {
// 	// 		console.log("inside step === rotation");
// 	// 		clearInterval(interval);
// 	// 		if(didClock === 0){
// 	// 			console.log("inside did clock = 0");
// 	// 			didClock = 1;
// 	// 			steps = 0;
// 	// 			interval = setInterval(trackCounterClockwise,100); // every 500 ms
// 	// 		} else {
// 	// 			console.log("inside else");
// 	// 			didCounterClock = 1;
// 	// 			hasScanned = 1;
// 	// 		}
			
// 	// 	}
// 	// }
// }

function trackClockwise(){
	console.log("tracking Clockwise position = ");
	position = position % 4;
	console.log(position + "\n");
	if (position === 0){
		setStage1();
	} else if (position === 1) {
		setStage2();
	} else if (position === 2){
		setStage3();
	} else {
		setStage4();
	}
	position = position + 1;
	steps = steps + 1;
	if(steps === fullRotation) {
		clearInterval(interval);
		steps = 0
		interval = setInterval(trackCounterClockwise,100);
	}
}

function trackCounterClockwise(){
	console.log("tracking Counter Clockwise\n");
	position = position % 4;
	if (position === 0){
		setStage4();
	} else if (position === 1) {
		setStage3();
	} else if (position === 2){
		setStage2();
	} else {
		setStage1();
	}
	position = position + 1;
	steps = steps + 1;
	if(steps === fullRotation) {
		clearInterval(interval);
	}
}

function setStage1(){   // 0110
	b.digitalWrite(m1, 0);
	b.digitalWrite(m2, 0);
	b.digitalWrite(m3, 1);
	b.digitalWrite(m4, 1);
}

function setStage2(){ // 0011
	b.digitalWrite(m1, 0);
	b.digitalWrite(m2, 1);
	b.digitalWrite(m3, 1);
	b.digitalWrite(m4, 0);
}

function setStage3(){ // 1001
	b.digitalWrite(m1, 1);
	b.digitalWrite(m2, 1);
	b.digitalWrite(m3, 0);
	b.digitalWrite(m4, 0);
}

function setStage4(){ // 1100
	b.digitalWrite(m1, 1);
	b.digitalWrite(m2, 0);
	b.digitalWrite(m3, 0);
	b.digitalWrite(m4, 1);
}