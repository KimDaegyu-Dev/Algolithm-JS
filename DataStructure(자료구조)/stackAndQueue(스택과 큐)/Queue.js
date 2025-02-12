//Array Implementation
// let queue = [];
// queue.push("First");  // or unshif
// queue.push("Sencond");  // or unshif
// queue.push("Third");  // or unshif
// queue.shift();  // or pop
// queue.shift();  // or pop
// queue.shift();  // or pop
//Linked List Implementation
class Node{
    constructor(val){
        this.val = val;
        this.next = null;
    }
}
class Queue{
    constructor(){
        this.first = null;
        this.last = null;
        this.size = 0;
    }
    enqueue(val){
        let newNode = new Node(val);
        if(this.size === 0){
            this.first = newNode;
            this.last = newNode;
        } else{
            this.last.next = newNode;
            this.last = newNode;
        }
        this.size++;
        this.logQueue("enqueue");
        return this.size;
    }

    dequeue(){
        if(this.size === 0) return null;
        if(this.size === 1) this.last = null;

        let deletedNode = this.first;
        this.first = deletedNode.next;
        deletedNode.next = null;

        this.size--;
        this.logQueue("dequeue");
        return deletedNode.val;
    }


    logQueue(methodName){
        let node = [];
        let currentNode = this.first;
        while(currentNode){
            node.push(currentNode.val)
            currentNode = currentNode.next;
        }
        let str = node.reduce((prev,current)=>{
            if(prev==="") return node[0];
            return prev+" -> "+current}, ""
        );
        let finalStr = methodName + ": (first) " + str + " (last)";
        console.log(finalStr, "length:", this.size);
    }
}

let queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
queue.dequeue();
queue.dequeue();
queue.dequeue();