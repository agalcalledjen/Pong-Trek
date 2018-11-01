import {
  SVG_NS
} from '../settings';

export default class Paddle {
  constructor(boardHeight, width, height, x, y) {
    this.boardHeight = boardHeight;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speed = 10;
    this.score = 0;
  }
  //...
  // have to pass svg through render(svg) in order to have access to it and use it in svg.appendChild();
  render(svg) {
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