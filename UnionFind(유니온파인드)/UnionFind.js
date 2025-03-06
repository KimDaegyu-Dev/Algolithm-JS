//Disjoint-set을 구현할 때 사용하는 알고리즘
//union
function unionLowPerf(parent, x, y) {
  x = find(parent, x);
  y = find(parent, y);
  if (x !== y) {
    parent[y] = x;
  }
}

//find
function findLowPerf(parent, x) {
  if (parent[x] === x) return x;
  return (parent[x] = find(parent, parent[x]));
}

//트리 구조가 완전 비대칭인 경우
// ex)연결리스트 형태
// 트리의 높이가 최대가 된다.
// 원소의 개수가 N일 때, 트리의 높이는 N-1이므로 union()과 find() 함수의 시간복잡도는 모두 O(N)이 된다.
// 배열로 구현하는 것보다 비효율적이다.

//make set : 각 원소를 개별 집합으로 만들고, union 연산을 사용할 때 두 집합을 합치는 방법
//find set : 특정 원소가 속한 집합을 찾기
//union : 두 원소가 포함된 집합을 하나로 합치기
function make(n) {
  let parent = [];
  for (let i = 1; i <= n; i++) {
    parent[i] = i;
  }
  return parent;
}

//경로 압축(Path Compression)
//find() 함수를 재귀적으로 호출한 뒤에 부모 테이블 값을 바로 갱신한다.
function find(parent, x) {
  if (parent[x] === x) return x;
  parent[x] = find(parent, parent[x]);
  return parent[x];
}

const parent = make(11);
const rank = Array.from({ length: 11 }, () => 0);
union(parent, 1, 2);
union(parent, 2, 3);
union(parent, 3, 4); // 1 -> 2 -> 3 -> 4

console.log(find(parent, 4)); // 1
console.log(find(parent, 3)); // 1
console.log(find(parent, 2)); // 1
console.log(find(parent, 1)); // 1

//Union 최적화
function union(parent, x, y) {
  x = find(parent, x);
  y = find(parent, y);
  // 두 노드의 root가 같으면 이미 같은 트리에 속한 것
  if (x === y) return;
  // union-by-rank 최적화
  //  항상 높이가 더 낮은 트리를 높이가 높은 트리 밑에 넣음.
  // --> 높이가 더 높은 쪽을 root로 함.
  if (rank[x] < rank[y]) {
    parent[x] = y;
  } else {
    parent[y] = x;
    // 두 높이가 같은 경우 랭크를 1 증가시켜줌
    if (rank[x] === rank[y]) {
      rank[x]++;
    }
  }
}

class DisjoinSet {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, idx) => idx);
    this.rank = new Array(n).fill(0);
  }
  find(x) {
    if (this.parent[x] === x) return x;
    return (this.parent[x] = find(this.parent[x]));
  }
  union(x, y) {
    let parent = this.parent;
    let rank = this.rank;
    let rootX = find(x);
    let rootY = find(y);
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

//Union-Find를 활용한 사이클 판별
let cycle = [];
for (let i = 0; i < edges.length; i++) {
  let [a, b] = edges[i];
  if (find(a) === find(b)) {
    cycle.push(i);
  } else {
    union(a, b);
  }
}

//Union-Find를 활용한 두 원소가 같은 집합에 속하는지 판별
function isSameParent(a, b) {
  return find(a) === find(b);
}
