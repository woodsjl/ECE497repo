// From : http://stackoverflow.com/questions/13124271/driving-beaglebone-gpio-through-dev-mem
//
// Read one gpio pin and write it out to another using mmap.
// Be sure to set -O3 when compiling.
// Modified by Mark A. Yoder  26-Sept-2013
#include <stdio.h>
#include <stdlib.h>
#include <sys/mman.h>
#include <sys/stat.h>
#include <fcntl.h> 
#include <signal.h>    // Defines signal-handling functions (i.e. trap Ctrl-C)
#include "beaglebone_gpio.h"

/****************************************************************
 * Global variables
 ****************************************************************/
int keepgoing = 1;    // Set to 0 when ctrl-c is pressed

/****************************************************************
 * signal_handler
 ****************************************************************/
void signal_handler(int sig);
// Callback called when SIGINT is sent to the process (Ctrl-C)
void signal_handler(int sig)
{
    printf( "\nCtrl-C pressed, cleaning up and exiting...\n" );
	keepgoing = 0;
}

int main(int argc, char *argv[]) {
    volatile void *gpio_addr0;
    volatile unsigned int *gpio_oe_addr0;
    volatile unsigned int *gpio_datain0;
    volatile unsigned int *gpio_setdataout_addr0;
    volatile unsigned int *gpio_cleardataout_addr0;
    volatile void *gpio_addr1;
    volatile unsigned int *gpio_oe_addr1;
    volatile unsigned int *gpio_datain1;
    volatile unsigned int *gpio_setdataout_addr1;
    volatile unsigned int *gpio_cleardataout_addr1;
    unsigned int reg;

    // Set the signal callback for Ctrl-C
    signal(SIGINT, signal_handler);

    int fd = open("/dev/mem", O_RDWR);

    printf("Mapping %X - %X (size: %X)\n", GPIO0_START_ADDR, GPIO0_END_ADDR, 
                                           GPIO0_SIZE);

    gpio_addr0 = mmap(0, GPIO0_SIZE, PROT_READ | PROT_WRITE, MAP_SHARED, fd, 
                        GPIO0_START_ADDR);

    gpio_oe_addr0           = gpio_addr0 + GPIO_OE;
    gpio_datain0            = gpio_addr0 + GPIO_DATAIN;
    gpio_setdataout_addr0   = gpio_addr0 + GPIO_SETDATAOUT;
    gpio_cleardataout_addr0 = gpio_addr0 + GPIO_CLEARDATAOUT;

    if(gpio_addr0 == MAP_FAILED) {
        printf("Unable to map GPIO 0\n");
        exit(1);
    }
    
    gpio_addr1 = mmap(0, GPIO1_SIZE, PROT_READ | PROT_WRITE, MAP_SHARED, fd, 
                        GPIO1_START_ADDR);

    gpio_oe_addr1           = gpio_addr1 + GPIO_OE;
    gpio_datain1            = gpio_addr1 + GPIO_DATAIN;
    gpio_setdataout_addr1   = gpio_addr1 + GPIO_SETDATAOUT;
    gpio_cleardataout_addr1 = gpio_addr1 + GPIO_CLEARDATAOUT;

    if(gpio_addr1 == MAP_FAILED) {
        printf("Unable to map GPIO 0\n");
        exit(1);
    }
    
    printf("GPIO 0 mapped to %p\n", gpio_addr0);
    printf("GPIO 0 OE mapped to %p\n", gpio_oe_addr0);
    printf("GPIO 0 SETDATAOUTADDR mapped to %p\n", gpio_setdataout_addr0);
    printf("GPIO 0 CLEARDATAOUT mapped to %p\n", gpio_cleardataout_addr0);
    
    printf("GPIO 1 mapped to %p\n", gpio_addr1);
    printf("GPIO 1 OE mapped to %p\n", gpio_oe_addr1);
    printf("GPIO 1 SETDATAOUTADDR mapped to %p\n", gpio_setdataout_addr1);
    printf("GPIO 1 CLEARDATAOUT mapped to %p\n", gpio_cleardataout_addr1);

    // printf("Start copying GPIO_07 to GPIO_03\n");
    while(keepgoing) {
    	if(*gpio_datain0 & LEFTBTN) {
            // *gpio_setdataout_addr1= USR2;
            *gpio_cleardataout_addr1 = USR2;
            printf("at 1");
    	} else {
            // *gpio_cleardataout_addr1 = USR2;
            *gpio_setdataout_addr1= USR2;
            printf("at 2");
    	}
    	if(*gpio_datain0 & BOTTOMBTN) {
            *gpio_setdataout_addr1= USR3;
            *gpio_cleardataout_addr1 = USR3;
            printf("at 3");
    	} else {
            *gpio_cleardataout_addr1 = USR3;
            *gpio_setdataout_addr1= USR3;
            printf("at 4");
    	}
        //usleep(1);
        
    }

    munmap((void *)gpio_addr0, GPIO0_SIZE);
    munmap((void *)gpio_addr1, GPIO1_SIZE);
    close(fd);
    return 0;
}
