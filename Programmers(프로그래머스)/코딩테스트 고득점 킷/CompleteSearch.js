//최소직사각형
function solution(sizes) {
  var answer = 0;
  let row = 0,
    col = 0;
  for (let size of sizes) {
    row = Math.max(row, Math.max(size[0], size[1]));
    col = Math.max(col, Math.min(size[0], size[1]));
  }
  answer = row * col;
  return answer;
}
//다른 사람 풀이
function solution(sizes) {
  const rotated = sizes.map(([w, h]) => (w < h ? [h, w] : [w, h]));

  let maxSize = [0, 0];
  rotated.forEach(([w, h]) => {
    if (w > maxSize[0]) maxSize[0] = w;
    if (h > maxSize[1]) maxSize[1] = h;
  });
  return maxSize[0] * maxSize[1];
}

//모의고사
function solution(answers) {
  let result = [];
  let supoja1 = [1, 2, 3, 4, 5];
  let supoja2 = [2, 1, 2, 3, 2, 4, 2, 5];
  let supoja3 = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];

  let answerCnt = [0, 0, 0];
  let i = 0;
  for (answer of answers) {
    if (answer === supoja1[i % 5]) answerCnt[0]++;
    if (answer === supoja2[i % 8]) answerCnt[1]++;
    if (answer === supoja3[i % 10]) answerCnt[2]++;
    i++;
  }
  let max = Math.max(...answerCnt);
  for (let i = 0; i < 3; i++) {
    if (answerCnt[i] === max) result.push(i + 1);
  }
  return result;
}
//자동화 리팩토링
function solution(answers) {
  let result = [];
  let supojaPattern = [
    [1, 2, 3, 4, 5],
    [2, 1, 2, 3, 2, 4, 2, 5],
    [3, 3, 1, 1, 2, 2, 4, 4, 5, 5],
  ];
  let answerCnt = [0, 0, 0];
  let i = 0;
  for (answer of answers) {
    supojaPattern.forEach((val, idx) => {
      if (answer === val[i % val.length]) answerCnt[idx]++;
    });
    i++;
  }
  let max = Math.max(...answerCnt);
  for (let i = 0; i < answerCnt.length; i++) {
    if (answerCnt[i] === max) result.push(i + 1);
  }
  return result;
}
