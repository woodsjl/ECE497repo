// From : http://stackoverflow.com/questions/13124271/driving-beaglebone-gpio-through-dev-mem
#ifndef _BEAGLEBONE_GPIO_H_
#define _BEAGLEBONE_GPIO_H_

//#define GPIO1_START_ADDR 0x4804C000
#define GPIO0_START_ADDR 0x44e07000
#define GPIO0_END_ADDR 0x44e09000
#define GPIO0_SIZE (GPIO0_END_ADDR - GPIO0_START_ADDR)

#define GPIO1_START_ADDR 0x4804C000
#define GPIO1_END_ADDR 0x4804e000
#define GPIO1_SIZE (GPIO1_END_ADDR - GPIO1_START_ADDR)

#define GPIO_OE 0x134
#define GPIO_DATAIN 0x138
#define GPIO_SETDATAOUT 0x194
#define GPIO_CLEARDATAOUT 0x190

#define M1 (1<<30) // pin 1 motor control P9_11 gpio0_30
#define M2 (1<<31) // pin 2 motor control P9_13 gpio0_31
#define M3 (1<<16) // pin 3 motor control P9_15 gpio1_16
#define M4  (1<<19) // pin 4 motor control P9_16 gpio1_19

#define STARTBTN (1<<3) // start button P9_21 gpio0_3
#endif