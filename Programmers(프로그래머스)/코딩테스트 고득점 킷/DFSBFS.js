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
