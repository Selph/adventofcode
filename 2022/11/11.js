import { syncReadFile } from '../utils/syncReadFile.js'

class Monkey {
    constructor(number, starting, operation, test, ifTrue, ifFalse) { 
        this.items = starting.filter(word => !isNaN(parseInt(word))).map((item) => parseInt(item))
        this.operation = { operator: operation[4], value: parseInt(operation[5]) }
        this.test = parseInt(test[3])
        this.ifTrue = parseInt(ifTrue[5])
        this.ifFalse = parseInt(ifFalse[5])
        this.inspection = 0
    }

    inspect(mod) {
        let throwingList = []
        for (let item of this.items) {
            // Inspect
            this.inspection++

            // Increase worry level
            if (this.operation.operator === '+') { item += this.operation.value; }
            if (this.operation.operator === '*') { item *= isNaN(this.operation.value) ? item : this.operation.value; }

            // Relief: 
            //  Case 1 => Divide by 3
            //  Case 2 => Problem: Number gets too big
            //            Solution: Cycle through lowest common denominator of all dividers by using modulus
            //            Example: Monkey1's divider is 3 and Monkey2's divider is 5. lcd is 3*5=15. if number goes higher than 15, number = number % 15
            item = (mod) ? item % mod : ~~(item / 3)

            // Throw item
            throwingList.push({item: item, monkey: (item % this.test === 0) ? this.ifTrue : this.ifFalse })
        }
        this.items = []
        return throwingList
    }

    catchItem(item) { 
        this.items.push(item)
    }
}

function monkeysInTheMiddle() {
    // Parse input into array: Split by word, remove empty string and empty lines
    let parsedInput = syncReadFile('./11.in').map((line) => line.split(' ').filter(word => word !== '')).filter(line => line.length !== 0)

    // Monkey class. Doesn't work to clone the monkey array so it's initialized twice instead
    let monkeys1 = createMonkeys(parsedInput)
    let monkeys2 = createMonkeys(parsedInput)

    // Lowest Common Demoninator, used to cycle numbers in part two so they don't grow beyond computational limits
    let mod = monkeys1.reduce((acc,curr) => acc * curr.test, 1)

    // Do rounds of inspection
    for (let i = 0; i < 20;    i++) { monkeys1.forEach(monkey => throwItems(monkey.inspect(   ), monkeys1)) } 
    for (let i = 0; i < 10000; i++) { monkeys2.forEach(monkey => throwItems(monkey.inspect(mod), monkeys2)) } 

    // Find the inspection values, sort them, return product of highest 2
    [monkeys1, monkeys2]
        .forEach(list => console.log(list
        .map((item) => { return item.inspection })
        .sort(function (a, b) {  return a - b;  })
        .splice(-2).reduce((a,c) => a*c,1)))
}

function createMonkeys(mRaw) {
    let monkeys = []
    for (let i = 0; i < mRaw.length/6; i++) { monkeys.push(new Monkey(mRaw[i*6+0], mRaw[i*6+1],mRaw[i*6+2], mRaw[i*6+3], mRaw[i*6+4], mRaw[i*6+5])) }
    return monkeys
}

function throwItems(list, monkeys) {
    for (let { monkey, item } of list) {
        monkeys[monkey].catchItem(item)
    }
}

console.time('Execution Time'); 
monkeysInTheMiddle()
console.timeEnd('Execution Time');