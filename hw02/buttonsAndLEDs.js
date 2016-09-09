#!/usr/bin/env node
// Josh Woods 09/08/2016
// this is for hw02 
// When a button is pressed light up a corresponding LED

// initialize all of the need variables 
var b =  require('bonescript');
var leftBtn = 'P9_11';
var topBtn = 'P9_13';
var rightBtn = 'P9_16';
var downBtn = 'P9_17';
var led0 = 'P9_23';
var led1 = 'P9_24';
var led2 = 'P9_27';
var led3 = 'P9_41';
var value0 = 0;
var value1 = 0;
var value2 = 0;
var value3 = 0;

// set button pins to input
b.pinMode(topBtn, b.INPUT);
b.pinMode(leftBtn, b.INPUT);
b.pinMode(downBtn, b.INPUT);
b.pinMode(rightBtn, b.INPUT);

// set button pins to output
b.pinMode(led0,b.OUTPUT);
b.pinMode(led1,b.OUTPUT);
b.pinMode(led2,b.OUTPUT);
b.pinMode(led3,b.OUTPUT);

// initialize interrupts for buttons
b.attachInterrupt(topBtn, setLED0, b.RISING);
b.attachInterrupt(rightBtn, setLED1, b.RISING);
b.attachInterrupt(downBtn, setLED2, b.RISING);
b.attachInterrupt(leftBtn, setLED3, b.RISING);

console.log("running");

// event handler functions 
function setLED0() {
	if(value0 === 1) {
		value0 = 0;
	} else {
		value0 = 1;
	}
    b.digitalWrite(led0, value0);
}
function setLED1() {
	if(value1 === 1) {
		value1 = 0;
	} else {
		value1 = 1;
	}
    b.digitalWrite(led1, value1);
}
function setLED2() {
	if(value2 === 1) {
		value2 = 0;
	} else {
		value2 = 1;
	}
    b.digitalWrite(led2, value2);
}
function setLED3() {
	if(value3 === 1) {
		value3 = 0;
	} else {
		value3 = 1;
	}
    b.digitalWrite(led3, value3);
}

