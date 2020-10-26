class Stack {
    constructor(initial_size = 10) {
        this.arr = new Array(initial_size).fill(0);
        this.next_index = 0;
        this.num_elements = 0;
    }
}

Stack.prototype.push = function(value) {
    this.arr[this.next_index] = value
    this.next_index += 1
    this.num_elements += 1
}

Stack.prototype.size = function() {
    return this.num_elements;
}

Stack.prototype.isEmpty = function() {
    return this.num_elements === 0;
}

Stack.prototype.pop = function() {
    if(this.isEmpty()) {
        this.next_index = 0;
        return null;
    }
    this.next_index -= 1;
    this.num_elements -= 1;
    let popped = this.arr[this.next_index];
    this.arr[this.next_index] = 0;
    return popped;
}

let stack = new Stack()
stack.push('yo')
stack.push('yo')
stack.push('ma')

console.log(stack.pop())
console.log(stack.pop())
console.log(stack.pop())
console.log(stack.pop())
console.log(stack)