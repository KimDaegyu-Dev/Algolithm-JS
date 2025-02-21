//체육복
function solution(n, lost, reserve) {
  lost.sort((a, b) => a - b);
  reserve.sort((a, b) => a - b);
  let answer = n - lost.length;
  let clothes = new Set();
  let lostSet = new Set();
  reserve.forEach((val) => {
    clothes.add(val);
  });
  lost.forEach((val) => {
    lostSet.add(val);
  });
  lostSet.forEach((val) => {
    if (clothes.has(val)) {
      answer++;
      clothes.delete(val);
      lostSet.delete(val);
    }
  });
  lostSet.forEach((val) => {
    if (clothes.has(val - 1)) {
      answer++;
      clothes.delete(val - 1);
    } else if (clothes.has(val + 1)) {
      answer++;
      clothes.delete(val + 1);
    }
  });
  return answer;
}
