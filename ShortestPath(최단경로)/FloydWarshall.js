//플로이드 와샬 알고리즘
//시간복잡도 O(n^3)
//모든 정점에서 모든 정점으로의 최단 경로를 구하는 알고리즘s
function FloydWarchall(n, edge) {
  let graph = Array.from({ length: n + 1 }, () => Array(n + 1).fill(Infinity));
  for (let i = 1; i <= n; i++) {
    graph[i][i] = 0;
  }
  edge.forEach(([i, j, cost]) => {
    graph[i][j] = cost;
  });
  for (let k = 1; k <= n; k++) {
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= n; j++) {
        graph[i][j] = Math.min(graph[i][j], graph[i][k] + graph[k][j]);
      }
    }
  }
  console.log(graph);
}

FloydWarchall(5, [
  [1, 2, 2],
  [1, 3, 3],
  [1, 4, 1],
  [1, 5, 10],
  [2, 4, 2],
  [3, 4, 1],
  [3, 5, 1],
  [4, 5, 3],
]);
