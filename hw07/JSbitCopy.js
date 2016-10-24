#!/usr/bin/env node
// Josh Woods 10/23/2016
// this is for hw07 


// initialize all of the needed variables 
var b =  require('bonescript');
var input = 'P9_28';
var output = 'P9_27';

b.pinMode(input, b.INPUT);
b.pinMode(output,b.OUTPUT);

// initialize interrupt for start button
b.attachInterrupt(input, turnOutputOn, b.RISING);
b.attachInterrupt(input, turnOutputOff, b.FALLING);

function turnOutputOn(){
    b.digitalWrite(output, 1);
}

function turnOutputOff(){
    b.digitalWrite(output, 0);
}

console.log("running");