class Queue {
    constructor() {
        this.head = null;
        this.tail = null;
        this.numElements = 0;
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

let queue = new Queue()

queue.enqueue(1)
queue.enqueue(2)
queue.enqueue(4)
queue.dequeue()
queue.dequeue()

console.log(queue.toArray())