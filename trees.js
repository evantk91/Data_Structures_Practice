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

let node1 = new Node(1)
let node2 = new Node(2)
let node3 = new Node(3) 

let tree = new Tree(1)

console.log(node1.setLeftChild(node2))
console.log(node1.setRightChild(node3))
console.log(tree)