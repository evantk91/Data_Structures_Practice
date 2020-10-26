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

LinkedList.prototype.reverse = function(head) {
    let current = this.head;
    let previous = null;
    let temp = null;

    while (current !== null) {
        temp = current.next;
        current.next = previous;
        previous = current;
        current = temp;
    }

    return previous;
}

LinkedList.prototype.iscircular = function() {
    if(!this.head) {
        return false;
    }

    let slow = this.head;
    let fast = this.head;

    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if(slow === fast) {
            return true;
        }
    }

    return false;
}

function merge(list1, list2) {
    let merged = new LinkedList(null)

    if(!list1) {
        return list2
    }

    if(!list2) {
        return list1
    }

    let list1_node = list1.head;
    let list2_node = list2.head;
    while (list1_node !== null || list2_node !== null) {
        if(list1_node === null) {
            merged.append(list2_node.value)
            list2_node = list2_node.next
        } else if(list2_node === null) {
            merged.append(list1_node.value)
            list1_node = list1_node.next
        } else if(list1_node.value <= list2_node.value) {
            merged.append(list1_node.value)
            list1_node = list1_node.next
        } else {
            merged.append(list2_node.value)
            list2_node = list2_node.next
        }
    }

    return merged;
}

let list1 = new LinkedList()
list1.append(1)
list1.append(4)
list1.append(5)

let list2 = new LinkedList()
list2.append(2)
list2.append(3)
list2.append(7)

console.log(list1.toArray())
console.log(list2.toArray())

let list3 = merge(list1, list2)
console.log(list3.toArray())