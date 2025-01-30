//Helper
function collectOddValues(arr){
    let result = [];
    function helper(helperInput){
        if(helperInput.length === 0){
            return;
        }
        if(helperInput[0]%2 !==0){
            result.push(helperInput[0];
        }
        helper(helperInput.slice(1));
    }
    helper(arr);
    return result;
}

//Iterative 방법
//짝수와 홀수 배열을 사용하고 배열에서 추출된 홀수만 반환
//이때 본래의 배열을 변경시키면 안됨

//Pure
//외부 데이터구조, 중첩된 함수를 사용하지 않음

function collectOddValuesPure(arr){
    let newArr = [];

    if(arr.length === 0) {
        return newArr;
    }

    if(arr[0] % 2 !== 0){
        newArr.push(arr[0]);
    }

    newArr = newArr.concat(collectOddValuesPure(arr.slice(1)));
    return newArr;
}