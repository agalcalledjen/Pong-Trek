import {
  SVG_NS
} from '../settings';

export default class Brick {
  constructor(boardHeight, width, height, x, y) {
    this.boardHeight = boardHeight;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speed = 10;
    this.score = 0;

    this.reset();
  } // end of constructor
  // create reset
  reset() {
    // this.x = this.boardWidth / 4;
    this.y = this.boardHeight / 2;

    // vectors
    this.vy = 0;
    while (this.vy === 0) {
      this.vy = Math.floor(Math.random() * 10 - 5);
    }
  }

  // helper to find coordinates
  coordinates(x, y, width, height) {
    let leftX = x;
    let rightX = x + width;
    let topY = y;
    let bottomY = y + height;
    return [leftX, rightX, topY, bottomY];
  }

  // create wall collision to detect ceiling and floor
  wallCollision() {
    // const hitLeft = this.x - this.radius <= 0;
    // const hitRight = this.x + this.radius >= this.boardWidth;
    const hitTop = this.y <= 0;
    const hitBottom = this.y + this.height >= this.boardHeight;

    if (hitTop || hitBottom) {
      // this.ay += -1;
      this.vy = -this.vy;
    }
  }

  // draw svg
  render(svg) {

    this.y += this.vy;

    // run wallCollision method
    this.wallCollision();

    // create a brick
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