#!/usr/bin/env node
// Josh Woods ECE 497
// Homework 3 - set alert limits and read temperatures

// initialize needed variables 
var b =  require('bonescript');
var i2c = require('i2c');
var temp1 = new i2c(0x4a, {
    device: '/dev/i2c-2'
});
var temp2 = new i2c(0x48, {
    device: '/dev/i2c-2'
});
var low = [0x15]; // 21 C | ~70 F
var high = [0x20]; // 32 C | ~90 F
var config = [0x80]; // 0x06 sets the configuration to alert mode 
                    //active high and interrupt mode

// pins to be used in program
var alert1 = 'P9_14';
var alert2 = 'P9_18';
var testButton1 = 'P9_13';
var testButton2 = 'P9_17';

// set button pins to input
b.pinMode(testButton1, b.INPUT);
b.pinMode(testButton2, b.INPUT);
b.pinMode(alert1, b.INPUT);
b.pinMode(alert2, b.INPUT);

// some useful functions
function getTemp(device){
    device.readBytes(0,1,function(err,res){
        var temp1c = res.readInt8(0);
        var temp1f = ((temp1c * 9)/5) + 32;
        console.log("Temp = "+temp1c+"C and "+temp1f+"F");
    });
    
}

function getConfig(device){
    device.readBytes(1,1,function(err,res){
       console.log("config = "+res.readInt8(0)); 
    });
}

function getLow(device){
    device.readBytes(2,1,function(err,res){
       console.log("Low limit is "+res.readInt8(0)+"C and "+(((res.readInt8(0)* 9)/5) + 32)+"F"); 
    });
}

function getHigh(device){
    device.readBytes(3,1,function(err,res){
       console.log("High limit is "+res.readInt8(0)+"C and "+(((res.readInt8(0)* 9)/5) + 32)+"F"); 
    });
}

function setConfig(device,config){
    device.writeBytes(1,config,function(err){});
}

function setLow(device,pLow){
    device.writeBytes(2,pLow,function(err){});
}

function setHigh(device,pHigh){
    device.writeBytes(3,pHigh,function(err){});
}

function alertHandler(){
    console.log("there has been an alert");
    console.log("temp 1 = "+getTemp(temp1));
    console.log("temp 2 = "+getTemp(temp2));
}

b.attachInterrupt(testButton1, test1, b.RISING);
b.attachInterrupt(testButton2, test2, b.RISING);
b.attachInterrupt(alert1, alertHandler, b.CHANGE);
b.attachInterrupt(alert2, alertHandler, b.CHANGE);

// set configutations
setConfig(temp1,config);
setConfig(temp2,config);
console.log("running");

function test1(){
    getTemp(temp1);
    getConfig(temp1);
    getLow(temp1);
    getHigh(temp1);
    console.log("setting low to 21C");
    setLow(temp1,low);
    getLow(temp1);
    console.log("setting high to 32C");
    setHigh(temp1,high);
    getHigh(temp1);
}

function test2(){
    getTemp(temp2);
    getConfig(temp2);
    getLow(temp2);
    getHigh(temp2);
    console.log("setting low to 21C");
    setLow(temp2,low);
    getLow(temp2);
    console.log("setting high to 30C");
    setHigh(temp2,[0x1b]);
    getHigh(temp2);
}