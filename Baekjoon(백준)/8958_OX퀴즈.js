//https://www.acmicpc.net/problem/8958
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const arr = input.slice(1);
function solution(arr) {
  function quizScore(quiz) {
    let cnt = 0;
    let sum = 0;
    for (let i = 0; i < quiz.length; i++) {
      if (quiz[i] === "O") {
        cnt++;
        sum += cnt;
      } else cnt = 0;
    }
    return sum;
  }
  for (let quiz of arr) {
    console.log(quizScore(quiz));
  }
}
solution(arr);
