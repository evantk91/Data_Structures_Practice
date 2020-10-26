class Stack {
    constructor() {
        this.head = null;
        this.num_elements = 0;
    }
}

class Node {
    constructor(value, next = null) {
        this.value = value
        this.next = next
    }
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


let stack = new Stack()
stack.push(1)
stack.push(2)
stack.push(2)

console.log(stack.pop())
console.log(stack.toArray())