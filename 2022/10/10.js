import { syncReadFile } from '../utils/syncReadFile.js'

const instructions = syncReadFile('./10.in').map((line) => line.split(' '))

let x = 1
let t = 0

let signal = 0
let render = new Array(6).fill(0).map(() => new Array(40).fill(0));

function cathodeRayTube() {
    instructions.forEach((instruction) => {
        tick()
        if (instruction[0] === 'addx') { 
            tick(); 
            x += parseInt(instruction[1]) }
    })

    console.log(signal)
    render.forEach((line) => console.log(line.join('')))
}

function tick() {
    // draw before ticking since arrays start at 0
    render[~~(t/40)][t%40] = (Math.abs(x-(t%40)) <= 1) ? '██' : '  '
    t++
    if ([20, 60, 100, 140, 180, 220].includes(t)) signal += t * x 
}

console.time('Execution Time'); 
cathodeRayTube()
console.timeEnd('Execution Time');
