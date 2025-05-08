//입국심사
function solution(n, times) {
  let start = 1,
    end = Math.max(...times) * n;
  let answer;
  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    let current = 0;
    for (let time of times) {
      current += Math.floor(mid / time);
      if (current > n) break;
    }
    if (current === n) {
      if (end - start <= 1) return mid;
      end = mid - 1;
    }
    if (current >= n) {
      end = mid - 1;
      answer = mid;
    } else {
      start = mid + 1;
    }
  }
  return answer;
}
