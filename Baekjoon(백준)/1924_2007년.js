//https://www.acmicpc.net/problem/1924
const input = require("fs").readFileSync("/dev/stdin").toString().split(" ");
function solution(mon, day) {
  let today = new Date(`2007-${mon}-${day}`);
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  console.log(days[today.getDay()]);
}
solution(input[0], input[1]);
