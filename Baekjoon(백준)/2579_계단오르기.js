// function solution(arr, n) {
//   function recursive(i, sum, cnt) {
//     if (cnt === 2) return -1;
//     if (i > n - 1) return sum;
//     sum = sum + arr[i];
//     console.log(sum, arr[i]);
//     let oneStep = recursive(i + 1, sum, cnt + 1);
//     let twoStep = recursive(i + 2, sum, 0);
//     return Math.max(oneStep, twoStep);
//   }
//   return recursive(0, 0, 0);
// }
//시간초과
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .split("\n")
  .map(Number);

const N = input[0];
const arr = input.slice(1);
function dp(arr, n) {
  let memo = [
    arr[0],
    arr[0] + arr[1],
    Math.max(arr[0] + arr[2], arr[1] + arr[2]),
  ];
  let i = 3;
  while (i < n) {
    memo[i] = Math.max(memo[i - 3] + arr[i - 1] + arr[i], memo[i - 2] + arr[i]);
    i++;
  }
  return memo[n - 1];
}
console.log(dp(arr, N));
// console.log(dp([10, 20, 15, 25, 10, 20], 6));
