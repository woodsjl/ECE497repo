TOOLS_CFLAGS	:= -Wstrict-prototypes -Wshadow -Wpointer-arith -Wcast-qual \
		   -Wcast-align -Wwrite-strings -Wnested-externs -Winline \
		   -W -Wundef -Wmissing-prototypes
CFLAGS  :=  -g
#
# Programs
#
all:	lightSeeker

lightSeeker: lightSeeker.c beaglebone_gpio.h
	$(CC) $(CFLAGS) $(LDFLAGS) -o $@ $<


#
# Objects
#

%.o: %.c
	$(CC) $(CFLAGS) $(TOOLS_CFLAGS) -c $< -o $@

clean:
	rm *.o lightSeeker

print:
	@echo LDFLAGS = $(LDFLAGS)
