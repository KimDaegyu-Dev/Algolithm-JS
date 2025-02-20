//https://www.acmicpc.net/problem/11726
// 2*1 : 1 ㅣ
// 2*2 : 2 ㅣㅣ, =
// 2*3 : 3 ㅣㅣㅣ ,ㅣ=,=ㅣ
// 2*4 :   ㅣㅣㅣㅣ,ㅣㅣ=, =ㅣㅣ, ㅣ=ㅣ ,==
// 1
// 1+1, 2
// 1+1+1, 1+2, 2+1
// 1+1+1+1, 1+1+2, 2+1+1. 1+2+1. 2+2
const N = require("fs").readFileSync("/dev/stdin").toString().trim();

function dp(n) {
  let memo = [1, 2];
  for (let i = 2; i < n; i++) {
    memo[i] = (memo[i - 2] + memo[i - 1]) % 10007;
  }
  return memo[n - 1];
}
console.log(dp(N));
