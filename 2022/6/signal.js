const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');
    const arr = contents.split(/\r?\n/);
    return arr;
}

function signal(distinct = 4) {
    let signal = syncReadFile('./input.txt')
    return (processSignal(signal[0], distinct))
}

function processSignal(signal, distinct) {
    let currentBuf = []
    loop1:
    for (let i = distinct; i < signal.length; i++) {
        currentBuf = signal.slice(i-distinct, i)
        loop2:
        for (let y = 0; y < distinct; y++) {
            let currItem = currentBuf.slice(-1)
            currentBuf = currentBuf.slice(0,distinct-1)
            if (currentBuf.includes(currItem)) continue loop1;
            currentBuf = currItem += currentBuf
        }
        return i
    }
}
