class LinkedList {
   constructor() {
      this.head = null;    
   }    
}

class ListNode {
   constructor(value, next = null) {
      this.value = value;
      this.next = next; 
   }    
}

LinkedList.prototype.append = function(value) {
   let newNode = new ListNode(value)

   if(!this.head) {
      this.head = newNode;
      return this.head;
   }

   let tail = this.head;
   while(tail.next !== null) {
      tail = tail.next;
   }
   tail.next = newNode;
   
   return this.head;
}

function toArray(list) {
   output = []
   node = list.head
   //pushes each node into an output array
   while (node) {
       output.push(node.value)
       node = node.next
   }
   return output
}

function createLinkedList(arr) {
   let list = new LinkedList();
   for(let i = 0; i < arr.length; i++) {
       let node = new ListNode(arr[i])
       list.append(node.value)
   }
   return list;
}

function evenAfterOdd(list) {
   //Given a linked list with integer data, arrange the elements in such a manner that all nodes with even numbers placed after odd numbers
   //Do not create any new nodes and avoid using any other data structure
   //The relative order of even and odd elements must not change

   if(!list.head) {
      return list;
   }

   //set up linked list to store even numbers
   let evenHead = null;
   let evenTail = null;

   //set up linked list to store odd numbers
   let oddHead = null;
   let oddTail = null;

   let current = list.head;

   //step through the linked list
   while (current) {
      let nextNode = current.next;
      //if node value is even
      if(current.value % 2 === 0) {
         //store even node
         if(!evenHead) {
            evenHead = current;
            evenTail = evenHead;
         } else {
            evenTail.next = current;
            evenTail = evenTail.next;
         }     
      } else {
         //store odd node
         if(!oddHead) {
            oddHead = current;
            oddTail = oddHead;
         } else {
            oddTail.next = current;
            oddTail = oddTail.next;
         }
      }
      //update current node for next iteration
      current.next = null;
      current = nextNode;
   }

   //if there are no odd valued nodes
   if(!oddHead) {
      return evenHead;
   }

   //append the even list to the odd list
   oddTail.next = evenHead;

   //return reordered list
   return oddHead;
}

module.exports = {
   LinkedList,
   ListNode,
   toArray,
   createLinkedList,
   evenAfterOdd,    
}