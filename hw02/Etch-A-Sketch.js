#!/usr/bin/env node
// Josh Woods ECE 497
// Homework 2 - Etch-A-Sketch 
// 

// initialize all of the need variables 
var b =  require('bonescript');
var blessed = require('blessed');
var leftBtn = 'P9_11';
var topBtn = 'P9_13';
var rightBtn = 'P9_16';
var downBtn = 'P9_17';
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

// initialize the blessed screen
var screen = blessed.screen({
    smartCSR: true,
    useBCE: true,
    cursor: {
        artifical: true,
        blink: true,
        shape: 'underline'
    },
});

// set the screen title
screen.title = "Etch-A-Sketch";

// get the size of the screen and pass it to according variable 
screenWidth = screen.cols;
screenHeight = screen.rows;

// initialize the data table
var table = blessed.listtable({
	// top: 'top',
	// left: 'left',
	// width: 50,
	// height: 50,
	keys: true
});

// build the initial array and refresh the screen
array = buildArray(screenWidth, screenHeight);
refreshScreen();

// put the first x down on the screen 
array[row][col] = 'X';
refreshScreen();
console.log("running");

// function to build the initial array
function buildArray(width, height){
	var array = [];
	var row = [];
	for (var i = 0; i < height; i++){
		row = [];
		for (var j=0;j<width;j++){
			row.push(' ');
		}
		array.push(row);
	}
	return array;
}

// function to clear the array
function clearArray(){
	for (var i = 0; i < screenHeight; i++){
		for (var j=0;j<screenWidth;j++){
			array[i][j] = ' ';
		}
	}
}

// function to refresh the screen 
function refreshScreen(){
	table.focus();
	table.setData(array);
	screen.append(table);
	screen.render();
}


// event handler functions 
function moveUp() {
	if (row > 0) {
		row = row - 1;
		array[row][col] = 'X';
		refreshScreen();
	}
}
function moveRight() {
	if( col < (screenWidth-1)){
		col = col + 1;
		array[row][col] = 'X';
		refreshScreen();
	}
}
function moveDown() {
	if(row < (screenHeight-1)){
		row = row + 1;
		array[row][col] = 'X';
		refreshScreen();
	}
}
function moveLeft() {
	if (col > 0) {
		col = col - 1;
		array[row][col] = 'X';
		refreshScreen();
	}
}
function exitGame() {
	process.exit(1);
}
function clearScreen(){
	clearArray();
	refreshScreen();
}