class WeightedGraph{
    constructor(){
        this.adjacencyList = {};
    }
    addVertex(vertex){
        if(!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
    }
    addEdge(vertex1, vertex2, weight){
        if(!this.adjacencyList[vertex1] || ! this.adjacencyList[vertex2]) return null;
        this.adjacencyList[vertex1].push({node: vertex2, weight});
        this.adjacencyList[vertex2].push({node: vertex1, weight});
    }
}

class PriorityQueue{
    constructor(){
        this.values = [];
    }
    enqueue(vertex, priority){
        this.values.push({vertex, priority});
        this.sort()
    }
    dequeue(){
        return this.values.shift();
    }
    sort(){
        this.values.sort((a,b)=> a.priority - b.priority);
    }
}

class Dijkstra{
    constructor(){
        this.adjacencyList = {};
    }
    addVertex(vertex){
        if(!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
    }
    addEdge(vertex1, vertex2, weight){
        if(!this.adjacencyList[vertex1] || ! this.adjacencyList[vertex2]) return null;
        this.adjacencyList[vertex1].push({node: vertex2, weight});
        this.adjacencyList[vertex2].push({node: vertex1, weight});
    }
    findShoretestPath(start, end){
        const nodes = new PriorityQueue();
        const distances = {};
        const previous = {};
        let path = [];
        let smallest;

        // build up initial state
        for(let vertex in this.adjacencyList){
            if(vertex === start){
                distances[vertex] = 0;
                nodes.enqueue(vertex, 0);
            }else{
                distances[vertex] = Infinity;
                nodes.enqueue(vertex, Infinity);
            }
            previous[vertex] = null;
        }
        // as long as there is something to visit
        while(nodes.values.length){
            smallest = nodes.dequeue().vertex;
            if(smallest === end){
                while(previous[smallest]){
                    path.push(smallest);
                    smallest = previous[smallest];
                }
                break;
            }
            if(smallest || distances[smallest] !== Infinity){
                for(let neighbor in this.adjacencyList[smallest]){
                    let nextNode = this.adjacencyList[smallest][neighbor];
                    let candidate = distances[smallest] + nextNode.weight;
                    let nextNeighbor = nextNode.node;
                    if(candidate < distances[nextNeighbor]){
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