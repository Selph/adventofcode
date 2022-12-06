const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');
    const arr = contents.split(/\r?\n/);
    return arr;
}

function stacking(func = 1) {
    let boxes = prepareBoxes()
    let operations = prepareOperations()
    let movedBoxes = moveBoxes(func, boxes, operations)
    return topOfEach(movedBoxes).slice(1)
}

function prepareBoxes() {
    let rawStacks = syncReadFile('./ogorder.txt')
    let boxes = []; let y;

    // Arranges box data into an array of stacks
    for (s of rawStacks) {
        (!isNaN(Number(s))) ? (y = Number(s), boxes[y] = []) : boxes[y].push(s);
    }
    return boxes
}

function prepareOperations() {
    operations = syncReadFile('./input.txt')
    newOps = [];

    // Arranges operation data into an array of defined operations
    operationsRaw.forEach((operation) => {
        let mapped = operation.match(/\d+/g).map(Number)
        newOps.push({ move: mapped[0], from: mapped[1], to: mapped[2] })
    })
    return newOps
}

function moveBoxes(func, boxes, operations) {
    operations.forEach ((b) => {
        // Problem 1, stack approach, pop and push
        if (func === 1) {
            for (let i = 0; i < b.move; i++) {
                boxes[b.to].push(boxes[b.from].pop())
            }
        }
        // Problem 2, slice
        else {
            let grabbedBoxes = boxes[b.from].slice(-b.move)
            boxes[b.from] = boxes[b.from].slice(0, -b.move)
            boxes[b.to] = [...boxes[b.to], ...grabbedBoxes]
        }
    });
    return boxes
}

function topOfEach(boxes) {
    let tops = '';
    boxes.forEach((box) => tops += box.slice(-1))
    return tops;
}