//Array Implementation
// var stack = [];
// stack.push("google"); // or stack.unshift()
// stack.push("instagram"); // or stack.unshift()
// stack.push("youtube"); // or stack.unshift()
// //{google, instagram, youtube}
// stack.pop(); // or stack.shift()
//Linked List Implementation
class Node {
    constructor(val){
        this.val = val;
        this. next = null;
    }
}
class Stack{
    constructor(){
        this.length = 0;
        this.first = null;
        this.last = null 
    }
    push(val){
        let newNode = new Node(val);
        if(this.length === 0) {
            this.first = newNode;
            this.last = newNode;
        } else {
            newNode.next = this.first;
            this.first = newNode;
        }
        this.length++;
        this.logStack("push");
        return this.length;
    }
    pop(){
        if(this.length===0) return undefined;
        let deletedNode = this.first;
        if(this.length===1){
            this.last = null;
        }
        this.first = deletedNode.next;
        deletedNode.next = null;

        this.length--;
        this.logStack("pop");
        return deletedNode.val;
    }
    logStack(methodName){
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
        console.log(finalStr, "length:", this.length);
    }
}
let stack = new Stack();

stack.push(2);
stack.push(3);
stack.pop();
stack.pop();