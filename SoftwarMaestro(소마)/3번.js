//회고 : 긴장하니까 코드를 차분히 디버깅하는게 부족했다
//조합을 구현하는 거에서 막혔었는데, arr 안에서 combination을 또 맵을 돌리니까 정신 없어서 어디가 잘못됐는지도 몰랐다
//밖에 result를 만들고 push를 해줬어야 하는데

// 7 1
// 15 0
// 14 1
// 4 3
function combination(arr, select) {
  if (select === 1) return arr.map((el) => [el]);
  let result = [];
  arr.forEach((fixed, idx) => {
    let rest = [...arr.slice(idx + 1)];
    let comb = combination(rest, select - 1);
    result.push(...comb.map((val) => [fixed, ...val]));
    // console.log(result);
  });
  return result;
}

function searchComb(question, combs) {
  let checkingComb = combs;
  let result;
  question.forEach((val) => {
    let [gte, count] = val;
    let checkedComb = [];
    checkingComb.forEach((comb) => {
      let combCount = 0;
      comb.forEach((val) => {
        if (val >= gte) combCount++;
      });
      if (combCount === count) checkedComb.push(comb);
    });
    checkingComb = checkedComb;
    result = checkedComb;
  });
  return result;
}

function solution(n, k, question) {
  let arr = Array.from({ length: n }, (_, idx) => idx + 1);
  let allComb = combination(arr, k);
  let result = searchComb(question, allComb);
  return result.length;
}
console.log(
  solution(15, 3, [
    [7, 1],
    [15, 0],
    [14, 1],
    [4, 3],
  ])
);
