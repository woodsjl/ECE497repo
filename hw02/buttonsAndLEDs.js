#!/usr/bin/env node
// Josh Woods 09/08/2016
// this is for hw02 
// When a button is pressed light up a corresponding LED

var b =  require('bonescript');
var leftBtn = 'P9_11';
var topBtn = 'P9_13';
var rightBtn = 'P9_15';
var downBtn = 'P9_17';
var led0 = 'P9_23';
var led1 = 'P9_25';
var led2 = 'P9_27';
var led3 = 'P9_41';

b.pinMode(topBtn, b.INPUT,7,'pulldown');

b.pinMode(led0,b.OUTPUT);

b.digitalWrite(led0, 0);

b.attachInterrupt(topBtn,true,b.CHANGE, changeState(led0));


function changeState(var led) {
	if (b.digitalRead(led) === 0) {
		b.digitalWrite(led,1);
	} else {
		b.digitalWrite(led,0);
	}
}