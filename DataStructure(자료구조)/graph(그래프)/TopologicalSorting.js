//위상정렬 알고리즘
//사이클이 없는 방향 그래프에서 정점들을 정렬하는 알고리즘
//그래프의 각 정점을 방향성에 거스르지 않도록 나열하는 것
//답이 여러개일 수 있다, 한 단계에서 큐에 2개 이상의 정점이 들어가는 경우
//모든 정점을 방문하기 전에 큐가 비는 경우 사이클이 존재한다.
//시간 복잡도 : O(V+E)
//동작 과정
//1. 진입차수가 0인 정점을 큐에 삽입
//2. 큐에서 원소를 꺼내 연결된 모든 간선을 제거
//3. 간선 제거 이후 진입차수가 0이 된 정점을 큐에 삽입
//4. 큐가 빌 때까지 2~3 과정을 반복

const n = 7;
const edge = [
  [1, 2],
  [1, 5],
  [2, 3],
  [2, 6],
  [3, 4],
  [4, 7],
  [5, 6],
  [6, 4],
];
const indegree = Array(n + 1).fill(0);
const graph = Array.from({ length: n + 1 }, () => []);
edge.forEach(([a, b]) => {
  graph[a].push(b);
  indegree[b]++;
});

function topologicalSort(graph, indegree) {
  let qu = [];
  let result = [];
  indegree.forEach((degree, idx) => {
    if (degree === 0) qu.push(idx);
  });
  while (qu.length !== 0) {
    let node = qu.shift();
    result.push(node);
    graph[node].forEach((nextNode) => {
      indegree[nextNode]--;
      if (indegree[nextNode] === 0) qu.push(nextNode);
    });
  }
  console.log(result);
}

topologicalSort(graph, indegree); // [1, 2, 5, 3, 6, 4, 7]
