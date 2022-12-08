import { syncReadFile } from '../utils/syncReadFile.js'

function countHighest() { 
    let arr = syncReadFile('./elves.txt')
    max = 0; 
    inner = 0; 
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === ""){ 
            inner = 0; 
            continue; 
        } 
        inner += parseInt(arr[i]); 
        if (inner > max) max = inner;
    } 
    return max
}

console.log(countHighest())