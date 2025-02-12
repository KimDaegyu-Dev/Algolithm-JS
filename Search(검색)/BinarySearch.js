function binarySearch(arr, input){
    // add whatever parameters you deem necessary - good luck!
    let left = 0, right=arr.length-1;
    let middle = Math.floor((left+right)/2);
    while(left<=right && input !== arr[middle]){
        middle = Math.floor((left+right)/2);
        if(input<arr[middle]) right = middle - 1;
        if(input>arr[middle]) left = middle + 1;
        if(input===arr[middle]) return middle;
        console.log(arr[middle], middle, right, left);
    }
    return -1;
  }
  
  binarySearch([1,2,3,4,5],2);