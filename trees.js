class Node {
    constructor(value = null) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.level = null;
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

    printTree = function() {
        let level = 0;
        let queue = new Deque();
        let visitOrder = [];

        let node = this.getRoot();
        node.level = level;
        queue.addRear([node, level]);
 
        while(queue.items.length > 0) {
           [node, level] = queue.removeFront();

           if(node === null) {
              visitOrder.push(["<empty>", level]);
              continue;
           }
           visitOrder.push([node, level]);

           if(node.hasLeftChild()) {
              queue.addRear([node.getLeftChild(), level + 1]);
           } else {
              queue.addRear([null, level + 1])
           }

           if(node.hasRightChild()) {
              queue.addRear([node.getRightChild(), level + 1]);
           } else {
              queue.addRear([null, level + 1])
           }
        }

        let s = "Tree\n";
        let previousLevel = -1;
        for(let i = 0; i < visitOrder.length; i++) {
            [node, level] = visitOrder[i];
            if(level === previousLevel) {
                s += " | " + (node === "<empty>" ? "<empty>" : String(node.value));
            } else {
                s += "\n" + (node === "<empty>" ? "<empty>" : String(node.value));
                previousLevel = level;
            }
        }
        console.log(s);
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

class State {
    constructor(node) {
        this.node = node;
        this.visitedLeft = False;
        this.visitedRight = False;
    }

    getNode = function() {
        return this.node;
    }

    getVisitedLeft = function() {
        return this.visitedLeft;
    }

    getVisitedRight = function() {
        return this.visitedRight;
    }

    setVisitedLeft = function() {
        this.visitedLeft === true;
    }

    setVisitedRight = function() {
        this.visitedRight === true;
    }
}

class Deque {
   constructor() {
      this.items = [];    
   }

   isEmpty() {
      return !Boolean(this.items.length); 
   }

   addFront(item) {
      this.items.unshift(item);    
   }
   
   addRear(item) {
      this.items.push(item); 
   }

   removeFront() {
      return this.items.shift();    
   }

   removeRear() {
      return this.items.pop();    
   }

   size() {
      return this.items.length; 
   }
}

function preOrderDFS(tree) {
    let visitOrder = [];
    let stack = new Stack();
    let node = tree.getRoot();

    visitOrder.push(node.getValue());
    let state = new State(node);
    stack.push(state);

    let count = 0;
    while(node) {
        count += 1;
        if(node.hasLeftChild() && !state.getVisitedLeft()) {
           state.setVisitedLeft();
           node = node.getLeftChild();
           //add visited node to visit order
           visitOrder.push(node.getValue());
           //add new state for next node to top of stack
           state = new State(node);
           stack.push(state);
        } else if(node.hasRightChild() && !state.getVisitedRight()) {
           state.setVisitedRight(); 
           node = node.hasRightChild();
           //add visited node to visit order
           visitOrder.push(node.getValue());
           //add to top of stack
           state = new State(node);
           stack.push(node);
        } else {
           stack.pop()
           if(!stack.isEmpty()) {
               state = stack.pop();
              node = state.getNode();
           } else {
              node = null; 
           }
        }
    }

    return visitOrder;
}

function preOrderRecursive(tree) {
    let visitOrder = [];
    let root = tree.getRoot();

    function traverse(node) {
        if(node) {
            visitOrder.push(node.getValue());
            traverse(node.getLeftChild());
            traverse(node.getRightChild());
        }
    }

    traverse(root);
    return visitOrder;
}

function inOrderRecursive(tree) {
    let visitOrder = [];
    let root = tree.getRoot();

    function traverse(node) {
        if(node) {
            traverse(node.getLeftChild());
            visitOrder.push(node.getValue());
            traverse(node.getRightChild());
        }
    }

    traverse(root);
    return visitOrder;
}

function postOrderRecursive(tree) {
    let visitOrder = [];
    let root = tree.getRoot();

    function traverse(node) {
        if(node) {
            traverse(node.getLeftChild());
            traverse(node.getRightChild());
            visitOrder.push(node.getValue());
        }
    }

    traverse(root);
    return visitOrder;
}

function BFS(tree) {
    //initialize visit order and queue
    let visitOrder = [];
    let queue = new Deque();
    //start at the root of the tree
    let node = tree.getRoot();
    //add node to queue
    queue.addRear(node)
    console.log(queue.size())
    //while queue is not empty
    while(queue.size()) {
        //remove node from front of queue and add to visit order
        node = queue.removeFront();
        visitOrder.push(node.value);
        //add left child to queue
        if(node.hasLeftChild()) {
            queue.addRear(node.getLeftChild())
        }
        //add right child to queue
        if(node.hasRightChild()) {
            queue.addRear(node.getRightChild())
        }
    }

    return visitOrder
}


let tree = new Tree('apple')
let node2 = new Node('banana')
tree.getRoot().setLeftChild(node2)
let node3 = new Node('cherry')
tree.getRoot().setRightChild(node3)
let node4 = new Node('dates')
tree.getRoot().getLeftChild().setLeftChild(node4) 

let deque = new Deque()
deque.addFront(1)
deque.addFront(2)
deque.addRear(3)
deque.removeFront()

tree.printTree()