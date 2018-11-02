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

    // when key is pressed down, it will be true
    document.addEventListener('keydown', event => {
      this.keyState[event.key || event.which] = true;
    }, true);

    // when key is up, it will be false
    document.addEventListener('keyup', event => {
      this.keyState[event.key || event.which] = false;
    }, false);

    // add key listener
    // document.addEventListener('keydown', event => {
    //   switch (event.key) {
    //     case up:
    //       this.up();
    //       break;
    //     case down:
    //       this.down();
    //       break;
    //   }
    // });
  } // end of constructor
  //...

  // create up method
  up() {
    // console.log('up');
    this.y = Math.max(0, [this.y - this.speed]);
  }

  // create down method
  down() {
    // console.log('down');
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

  // have to pass svg through render(svg) in order to have access to it and use it in svg.appendChild();
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

    // create a paddle
    // alright to use rect again since it is scoped to this class and is contained within render method, it is not global
    let rect = document.createElementNS(SVG_NS, 'rect');
    rect.setAttributeNS(null, 'fill', '#ffffff');
    rect.setAttributeNS(null, 'width', this.width);
    rect.setAttributeNS(null, 'height', this.height);
    // x of the top left corner
    rect.setAttributeNS(null, 'x', this.x);
    // y of the top left corner
    rect.setAttributeNS(null, 'y', this.y);

    svg.appendChild(rect);
  }
}