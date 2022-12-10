import { syncReadFile } from '../utils/syncReadFile.js'

// Ugliest code in the known univese 

function treeHouse() {
   let treeGrid = prepareGrid()
   markVisible(treeGrid)
   let visibleTrees = calculateVisible(treeGrid)
   let scenicScore = getBestScenicScore(treeGrid)
   return 'Visible Trees: ' + visibleTrees + '\nBest scenic score: ' + scenicScore
}

function prepareGrid() {
    let treesRaw = syncReadFile('./input.txt')
    let treeGrid = []
    for (let trees of treesRaw) {
        treeGrid.push(trees.split(''))
    }
    for (let i = 0; i < treeGrid.length; i++) {
        for (let y = 0; y < treeGrid[i].length; y++) {
            treeGrid[i][y] = { height: treeGrid[i][y], l: false, r: false, t: false, b: false }
        }
    }
    return treeGrid
}

function markVisible(forest) {
    forest = markFromLeft(forest)
    forest = markFromRight(forest)
    forest = markFromTop(forest)
    forest = markFromBottom(forest)
    return forest
}

function markFromLeft(forest) {
    let highest;
    for (let i = 0; i < forest.length; i++) {
        highest = -1
        for (let y = 0; y < forest[i].length; y++) {
            if (forest[i][y].height > highest) {
                highest = forest[i][y].height
                forest[i][y]['l'] = true
            }
        }
    }
    return forest
}

function markFromRight(forest) {
    let highest;
    for (let i = 0; i < forest.length; i++) {
        highest = -1
        for (let y = forest[i].length-1; y > 0; y--) {
            if (forest[i][y].height > highest) {
                highest = forest[i][y].height
                forest[i][y]['r'] = true
            }
        }
    }
    return forest
}

function markFromTop(forest) {
    let highest;
    for (let i = 0; i < forest.length; i++) {
        highest = -1
        for (let y = 0; y < forest[i].length; y++) {
            if (forest[y][i].height > highest) {
                forest[y][i]['t'] = true
                highest = forest[y][i].height
            }
        }
    }
    return forest
}

function markFromBottom(forest) {
    let highest;
    for (let i = 0; i < forest.length; i++) {
        highest = -1
        for (let y = forest.length-1; y > 0; y--) {
            if (forest[y][i].height > highest) {
                forest[y][i]['b'] = true
                highest = forest[y][i].height
            }
        }
    }
    return forest
}

function calculateVisible(forest) {
    let sum = 0
    for (let treeLine of forest) {
        for (let tree of treeLine) {
            if (tree.l || tree.r || tree.t || tree.b ) sum++
        }
    }
    return sum
}

function getBestScenicScore(forest) {
    let scenicScore = 0
    let leftarr = []
    for (let i = 0; i < forest.length; i++) {
        for (let y = 0; y < forest[i].length; y++) {
            let left =   getLeft(forest, i, y)
            leftarr.push(left)
            let right =  getRight(forest, i, y)
            let top =    getTop(forest, i, y)
            let bottom = getBottom(forest, i, y)
            if (left * right * top * bottom > scenicScore) scenicScore = left * right * top * bottom
        }
        console.log(leftarr)
        let innertree = []
        forest[i].forEach((tree) => innertree.push(tree.height))
        console.log(innertree)
        
    }
    return scenicScore
}

function getLeft(forest, vertical, horizontal) {
    if (horizontal === 0) return 1
    let score = 0
    let x = horizontal
    while (x - 1 > -1) {
        score++
        x = x - 1
        if (forest[vertical][x].height >= forest[vertical][horizontal].height) { break; }
    }
    return score
}

function getRight(forest, vertical, horizontal) {
    if (horizontal === forest.length-1) return 1
    let score = 0
    let x = horizontal
    while (x + 1 < forest.length) {
        score++
        x = x + 1
        if (forest[vertical][x].height >= forest[vertical][horizontal].height) { break; }
    }
    return score
}

function getTop(forest, vertical, horizontal) {
    if (vertical === 0) return 1
    let score = 0
    let x = vertical
    while (x - 1 > -1) {
        score++
        x = x - 1
        if (forest[x][horizontal].height >= forest[vertical][horizontal].height) { break; }
    }
    return score
}

function getBottom(forest, vertical, horizontal) {
    if (vertical === forest.length-1) return 1
    let score = 0
    let x = vertical
    while (x + 1 < forest.length) {
        score++
        x = x + 1
        if (forest[x][horizontal].height >= forest[vertical][horizontal].height) { break; }
    }
    return score
}


console.time('Execution Time'); 
console.log(process.argv.length > 2 ? treeHouse(process.argv[2]) : treeHouse())
console.timeEnd('Execution Time');
