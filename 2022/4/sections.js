const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    console.log(arr); // 👉️ ['One', 'Two', 'Three', 'Four']

    return arr;
}

function sections() {
    let sectionList = syncReadFile('./input.txt')

    let containNumber = 0;
    for (let section of sectionList) {
        containNumber += inspectSections(section)
    }
    return containNumber;
}

function inspectSections(section) {
    console.log(section)
    let sectionPair = section.split(",")
    let firstElf = sectionPair[0].split("-")
    let secondElf = sectionPair[1].split("-")
    if (parseInt(firstElf[0]) <= parseInt(secondElf[0]) && parseInt(firstElf[1]) >= parseInt(secondElf[1]) ||
        parseInt(secondElf[0]) <= parseInt(firstElf[0]) && parseInt(secondElf[1]) >= parseInt(firstElf[1])) return 1
    return 0
}