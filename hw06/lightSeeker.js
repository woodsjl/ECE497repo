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
var minClock = 1
var minclockStep = 0;
var minCounter = 1;
var minCounterStep = 0;

// set start button pin to input
b.pinMode(startBtn, b.INPUT);

// set motor control pins to output
b.pinMode(m1,b.OUTPUT);
b.pinMode(m2,b.OUTPUT);
b.pinMode(m3,b.OUTPUT);
b.pinMode(m4,b.OUTPUT);

// initialize interrupt for start button
b.attachInterrupt(startBtn, startTracking, b.RISING);

console.log("running");

// event handler functions 
function startTracking() {
    console.log("inside start tracking method");
	interval = setInterval(trackClockwise,100); // every 100 ms
}

function printAnalogValues(){
	console.log("left value = "+b.analogRead(a0));
	console.log("right value = "+b.analogRead(a1));
}

var position = 0;

function trackClockwise(){
	console.log("tracking Clockwise position = ");
	position = position % 4;
	console.log(position + "\n");
	var currentA0 = b.analogRead(a0);
	var currentA1 = b.analogRead(a1);
	if (position === 0){
		setStage1();
	} else if (position === 1) {
		setStage2();
	} else if (position === 2){
		setStage3();
	} else {
		setStage4();
	}
	if (currentA0 < minClock){
		minClock = currentA0;
		minClockStep = steps;
	} else if (currentA1 < minClock) {
		minClock = currentA1;
		minClockStep = steps;
	}
	position = position + 1;
	steps = steps + 1;
	if(steps > fullRotation) {
		clearInterval(interval);
		steps = 0
		interval = setInterval(trackCounterClockwise,100);
	}
}

function trackCounterClockwise(){
	console.log("tracking Counter Clockwise\n");
	position = position % 4;
	var currentA0 = b.analogRead(a0);
	var currentA1 = b.analogRead(a1);
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
	if (currentA0 < minClock){
		minCounter = currentA0;
		minCounterStep = steps;
	} else if (currentA1 < minClock) {
		minCounter = currentA1;
		minCounterStep = steps;
	}
	steps = steps + 1;
	if(steps > fullRotation) {
		clearInterval(interval);
		if (minClock < minCounter){
			fullRotation = minClockStep;
		} else {
		fullRotation = minCounterStep;
		}
		steps = 0;	
		interval = setInterval(gotoMin,100);
	}
}

function gotoMin(){
	position = position % 4;
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
	if(steps > fullRotation) {
		clearInterval(interval);
		interval = setInterval(hunt,100);
	}
}

function hunt(){
	var currentA0 = b.analogRead(a0);
	var currentA1 = b.analogRead(a1);
	if (currentA0 < currentA1) {
		position = position - 1;
	} else if (currentA1 < currentA0){
		position = position + 1;
	}
	position = position % 4;
	if (position === 0){
		setStage1();
	} else if (position === 1) {
		setStage2();
	} else if (position === 2){
		setStage3();
	} else {
		setStage4();
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