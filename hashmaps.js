class LinkedListNode {
   constructor(key, value) {
       this.key = key;
       this.value = value;
       this.next = null;
   }
}

class HashMap {
   constructor(initialSize = 15) {
      this.bucketArray = new Array(initialSize).fill(null)
      this.p = 31
      this.numEntries = 0;
      this.loadFactor = 0.7; 
   }

   //the put() function uses the same bucket to store a linked list of pairs
   //every bucket will have its own separate chain of linked list nodes
   put = function(key, value) {
      let bucketIndex = this.getBucketIndex(key);
      let newNode = new LinkedListNode(key, value);
      let head = this.bucketArray[bucketIndex];

      //check if key is already present, update its value
      //key should always be unique
      while(head) {
         if(head.key === key) {
            head.value = value
            return
         }
         head = head.next;
      }

      //prepend the new node at the beginning of the chain
      //this occurs for both cases: key generates a new bucket index, key generates an existing bucket index
      head = this.bucketArray[bucketIndex];
      newNode.next = head;
      //store head in the bucket
      this.bucketArray[bucketIndex] = newNode;
      this.numEntries += 1;

      //check the load factor
      let currentLoadFactor = this.numEntries / this.bucketArray.length;
      if(currentLoadFactor > this.loadFactor) {
         this.numEntries = 0;
         this._rehash();
      }
   }

    get = function(key) {
       let bucketIndex = this.getBucketIndex(key);
       let head = this.bucketArray[bucketIndex];

       while(head) {
          if(head.key === key) {
             return head.value;
          }
          head = head.next;
       }

       return null;
    }

    getBucketIndex(key) {
       return this.getHashCode(key);
    }

    //common hashing function for strings using powers of prime number, 37
    getHashCode(key) {
       let numBuckets = this.bucketArray.length;
       let currentCoefficient = 1;
       let hashCode = 0;

       for(let i = 0; i < key.length; i++) {
          let char = key[i]
          hashCode += char.charCodeAt(0) * currentCoefficient;
          //we compress the hash code using the number of buckets to reduce the number of locations in the array
          hashCode = hashCode % numBuckets;
          currentCoefficient *= this.p;
          currentCoefficient = currentCoefficient % numBuckets;
       }
       return hashCode % numBuckets;
    }

    size = function() {
       return this.numEntries;
    }

    _rehash = function() {
       let oldNumBuckets = this.bucketArray.length;
       let oldBucketArray = this.bucketArray;
       let numBuckets = 2 * oldNumBuckets;
       this.bucketArray = new Array(numBuckets).fill(null)

       for(let i = 0; i < oldBucketArray.length; i++) {
          let head = oldBucketArray[i];
          while(head) {
             key = head.key;
             value = head.value;
             this.put(key, value);
             head = head.next;
          }
       }
    }

    delete = function(key) {
       let bucketIndex = this.getBucketIndex(key);
       let head = this.bucketArray[bucketIndex];

       let previous = null;
       while(head) {
          //if head matches key
          if(head.key === key) {
             //if not in the middle of list 
             if(!previous) {
                //set head to the next node
                this.bucketArray[bucketIndex] = head.next;
             } else { 
                //set previous to point to next node 
                previous.next = head.next;
             } 
             this.numEntries -= 1;
             return;     
          } else {
              //progress forward in the linked list
              previous = head;
              head = head.next;
          }
       }
    }

}

let hashmap = new HashMap();

hashmap.put("one", 1);
hashmap.put("two", 2);
hashmap.put("three", 3);
hashmap.put("neo", 11);

console.log("size: ", hashmap.size());
console.log("two: ", hashmap.get("two"))