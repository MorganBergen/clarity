#  makefile

CC = g++
CFLAGS = -Wall -std=c++11
LIBS = -lcurl

all: my_program

my_program: test.o
	$(CC) $(CFLAGS) -o $@ $^ $(LIBS)

test.o: test.cpp
	$(CC) $(CFLAGS) -c $<

clean:
	rm -f my_program test.o
