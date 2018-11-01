// import SVG_NS 
import {
  SVG_NS
} from '../settings';

// this is where we are creating the board itself
export default class Board {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
  render(svg) {
    // create a board
    let rect = document.createElementNS(SVG_NS, 'rect');
    rect.setAttributeNS(null, 'fill', '#353535');
    rect.setAttributeNS(null, 'width', this.width);
    rect.setAttributeNS(null, 'height', this.height);

    // create a line with hard coding - giving the value within those lines
    let line = document.createElementNS(SVG_NS, 'line');
    // we need to put the line in the middle of the board so we will need to put this.width with some math
    line.setAttributeNS(null, 'x1', (this.width / 2));
    // set top left to 0
    line.setAttributeNS(null, 'y1', 0);
    // set 
    line.setAttributeNS(null, 'x2', (this.width / 2));
    // think of it as vertical axis so think of it as the height
    line.setAttributeNS(null, 'y2', this.height);
    // create stroke itself
    line.setAttributeNS(null, 'stroke', '#ffffff');
    // create stroke width
    line.setAttributeNS(null, 'stroke-width', '4');
    // make the line dashed, length of dash, length of dash
    line.setAttributeNS(null, 'stroke-dasharray', '20, 15');

    svg.appendChild(rect);
    svg.appendChild(line);
  }
}