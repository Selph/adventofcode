const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    console.log(arr); // 👉️ ['One', 'Two', 'Three', 'Four']

    return arr;
}

function sections2() {
    let sectionList = syncReadFile('./input.txt')

    const start = Date.now()
    let containNumber = 0;
    for (let section of sectionList) {
        containNumber += inspectSections2(section)
    }
    const end = Date.now()
    console.log(`Execution time: ${end - start} ms`)
    return containNumber;
}

function inspectSections2(section) {
    let sectionPair = section.split(",")
    let firstElf = sectionPair[0].split("-")
    let secondElf = sectionPair[1].split("-")
    let firstElfLeft = parseInt(firstElf[0])
    let firstElfRight = parseInt(firstElf[1])
    let secondElfLeft = parseInt(secondElf[0])
    let secondElfRight = parseInt(secondElf[1])
    if (firstElfLeft === secondElfLeft || firstElfLeft === secondElfRight || firstElfRight === secondElfLeft || firstElfRight === secondElfRight) return 1
    if (firstElfLeft > secondElfLeft && firstElfLeft < secondElfRight) return 1
    if (firstElfLeft < secondElfLeft && firstElfLeft > secondElfRight) return 1
    if (secondElfLeft > firstElfLeft && secondElfLeft < firstElfRight) return 1
    if (secondElfLeft < firstElfLeft && secondElfLeft > firstElfRight) return 1
    return 0
}