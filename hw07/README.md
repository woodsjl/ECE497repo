Josh Woods 
ECE 497-01
Homework  7

In this directory are 3 other directories and one javascript file all listed below.
Everything in this directory is used to run test to compare the input to output speed of 
four different methods of rewriting an input to an output. These methods are javascript,
c using memory mapping, a kernel module, and the PRU of the beagle bone black.In order to run
these test wire a function generator with a square wave to pin P9_28 and connect an oscilloscope 
to to P9_28 and P9_27 then measure the offset 

JSbitCopy.js run this program to test javascipt response time

mmap: this directory contains the necessary files to run the test for memory map using c
    run the make file then execute the created executable
    
kernel: this directory contains the necessary files to create the kernel module
    run the make file then run the insmod command to insert the kernel module 
    after test is complete run rmmod command to remove the kernel module
    
PRU: this directory contains the necessary file to create the code to run on the 
    pru run source setup.sh followed by make and make install to put the code on 
    the pru and then run the test
    
ScopeImg.png: this is a screen shot of the scope during the javascript test

results.odt: this is a table of the results

==========
Prof. Yoder's comments
Min and Max times weren't reported, otherwise it looks good.

Grade:  9/10
