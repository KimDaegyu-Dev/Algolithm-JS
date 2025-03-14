class Node{
    constructor(val, priority){
        this.val = val;
        this.priority = priority;
    }
}

class PriorityQueue{
    constructor(){
        this.values=[];
    }
    enqueue(val, priority){
        let newNode = new Node(val, priority);
        this.values.push(newNode);
        this.bubbleUp();
        return this;

    }
    bubbleUp(){
        let idx = this.values.length-1;
        let element = this.values[idx];

        while(idx>0){
            let parentIdx = Math.floor((idx-1)/2);
            let parent = this.values[parentIdx];

            if(element.priority >= parent.priority) break;

            this.values[parentIdx] = element;
            this.values[idx] = parent;
            idx = parentIdx
        }
    }
    dequeue(){
        //엣지 케이스 처리
        let min = this.values[0];
        let end = this.values.pop();
        if(this.values.length>0){
            this.values[0] = end;
            this.bubbleDown();
        }
        return min;
    }
    bubbleDown(){
        let idx = 0;
        let element = this.values[idx];
        let length = this.values.length;
        while(true){
            let leftChildIdx = idx*2 + 1;
            let rightChildIdx = idx*2 + 2;
            let leftChild, rightChild;
            let swap = null;
            
            if(leftChildIdx < length){
                leftChild = this.values[leftChildIdx];
                if(leftChild.priority<element.priority) {
                    swap = leftChildIdx;
                }
            }
            if(rightChildIdx < length){
                rightChild = this.values[rightChildIdx];
                if(
                    (swap===null&&rightChild.priority<element.priority) || 
                    (swap!==null&&rightChild.priority<leftChild)
                )
                {
                    swap = rightChildIdx;
                }
            }

            if(swap===null) break;

            this.values[idx] = this.values[swap];
            this.values[swap] = element;
            idx = swap;
        }
    }
}

let ER = new PriorityQueue();
ER.enqueue("common cold", 5);
ER.enqueue("gunshot wound", 1);
ER.enqueue("high fever", 4);
ER.enqueue("broken arm", 2);
ER.enqueue("glass in foot", 3);
console.log(ER);
console.log(ER.dequeue());
console.log(ER.dequeue());
console.log(ER.dequeue());
console.log(ER.dequeue());
console.log(ER.dequeue());