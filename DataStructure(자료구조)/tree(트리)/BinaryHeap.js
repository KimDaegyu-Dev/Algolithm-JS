//내장 배열로 구현
//parent : n
//childe : 2n+1, 2n+2
class MaxBinaryHeap{
    constructor(){
        this.values = [];
    }
    swap(arr, idx1, idx2){
        return [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
    }
    insert(val){
        this.values.push(val);
        let currentIdx = this.values.length-1;
        let parentIdx = Math.floor((currentIdx-1)/2);

        while(currentIdx>=0 && this.values[parentIdx] < val){
            // console.log(currentIdx>=0 , this.values[parentIdx] < val);
            this.swap(this.values, parentIdx, currentIdx);
            currentIdx = parentIdx;
            parentIdx = Math.floor((currentIdx-1)/2);
        }

        // console.log(currentIdx>=0 , this.values[parentIdx] < val)
        console.log(this.values);
    }
    insertOpt(element){
        this.values.push(element);
        this.bubbleUp();
    }
    bubbleUp(){
        //강의 버전
        let idx = this.values.length - 1;
        const element = this.values[idx];
        while(idx > 0){
            let parentIdx = Math.floor((idx - 1)/2);
            let parent = this.values[parentIdx];
            if(element <= parent) break;
            this.values[parentIdx] = element;
            this.values[idx] = parent;
            idx = parentIdx;
        }
    }

    extractMax(){
        const values = this.values;
        const max = values[0];
        const end = values.pop();
        if(values.length>0){
            values[0] = end;
            this.sinkDown();
        }
        console.log(values);
        return max;
    }
    bubbleDown(){
        const values = this.values;
        if(values.length <= 1) return;

        let parentIdx = 0;
        let leftIdx = 2*parentIdx+1;
        let rightIdx = 2*parentIdx+2;
        
        let parent = values[parentIdx];
        let left = values[leftIdx];
        let right = values[rightIdx];

        while((left>parent || right>parent)&&(2*parentIdx+1<values.length || 2*parentIdx+2<values.length)){
            if(left > parent && right > parent) {
                if(left>right){
                    this.swap(values, leftIdx, parentIdx) 
                    parentIdx = leftIdx;
                } else {
                    this.swap(values, rightIdx, parentIdx);
                    parentIdx = rightIdx;
                }
            } else {
            if(left > parent){
                this.swap(values, leftIdx, parentIdx);
                parentIdx = leftIdx;
            }
            if(right > parent) {
                this.swap(values, rightIdx, parentIdx)
                parentIdx = rightIdx;
            };
            }
            leftIdx = 2*parentIdx+1;
            rightIdx = 2*parentIdx+2;
            left = values[leftIdx];
            right = values[rightIdx];
        }
    }
    sinkDown(){
        //버블다운과 동일 코드 하지만 강의 버전
        let idx = 0;
        const length = this.values.length;
        const element = this.values[0];
        while(true){
            let leftChildIdx = 2 * idx + 1;
            let rightChildIdx = 2 * idx + 2;
            let leftChild, rightChild;
            let swap = null;

            if(leftChildIdx < length){
                leftChild = this.values[leftChildIdx];
                if(leftChild > element) {
                    swap = leftChildIdx;
                }
            }
            if(rightChildIdx < length){
                rightChild = this.values[rightChildIdx];
                if(
                    (swap===null && rightChild > element) || 
                    (swap !== null && rightChild > leftChild)
                ){
                    swap = rightChildIdx;
                }
            }
            if(swap === null) break;
            this.values[idx] = this.values[swap];
            this.values[swap] = element;
            idx = swap;
        }
    }
}
let maxHeap = new MaxBinaryHeap();
maxHeap.insert(100);
maxHeap.insert(30);
maxHeap.insert(40);
maxHeap.insert(50);
maxHeap.insert(100);
maxHeap.insert(100);
maxHeap.insert(120);
maxHeap.insert(100);
maxHeap.insert(10);
maxHeap.extractMax();
maxHeap.extractMax();
maxHeap.extractMax();
maxHeap.extractMax();
maxHeap.extractMax();
maxHeap.extractMax();
maxHeap.extractMax();
maxHeap.extractMax();
maxHeap.extractMax();
maxHeap.extractMax();
maxHeap.extractMax();