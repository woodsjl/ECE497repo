#!/usr/bin/env node
// Josh Woods ECE 497
// Homework 3 - Etch-A-Sketch 
// 

// initialize all of the need variables 
var i2c = require('i2c');
var port = '/dev/i2c-2';
var matrix = 0x70;
var time = 1000; // Delay between images in ms
var wire = new i2c(0x70, {
    device: '/dev/i2c-2'
});
var b =  require('bonescript');
// var blessed = require('blessed');
var leftBtn = 'P9_13';
var topBtn = 'P9_16';
var rightBtn = 'P9_17';
var downBtn = 'P9_11';
var exitBtn = 'P9_12';
var clearBtn = 'P9_41';
var screenWidth = 0;
var screenHeight = 0;
var row = 0;
var col = 0;

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

// some interesting patterns

// The first byte is GREEN, the second is RED.
var smile = [0x00, 0x3c, 0x00, 0x42, 0x28, 0x89, 0x04, 0x85,
    0x04, 0x85, 0x28, 0x89, 0x00, 0x42, 0x00, 0x3c
];

// var smile = [0x3c, 0x00, 0x42,0x00,0x89,0x28,0x85,0x04,0x85,0x04,0x89,0x28,0x42,0x00,0x3c,0x00];
var frown = [0x3c, 0x00, 0x42, 0x00, 0x85, 0x20, 0x89, 0x00,
    0x89, 0x00, 0x85, 0x20, 0x42, 0x00, 0x3c, 0x00
];
var neutral = [0x3c, 0x3c, 0x42, 0x42, 0xa9, 0xa9, 0x89, 0x89,
    0x89, 0x89, 0xa9, 0xa9, 0x42, 0x42, 0x3c, 0x3c
];

function doFrown() {
    wire.writeBytes(0x00, frown, function(err) {
    });
    console.log("frown");
}

function doNeutral() {
    wire.writeBytes(0x00, neutral, function(err) {
    });
    console.log("nuetral");
}

function doSmile() {
    wire.writeBytes(0x00, smile, function(err) {
    });
    console.log("smile");
}

// // initialize the blessed screen
// var screen = blessed.screen({
//     smartCSR: true,
//     useBCE: true,
//     cursor: {
//         artifical: true,
//         blink: true,
//         shape: 'underline'
//     },
// });

// set the screen title
// screen.title = "Etch-A-Sketch";

// // get the size of the screen and pass it to according variable 
// screenWidth = screen.cols;
// screenHeight = screen.rows;

// initialize the data table
// var table = blessed.listtable({
// 	// top: 'top',
// 	// left: 'left',
// 	// width: 50,
// 	// height: 50,
// 	keys: true
// });

// // build the initial array and refresh the screen
// array = buildArray(screenWidth, screenHeight);
// refreshScreen();

// // put the first x down on the screen 
// array[row][col] = 'X';
// refreshScreen();
console.log("running");

// // function to build the initial array
// function buildArray(width, height){
// 	var array = [];
// 	var row = [];
// 	for (var i = 0; i < height; i++){
// 		row = [];
// 		for (var j=0;j<width;j++){
// 			row.push(' ');
// 		}
// 		array.push(row);
// 	}
// 	return array;
// }

// function to clear the array
// function clearArray(){
// 	for (var i = 0; i < screenHeight; i++){
// 		for (var j=0;j<screenWidth;j++){
// 			array[i][j] = ' ';
// 		}
// 	}
// }

// // function to refresh the screen 
// function refreshScreen(){
// 	table.focus();
// 	table.setData(array);
// 	screen.append(table);
// 	screen.render();
// }


// event handler functions 
function moveUp() {
	doFrown();
	// if (row > 0) {
	// 	row = row - 1;
	// 	array[row][col] = 'X';
	// 	refreshScreen();
	// }
}
function moveRight() {
	doNeutral();
	// if( col < (screenWidth-1)){
	// 	col = col + 1;
	// 	array[row][col] = 'X';
	// 	refreshScreen();
	// }
}
function moveDown() {
	doSmile();
	// if(row < (screenHeight-1)){
	// 	row = row + 1;
	// 	array[row][col] = 'X';
	// 	refreshScreen();
	// }
}
function moveLeft() {
	// if (col > 0) {
	// 	col = col - 1;
	// 	array[row][col] = 'X';
	// 	refreshScreen();
	// }
}
function exitGame() {
	process.exit(1);
}
function clearScreen(){
	// clearArray();
	// refreshScreen();
}