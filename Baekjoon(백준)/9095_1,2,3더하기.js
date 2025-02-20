//https://www.acmicpc.net/problem/9095
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

const N = input[0];
const arr = input.slice(1);
function dp(arr) {
  for (let n of arr) {
    let memo = [1, 2, 4]; // 1 : 1, 2: 1+1, 2, 3: 1+2, 1+1+1, 2+1, 3
    for (let i = 3; i < n; i++) {
      memo[i] = memo[i - 3] + memo[i - 2] + memo[i - 1];
    }
    console.log(memo[n - 1]);
  }
}
dp(arr);
