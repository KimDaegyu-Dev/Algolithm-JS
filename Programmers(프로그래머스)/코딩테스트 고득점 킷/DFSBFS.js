//타깃 넘버
function solution(numbers, target) {
  var answer = 0;
  let results = [];
  let flag = [];
  const helper = (depth) => {
    if (depth === numbers.length) {
      let result = numbers.reduce((acc, cur, idx) => {
        if (flag[idx]) {
          acc -= cur;
        } else {
          acc += cur;
        }
        return acc;
      }, 0);
      results.push(result);
      return;
    }
    flag[depth] = true;
    helper(depth + 1);
    flag[depth] = false;
    helper(depth + 1);
  };
  helper(0);
  results.forEach((el) => {
    if (el === target) answer++;
  });
  return answer;
}
//다른풀이
function solution(numbers, target) {
  let answer = 0;
  getAnswer(0, 0);
  function getAnswer(x, value) {
    if (x < numbers.length) {
      getAnswer(x + 1, value + numbers[x]);
      getAnswer(x + 1, value - numbers[x]);
    } else {
      if (value === target) {
        answer++;
      }
    }
  }
  return answer;
}

// 게임맵최단거리(못품)
function solution(maps) {
  // 1. 남동북서 기준
  const dy = [1, 0, -1, 0];
  const dx = [0, 1, 0, -1];
  const row = maps.length;
  const col = maps[0].length;

  // 2.
  const visitCount = [...maps].map((r) => r.map((c) => 1));

  // 3.
  const queue = [[0, 0]]; //시작점

  // 4.
  while (queue.length) {
    const [y, x] = queue.shift();

    // 5.
    for (let i = 0; i < 4; i++) {
      const ny = y + dy[i];
      const nx = x + dx[i];

      // 6.
      if (ny >= 0 && nx >= 0 && ny < row && nx < col) {
        // 7.
        if (maps[ny][nx] === 1 && visitCount[ny][nx] === 1) {
          visitCount[ny][nx] = visitCount[y][x] + 1;
          queue.push([ny, nx]);
        }
      }
    }
  }

  return visitCount[row - 1][col - 1] === 1 ? -1 : visitCount[row - 1][col - 1];
}

function solution(maps) {
  var yLen = maps.length - 1;
  var xLen = maps[0].length - 1;

  var queue = [[0, 0]];

  var visited = Array.from(new Array(maps.length), () =>
    new Array(maps[0].length).fill(false)
  );

  var result = 0;

  while (queue.length) {
    result++;
    var size = queue.length;
    for (var i = 0; i < size; i++) {
      var point = queue.shift();
      var curY = point[0];
      var curX = point[1];

      if (visited[curY][curX]) continue;

      maps[curY][curX] = 0;

      visited[curY][curX] = true;

      if (curY === yLen && curX === xLen) return result;

      if (curY < yLen && maps[curY + 1][curX] === 1)
        queue.push([curY + 1, curX]);
      if (curX < xLen && maps[curY][curX + 1] === 1)
        queue.push([curY, curX + 1]);
      if (curY > 0 && maps[curY - 1][curX] === 1) queue.push([curY - 1, curX]);
      if (curX > 0 && maps[curY][curX - 1] === 1) queue.push([curY, curX - 1]);
    }
  }

  return -1;
}

//게임 맵 최단거리

function solution(maps) {
  let n = maps.length;
  let m = maps[0].length;
  let dx = [1, 0, -1, 0]; //동 남 서 북 순서
  let dy = [0, 1, 0, -1]; //동 남 서 북 순서
  function isInRange(i, j) {
    return i < n && i >= 0 && j < m && j >= 0;
  }
  let visited = Array.from({ length: n }, () => new Array(m).fill(false));
  let result = [];
  let qe = [[0, 0, 1]];
  while (qe.length !== 0) {
    let [i, j, cnt] = qe.shift();
    if (i === n - 1 && j === m - 1) {
      return cnt;
    }
    for (let k = 0; k < 4; k++) {
      let newX = i + dx[k];
      let newY = j + dy[k];
      if (isInRange(newX, newY) && maps[newX][newY] && !visited[newX][newY]) {
        visited[newX][newY] = true;
        qe.push([newX, newY, cnt + 1]);
      }
    }
    // console.log(visited, qe)
  }
  return -1;
}

