# Project 3 - Pong Game

A basic pong game using SVGs.


This is a project produced from the following lessons from Week 5:

1. Advanced JavaScript
2. Intro to ES.next
3. Developing with ES.next and Webpack
4. Object Oriented Programming in JS
    - OOP with ES.next
    - Building a Pong Game 

---

![Image of Pong Trek](https://github.com/nejmal/project-03/blob/master/pong-trek.png)

## Setup

**Install dependencies:**

`> npm i`

**Run locally with Webpack Dev Server:**

`> npm start`

**Build for production:**

`> npm run build`

## Keys

**Player 1:**
* a: up
* z: down

**Player 2:**
* ▲: up
* ▼: down

---

## Technologies Used
- HTML
- CSS
- JavaScript
- Git
- GitHub
- Terminal
  - Homebrew
- Node.js
  - npm
  - Webpack
- SVG
---

## Personal Learnings
Below are the subsequent learning outcomes.

### Comparison Operators
- == (loose)
- === (strict, checks for typeOf)

### Switch Statement
```js
switch(expression) {
  case x:
    code block
    break;
  case y:
    code block
    break;
  default:
    code block
}
```

### Arrow Function
- Shorter syntax for function expressions and they are not hoisted. 
```js
const x = (x, y) => { return x * y };
```