
function getDigit(num, place){
    return Math.floor( Math.abs(num) / Math.pow(10, place) % 10);;
}

function getDigitString(num, place){
    num = String(num);
    return num[num.length - 1 - place];
}

function digitCount(num){
    if(num === 0) return 1;
    return Math.floor(Math.log10(Math.abs(num))) + 1;
}
function digitCountString(num){
    return String(num).length;
}   
function mostDigits(nums){
    let max = 0;
    for(let i = 0; i < nums.length; i++){
        max = Math.max(max, digitCount(nums[i]));
    }
    return max;
}
function radixSort(nums){
    let maxDigit = mostDigits(nums);
    let buckets = {
        "0" : [],
        "1" : [],
        "2" : [],
        "3" : [],
        "4" : [],
        "5" : [],
        "6" : [],
        "7" : [],
        "8" : [],
        "9" : [],
    };
    let result = [];

    //최대 자릿수만큼 반복
    for(let digit = 0; digit < maxDigit; digit++){
        
        //배열의 값들을 버킷에 할당
        for(let j = 0; j < nums.length; j++){
            let digit = getDigit(nums[j], digit);
            buckets[digit].push(nums[j]);
        }

        //기존 배열의 값들을 버킷의 값으로 대체
        nums = [];
        // console.log(buckets);
        for(let j = 0; j < 10; j++){
            while(buckets[j].length){
                // console.log(buckets[j]);
                nums.push(buckets[j].shift());
            }
        }
        // console.log(nums);
    }
    result = nums;
    // console.log(result);
    return result;
}
//강의 버전
function radixSortOpt(nums){
    let maxDigit = mostDigits(nums);
    for(let k = 0; k < maxDigit; k++){
        let digitBuckets = Array.from({length : 10}, () => []);
        for(let i = 0; i < nums.length; i++){
            let digit = getDigit(nums[i], k);
            digitBuckets[digit].push[nums[i]];
        }
        nums.concat(...digitBuckets);
    }
    return nums;
}

radixSort([23, 300, 12, 502, 1002, 205]);