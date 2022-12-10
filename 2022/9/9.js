import { syncReadFile } from '../utils/syncReadFile.js'

const instructions = syncReadFile('./9.in').map((line) => line.split(' ')).map((line) => {return {direction: line[0], totalMoves: parseInt(line[1])}});

const moves = {
    U: { x:  0, y: -1 },
    D: { x:  0, y:  1 },
    L: { x: -1, y:  0 },
    R: { x:  1, y:  0 }
}

class Pointer {
    constructor(x,y) { this.x = x; this.y = y }
    move(direction)  { this.x += moves[direction].x; this.y += moves[direction].y; }
    follow(pointer) { 
        const chebDist = Math.max(Math.abs(this.x - pointer.x), (Math.abs(this.y - pointer.y)))
        if (chebDist > 1) {
            const directionX = pointer.x - this.x
            const directionY = pointer.y - this.y
            this.x += Math.abs(directionX) === 2 ? directionX / 2 : directionX;
            this.y += Math.abs(directionY) === 2 ? directionY / 2 : directionY;
        }
    }
}

function markVisited(x, y, visited) {
    visited.add(`${x}-${y}`);
  }

function bridge1() {
    const head = new Pointer(0,0)
    const tail = new Pointer(0,0)
    const visited = new Set()
    markVisited(0, 0, visited)

    for (const instruction of instructions) {
        for (let i = 0; i < instruction.totalMoves; i++) {
            head.move(instruction.direction)
            tail.follow(head)
            markVisited(tail.x, tail.y, visited)
        }
    }
    console.log(visited.size)
}

function bridge2() {
    const knots = new Array(10).fill(0).map((_) => new Pointer(0, 0));
    const visited = new Set();
    markVisited(0, 0, visited);
  
    for (const instruction of instructions) {
      for (let i = 0; i < instruction.totalMoves; i++) {
        // Move the head according to the instructions
        knots[0].move(instruction.direction);
        // Move the rest of the rope
        for (let knot = 1; knot < knots.length; knot++) {
          const point = knots[knot];
          point.follow(knots[knot - 1]);
        }
        const tail = knots[knots.length - 1];
        markVisited(tail.x, tail.y, visited);
      }
    }
  
    console.log(visited.size);
  }


console.time('Execution Time'); 
bridge1()
bridge2()
console.timeEnd('Execution Time');
