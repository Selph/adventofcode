import { syncReadFile } from '../utils/syncReadFile.js'

function rugsack2() {
    let rugsackInput = syncReadFile('./rugsack.txt')
    let priorityList = syncReadFile('./priority.txt')
    
    prioritySum = 0;
    for (let y = 0; y < rugsackInput.length-2; y+= 3) {
        prioritySum += findPriority(rugsackInput[y], rugsackInput[y+1], rugsackInput[y+2], priorityList)
    } 
    
    return prioritySum;
}

function findPriority(instance1, instance2, instance3, prios) {
    let shared = ""
    for (let i = 0; i < instance1.length; i++) {
        if (instance2.includes(instance1[i]) && instance3.includes(instance1[i])) {
            shared = instance1[i];
            break;
        }
    }
    return prios.indexOf(shared) + 1
}

