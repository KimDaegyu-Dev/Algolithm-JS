//크루스칼 알고리즘
// 최소 신장 트리를 찾는 알고리즘
//가장 적은 비용으로 모든 노드를 연결하는 방법
// 그리디 알고리즘으로 분류된다.
// 신장트리란 : n개의 정점을 가지는 무향 그래프에서 n개의 정점과 n-1개의 간선으로 이루어진 트리
// 즉 모든 정점을 연결하되 사이클이 존재하지 않도록 n-1개의 간선을 선택하는 것 === 트리의 성립 조건
// 간선을 가중치의 오름차순으로 정렬한 뒤, 가장 작은 가중치부터 차례대로 사이클을 형성하지 않는 간선을 선택한다.
// 이때 사이클을 형성하는 간선을 제외하고 n-1개의 간선을 선택하면 최소 신장 트리가 완성된다.
// 간선 별로 비용 정보가 필요하다

// 노드, 노드, 비용
const cost = [
  [0, 1, 29],
  [1, 2, 16],
  [2, 3, 12],
  [3, 4, 22],
  [4, 5, 27],
  [5, 0, 10],
  [6, 1, 15],
  [6, 3, 18],
  [6, 4, 25],
  [6, 5, 13],
];
const n = 7;

class DisjoinSet {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, idx) => idx);
    this.rank = new Array(n).fill(0);
  }
  find(x) {
    if (this.parent[x] === x) return x;
    return (this.parent[x] = this.find(this.parent[x]));
  }
  union(x, y) {
    let parent = this.parent;
    let rank = this.rank;
    let rootX = this.find(x);
    let rootY = this.find(y);
    if (rootX === rootY) return;
    if (rank[rootX] > rank[rootY]) {
      parent[rootY] = rootX;
    } else if (rank[rootX] < rank[rootY]) {
      parent[rootX] = rootY;
    } else {
      parent[rootX] = rootY;
      rank[rootY]++;
    }
  }
}
function Krusckal(n, costs) {
  costs.sort((a, b) => a[2] - b[2]);
  let disjoinSet = new DisjoinSet(n);
  let find = disjoinSet.find.bind(disjoinSet);
  let union = disjoinSet.union.bind(disjoinSet);
  let order = [];
  costs.forEach(([node1, node2, cost], idx) => {
    if (find(node1) === find(node2)) return;
    order.push([idx, cost]);
    union(node1, node2);
  });
  console.log(order, disjoinSet.parent);
}

Krusckal(n, cost);
