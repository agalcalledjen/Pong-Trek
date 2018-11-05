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
import Ball from './Ball';
import Score from './Score';
import Brick from './Brick';

export default class Game {

  constructor(element, width, height) {
    // instance variables
    this.element = element;
    this.width = width;
    this.height = height;
    this.winGoal = 3;

    // create a few instance variables  

    // create bricks
    this.brickWidth = 8;
    this.brickHeight = 56;
    this.boardGap0 = 30;

    this.brick1 = new Brick(
      this.height,
      this.brickWidth,
      this.brickHeight,
      this.boardGap0,
      // this is how we center the y position of the paddle
      ((this.height - this.brickHeight) / 2),
      'brick1'
    );

    this.brick2 = new Brick(
      this.height,
      this.brickWidth,
      this.brickHeight,
      (this.width - this.boardGap0 - this.brickWidth),
      // this is how we center the y position of the paddle
      ((this.height - this.brickHeight) / 2),
      'brick2'
    );

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
      KEYS.z,
      'player1'
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
      KEYS.up, // must use KEYS to access those in settings.js
      KEYS.down,
      'player2'
    );
    // to check for the paddle in the console
    // console.log(this.player2);

    // ball
    this.radius = 8;
    this.boardWidth = (this.boardWidth / 2);
    this.boardHeight = (this.boardHeight / 2);

    // Other code goes here...
    this.gameElement = document.getElementById(this.element);
    this.board = new Board(this.width, this.height);

    // create new ball from ball class
    this.ball = new Ball(
      this.radius,
      // board width
      this.width,
      // board height
      this.height,
    );

    // create second ball from ball class
    this.ball2 = new Ball(
      this.radius,
      this.width,
      this.height,
    );

    // to create score instance variables
    this.score1 = new Score(this.width / 2 - 50, 30, 30);
    this.score2 = new Score(this.width / 2 + 28, 30, 30);

    // add key listener for spacebar
    // add an instance variable called this.pause
    // use the variable to change the value either true or false
    document.addEventListener('keydown', event => {
      switch (event.key) {
        case KEYS.spaceBar:
          this.pause = !this.pause; // flips value of true to false and vice versa
          break;
      }
    });

    // add bg sound
    this.bgSound = new Audio('public/sounds/closing-credits.wav');

    // add finish sound
    this.finish = new Audio('public/sounds/spock-livelong.wav');
  } // end of constructor

  render() {
    // More code goes here...
    // add pause here
    if (this.pause) {
      return;
    }

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
    this.brick1.render(svg);
    this.brick2.render(svg);
    this.ball.render(svg, this.player1, this.player2, this.brick1, this.brick2);
    this.ball2.render(svg, this.player1, this.player2, this.brick1, this.brick2);
    this.score1.render(svg, this.player1.score);
    this.score2.render(svg, this.player2.score);

    // create winner text
    const pongGame = document.getElementById('game');
    const winner = document.createElement('p');

    if (this.player1.score === this.winGoal) {
      pongGame.appendChild(winner).innerHTML = 'Player 1 wins!';
      this.finish.play();
      // this.ball.stop();
      // this.ball2.stop();

      setTimeout(function () {
        document.location.reload();
      }, 1400);
    } else if (this.player2.score === this.winGoal) {
      pongGame.appendChild(winner).innerHTML = 'Player 2 wins!';
      this.finish.play();
      // this.ball.stop();
      // this.ball2.stop();

      setTimeout(function () {
        document.location.reload();
      }, 1400);
    } else {
      pongGame.appendChild(winner).innerHTML = 'Live long and prosper!';
      this.bgSound.play();
    }
  }
}