class Queue {
    constructor(initial_size = 10) {
        this.arr = new Array(initial_size).fill(0);
        this.next_index = 0;
        this.front_index = -1;
        this.queue_size = 0;
    }
}

Queue.prototype.enqueue = function(value) {
    if(this.queue_size === this.arr.length) {
        this.handleQueueCapacity();
    }    

    this.arr[this.next_index] = value;
    this.queue_size += 1;
    this.next_index = (this.next_index + 1) % this.arr.length;
    if(this.front_index === -1) {
        this.front_index = 0;
    }
}

Queue.prototype.size = function() {
    return this.queue_size;
}

Queue.prototype.isEmpty = function() {
    return this.queue_size === 0;
}

Queue.prototype.front = function() {
    if(this.isEmpty()) {
        return null
    }
    return this.arr[this.front_index];
}

Queue.prototype.dequeue = function() {
    if(this.isEmpty()) {
        this.front_index = -1;
        this.next_index = 0;
        return null;
    }

    let value = this.arr[this.front_index];
    this.front_index = (this.front_index + 1) % this.arr.length;
    this.queue_size -= 1;
    return value;
}

Queue.prototype.handleQueueCapacity = function() {
    let oldArr = this.arr;
    this.arr = new Array(oldArr.length * 2).fill(0);

    let idx = 0

    // copy all elements from front of queue until end
    for(let i = this.front_index; i < oldArr.length; i++) {
        this.arr[idx] = oldArr[i];
        idx += 1;
    } 

    // copy all elements when front index is ahead of next index
    for(let j = 0; j < this.front_index; j++) {
        this.arr[idx] = oldArr[j];
        idx += 1;
    }

    // reset pointers
    this.front_index = 0;
    this.next_index = idx;
 }

let queue = new Queue();
queue.enqueue(1)
queue.enqueue(2)
queue.enqueue(3)
queue.enqueue(4)
queue.enqueue(5)
queue.enqueue(6)
queue.dequeue()
queue.enqueue(7)
queue.enqueue(8)
queue.enqueue(9)
queue.enqueue(10)
queue.enqueue(11)
queue.enqueue(12)


console.log(queue)