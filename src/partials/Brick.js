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

    this.reset();
  } // end of constructor
  // resets position of bricks
  reset() {
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

  // wall collision to detect ceiling and floor
  wallCollision() {
    const hitTop = this.y <= 0;
    const hitBottom = this.y + this.height >= this.boardHeight;

    if (hitTop || hitBottom) {
      this.vy = -this.vy;
    }
  }

  // draw svg
  render(svg) {

    this.y += this.vy;

    this.wallCollision();

    // draw brick
    let rect = document.createElementNS(SVG_NS, 'rect');
    rect.setAttributeNS(null, 'fill', '#ffffff');
    rect.setAttributeNS(null, 'width', this.width);
    rect.setAttributeNS(null, 'height', this.height);
    rect.setAttributeNS(null, 'x', this.x);
    rect.setAttributeNS(null, 'y', this.y);

    svg.appendChild(rect);
  }
}