function solution(table, search) {
  let answer = 0;
  //문자열 추출
  let label = table[0].split(" ");
  table = table.slice(1).map((row) => {
    return row.split(" ");
  });
  //db 생성
  let db = createTable(label, table);
  //조건 추출
  let condition = search.split(" ");
  //값 검색
  let result = db;
  condition.forEach((val, idx) => {
    if (idx % 2 === 0) {
      result = select(result, val, condition[idx + 1]);
      //검색한 값의 행 개수 만큼 더하기
      answer += result[label[0]].length;
    }
  });
}
function select(db, searchLabel, searchVal) {
  let select = {};
  let labels = Object.keys(db);
  labels.forEach((label) => {
    select[label] = [];
  });

  db[searchLabel].map((val, idx) => {
    if (val === searchVal) {
      labels.forEach((label) => {
        select[label].push(db[label][idx]);
      });
    }
  });

  return select;
}
function createTable(labels, table) {
  let db = {};
  labels.forEach((label) => {
    db[label] = [];
  });

  table.forEach((row) => {
    row.forEach((val, colIdx) => {
      db[labels[colIdx]].push(val);
    });
  });
  return db;
}
solution(
  [
    "category product rentable",
    "car audi yes",
    "food hamberger no",
    "car bmw no",
  ],
  "category car rentable no"
);
//아쉬웠던 점 이렇게 함수로 좀 분리를 할걸, 너무 구현에 집중한 나머지 코드가 복잡해짐
//구현에 집중하다 보니까 테스트케이스를 신경 쓸 겨를이 없었음
//
