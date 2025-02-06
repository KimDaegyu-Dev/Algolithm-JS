import { BinarySearchTree } from "./BinarySearchTree.js";

function breadthFirstSearch(tree){
    if(!tree.root) return [];
    const queue = [tree.root];
    const result = [];
    let dequeuedNode;
    while(queue.length !== 0){
        dequeuedNode = queue.shift();
        result.push(dequeuedNode.val);
        if(dequeuedNode.left) queue.push(dequeuedNode.left);
        if(dequeuedNode.right) queue.push(dequeuedNode.right);
    }
    console.log(result);
    return result;
}
let bst = new BinarySearchTree();
bst.insert(10);
bst.insert(6);
bst.insert(15);
bst.insert(3);
bst.insert(8);
bst.insert(20);
breadthFirstSearch(bst);