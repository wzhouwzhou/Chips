const CON4 = require('connect-four');

const EMPTY = '⚫', BLUE = '🔵', RED = '🔴';

const ex = {
  name: "con4",
  customperm: ['SEND_MESSAGES'],
  async func(msg, {reply, Discord, args, member }) {

    let board = new Array(6);
    for(let i=0; i< board.length; i++)
      board[i]=new Array(7).fill('⚫');

    board = setC( board ,4,2, 'blue'); board = setC(board,3,3, 'red');

    let view = new Discord.RichEmbed().setColor(member.displayColor);
  }
};

const createBoard = (r,c) => {
  let board;
  if(!r||!c) {
    board = new Array(6);
    for(let i=0; i< board.length; i++)
      board[i]=new Array(7).fill(EMPTY);
  }else{
    board = new Array(c);
    for(let i=0; i< board.length; i++)
      board[i]=new Array(r).fill(EMPTY);
  }
  return board;
};

const setC = (a, r,c, color) => {
  let b = a.reverse();
  color=='red'?b[r-1][c-1]=RED:b[c-1][r-1]=BLUE;
  b = a.reverse();
  return b;
};

boardStr = a => {
  return a.map(r=>r.join('')).join('\n');
};

module.exports = ex;
