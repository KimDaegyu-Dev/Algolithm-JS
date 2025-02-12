//Adjacency List
class Graph {
    constructor() {
        this.adjacencyList = {};
    }
    addVertex(vertex){
        if(!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
    }
    addEdge(v1, v2){
        if(!this.adjacencyList[v1] || !this.adjacencyList[v2]) return false;
        this.adjacencyList[v1].push(v2);
        this.adjacencyList[v2].push(v1);
        return this.adjacencyList;
    }
    removeEdge(v1, v2){
        if(!this.adjacencyList[v1] || !this.adjacencyList[v2]) return false;
        this.adjacencyList[v1] = this.adjacencyList[v1].filter(v => v !== v2);
        this.adjacencyList[v2] = this.adjacencyList[v2].filter(v => v !== v1);
    }
    removeVertex(vertex){
        if(!this.adjacencyList[vertex]) return false;
        while(this.adjacencyList[vertex].length){
            const adjacencyVertex = this.adjacencyList[vertex].pop();
            this.removeEdge(vertex, adjacencyVertex);
        }
        delete this.adjacencyList[vertex];
    }
    depthFirstRecursive(vertex){
        let result = [];
        let visited = {};
        const adjacencyList = this.adjacencyList;
        (function dfs(vertex){
                if(!vertex) return null;
                visited[vertex] = true;
                result.push(vertex);
                adjacencyList[vertex].forEach(neighbor => {
                    console.log(neighbor);
                    if(!visited[neighbor]){
                        return dfs(neighbor);
                    }
                });
                // for(let neighbor of adjacencyList[vertex]){
                //     console.log(neighbor);
                //     if(!visited[neighbor]){
                //         dfs(neighbor);
                //     }
                // }
            })(vertex);
        return result;
    }
    depthFirstIterative(start){
        let stack = [start];
        let result = [];
        let visited = {
            [start] : true
        };
        let currentVertex;
        while(stack.length){
            currentVertex = stack.pop();
            console.log(currentVertex);
            result.push(currentVertex);
            this.adjacencyList[currentVertex].forEach((neighbor) => {
                if(!visited[neighbor]){
                    visited[neighbor] = true;
                    stack.push(neighbor);
                }
            });
        }
        return result;  
    }
    breadthFirstSearch(start){
        let queue =[start];
        let result = [];
        let visited = {
            [start] : true,
        };
        let currentVertex;
        while(queue.length){
            currentVertex = queue.shift();
            result.push(currentVertex);
            //반대 방향 this.adjacencyList[currentVertex].slice().reverse().forEach
            this.adjacencyList[currentVertex].forEach(neighbor => {
                if(!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.push(neighbor);
                }
            })
        }
        return result;
    }
}

let g = new Graph();

g.addVertex("A")
g.addVertex("B")
g.addVertex("C")
g.addVertex("D")
g.addVertex("E")
g.addVertex("F")


g.addEdge("A", "B")
g.addEdge("A", "C")
g.addEdge("B","D")
g.addEdge("C","E")
g.addEdge("D","E")
g.addEdge("D","F")
g.addEdge("E","F")
console.log(g.adjacencyList);
// console.log(g.depthFirstRecursive("A"));
console.log(g.depthFirstIterative("A"));
// console.log(g.breadthFirstSearch("A"));

//          A
//        /   \
//       B     C
//       |     |
//       D --- E
//        \   /
//          F