//네트워크
function solution(n, computers) {
  var answer = 0;
  let netNum = 0;
  let visited = [];
  for (let i in computers) {
    netNum += dfs(i);
  }

  function dfs(i) {
    if (visited[i]) return 0;
    else visited[i] = true;

    for (let j in computers[i]) {
      if (computers[i][j] && i !== j) dfs(j);
    }

    return 1;
  }

  answer = netNum;
  return answer;
}

//단어 변환
function solution(begin, target, words) {
  let len = words[0].length;
  let prev = {};
  let qe = [[begin, 0]];

  function isOneLetterDiff(a, b) {
    let diffCnt = 0;
    for (let i = 0; i < len; i++) {
      if (a[i] !== b[i]) diffCnt++;
    }
    return diffCnt === 1;
  }
  function oneLetterDiffWords(word) {
    let diffWords = [];
    for (let j = 0; j < words.length; j++) {
      if (isOneLetterDiff(words[j], word)) diffWords.push(words[j]);
    }
    return diffWords;
  }

  while (qe.length !== 0) {
    let [word, cnt] = qe.shift();
    let diffWords = oneLetterDiffWords(word);
    if (word === target) return cnt;
    for (let k in diffWords) {
      if (!prev[diffWords[k]]) {
        prev[diffWords[k]] = true;
        qe.push([diffWords[k], cnt + 1]);
        // console.log(diffWords[k], cnt, qe)
      }
    }
  }

  return 0;
}
//다른 풀이, 플로이드 워셜 알고리즘 js버전
function solution(begin, target, words){
  if(!words.includes(target)) return 0; // target이 words에 없으면 0을 리턴
  words.unshift(begin); // begin을 words에 추가
  const n = words.length; // words의 길이
  const m = words[0].length; // words의 첫번째 단어의 길이
  const graph = Array.from({length: n}, () => Array(n).fill(Infinity)); // 그래프 초기화
  for(let i = 0; i < n; i++) {
    for(let j = i + 1; j < n; j++) {
      let cnt = 0;
      for(let k = 0; k < m; k++) {
        if(words[i][k] !== words[j][k]) cnt++; // 단어가 다른 경우 cnt 증가
      }
      if(cnt === 1) { // 단어가 하나만 다른 경우
        graph[i][j] = 1; // 그래프에 1로 표시
        graph[j][i] = 1; // 대칭이므로 반대도 1로 표시
      }
    }
  }
  for(let k = 0; k < n; k++) {
    for(let i = 0; i < n; i++) {
      for(let j = 0; j < n; j++) {
        if(i !== j) graph[i][j] = Math.min(graph[i][j], graph[i][k] + graph[k][j]); // 최소값으로 갱신
      }
    }
  }
  return graph[0][words.indexOf(target)]; // begin에서 target까지의 최소 거리를 리턴
}

//[from, go]를 요소로 가진 배열을 go를 기준으로 문자 오름차순대로 정렬
function solution(triangle) {
  let height = triangle.length
  if(height===1) return triangle[0][0];
  var answer = [];
  // [7, 10, 15, 18, 11, 16, 15, 20, 25, 18, 15, 19, 19]
  let currentHeight = 1;
  let idx = 0;
  let cache = [triangle[0][0]];
  function dp(parentIdx, currentHeight, triangleIdx){
      let leftChildIdx = 2*parentIdx + 1;
      let rightChildIdx = 2*parentIdx + 2;
      //왼쪽 자식 + 부모, 오른쪽자식 + 부모
      let leftChild = 
          cache[parentIdx] + triangle[currentHeight][triangleIdx];
      let rightChild =
          cache[parentIdx] + triangle[currentHeight][triangleIdx+1];
      cache[leftChildIdx] = leftChild;
      cache[rightChildIdx] = rightChild;
         // console.log(cache[parentIdx], leftChild, rightChild, triangleIdx, triangleIdx+1);
      if(currentHeight === height-1) answer.push(leftChild, rightChild);
  }
  while(currentHeight < height){
      let currentLine = triangle[currentHeight];
      for(let i =0; i <= currentHeight-1; i++){
          console.log(idx, currentHeight, i);
          dp(idx, currentHeight, Number(i))
          idx++;
      }
      currentHeight++;
  }
  console.log(answer, cache);
  return answer;
}