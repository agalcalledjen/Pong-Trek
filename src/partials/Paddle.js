import {
  SVG_NS
} from '../settings';

export default class Paddle {
  constructor(boardHeight, width, height, x, y, up, down, player) {
    this.boardHeight = boardHeight;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speed = 10;
    this.score = 0;

    this.keyUp = up;
    this.keyDown = down;

    this.player = player;
    // keeping track of keys pressed
    this.keyState = {};

    document.addEventListener('keydown', event => {
      this.keyState[event.key || event.which] = true;
    }, true);

    document.addEventListener('keyup', event => {
      this.keyState[event.key || event.which] = false;
    }, false);
  } // end of constructor

  up() {
    this.y = Math.max(0, [this.y - this.speed]);
  }

  down() {
    this.y = Math.min([this.boardHeight - this.height], [this.y + this.speed]);
  }

  // helper to find coordinates
  coordinates(x, y, width, height) {
    let leftX = x;
    let rightX = x + width;
    let topY = y;
    let bottomY = y + height;
    return [leftX, rightX, topY, bottomY];
  }

  render(svg) {
    if (this.keyState[this.keyUp] && this.player === 'player1') {
      this.up();
    }
    if (this.keyState[this.keyDown] && this.player === 'player1') {
      this.down();
    }
    if (this.keyState[this.keyUp] && this.player === 'player2') {
      this.up();
    }
    if (this.keyState[this.keyDown] && this.player === 'player2') {
      this.down();
    }

    // draw paddle
    let rect = document.createElementNS(SVG_NS, 'rect');
    rect.setAttributeNS(null, 'fill', '#ffffff');
    rect.setAttributeNS(null, 'width', this.width);
    rect.setAttributeNS(null, 'height', this.height);
    rect.setAttributeNS(null, 'x', this.x);
    rect.setAttributeNS(null, 'y', this.y);
    rect.setAttributeNS(null, 'rx', 5);
    rect.setAttributeNS(null, 'ry', 5);

    svg.appendChild(rect);
  }
}