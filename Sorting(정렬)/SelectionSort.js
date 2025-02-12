function selectionSort(arr){
    let min = arr[0];
    let minIdx = 0;
    for(i = 0; i<arr.length; i++){
        minIdx=i;
        min = arr[i];
        for(j = i; j<arr.length; j++){
            if(arr[j]<min){
                min = arr[j];
                minIdx = j;
            }
        }
        swap(arr, i, minIdx);
    }
    return arr;
}
//최적화, 강의 버전
function selectionSortOpt(arr){
    for(i = 0; i<arr.length; i++){
        let min=i;
        for(j = i; j<arr.length; j++){
            if(arr[j]<arr[min]){
                min = j;
            }
        }
        if(i!==min) swap(arr, i, min);
    }
    return arr;
}
const swap = (arr, idx1, idx2) => {
    [arr[idx1], arr[idx2]]= [arr[idx2], arr[idx1]];
}

console.log(selectionSortOpt([3,4,2,1,10,8]));