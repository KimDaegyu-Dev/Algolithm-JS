//https://www.acmicpc.net/problem/1463
const input = require("fs").readFileSync("/dev/stdin").toString();
const X = Number(input);
function solution(n) {
  let memo = [0, 0];
  for (let i = 2; i <= n; i++) {
    memo[i] = memo[i - 1] + 1;
    if (i % 3 === 0) memo[i] = Math.min(memo[i], memo[i / 3] + 1);
    if (i % 2 === 0) memo[i] = Math.min(memo[i], memo[i / 2] + 1);
  }
  return memo[n];
}
console.log(solution(X));
solution(10); //3
solution(11); //10 9 3 1
solution(12); //4 3 1
solution(13); //12 4 3 1
solution(14); //4 7 6 2 1
