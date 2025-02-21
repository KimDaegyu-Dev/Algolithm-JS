//같은 숫자는 싫어
function solution(arr) {
  let stack = [];
  arr.forEach((val) => {
    if (stack[stack.length - 1] === val) return;
    stack.push(val);
  });
  return stack;
}
//다른 풀이
function solution(arr) {
  return arr.filter((val, index) => val != arr[index + 1]);
}
