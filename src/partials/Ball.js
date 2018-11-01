import {
  SVG_NS
} from '../settings';

export default class Ball {
  constructor(radius, boardWidth, boardHeight) {
    this.radius = radius;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.direction = 1;
  } // end of constructor

  // reset() {
  //   this.x = this.boardWidth / 2;
  //   this.y = this.boardHeight / 2;
  // }

  // create a ball
  render(svg) {
    // 'circle' has to be the actual svg name element not the name we create 
    let circle = document.createElementNS(SVG_NS, 'circle');
    circle.setAttributeNS(null, 'r', this.radius);
    circle.setAttributeNS(null, 'fill', '#ffffff');
    // x of the centre point
    circle.setAttributeNS(null, 'cx', this.boardWidth / 2);
    // y of the centre point
    circle.setAttributeNS(null, 'cy', this.boardHeight / 2);

    svg.appendChild(circle);
  }
}