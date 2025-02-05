class Node{
    constructor(val){
        this.val = val;
        this.next = null;
        this.prev = null;
    }
}
class DoublyLinkedList{
    constructor(){
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    push(val){
        let newNode = new Node(val);
        if(this.length===0){
            this.tail = newNode;
            this.head = newNode;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
        this.length++;
        return this;
    }
    pop(){
        if(this.length===0) return undefined;
        let oldTail = this.tail;
        if(this.length===1) {
            this.head = null;
            this.tail = null;
        } else {
            let newTail = oldTail.prev;
            oldTail.prev = null;
            newTail.next = null;
            this.tail = newTail;
        }
        this.length--;
        return oldTail;
    }
    shift(){
        if(this.length===0) return undefined;
        let oldHead = this.head;
        if(this.length===1){
            this.head = null;
            this.tail = null;
        } else {
            let newHead = oldHead.next;
            oldHead.next = null;
            newHead.prev = null;
            this.head = newHead;
        }
        this.length--;
        return oldHead;
    }
    unshift(val){
        let newNode = new Node(val);
        if(this.length===0){
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.head.prev = newNode;
            newNode.next = this.head;
            this.head = newNode;
        }
        this.length++;
        return this;
    }
    get(index){
        if(index<0 || index>=this.length) return null;
        let currentNode;
        if(index<=Math.floor(this.length-1/2)){
            currentNode = this.head;
            for(let i=0; i<index; i++){
                currentNode = currentNode.next;
            }
        } else {
            currentNode = this.tail;
            for(let i=0; i<index; i++){
                currentNode = currentNode.prev;
            }
        }
        return currentNode;
    }
    set(index, val){
        let updateNode = this.get(index);
        if(updateNode){
            updateNode.val = val;
            return true;
        }
        return false;
    }
    insert(index, val){
        if(index<0 || index>this.length) return false;
        if(index===0) return !!this.unshift(val);
        if(index===this.length) return !!this.push(val);
        let insertPrevNode = this.get(index-1);
        let insertNextNode = insertPrevNode.next;
        let insertNode = new Node(val);

        insertPrevNode.next = insertNode;
        insertNextNode.prev = insertNode;
        insertNode.next = insertNextNode;
        insertNode.prev = insertPrevNode;

        this.length++;
        return true;
    }
    remove(index){
        if(index<0 || index>=this.length) return undefined;
        if(index===0) return this.shift();
        if(index===this.length-1) return this.pop();

        let removeNode = this.get(index);
        let removeNextNode = removeNode.next;
        let removePrevNode = removeNode.prev;

        removeNextNode.prev = removePrevNode;
        removePrevNode.next = removeNextNode;
        removeNode.next = null;
        removeNode.prev = null;
        
        this.length--;
        return removeNode;
    }
}