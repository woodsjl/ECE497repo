/* Josh Woods Etch-a-Sketch program for ECE 497 
   compile with gcc Etch-A-Sketch.c -lncurses */
#include <stdio.h>
#include <unistd.h>
#include <stdlib.h>
#include <ncurses.h>

int main(int argc, char **argv) {

  int ch = 's',row = 4, col = 0,maxrow = 20,maxcol = 20;
  initscr();			/* Start curses mode 		*/
  getmaxyx(stdscr,maxrow,maxcol); /* get the maximum row and col available in the screen */
  raw();				/* Line buffering disabled	*/
  keypad(stdscr, TRUE);		/* We get F1, F2 etc..		*/
  noecho();			/* Don't echo() while we do getch */
  printw("Use the arrow keys to move the cursor\nc to clear the board\ne to exit\n");
  printw("max row is %d and max col is %d",maxrow,maxcol);
  while (ch != 'e') {
    mvprintw(row,col,"X"); /* print an x to the window */
    ch = getch();	
    /* the following lines move the cursor if in the window and prevent it if trying to leave the bounds of the window */
    if(ch == KEY_LEFT && col > 0) {col = col - 1;}
    else if (ch == KEY_UP && row > 4) { row = row - 1;}
    else if (ch == KEY_RIGHT && col < (maxcol-1)) {col = col + 1;}
    else if (ch == KEY_DOWN && row < (maxrow-1)) {row = row + 1;}
    else if (ch == 'c') {
      clear(); /* clears the screen */
      printw("Use the arrow keys to move the cursor\nc to clear the board\ne to exit\n");
      printw("max row is %d and max col is %d",maxrow,maxcol);}
    refresh();			/* Print it on to the real screen */
  }
  endwin();			/* End curses mode		  */
  return 0;
}
