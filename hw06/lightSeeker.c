/* Josh Woods lightSeeker.c for ECE 497
   compile with Makefile */

#include <stdio.h>
#include <stdlib.h>
#include <sys/mman.h>
#include <sys/stat.h>
#include <fcntl.h> 
#include <signal.h>    // Defines signal-handling functions (i.e. trap Ctrl-C)
#include "beaglebone_gpio.h"
#include <unistd.h>

/****************************************************************
 * Global variables
 ****************************************************************/
int notStarted = 1;    // Set to 0 when ctrl-c is pressed
int searchMode = 1;
int trackMode = 0;
int position = 0;

/****************************************************************
 * signal_handler
 ****************************************************************/
void signal_handler(int sig);
void setMotorStage(int num);

// Callback called when SIGINT is sent to the process (Ctrl-C)
void signal_handler(int sig)
{
    printf( "\nCtrl-C pressed, cleaning up and exiting...\n" );
	notStarted = 0;
	searchMode = 0;
	trackMode = 0;
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

    // start mapping GPIO0 register
    gpio_addr0 = mmap(0, GPIO0_SIZE, PROT_READ | PROT_WRITE, MAP_SHARED, fd, GPIO0_START_ADDR);
    gpio_oe_addr0           = gpio_addr0 + GPIO_OE;
    gpio_datain0            = gpio_addr0 + GPIO_DATAIN;
    gpio_setdataout_addr0   = gpio_addr0 + GPIO_SETDATAOUT;
    gpio_cleardataout_addr0 = gpio_addr0 + GPIO_CLEARDATAOUT;
    if(gpio_addr0 == MAP_FAILED) {
        printf("Unable to map GPIO 0\n");
        exit(1);
    }
    
    // start mapping GPIO1 register
    gpio_addr1 = mmap(0, GPIO1_SIZE, PROT_READ | PROT_WRITE, MAP_SHARED, fd, GPIO1_START_ADDR);
    gpio_oe_addr1           = gpio_addr1 + GPIO_OE;
    gpio_datain1            = gpio_addr1 + GPIO_DATAIN;
    gpio_setdataout_addr1   = gpio_addr1 + GPIO_SETDATAOUT;
    gpio_cleardataout_addr1 = gpio_addr1 + GPIO_CLEARDATAOUT;
    if(gpio_addr1 == MAP_FAILED) {
        printf("Unable to map GPIO 0\n");
        exit(1);
    }
    *gpio_cleardataout_addr0 = M1;
    *gpio_cleardataout_addr0 = M2;
    *gpio_cleardataout_addr1 = M3;
    *gpio_cleardataout_addr1 = M4;
    
    // loop until the start button is pressed
    while(notStarted) { 
        notStarted = *gpio_datain0&STARTBTN;
    }
    
    printf("start button has been pressed\n");
    
    while(searchMode) {
        
        position = position % 4;
        printf("searching position %d\n",position);
        if(position == 0) {
            *gpio_cleardataout_addr0 = M1;
            *gpio_cleardataout_addr0 = M2;
            *gpio_setdataout_addr1= M3;
            *gpio_setdataout_addr1= M4;
        } else if (position == 1){
            *gpio_cleardataout_addr0 = M1;
            *gpio_setdataout_addr0 = M2;
            *gpio_setdataout_addr1= M3;
            *gpio_cleardataout_addr1= M4;
        } else if (position == 2){
            *gpio_setdataout_addr0 = M1;
            *gpio_setdataout_addr0 = M2;
            *gpio_cleardataout_addr1= M3;
            *gpio_cleardataout_addr1= M4;
        } else {
            *gpio_setdataout_addr0 = M1;
            *gpio_cleardataout_addr0 = M2;
            *gpio_cleardataout_addr1= M3;
            *gpio_setdataout_addr1= M4;
        } 
        usleep(50000);
        position = position + 1;
    }
    
        
    
    

    // unmap GPIO 0 and 1 registers
    munmap((void *)gpio_addr0, GPIO0_SIZE);
    munmap((void *)gpio_addr1, GPIO1_SIZE);
    close(fd);
    return 0;
}

