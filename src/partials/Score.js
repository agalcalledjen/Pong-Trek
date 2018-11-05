import {
  SVG_NS
} from '../settings';

export default class Score {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
  } // end of constructor
  render(svg, score) {
    // draw score
    let text = document.createElementNS(SVG_NS, 'text');

    text.setAttributeNS(null, 'x', this.x);
    text.setAttributeNS(null, 'y', this.y);
    text.setAttributeNS(null, 'font-family', '"Roddenberry", sans-serif');
    text.setAttributeNS(null, 'font-size', this.size);
    text.setAttributeNS(null, 'fill', 'white');
    text.textContent = score;

    svg.appendChild(text);
  }
}