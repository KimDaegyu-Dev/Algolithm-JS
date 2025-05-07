//숫자 문자열과 영단어
// 2021 카카오 채용연계형 인턴십
function solution(s) {
  var answer = 0;
  if (!s.match(/[a-z, A-Z]/)) return Number(s);
  const number = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  number.forEach((eng, idx) => (s = s.replaceAll(eng, idx)));
  return Number(s);
}

function solution(s) {
  let numbers = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  var answer = s;

  for (let i = 0; i < numbers.length; i++) {
    let arr = answer.split(numbers[i]);
    answer = arr.join(i);
  }

  return Number(answer);
}

// [1차] 비밀지도
// 2018 KAKAO BLIND RECRUITMENT
function solution(n, arr1, arr2) {
  var answer = [];

  const fullMap = arr1.map((el, idx) =>
    (el | arr2[idx]).toString(2).padStart(n, 0)
  );
  fullMap.forEach((row, idx) => {
    let line = "";
    row.split("").forEach((el, idx) => {
      if (el === "1") {
        line = line.concat("#");
      } else {
        line = line.concat(" ");
      }
    });
    answer.push(line);
  });
  return answer;
}

function solution(n, arr1, arr2) {
  return arr1.map((v, i) =>
    addZero(n, (v | arr2[i]).toString(2)).replace(/1|0/g, (a) =>
      +a ? "#" : " "
    )
  );
}

const addZero = (n, s) => {
  return "0".repeat(n - s.length) + s;
};
