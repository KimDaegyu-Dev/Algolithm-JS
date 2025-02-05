class Node{
    constructor(val){
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree{
    constructor(){
        this.root = null;
    }
    insert(val){
        let newNode = new Node(val);
        if(!this.root){
            this.root = newNode;
            return this;
        }
        if(this.root.val === val) return undefined;
        let currentNode = this.root;
        while(currentNode){
            if(currentNode.val < val) {
                if(currentNode.right) {
                    currentNode = currentNode.right;
                }
                else {
                    currentNode.right = newNode;
                    return this;
                }
            } 
            else {
                if(currentNode.left) {
                    currentNode = currentNode.left;
                }
                else {
                    currentNode.left = newNode;
                    return this;
                }
            }
        }
    }
    find(val){
        if(!this.root) return null;
        let currentNode = this.root
        while(currentNode){
            if(currentNode.val === val) return true;
            if(currentNode.val < val){
                if(!currentNode.right) return false;
                currentNode = currentNode.right;
            }
            if(currentNode.val > val){
                if(!currentNode.left) return false;
                currentNode = currentNode.left;
            }
        }
        return false;
    }
    
    logTree(){
        if(!this.root) return;
        function recursive(currentNode){
            if(!currentNode) return;
            console.log("left :", currentNode.left?.val, "middle :", currentNode?.val, "left :", currentNode.right?.val);
            recursive(currentNode.left);
            recursive(currentNode.right);
        }
        recursive(this.root);
        
    }
}
let bst = new BinarySearchTree();

console.log(bst.insert(3));
bst.insert(3);
console.log(bst.insert(4));
console.log(bst.insert(2));
console.log(bst.find(2));
bst.logTree();