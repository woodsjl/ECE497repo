// Josh Woods hw07 for ECE 497
// Read P9_28 and write it to P9_27 using mmap to test timing

#include <stdio.h>
#include <stdlib.h>
#include <sys/mman.h>
#include <sys/stat.h>
#include <fcntl.h> 
#include <signal.h>    // Defines signal-handling functions (i.e. trap Ctrl-C)
//#include "beaglebone_gpio.h"

#define GPIO3_START_ADDR 0x481AE000
#define GPIO_SIZE 0X2000
#define GPIO_OE 0x134
#define GPIO_DATAIN 0x138
#define GPIO_SETDATAOUT 0x194
#define GPIO_CLEARDATAOUT 0x190

#define OUTPUT (1<<19) //P9_27 - 'gpio3_19'
#define INPUT (1<<17) //P9_28 - 'gpio3_17'

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
    volatile void *gpio_addr3;
    volatile unsigned int *gpio_oe_addr3;
    volatile unsigned int *gpio_datain3;
    volatile unsigned int *gpio_setdataout_addr3;
    volatile unsigned int *gpio_cleardataout_addr3;
    
    // unsigned int reg;
    int fd = open("/dev/mem", O_RDWR);

    // start mapping GPIO3 register
    gpio_addr3 = mmap(0, GPIO_SIZE, PROT_READ | PROT_WRITE, MAP_SHARED, fd, GPIO3_START_ADDR);
    gpio_oe_addr3           = gpio_addr3 + GPIO_OE;
    gpio_datain3            = gpio_addr3 + GPIO_DATAIN;
    gpio_setdataout_addr3   = gpio_addr3 + GPIO_SETDATAOUT;
    gpio_cleardataout_addr3 = gpio_addr3 + GPIO_CLEARDATAOUT;
    if(gpio_addr3 == MAP_FAILED) {
        printf("Unable to map GPIO 3\n");
        exit(1);
    }
    
    
    while(keepgoing) {
    	if(*gpio_datain3 & INPUT) {
    	    *gpio_setdataout_addr3= OUTPUT;
    	} else {
            *gpio_cleardataout_addr3 = OUTPUT;
    	}
    }

    // unmap GPIO 0 and 1 registers
    munmap((void *)gpio_addr3, GPIO_SIZE);
    close(fd);
    return 0;
}
