// this is where we will be creating all our classes
// export allows us to use this class in other files
// use import to use const from other files
import {
  SVG_NS
} from '../settings';
import Board from './Board.js';

export default class Game {

  constructor(element, width, height) {
    // instance variables
    this.element = element;
    this.width = width;
    this.height = height;

    // Other code goes here...
    this.gameElement = document.getElementById(this.element);
    this.board = new Board(this.width, this.height);
  }

  render() {
    // More code goes here...
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
  }

}