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
    this.element = element;
    this.width = width;
    this.height = height;
    this.winGoal = 10;

    // bricks
    this.brickWidth = 8;
    this.brickHeight = 56;
    this.boardGap0 = 100;

    this.brick1 = new Brick(
      this.height,
      this.brickWidth,
      this.brickHeight,
      this.boardGap0,
      ((this.height - this.brickHeight) / 2),
      'brick1'
    );

    this.brick2 = new Brick(
      this.height,
      this.brickWidth,
      this.brickHeight,
      (this.width - this.boardGap0 - this.brickWidth),
      ((this.height - this.brickHeight) / 2),
      'brick2'
    );

    // paddles
    this.paddleWidth = 8;
    this.paddleHeight = 56;
    this.boardGap = 10;

    this.player1 = new Paddle(
      this.height,
      this.paddleWidth,
      this.paddleHeight,
      this.boardGap,
      ((this.height - this.paddleHeight) / 2),
      KEYS.a,
      KEYS.z,
      'player1'
    );

    this.player2 = new Paddle(
      this.height,
      this.paddleWidth,
      this.paddleHeight,
      (this.width - this.boardGap - this.paddleWidth),
      ((this.height - this.paddleHeight) / 2),
      KEYS.up,
      KEYS.down,
      'player2'
    );

    // balls
    this.radius = 8;
    this.boardWidth = (this.boardWidth / 2);
    this.boardHeight = (this.boardHeight / 2);

    // board
    this.gameElement = document.getElementById(this.element);
    this.board = new Board(this.width, this.height);

    this.ball = new Ball(
      this.radius,
      this.width,
      this.height,
    );

    this.ball2 = new Ball(
      this.radius,
      this.width,
      this.height,
    );

    // scores
    this.score1 = new Score(this.width / 2 - 50, 30, 30);
    this.score2 = new Score(this.width / 2 + 40, 30, 30);

    // key listener for spacebar
    document.addEventListener('keydown', event => {
      switch (event.key) {
        case KEYS.spaceBar:
          this.pause = !this.pause;
          break;
      }
    });

    // sounds
    this.bgSound = new Audio('public/sounds/closing-credits.wav');
    this.finish = new Audio('public/sounds/spock-livelong.wav');
  } // end of constructor

  render() {
    // pause
    if (this.pause) {
      return;
    }

    // before we append it, we must empty out any html inside the this.element
    this.gameElement.innerHTML = '';

    // svg 
    let svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttributeNS(null, 'width', this.width);
    svg.setAttributeNS(null, 'height', this.height);
    svg.setAttributeNS(null, 'viewBox', `0 0 ${this.width} ${this.height}`);

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

    // declare winner 
    const pongGame = document.getElementById('game');
    const winner = document.createElement('p');

    if (this.player1.score === this.winGoal) {
      pongGame.appendChild(winner).innerHTML = 'Player 1 wins!';
      this.finish.play();

      setTimeout(function () {
        document.location.reload();
      }, 1400);
    } else if (this.player2.score === this.winGoal) {
      pongGame.appendChild(winner).innerHTML = 'Player 2 wins!';
      this.finish.play();

      setTimeout(function () {
        document.location.reload();
      }, 1400);
    } else {
      pongGame.appendChild(winner).innerHTML = 'Live long and prosper!';
      this.bgSound.play();
    }
  }
}