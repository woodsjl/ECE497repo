#!/usr/bin/env node
// Josh Woods ECE 497
// Homework 3 - Etch-A-Sketch 
// 

// initialize all of the need variables 
var i2c = require('i2c');
var wire = new i2c(0x70, {
    device: '/dev/i2c-2'
});
var b =  require('bonescript');
var leftBtn = 'P9_13';
var topBtn = 'P9_16';
var rightBtn = 'P9_17';
var downBtn = 'P9_11';
var exitBtn = 'P9_12';
var clearBtn = 'P9_41';
var screenWidth = 14;
var screenHeight = 7;
var row = 0;
var col = 14;

// set button pins to input
b.pinMode(topBtn, b.INPUT);
b.pinMode(leftBtn, b.INPUT);
b.pinMode(downBtn, b.INPUT);
b.pinMode(rightBtn, b.INPUT);
b.pinMode(exitBtn, b.INPUT);
b.pinMode(clearBtn, b.INPUT);

// initialize interrupts for buttons
b.attachInterrupt(topBtn, moveUp, b.RISING);
b.attachInterrupt(rightBtn, moveRight, b.RISING);
b.attachInterrupt(downBtn, moveDown, b.RISING);
b.attachInterrupt(leftBtn, moveLeft, b.RISING);
b.attachInterrupt(exitBtn, exitGame, b.RISING);
b.attachInterrupt(clearBtn, clearScreen, b.RISING);

var blank = [0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
			 0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00];
			 
var current = [0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
			   0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00];

wire.writeByte(0x21, function(err) {            // Start oscillator (p10)
    wire.writeByte(0x81, function(err) {        // Disp on, blink off (p11)
        wire.writeByte(0xe7, function(err) {    // Full brightness (page 15)
        	updateScreen();
        });
    });
});

console.log("running");

function updateScreen() {
	current[col] = (current[col] ^ 1*Math.pow(2,row));
	wire.writeBytes(0x00, current, function(err) {
    });
}

// event handler functions 
function moveUp() {
	if (row > 0) {
		row = row - 1;
		updateScreen();
	}
}
function moveRight() {
	if( col > 0){
		col = col - 2;
		updateScreen();
	}
}
function moveDown() {
	if(row < screenHeight){
		row = row + 1;
		updateScreen();
	}
}
function moveLeft() {
	if (col < screenWidth) {
		col = col + 2;
		updateScreen();
	}
}
function exitGame() {
	process.exit(1);
}
function clearScreen(){
 	current = [0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
			 0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00];
    updateScreen();
}