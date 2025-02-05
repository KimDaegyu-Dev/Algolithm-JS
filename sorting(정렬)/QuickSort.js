function pivot(arr, startIdx=0, endIdx=arr.length){
    // console.group(`pivotting: [${arr.slice(startIdx, endIdx+1)}]`)
    let pivot = arr[startIdx];
    let swapIdx = startIdx;

    for(let i=startIdx+1; i<endIdx+1;i++){
        if(arr[i]<pivot){
            swapIdx++;
            // highlightLog(arr, swapIdx, i);
            swap(arr, swapIdx, i);
        }
    }
    // highlightLog(arr, startIdx, swapIdx);
    swap(arr, swapIdx, startIdx);

    // console.log("result: ", arr);
    // console.groupEnd;
    
    return swapIdx; 
}
function pivotDebugging(arr, startIdx=0, endIdx=arr.length){
    console.group(`pivotting: [${arr.slice(startIdx, endIdx+1)}]`)
    let pivot = arr[startIdx];
    let swapIdx = startIdx;

    for(let i=startIdx+1; i<endIdx+1;i++){
        if(arr[i]<pivot){
            swapIdx++;
            highlightLog(arr, swapIdx, i);
            swap(arr, swapIdx, i);
        }
    }
    highlightLog(arr, startIdx, swapIdx);
    swap(arr, swapIdx, startIdx);

    console.log("result: ", arr);
    console.groupEnd;
    
    return swapIdx; 
}
const swap = (arr, idx1, idx2) =>{
    [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
}
function highlightLog(arr, idx1, idx2){
    let left = [...arr.slice(0, idx1)];
    let middle = [...arr.slice(idx1+1, idx2)];
    let right = [...arr.slice(idx2+1)];
    let result = `swapping: [${idx1===0?left:(left+",")}%c${arr[idx1]}${middle.length!==0?`%c,${middle}`:"%c"},%c${arr[idx2]}%c${(idx2===arr.length-1)||(idx2===0)?right:(","+right)}]`;
    console.log(result, "background:red", "", "background:green", "color:white");
}

function quickSort(arr, start=0, end=arr.length){
    // console.log(arr, start, end);
    if(end-start<=1) return;
    let pivotIdx = pivot(arr, start, end);
    // console.log(pivotIdx);
    quickSort(arr,start, pivotIdx-1);
    quickSort(arr, pivotIdx+1, end);
    return arr;
}
//강의 버전
function quickSortOpt(arr, left=0,right=arr.length-1){
    if(left<right){
        let pivotIdx = pivot(arr, left, right);
        quickSort(arr,left, pivotIdx-1);
        quickSort(arr, pivotIdx+1, right);
    }
    return arr;
}
console.log("result: ", quickSort([4,8,2,1,7, 5, 9,6,3]));

//인터넷에서 찾음
let arr = [5, 7, 9, 0, 3, 1, 6, 2, 4, 8];
const n = arr.length;

const quickSort = (arr) => {
  if (arr.length <= 1) return arr;

  const p = arr[0]; //피벗은 첫 번째 원소
  const tail = arr.slice(1); //피벗을 제외한 배열

  const leftArr = tail.filter((v) => v <= p); //분할된 왼쪽 부분 (피벗보다 작은 값)
  const rightArr = tail.filter((v) => v > p); //분할된 오른쪽 부분 (피벗보다 큰 값)

  return [...quickSort(leftArr), p, ...quickSort(rightArr)];
};

console.log(quickSort(arr, 0, n - 1));