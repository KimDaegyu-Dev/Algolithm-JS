// 원소를 고른 뒤, 남은 원소들을 고르는 작업을 떠넘기는 재귀 함수

function combination(arr, selectCnt) {
  let result = [];
  if (selectCnt === 1) return arr.map((el) => [el]);
  arr.forEach((fixed, index, origin) => {
    let rest = origin.slice(index + 1);
    console.log(rest, selectCnt - 1);
    let combination = combination(rest, selectCnt - 1);
    let attached = combination.map((el) => [fixed, ...el]);
    result.push(...attached);
  });
  console.log(result);
  return result;
}

function combinationWithRepetition(arr, selectCnt) {
  let result = [];
  if (selectCnt === 1) return arr.map((el) => [el]);
  arr.forEach((fixed, index, origin) => {
    let rest = origin.slice(index);
    console.log(rest, selectCnt - 1);
    let combination = combinationWithRepetition(rest, selectCnt - 1);
    let attached = combination.map((el) => [fixed, ...el]);
    result.push(...attached);
  });
  console.log(result);
  return result;
}

combinationWithRepetition([1, 2, 3, 4], 3);

//n: 전체 원소의 수
//picked: 지금까지 고른 원소들의 번호를 담는 배열
//toPick: 더 고를 원소의 수
const pick = (n, picked, toPick) => {
  let result = [];
  if (toPick === 0) {
    console.log(picked.join(" "));
    return picked;
  }
  //picked가 빈 배열일 때는 0, 아닐 때에는 마지막 원소+1;
  const startIdx = picked.length && picked[picked.length - 1] + 1;
  for (let next = startIdx; next < n; next++) {
    picked.push(next);
    result = pick(n, picked, toPick - 1);
    // result.push(result);
    picked.pop();
  }
};

// function combination(n, toPick, picked) {
//   if (toPick === 0) {
//     console.log(picked.join(" "));
//     return;
//   }
//   let smallest = picked.length && picked[picked.length - 1] + 1;
//   for (let next = smallest; next < n; next++) {
//     let newPicked = [...picked];
//     newPicked.push(next);
//     combination(n, toPick - 1, newPicked);
//   }
// }

// pick(4, [], 3);
