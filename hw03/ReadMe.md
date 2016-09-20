Josh Woods 
ECE 497-01
Homework 3 

Data Sheet for TMP101 is located at http://www.ti.com/product/TMP101/datasheet/detailed_description#SBOS2312655

Etch-A-Scketch.js: 
	this is a program that simulates an Etch-A-Sketch Toy
	wire the following buttons 
	left = P9_11
	down = P9_09
	right = P9_15
	up = P9_14
	clear = P9_41
	exit = P9_12
	cconnect the led matrix to the i2c-c bus 
	run the install.sh file to install needed i2c node package
	run this file to play the etch a sketch

readTmp.js
	this is a program that allows the user to interface with two temperature sensors via i2c-2 bus
	wire the following up 
	two temp101 sensor one with address to vss one with address to ground
	test1 button to P9_13
	test2 button to P9_17
	wire the alert1 pin from sensor 1 to P9_14
	wire the alert2 pin from sensor 2 to P9_18
	when the test1 button is pressed the program will read all the values in the four registers
		of the sensor and then set the high and low limits
	when the test2 button is pressed the program will do the same as test1 but for the 
		second sensor


readTmp101.sh
	this is a shell script that gets the values of two temperature sensors wired the
		same as above and then it converts them to fareheight and prints them to 
		the screen 

==========
Comments from Prof. Mark A. Yoder
Looks good.  It's odd that powering down your TMP101 sensors made them work.

Grade:	10/10