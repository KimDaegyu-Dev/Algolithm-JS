class WeightedGraph {
  constructor() {
    this.adjacencyList = {};
  }
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  }
  addEdge(vertex1, vertex2, weight) {
    if (!this.adjacencyList[vertex1] || !this.adjacencyList[vertex2])
      return null;
    this.adjacencyList[vertex1].push({ node: vertex2, weight });
    this.adjacencyList[vertex2].push({ node: vertex1, weight });
  }
}

class PriorityQueue {
  constructor() {
    this.values = [];
  }
  enqueue(vertex, priority) {
    this.values.push({ vertex, priority });
    this.sort();
  }
  dequeue() {
    return this.values.shift();
  }
  sort() {
    this.values.sort((a, b) => a.priority - b.priority);
  }
}

class Dijkstra {
  constructor() {
    this.adjacencyList = {};
  }
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  }
  addEdge(vertex1, vertex2, weight) {
    if (!this.adjacencyList[vertex1] || !this.adjacencyList[vertex2])
      return null;
    this.adjacencyList[vertex1].push({ node: vertex2, weight });
    this.adjacencyList[vertex2].push({ node: vertex1, weight });
  }
  findShoretestPath(start, end) {
    const nodes = new PriorityQueue();
    const distances = {};
    const previous = {};
    let path = [];
    let smallest;

    // build up initial state
    for (let vertex in this.adjacencyList) {
      if (vertex === start) {
        distances[vertex] = 0;
        nodes.enqueue(vertex, 0);
      } else {
        distances[vertex] = Infinity;
        nodes.enqueue(vertex, Infinity);
      }
      previous[vertex] = null;
    }
    // as long as there is something to visit
    while (nodes.values.length) {
      smallest = nodes.dequeue().vertex;
      if (smallest === end) {
        while (previous[smallest]) {
          path.push(smallest);
          smallest = previous[smallest];
        }
        break;
      }
      if (smallest || distances[smallest] !== Infinity) {
        for (let neighbor in this.adjacencyList[smallest]) {
          let nextNode = this.adjacencyList[smallest][neighbor];
          let candidate = distances[smallest] + nextNode.weight;
          let nextNeighbor = nextNode.node;
          if (candidate < distances[nextNeighbor]) {
            distances[nextNeighbor] = candidate;
            previous[nextNeighbor] = smallest;
            nodes.enqueue(nextNeighbor, candidate);
          }
        }
      }
    }
    return path.concat(smallest).reverse();
  }
}

const graph = new WeightedGraph();
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");
graph.addVertex("F");

graph.addEdge("A", "B", 4);
graph.addEdge("A", "C", 2);
graph.addEdge("B", "E", 3);
graph.addEdge("C", "D", 2);
graph.addEdge("C", "F", 4);
graph.addEdge("D", "E", 3);
graph.addEdge("D", "F", 1);
graph.addEdge("E", "F", 1);

const dijkstra = new Dijkstra();

dijkstra.addVertex("A");
dijkstra.addVertex("B");
dijkstra.addVertex("C");
dijkstra.addVertex("D");
dijkstra.addVertex("E");
dijkstra.addVertex("F");

dijkstra.addEdge("A", "B", 4);
dijkstra.addEdge("A", "C", 2);
dijkstra.addEdge("B", "E", 3);
dijkstra.addEdge("C", "D", 2);
dijkstra.addEdge("C", "F", 4);
dijkstra.addEdge("D", "E", 3);
dijkstra.addEdge("D", "F", 1);
dijkstra.addEdge("E", "F", 1);

console.log(dijkstra.findShoretestPath("A", "E")); // ["A", "C", "D", "F", "E"]

// 다익스트라 알고리즘 시간 복잡도: O(V^2)
function DaikstraNoOpt(n, edges, start) {
  const graph = new Map();
  const dist = new Array(n + 1).fill(Infinity);
  const visited = new Array(n + 1).fill(false);

  // 그래프 생성
  for (let i = 1; i <= n; i++) {
    graph.set(i, []);
  }
  edges.forEach(([from, to, cost]) => {
    graph.get(from).push([to, cost]);
  });

  dist[start] = 0;

  const smallestNode = () => {
    let min = Infinity;
    let idx = 0;
    for (let i = 0; i < dist.length; i++) {
      if (!visited[i] && dist[i] < min) {
        min = dist[i];
        idx = i;
      }
    }
    return idx;
  };

  for (let i = 0; i < n; i++) {
    const current = smallestNode();
    visited[current] = true;
    graph.get(current).forEach(([next, cost]) => {
      dist[next] = Math.min(dist[next], dist[current] + cost);
    });
  }
}

// 다익스트라 알고리즘 시간 복잡도: O(ElogV)
function Daikstra(n, edges, start) {
  const graph = new Map();
  const dist = new Array(n + 1).fill(Infinity);
  const visited = new Array(n + 1).fill(false);

  // 그래프 생성
  for (let i = 1; i <= n; i++) {
    graph.set(i, []);
  }
  edges.forEach(([from, to, cost]) => {
    graph.get(from).push([to, cost]);
  });

  dist[start] = 0;

  const pq = new PriorityQueue();
  pq.enqueue(start, 0);

  while (pq.values.length) {
    const [current, currentCost] = pq.dequeue();
    if (visited[current]) continue;
    visited[current] = true;
    graph.get(current).forEach(([next, cost]) => {
      if (dist[next] > currentCost + cost) {
        dist[next] = currentCost + cost;
        pq.enqueue(next, dist[next]);
      }
    });
  }
}

daikstra(6, [
  [1, 2, 2],
  [1, 3, 5],
  [1, 4, 1],
  [2, 3, 3],
  [2, 4, 2],
  [3, 2, 3],
  [3, 6, 5],
  [4, 3, 3],
  [4, 5, 1],
  [5, 3, 1],
  [5, 6, 2],
]);
// [0, 2, 5, 1, 2, 4]
