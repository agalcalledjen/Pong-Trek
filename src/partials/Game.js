// this is where we will be creating all our classes
// export allows us to use this class in other files
// use import to use const from other files
// import {
//   SVG_NS
// } from '../settings';
import Board from './Board';
import Paddle from './Paddle';
import {
  SVG_NS,
  KEYS
} from '../settings';

export default class Game {

  constructor(element, width, height) {
    // instance variables
    this.element = element;
    this.width = width;
    this.height = height;

    // create a few instance variables
    // we are not passing them through our constructor
    this.paddleWidth = 8;
    this.paddleHeight = 56;
    this.boardGap = 10;

    // create new player(first) from Paddle class
    this.player1 = new Paddle(
      this.height,
      this.paddleWidth,
      this.paddleHeight,
      this.boardGap,
      // this is how we center the y position of the paddle
      ((this.height - this.paddleHeight) / 2),
      KEYS.a,
      KEYS.z
    );
    // to check for the paddle in the console
    // console.log(this.player1);

    // create new player(second) from Paddle class
    this.player2 = new Paddle(
      this.height,
      this.paddleWidth,
      this.paddleHeight,
      // this is how we position it to the far right
      (this.width - this.boardGap - this.paddleWidth),
      // this is how we center the y position of the paddle
      ((this.height - this.paddleHeight) / 2),
      KEYS.up,
      KEYS.down
    );
    // to check for the paddle in the console
    // console.log(this.player2);

    // Other code goes here...
    this.gameElement = document.getElementById(this.element);
    this.board = new Board(this.width, this.height);
  } // end of constructor

  render() {
    // More code goes here...
    // before we append it, we must empty out any html inside the this.element
    this.gameElement.innerHTML = '';
    // let's add svg markup
    let svg = document.createElementNS(SVG_NS, 'svg');
    // use null to not have to pass in a name
    svg.setAttributeNS(null, 'width', this.width);
    svg.setAttributeNS(null, 'height', this.height);
    svg.setAttributeNS(null, 'viewBox', `0 0 ${this.width} ${this.height}`);
    // we want to append it to the game element that we're referencing
    this.gameElement.appendChild(svg);
    this.board.render(svg);
    this.player1.render(svg);
    this.player2.render(svg);
  }

}