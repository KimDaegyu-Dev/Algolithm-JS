//https://www.acmicpc.net/problem/1920
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");
const arr1 = input[1].split(" ").map(Number);
const arr2 = input[3].split(" ").map(Number);
function solution(arr1, arr2) {
  let numArr = new Set();
  arr1.forEach((num) => {
    numArr.add(num);
  });
  arr2.forEach((num) => {
    if (numArr.has(num)) console.log(1);
    else console.log(0);
  });
}
solution(arr1, arr2);
