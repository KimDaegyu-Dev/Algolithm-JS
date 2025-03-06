//가장 먼 노드
function solution(n, edge) {
  let graph = makeGraph(n, edge);
  let visited = new Set();
  visited.add(1);
  let qe = [[1, 1]]; //현재 노드, 이동거리
  let max = 1;
  let nodeNum = Array.from({ length: n }, () => 0);
  while (qe.length !== 0) {
    let [currentNode, dist] = qe.shift();
    let nextNodes = graph.get(currentNode);

    //이동거리 최댓값 갱신
    if (max < dist) max = dist;
    //가장 멀리 떨어진 노드 개수 증가
    if (max === dist) nodeNum[max] += 1;

    nextNodes.forEach((nextNode) => {
      if (!visited.has(nextNode)) {
        visited.add(nextNode);
        qe.push([nextNode, dist + 1]);
      }
    });
  }

  return nodeNum[max];
}
function makeGraph(n, edge) {
  let adjacencyList = new Map();

  for (let i = 1; i <= n; i++) {
    adjacencyList.set(i, []);
  }
  edge.forEach((edge) => {
    adjacencyList.get(edge[0]).push(edge[1]);
    adjacencyList.get(edge[1]).push(edge[0]);
  });

  return adjacencyList;
}
//adjencyList로 표현해서
//1번 노드에서 연결된 노드와 연결된 노드들을 탐색(BFS)
//이동 거리를 함께 저장
//가장 멀리 떨어진 노드가 몇 개인지 저장

//순위
function solution(n, results) {
  let answer = 0;
  let players = Array.from({ length: n }, (_, idx) => {
    const won = new Set();
    const lose = new Set();
    return { won, lose, player: idx };
  });
  //선수 별 이긴/진 선수 기록
  results.forEach(([win, lose]) => {
    let winner = win - 1;
    let loser = lose - 1;
    players[winner].won.add(loser);
    players[loser].lose.add(winner);
  });
  //선수가 이긴 선수의 이긴 선수들에 선수가 이긴 선수를 추가, 선수가 진 선수의 진 선수들에 선수를 추가
  players.forEach((player) => {
    player.won.forEach((winned) => {
      let loser = players[winned];
      loser.lose = new Set([...player.lose, ...loser.lose]);
    });
    player.lose.forEach((lose) => {
      let winner = players[lose];
      winner.won = new Set([...winner.won, ...player.won]);
    });
  });

  players.forEach((player, idx) => {
    let wonCnt = player.won.size;
    let loseCnt = player.lose.size;
    let matchCnt = wonCnt + loseCnt;
    if (matchCnt === n - 1) answer++;
  });
  // console.log(players);
  return answer;
}

//실패, 순위를 확실히 매길수 없음
// function solution(n, results) {
//     if(n===1) return 1;
//     //각 선수별 경기 수
//     let matchNum = Array.from({length: n+1}, ()=>0);
//     let rank = Array.from({length: n+1}, ()=>0);
//     let graph = makeGraph(results);
//     let qe = [1];
//     let visited = new Set([1]);

//     function makeGraph(results){
//         let graph = results.reduce((graph, [win, lose])=>{
//             graph.set(win, (graph.get(win)||[]).concat(lose));
//             //이긴 경기 추가
//             matchNum[win] = 1

//             return graph;
//         }, new Map());
//         return graph;
//     }
//     console.log(graph);
//     for(let [player, losedPlayers] of graph){
//         //진 경기 추가
//         losedPlayers.forEach((losedPlayer)=>{
//             matchNum[losedPlayer] += 1;
//         })
//     }

//     console.log(matchNum);
//     //선수의 수 - 1의 경기인 선수만 필터링
//     let result = matchNum.reduce((result, num, idx)=>{
//         if(num===n-1) result.push(idx);
//         return result;
//     }, []);

//     //순위를 매길 수 있는 선수의 수 return
//     return result.length
// }
