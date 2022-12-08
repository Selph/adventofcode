import * as fs from 'fs'

export function syncReadFile(filename) {
    const contents = fs.readFileSync(filename, 'utf-8');
    const arr = contents.split(/\r?\n/);
    return arr;
}