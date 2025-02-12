function mergeArrays(arr1, arr2){
    console.group(`merging Arrays : [${arr1}], [${arr2}]`);
    // if(arr1===undefined&&arr2===undefined){
    //     return [];
    // }
    let result = [];
    let i = 0,j = 0;
    while(i < arr1.length && j < arr2.length){
        if(arr1[i]<arr2[j]){
            result.push(arr1[i]);
            i++;
        }
        else{
            result.push(arr2[j]);
            j++;
        }
    }
    if(i<arr1.length){
        result.push(...arr1.slice(i));
        console.log("remain array: ", arr1.slice(i));
    }
    else {
        result.push(...arr2.slice(j));
        console.log("remain array: ", arr2.slice(j));
    }
    console.log("merge result: ", result);
    console.groupEnd();
    return result;
}

// mergeArrays([1,4,9], [3, 4, 8, 10, 12]);

function mergeSort(arr){
    let leftArr, rightArr;
    if(arr.length>1){
        leftArr = mergeSort(arr.slice(0, arr.length/2));
        rightArr = mergeSort(arr.slice(arr.length/2));
    }
    if(leftArr!==undefined||rightArr!==undefined){
        return mergeArrays(leftArr, rightArr);
    }
    return arr;
}

//강의 버전
function mergeSortOpt(arr){
    if(arr.length<=1) return arr;
    let mid = Math.floor(arr.length/2);
    let left = mergeSort(arr.slice(0,mid));
    let right = mergeSort(arr.slice(mid));
    return mergeArrays(left, right);
}
console.log(mergeSortOpt([1,5,7,2,4,9]));