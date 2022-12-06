const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    console.log(arr); // 👉️ ['One', 'Two', 'Three', 'Four']

    return arr;
}

function rugsack() {
    let rugsackInput = syncReadFile('./rugsack.txt')
    let priorityList = syncReadFile('./priority.txt')
    
    prioritySum = 0;
    for (let input of rugsackInput) {
        console.log("\n" + input)
        prioritySum += findPriority(input, priorityList)
    } 
    
    return prioritySum;
}

function findPriority(instance, prios) {
    let firstHalf = instance.slice(0, instance.length/2)
    let secondHalf = instance.slice(instance.length/2, instance.length)
    let shared = ""
    for (let i = 0; i < instance.length/2; i++) {
        if (secondHalf.includes(firstHalf[i])) {
            shared = firstHalf[i];
            break;
        }
    }
    return prios.indexOf(shared) + 1
}