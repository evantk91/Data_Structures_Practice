class LinkedList {
    constructor() {
        this.head = null;
    }
}

class ListNode {
    constructor(data, next = null) {
        this.data = data
        this.next = next
    }
}

LinkedList.prototype.prepend = function(data) {
    let newNode = new Node(data)

    if(!this.head) {
        this.head = newNode;
        return this.head;
    }

    newNode.next = this.head
    self.head = newNode;
    return this.head;
}