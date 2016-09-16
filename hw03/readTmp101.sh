#!/bin/bash
# this file is used to get temperature data through the i2c protocol

temp1=`i2cget -y 2 0x48 0`
#
temp2=`i2cget -y 2 0x4a 0` 

tempF1=$(($temp1 *9 /5 +32))
tempF2=$(($temp2 *9 /5 +32))

echo `echo "temp1 = "$tempF1`
echo `echo "temp2 = "$tempF2`