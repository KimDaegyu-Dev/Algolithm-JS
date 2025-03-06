function solution(a, b) {
  let answer = [];
  for (let i = 0; i < 3; i++) {
    let countA = [];
    a.forEach((val) => {
      let idx = val - 1;
      if (countA[idx] === undefined) {
        countA[idx] = 1;
        return;
      }
      countA[idx] += 1;
    });
    let firstStep = a.map((val, idx) =>
      countA[val - 1] === 1 ? val + 1 : val
    );
    let secondStep = firstStep;
    b.forEach((bVal) => {
      secondStep = secondStep.filter((val) => val !== bVal);
    });

    a = secondStep;
  }

  answer = a;
  return answer;
}
//헐 개 레전드 new SET()라 써서 set 못 쓰는줄 알았는데 쓸 수 있었네...
//근데 어차피 Set로 못 품
solution([1, 2, 3, 3, 4], [4, 5, 6, 7, 8]);
