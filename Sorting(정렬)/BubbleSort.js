function bubbleSort(arr){
    for(let i=arr.length; i>0; i--){
        for(let j=0; j<i-1; j++){
            if(arr[j]>arr[j+1]) swap(arr, j, j+1);
        }
    }
    return arr;
}

//최적화, 교환을 했는가
function bubbleSortOpt(arr){
    let noSwaps;
    for(let i=arr.length; i>0; i--){
        noSwaps = true;
        for(let j=0; j<i-1; j++){
            console.log(arr, arr[j], arr[j+1]);
            if(arr[j]>arr[j+1]) {
            swap(arr, j, j+1);
            noSwaps = false;
        }
        }
        if(noSwaps) break;
    }
    return arr;
}
const swap = (arr, idx1, idx2) =>{
    [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
}

console.log(bubbleSort([3,1,4,63,21, 10]));
console.log(bubbleSortOpt([8,1,2,3,4,5,6,7]));