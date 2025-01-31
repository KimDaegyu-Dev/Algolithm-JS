function insertionSort(arr){
    for(let i=1; i<arr.length; i++){
        let index=i;
        for(let j=i-1; j>=0; j--){
            console.log(arr, j, index);
            if(arr[j]<arr[index]) break;
            if(arr[j]>arr[index]){
                swap(arr, j, index);
                index=j;
            }
        }
    }
}
//강의 방식
function insertionSortOpt(arr){
    for(let i=1; i<arr.length; i++){
        let currentVal = arr[i];
        for(let j= i-1; j >= 0&& arr[j] > currentVal ; j--){
            arr[j+1] = arr[j];
        }
        arr[j+1]=currentVal;
        console.log(arr);
    }
}
const swap = (arr, idx1, idx2) => {
    [arr[idx1], arr[idx2]]= [arr[idx2], arr[idx1]];
}

insertionSort([2, 1, 9, 4, 10, 8, 6]);