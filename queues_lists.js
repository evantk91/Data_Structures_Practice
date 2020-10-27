class Queue {
    constructor() {
        this.head = null;
        this.tail = null;
        this.numElements = 0;
    }
}

class Stack {
    constructor() {
        this.head = null;
        this.num_elements = 0;
    }
}

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

Queue.prototype.enqueue = function(value) {
    let newNode = new Node(value);

    if(!this.head) {
        this.head = newNode;
        this.tail = this.head;
    } else {
        this.tail.next = newNode;
        this.tail = this.tail.next;
    }

    this.numElements += 1;
}

Queue.prototype.size = function() {
   return this.numElements;
}

Queue.prototype.isEmpty = function() {
   return this.numElements === 0; 
}

Queue.prototype.dequeue = function() {
    if(this.isEmpty()) {
        return null;
    }
    let value = this.head.value;
    this.head = this.head.next;
    this.numElements -= 1;
    return value;
}

Queue.prototype.toArray = function() {
    output = []
    node = this.head
    //pushes each node into an output array
    while (node) {
        output.push(node.value)
        node = node.next
    }
    return output
}

Stack.prototype.push = function(value) {
    let newNode = new Node(value)

    if(!this.head) {
        this.head = newNode;
    } else {
        //sets the new node as the head of the list
        newNode.next = this.head;
        this.head = newNode;
    }

    this.num_elements += 1;
}

Stack.prototype.pop = function() {
    if(this.isEmpty()) {
        return null;
    }
    let value = this.head.value;
    this.head = this.head.next;
    this.num_elements -= 1;
    return value; 
} 

Stack.prototype.toArray = function() {
    output = []
    node = this.head
    //pushes each node into an output array
    while (node) {
        output.push(node.value)
        node = node.next
    }
    return output
}

Stack.prototype.size = function() {
    return this.num_elements;
}

Stack.prototype.isEmpty = function() {
    return this.num_elements === 0;
}


Queue.prototype.reverseQueue = function() {
    let stack = new Stack();

    while(!this.isEmpty()) {
        stack.push(this.dequeue());
    }

    while(!stack.isEmpty()) {
        this.enqueue(stack.pop());
    }

    return queue;
}

let queue = new Queue()

queue.enqueue(1)
queue.enqueue(2)
queue.enqueue(4)

console.log(queue.toArray());
console.log(queue.reverseQueue().toArray());