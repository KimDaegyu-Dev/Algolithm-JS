import { BinarySearchTree } from "./BinarySearchTree.js";

class DepthFirstSearch{
    constructor(){
        this.tree = new BinarySearchTree();
    }
    preOrder(tree = this.tree){
        if(!tree) return undefined;
        let visited = [];
        let current = tree.root;
        function traverse(currentNode){
            if(!currentNode) return;
            visited.push(currentNode.val);
            if(currentNode.left) traverse(currentNode.left);
            if(currentNode.right) traverse(currentNode.right);
        }
        traverse(current);
        console.log(visited);
        return visited;
    }

    inOrder(tree = this.tree){
        if(!tree) return undefined;
        let visited = [];
        let current = tree.root;
        function traverse(currentNode){
            if(!currentNode) return;
            if(currentNode.left) traverse(currentNode.left);
            visited.push(currentNode.val);
            if(currentNode.right) traverse(currentNode.right);
        }
        traverse(current);
        console.log(visited);
        return visited;
    }

    postOrder(tree = this.tree){
        if(!tree) return undefined;
        let visited = [];
        let current = tree.root;
        function traverse(currentNode){
            if(!currentNode) return;
            if(currentNode.left) traverse(currentNode.left);
            if(currentNode.right) traverse(currentNode.right);
            visited.push(currentNode.val);
        }
        traverse(current);
        console.log(visited);
        return visited;
    }
}
let dfs = new DepthFirstSearch();
let bst = dfs.tree;
bst.insert(10);
bst.insert(6);
bst.insert(15);
bst.insert(3);
bst.insert(8);
bst.insert(20);
//        10
//    6       15 
// 3    8        20
dfs.preOrder();
dfs.inOrder();
dfs.postOrder();