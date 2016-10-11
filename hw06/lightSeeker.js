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
	setStage4();
	while(true){
	    
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

function setStage4(){ // 
	b.digitalWrite(m1, 1);
	b.digitalWrite(m2, 0);
	b.digitalWrite(m3, 0);
	b.digitalWrite(m4, 1);
}