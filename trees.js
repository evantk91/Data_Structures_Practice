class Node {
    constructor(value = null) {
        this.value = value;
        this.left = null;
        this.right = null;
    }

    getValue = function() {
        return this.value;
    }

    setValue = function(value) {
        this.value = value;
    }

    setLeftChild = function(node) {
        this.left = node;
    }

    setRightChild = function(node) {
        this.right = node;
    }

    getLeftChild = function() {
        return this.left;
    }

    getRightChild = function() {
        return this.right;
    }

    hasLeftChild = function() {
        return this.left !== null;
    }

    hasRightChild = function() {
        return this.right !== null;
    }
}

class Tree {
    constructor(value) {
        this.root =  new Node(value);
    }

    getRoot = function() {
        return this.root;
    }
}

class Stack {
    constructor() {
       this.list = [];
    }

    push = function(value) {
       this.list.push(value);
    }

    pop = function() {
       return this.list.pop();
    }

    top = function() {
       if(this.list.length > 0) {
          return this.list[this.list.length - 1]    
       } else {
          return null; 
       }
    }

    isEmpty = function() {
       return this.list.length === 0; 
    }
}

function preOrderDFS(tree) {
    let visitOrder = [];
    let stack = new Stack();
    let node = tree.getRoot();

    stack.push(node);
    node = stack.top();
    visitOrder.push(node.getValue());

    let count = 0;
    let loopLimit = 7;
    while(node) {
        count += 1;
        if(node.hasLeftChild()) {
           node = node.getLeftChild();
           //add to top of stack
           stack.push(node);
           node = stack.top();
           //add to visit order
           visitOrder.push(node.getValue());
        } else if(node.hasRightChild()) {
           node = node.hasRightChild();
           //add to top of stack
           stack.push(node);
           node = stack.top();
           //add to visit order
           visitOrder.push(node.getValue());
        } else {
           stack.pop()
           if(!stack.isEmpty()) {
              node = stack.top()
           } else {
              node = null; 
           }
        }
    }

    return visitOrder;
}

let tree = new Tree('apple')
let node2 = new Node('banana')
tree.getRoot().setLeftChild(node2)
let node3 = new Node('cherry')
tree.getRoot().setRightChild(node3)
let node4 = new Node('dates')
tree.getRoot().getLeftChild().setLeftChild(node4) 

console.log(preOrderDFS(tree))