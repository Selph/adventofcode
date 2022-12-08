import { syncReadFile } from '../utils/syncReadFile.js'

// Global variables for tasks, save time
var subFoldersSize = 0

function files() {
    // First, create the file system => A tree of folders
    let fileSystem = populateFileSystem()

    // Then, calculate the folder sizes recursively
    calculateFolderSize(fileSystem)

    // Tasks
    return 'Sum of folder size < 100.0000 : ' + subFoldersSize + 
         '\nSmallest delete-able folder   : ' + smallestDeletableDirectory(70000000, fileSystem)
}

function populateFileSystem() {
    // Parse the log
    let parsedLog = parseTerminalLog()

    // Create the root folder
    let fileSystem = createFolder('root', null, true)

    // Create a pointer that traverses file system
    let pointer = fileSystem;

    // Reaction logic for each line type in log
    let logicObject = {
        'command': function(line) { pointer = traverse(line, pointer) },
        'folder' : function(line) { pointer.children.push(createFolder(line.name, pointer))},
        'file'   : function(line) { pointer.files.push({name: line.name, size: parseInt(line.size)})}
    }

    // Iterate through log
    parsedLog.forEach((line) => logicObject[line.type](line))

    return fileSystem
}

function traverse(cmd, obj) {
    // Stay put
    if (cmd.operation !== 'cd' || cmd.value === '/') return obj

    // Change directory to parent
    if (cmd.value === '..') return obj.parent

    // Change directory to child -> by child name
    return obj.children.filter((folder) => { return folder.name === cmd.value })[0]
}

function createFolder(name, parent, root = false) {
    // Generic folder
    return {
        name: name,
        size: 0,
        root: root,
        parent: parent,
        children: [],
        files: []
    }
}

function parseTerminalLog() {
    // Read txt file to array
    let terminalLog = syncReadFile('./input.txt')
    let parsedLog = []

    // Parse array -> Each line either a command, file or folder type.
    terminalLog.forEach((line) => {
        let lineToArray = line.split(' ')
        
        // If the line is a command type
        if (lineToArray[0] === '$') {
            parsedLog.push(
                { 
                    type: 'command', 
                    operation: lineToArray[1], 
                    value: lineToArray.length < 3 ? '' : lineToArray[2] 
                }
            )
            return;
        }

        // If the line is a file/folder type
        parsedLog.push(
            {
                type: lineToArray[0] === 'dir' ? 'folder' : 'file',
                name: lineToArray[1],
                size: lineToArray[0] === 'dir' ? 0 : lineToArray[0]
                
            }
        )
    })
    return parsedLog
}

function calculateFolderSize(folder) {
    // Summation of files in folder
    folder.size = folder.files.reduce((a, c) => a + c.size, folder.size)

    // Recursively calculate folder size
    // Folder sizes accumulate from leaf nodes to root
    if (folder.children.length !== 0) folder.children.forEach((child) => folder.size += calculateFolderSize(child))

    // Add to task 1 global variable if size is viable
    if (folder.size < 100000) subFoldersSize += folder.size
    
    return folder.size
}

function smallestDeletableDirectory(totalStorage, fileSystem) {
    // Calculate needed storage
    let neededStorage = 30000000 - (totalStorage - fileSystem.size)

    // Optimized search recursion, only checks logical candidate branches of file tree. => Strength: weak
    return findDirectoryOfLowestSize(neededStorage, [fileSystem], fileSystem.size)
}

function findDirectoryOfLowestSize(neededStorage, folders, currentSize) {
    for (let folder of folders) {
        // Skip branch if undesirable folder size
        if (folder.size < neededStorage) continue;

        // Mark if desirable
        if (folder.size < currentSize) currentSize = folder.size

        // Check branches recursively for a more suited folder
        currentSize = findDirectoryOfLowestSize(neededStorage, folder.children, currentSize)
    }
    return currentSize
}

console.time('Execution Time'); 
console.log(process.argv.length > 2 ? files(process.argv[2]) : files())
console.timeEnd('Execution Time');
