//더 맵게
function solution(scoville, K) {
  var answer = 0;

  let heap = new MinHeap();
  scoville.forEach((val) => {
    heap.push(val);
    // console.log(heap);
  });
  let cnt = 0;
  while (heap.heap[0] < K) {
    if (heap.heap.length === 1) return -1;
    let smallest = heap.pop() + heap.pop() * 2;
    // console.log(heap, smallest);
    heap.push(smallest);
    cnt++;
  }
  return cnt;
}
class MinHeap {
  constructor() {
    this.heap = [];
  }
  size() {
    return this.heap.length;
  }
  leftChildIdx(idx) {
    return idx * 2 + 1;
  }
  rightChildIdx(idx) {
    return idx * 2 + 2;
  }
  parentIdx(idx) {
    return Math.floor((idx - 1) / 2);
  }
  swap(idx1, idx2) {
    let heap = this.heap;
    let temp = heap[idx1];
    heap[idx1] = heap[idx2];
    heap[idx2] = temp;
  }
  push(val) {
    this.heap.push(val);
    this.bubbleUp();
    return this.size();
  }
  pop() {
    if (this.size() === 0) return undefined;
    if (this.size() === 1) return this.heap.pop();
    let returnVal = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();
    return returnVal;
  }
  bubbleUp() {
    let childIdx = this.size() - 1;
    let parentIdx = this.parentIdx(childIdx);
    while (this.heap[childIdx] < this.heap[parentIdx]) {
      this.swap(childIdx, parentIdx);
      childIdx = parentIdx;
      parentIdx = this.parentIdx(parentIdx);
    }
  }
  bubbleDown() {
    let idx = 0;
    let heap = this.heap;
    while (true) {
      let parent = idx;
      let leftChild = this.leftChildIdx(idx);
      let rightChild = this.rightChildIdx(idx);
      let swap = null;
      if (heap[leftChild] < heap[parent]) {
        swap = leftChild;
      }
      if (
        (swap === null && heap[rightChild] < heap[parent]) ||
        (swap !== null && heap[leftChild] > heap[rightChild])
      ) {
        swap = rightChild;
      }
      if (swap === null) break;
      this.swap(idx, swap);
      idx = swap;
    }
  }
}
//실패 버전 (새로 넣은 값이 기존에 있던 값보다 작으면 못 찾음)
// function solution(scoville, K) {
//     var answer = 0;
//     scoville.sort((a,b)=>a-b);
//     let list = new List();
//     scoville.forEach((val)=>{
//         list.push(val);
//     })

//     let cnt = 0;
//     while(list.head.val < K){
//         if(list.length===1) return -1;
//         let nextFood = list.shift()+list.shift()*2;
//         console.log(list, nextFood);
//         list.push(nextFood);
//         cnt++;
//     }
//     return cnt;
// }
// class Node{
//     constructor(val){
//         this.val = val;
//         this.next = null;
//         this.prev = null;
//     }
// }
// class List{
//     constructor(){
//         this.head = null;
//         this.tail = null;
//         this.length = 0;
//     }
//     push(val){
//         if(!this.head){
//             let newNode = new Node(val);
//             this.head = newNode;
//             this.tail = newNode;
//             this.length++;
//         }
//         else {
//             let newNode = new Node(val);
//             newNode.prev = this.tail;
//             this.tail.next = newNode;
//             this.tail = newNode;
//             this.length++;
//         }
//     }
//     shift(){
//         if(this.length === 0) return undefined;
//         let deleteNode = this.head;
//         this.head = this.head.next;
//         this.head.prev = null;
//         deleteNode.next = null;
//         this.length--;
//         return deleteNode.val;
//     }
// }
