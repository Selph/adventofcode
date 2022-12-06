function countHighest(arr) { 
    max1 = max2 = max3 = 0; 
    inner = 0; 
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === ""){ 
            inner = 0; continue; 
        } 
        inner += parseInt(arr[i]); 
        if      (inner > max1) { max3 = max2, max2 = max1, max1 = inner; }
        else if (inner > max2) { max3 = max2, max2 = inner; }
        else if (inner > max3) { max3 = inner; }
    } 
    return max1 + max2 + max3;
}