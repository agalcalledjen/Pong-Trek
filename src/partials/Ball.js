import {
  SVG_NS
} from '../settings';

export default class Ball {
  constructor(radius, boardWidth, boardHeight) {
    this.radius = radius;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.direction = 1;

    this.reset();

    // sounds
    this.ping = new Audio('public/sounds/photon-torpedo.wav');
    this.block = new Audio('public/sounds/computer-06.wav');

  } // end of constructor
  // resets position 
  reset() {
    this.x = this.boardWidth / 2;
    this.y = this.boardHeight / 2;
    this.vy = 0;
    while (this.vy === 0) {
      this.vy = Math.floor(Math.random() * 10 - 5);
    }
    this.vx = this.direction * (6 - Math.abs(this.vy));
  }

  wallCollision() {
    const hitLeft = this.x - this.radius <= 0;
    const hitRight = this.x + this.radius >= this.boardWidth;
    const hitTop = this.y - this.radius <= 0;
    const hitBottom = this.y + this.radius >= this.boardHeight;
    // what would happen if ball hits the wall
    if (hitLeft || hitRight) {
      // this.ax += -1;
      this.vx = -this.vx;
    } else if (hitTop || hitBottom) {
      // this.ay += -1;
      this.vy = -this.vy;
    }
  }

  paddleCollision(player1, player2) {
    if (this.vx > 0) {
      // right paddle
      let paddle = player2.coordinates(player2.x, player2.y, player2.width, player2.height);
      let [leftX, rightX, topY, bottomY] = paddle;

      if (
        (this.x + this.radius >= leftX) &&
        (this.x + this.radius <= rightX) &&
        (this.y >= topY && this.y <= bottomY)
      ) {
        // ball value will flip and speed will increase
        this.vx = -this.vx * 1.5;
        this.ping.play();
      }
    } else {
      // left paddle
      let paddle = player1.coordinates(player1.x, player1.y, player1.width, player1.height);
      let [leftX, rightX, topY, bottomY] = paddle;

      if (
        (this.x - this.radius <= rightX) &&
        (this.x - this.radius >= leftX) &&
        (this.y >= topY && this.y <= bottomY)
      ) {
        this.vx = -this.vx * 1.5;
        this.ping.play();
      }
    }
  }

  brickCollision(brick1, brick2) {
    if (this.vx > 0) {
      // right brick
      let brick = brick2.coordinates(brick2.x, brick2.y, brick2.width, brick2.height);
      let [leftX, rightX, topY, bottomY] = brick;

      if (
        (this.x + this.radius >= leftX) &&
        (this.x + this.radius <= rightX) &&
        (this.y >= topY && this.y <= bottomY)
      ) {
        this.vx = -this.vx;
        this.block.play();
      }
    } else {
      // left brick
      let brick = brick1.coordinates(brick1.x, brick1.y, brick1.width, brick1.height);
      let [leftX, rightX, topY, bottomY] = brick;

      if (
        (this.x - this.radius <= rightX) &&
        (this.x - this.radius >= leftX) &&
        (this.y >= topY && this.y <= bottomY)
      ) {
        this.vx = -this.vx;
        this.block.play();
      }
    }
  }

  goal(player) {
    player.score++;
    // player.height -= 2;
    this.reset();
  }

  // draw ball
  render(svg, player1, player2, brick1, brick2) {
    const rightGoal = this.x + this.radius >= this.boardWidth;
    const leftGoal = this.x - this.radius <= 0;

    if (rightGoal) {
      this.goal(player1);
      this.direction = -1;
    } else if (leftGoal) {
      this.goal(player2);
      this.direction = 1;
    }

    this.x += this.vx;
    this.y += this.vy;

    // run these methods
    this.wallCollision();
    this.paddleCollision(player1, player2);
    this.brickCollision(brick1, brick2);

    // create a ball
    let circle = document.createElementNS(SVG_NS, 'circle');
    circle.setAttributeNS(null, 'r', this.radius);
    circle.setAttributeNS(null, 'fill', '#ffffff');
    circle.setAttributeNS(null, 'cx', this.x);
    circle.setAttributeNS(null, 'cy', this.y);

    let circle1 = document.createElementNS(SVG_NS, 'circle');
    circle1.setAttributeNS(null, 'r', '6');
    circle1.setAttributeNS(null, 'fill', '#ffffff');
    circle1.setAttributeNS(null, 'cx', this.x);
    circle1.setAttributeNS(null, 'cy', this.y);
    circle1.setAttributeNS(null, 'stroke', '#000000');
    circle1.setAttributeNS(null, 'stroke-width', '2');

    svg.appendChild(circle);
    svg.appendChild(circle1);
  }
}