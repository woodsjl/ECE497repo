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
b.attachInterrupt(input, turnOutputOn, b.CHANGE);
// b.attachInterrupt(input, turnOutputOff, b.FALLING);

function turnOutputOn(x){
    // console.log(x);
    b.digitalWrite(output, x.value);
}

function turnOutputOff(){
    b.digitalWrite(output, 0);
}

console.log("running");