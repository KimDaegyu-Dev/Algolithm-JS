class Node{
    constructor(val){
        this.val = val;
        this.next = null;
    }
}

class SinglyLinkedList{
    constructor(){
        this.length = 0;
        this.head = null;
        this.tail = null;
    }
    //insert
    push(val){
        let newNode = new Node(val);
        if(!this.head) {
            this.head = newNode;
            this.tail = newNode;
        }
        else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.length++;
        this.logList("push");
        return this;
    }
    unshift(val){
        let newNode = new Node(val);
        if(!this.head){
            this.head = newNode;
            this.tail = newNode;
        } else{
            newNode.next = this.head;
            this.head = newNode;
        }
        this.length++;

        this.logList("unshift");
        return this;
    }
    insert(index, val){
        if(index<0||index>this.length) return false;
        if(index===0) return !!this.unshift(val);
        if(index===this.length) return !!this.push(val);
        let newNode = new Node(val);
        let prevNode = this.get(index-1);
        newNode.next = prevNode.next;
        prevNode.next = newNode;
        
        this.length++;
        this.logList("insert");
        return true;

    }
    //remove
    pop(){
        if(!this.head) return undefined;
        let current = this.head
        let newTail = current;

        while(current.next){
            newTail = current;
            current = current.next;
        }
        this.tail = newTail;
        this.tail.next = null;
        this.length--;
        if(this.length===0){
            this.tail = null;
            this.head = null;
        }

        this.logList("pop");
        return current;
    }
    shift(){
        if(!this.head) return undefined;
        let currentHead = this.head;
        this.head = currentHead.next;
        this.length--;
        if(this.length===0){
            this.tail = null;
        }
        this.logList("shift");
        return currentHead;
    }
    remove(index){
        if(index<0||index>this.length) return undefined;
        if(index===this.length-1) return this.pop();
        if(index===0) return this.shift();

        let prevNode = this.get(index-1);
        let removeNode = prevNode.next;
        prevNode.next = removeNode.next;
        removeNode.next = null;
        this.length--;
        return removeNode;
    }
    //search
    get(index){
        if(index>this.length||index<0) return;
        let count = 0;
        let currentNode = this.head;
        while(count<index){
            count++;
            currentNode=currentNode.next;
        }
        return currentNode;
    }
    //update
    set(index, val){
        let updateNode = this.get(index);
        if(!updateNode) return false;
        updateNode.val = val;
        this.logList("set");
        return true;
    }
    //reverse
    reverse(){
        let next=null, prev=null, node = this.head;
        this.head = this.tail;
        this.tail = node;
        while(node){
            next = node.next;
            node.next= prev;
            prev = node;
            node = next;
        }
        this.logList("reverse");
        //강의 버전
        // for(let i=0;i<this.length;i++){
        //     내용은 똑같음
        // }
    }
    //디버깅, 로깅
    traverse(){
        var current = this.head;
        while(current){
            console.log(current.val);
            current = current.next;
        }
    }
    logList(methodName){
        let node = [];
        let currentNode = this.head;
        while(currentNode){
            node.push(currentNode.val)
            currentNode = currentNode.next;
        }
        let str = node.reduce((prev,current)=>{
            if(prev==="") return node[0];
            return prev+" -> "+current}, ""
        );
        let finalStr = methodName + ": (head) " + str + " (tail)";
        console.log(finalStr);
    }
}

let list = new SinglyLinkedList();
list.push(1);
list.push(2);
list.push(3);
list.push(4);
list.push(5);
list.reverse();
// list.insert(5,"hi");
// list.shift();
// list.set(3, "hi");
// list.pop();
// console.log(list.remove(2));
// list.shift();
// list.pop();
// list.shift();
// list.unshift(1);
// list.unshift(3);
// console.log(list);