//https://www.acmicpc.net/problem/10815
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");
const arr1 = input[1].split(" ").map(Number);
const arr2 = input[3].split(" ").map(Number);
function solution(arr1, arr2) {
  let sangjun = new Set();
  let result = [];
  for (let card of arr1) {
    sangjun.add(card);
  }
  for (let card of arr2) {
    if (sangjun.has(card)) result.push(1);
    else result.push(0);
  }
  console.log(...result);
}
solution(arr1, arr2);
// solution([6, 3, 2, 10, -10], [10, 9, -5, 2, 3, 4, 5, -10]);
