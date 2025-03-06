//벨만포드 알고리즘
//시작점에서 다른 모든 정점까지의 최단 경로를 구하는 알고리즘
//음수 가중치가 있는 그래프에서도 사용 가능
//시간복잡도: O(VE)

const edge = [
  [1, 2, 2],
  [1, 3, 3],
  [1, 4, 1],
  [1, 5, 10],
  [2, 4, 2],
  [3, 4, 1],
  [3, 5, 1],
  [4, 5, 3],
];
const n = 5;
const INF = Infinity;

function BellmanFord(n, edge, start) {
  let dist = Array(n + 1).fill(INF);
  dist[start] = 0;

  for (let i = 1; i <= n - 1; i++) {
    edge.forEach(([from, to, cost]) => {
      if (dist[from] !== INF && dist[to] > dist[from] + cost) {
        dist[to] = dist[from] + cost;
      }
    });
  }

  edge.forEach(([from, to, cost]) => {
    if (dist[from] !== INF && dist[to] > dist[from] + cost) {
      console.log("음수 사이클이 존재합니다.");
    }
  });

  return dist;
}

console.log(BellmanFord(n, edge, 1)); // [Infinity, 0, 2, 3, 1, 4]
