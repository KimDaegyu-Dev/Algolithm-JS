//https://www.acmicpc.net/problem/1260
class Graph {
  constructor() {
    this.adjencyList = {};
  }
  addVertex(v) {
    if (!this.adjencyList[v]) this.adjencyList[v] = [];
  }
  addEdge(v1, v2) {
    if (!this.adjencyList[v1]) this.addVertex(v1);
    if (!this.adjencyList[v2]) this.addVertex(v2);
    this.adjencyList[v1].push(v2);
    this.adjencyList[v1];
    this.adjencyList[v2].push(v1);
    this.adjencyList[v2];
  }
  getVertex(v) {
    if (!this.adjencyList[v]) return null;
    return this.adjencyList[v];
  }
  bfs(startNode) {
    let queue = [startNode];
    let result = [];
    let visited = [];
    visited[startNode] = true;
    let currentVertex;
    while (queue.length) {
      currentVertex = queue.shift();
      result.push(currentVertex);
      this.adjencyList[currentVertex].forEach((neighbor) => {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          queue.push(neighbor);
        }
      });
    }
    return result;
  }
  dfs(startNode) {
    let result = [];
    let visited = [];
    visited[startNode] = true;
    let stack = [startNode];
    let currentNode;
    while (stack.length) {
      currentNode = stack.pop();
      result.push(currentNode);
      this.adjencyList[currentNode].forEach((neighbor) => {
        console.log(neighbor);
        if (!visited[neighbor]) {
          stack.push(neighbor);
          console.log(stack);
          visited[neighbor] = true;
        }
      });
    }
    return result;
  }
}

let g = new Graph();
g.addEdge(1, 2);
g.addEdge(1, 3);
g.addEdge(1, 4);
g.addEdge(2, 4);
g.addEdge(3, 4);
console.log(g.dfs(1));
