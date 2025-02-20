//https://www.acmicpc.net/problem/9461
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const arr = input.slice(1).map(Number);
function solution(arr) {
  let memo = [1, 1, 1, 2, 2];
  let max = Math.max(...arr);
  for (let i = 5; i < max; i++) {
    memo[i] = memo[i - 5] + memo[i - 1];
  }
  for (let n of arr) {
    console.log(memo[n - 1]);
  }
}

solution(arr);
