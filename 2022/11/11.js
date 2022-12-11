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

    operate(int, modBy) {
        let throwingList = []
        for (let item of this.items) {
            let divided = false
            if (this.operation.operator === '+') { item += this.operation.value; }
            if (this.operation.operator === '*') { item *= isNaN(this.operation.value) ? item : this.operation.value; }
            item = (int === 1) ? Math.floor(item / 3) : item % modBy
            if (item % this.test === 0) divided = true 
            throwingList.push({item: item, monkey: divided ? this.ifTrue : this.ifFalse })
            this.inspection++
        }
        this.items = []
        return throwingList
    }

    throwItem(item) { 
        this.items.push(item)
    }
}

function throwItems(list, monkeys) {
    for (let item of list) {
        monkeys[item.monkey].throwItem(item.item)
    }
}

function monkeysInTheMiddle() {
    let monkeys = syncReadFile('./11.in').map((line) => line.split(' ').filter(word => word !== '')).filter(line => line.length !== 0)
    let monkeys2 = [...monkeys]
    monkeys = createMonkeys(monkeys)
    monkeys2 = createMonkeys(monkeys2)
    for (let i = 0; i < 20; i++) {
        for (let monkey of monkeys) {
            throwItems(monkey.operate(1), monkeys)
        }
    }

    // Multiply test numbers together
    let modBy = monkeys2.reduce((acc,curr) => acc * curr.test, 1)
    for (let i = 0; i < 10000; i++) {
        for (let monkey of monkeys2) {
            throwItems(monkey.operate(2, modBy), monkeys2)
        }
    }
    
    for (let list of [monkeys, monkeys2]) {
        let inspections = list.map((item) => { return item.inspection }).sort(function (a, b) {  return a - b;  }).reverse()
        console.log(inspections[0] * inspections[1])
    }
}

function createMonkeys(monkeysRaw) {
    let monkeys = []
    for (let i = 0; i < monkeysRaw.length/6; i++) {
        monkeys.push(new Monkey(monkeysRaw[i*6+0], monkeysRaw[i*6+1], monkeysRaw[i*6+2], monkeysRaw[i*6+3], monkeysRaw[i*6+4], monkeysRaw[i*6+5],))
    }
    return monkeys
}

console.time('Execution Time'); 
monkeysInTheMiddle()
console.timeEnd('Execution Time');