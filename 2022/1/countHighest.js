function countHighest(arr) { 
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