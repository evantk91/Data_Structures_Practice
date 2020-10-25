class LinkedList {
    constructor() {
        this.head = null;
    }
}

class ListNode {
    constructor(value, next = null) {
        this.value = value
        this.next = next
    }
}

LinkedList.prototype.toArray = function() {
    output = []
    node = this.head
    //pushes each node into an output array
    while (node) {
        output.push(node.value)
        node = node.next
    }
    return output
}

LinkedList.prototype.prepend = function(value) {
    let newNode = new ListNode(value)

    //when the list is empty, then the head iteself will point to the new node
    if(!this.head) {
        this.head = newNode;
        return this.head;
    }

    //the new node now points to the head
    newNode.next = this.head
    this.head = newNode;
    return this.head;
}

LinkedList.prototype.append = function(value) {
    let newNode = new ListNode(value)

    //when the list is empty, then the head iteself will point to the new node
    if(!this.head) {
        this.head = newNode;
        return this.head;
    }

    //traverse the list to find the tail
    let tail = this.head
    while (tail.next !== null) {
        tail = tail.next;
    }
    //update pointer to new node
    tail.next = newNode;

    return this.head
}

LinkedList.prototype.removeFirst = function() {
    if(!this.head) {
        return null
    }
    node = this.head
    this.head = this.head.next
    return node.value
}

LinkedList.prototype.removeLast = function() {
    if(!this.head) {
        return null;
    }

    if(!this.head.next) {
        this.head = null;
        return
    }

    let previous = this.head;
    let tail = this.head.next;

    while(tail.next !== null) {
        previous = tail;
        tail = tail.next;
    }

    previous.next = null;
    return this.head;
}
 
LinkedList.prototype.search = function(value) {
    if(!this.head) {
        return null
    }

    let node = this.head
    while (node) {
        if (node.value === value) {
            return node;
        }
        node = node.next
    }

    return null
}

LinkedList.prototype.remove = function(value) {
    if(!this.head) {
        return null
    }

    if(this.head.value === value) {
        this.head = this.head.next
        return this.head
    }

    let node = this.head
    while (node.next) {
        if(node.next.value === value) {
           node.next = node.next.next
           return this.head
        }
        node = node.next
    } 
}

LinkedList.prototype.getAt = function(index) {
    let counter = 0;
    let node = this.head;
    while (node) {
        if(counter === index) {
            return node;
        }
        counter++;
        node = node.next;
    }
    return null
}

LinkedList.prototype.size = function() {
    let size = 0
    node = this.head
    while (node) {
        size += 1
        node = node.next
    }
    return size
}

LinkedList.prototype.insertAt = function(value, index) {
    if(!this.head) {
        this.head = new ListNode(value);
        return;
    }

    if(index === 0) {
        this.prepend(value);
        return this.head;
    }

    if(index <= this.size() - 1) {
        const previous = this.getAt(index - 1)
        let newNode = new ListNode(value);
        newNode.next = previous.next;
        previous.next = newNode;
    } else {
        this.append(value);
    }

    return this.head;
}

LinkedList.prototype.deleteAt = function(index) {
    if(!this.head) {
        this.head = new ListNode(value);
        return;
    }

    if(index === 0) {
        this.head = this.head.next;
        return;
    }

    const previous = this.getAt(index - 1)
    if(!previous || !previous.next) {
        return;
    }
    previous.next = previous.next.next;
    return this.head;

}

let list = new LinkedList()
list.prepend(1)
list.prepend(2)
list.prepend(3)
list.append(3)
list.deleteAt(5)


console.log(list.toArray())