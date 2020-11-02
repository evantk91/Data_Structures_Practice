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

function staircase(n) {
    let numDict = {};
    return staircaseRecursive(n, numDict);
 }

 function staircaseRecursive(n, numDict) {
    let output;
    if(n === 1) {
       output = 1;
    } else if(n === 2) {
       output = 2;
    } else if(n === 3) {
       output = 4;
    } else {
       let firstOutput;
       let secondOutput;
       let thirdOutput;

       numDict[n - 1] ? firstOutput = numDict[n - 1] : firstOutput = staircaseRecursive(n - 1, numDict);
       numDict[n - 2] ? secondOutput = numDict[n - 2] : secondOutput = staircaseRecursive(n - 2, numDict);
       numDict[n - 3] ? thirdOutput = numDict[n - 3] : thirdOutput = staircaseRecursive(n - 3, numDict);

       output = firstOutput + secondOutput + thirdOutput;
    } 

    numDict[n] = output;
    return output;
 }

pairSumToTarget = function(inputList, target) {

    //create an object to store each element of the list for look up
    let indexDict = {};

    //traverse the input list
    for(const [index, element] of inputList.entries()) {
        //if the "key" is in the object
        if((target - element) in indexDict) {
           //return the indices of the elements
           return [indexDict[target - element], index];
        }
        //store the index as a value
        indexDict[element] = index;
    }
    //return [-1, -1] if target is not found
    return [-1, -1]
}

longestConsecutiveSubseq = function(inputList) {
    let dict = {}

    //store indices and values of input list
    for(const [index, element] of inputList.entries()) {
       dict[element] = index; 
    }

    let maxLen = -1;
    let startsAt = -1;

    for(const [index, element] of inputList.entries()) {
        let currentStart = index;
        //mark as visited
        dict[element] = -1;
    
        //initialize length of current subsequence
        let currentCount = 1

        //check one element forward
        let current = element + 1;
        //check if the expected number is available
        //and has not been visited yet
        while(current in dict && dict[current] > 0) {
            currentCount += 1;
            dict[current] = -1;
            current = current + 1;
        }

        current = element - 1;
        while(current in dict && dict[current] > 0) {
            currentStart = dict[current];
            currentCount += 1;
            dict[current] = -1;
            current = current - 1;
        }

        if(currentCount >= maxLen) {
            if(currentCount === maxLen && currentStart > startsAt) {
                continue;
            }
            //set index of smallest element in current subsequence
            startsAt = currentStart;
            maxLen = currentCount;
        } 
    }

    let startElement = inputList[startsAt];
    return Array.from(new Array(maxLen), (x, i) => i + startsAt);
} 

let hashmap = new HashMap();

hashmap.put("one", 1);
hashmap.put("two", 2);
hashmap.put("three", 3);
hashmap.put("neo", 11);

// console.log("size: ", hashmap.size());
// console.log("two: ", hashmap.get("two"))

let inputList = [5, 4, 7, 10, 1, 3, 55, 2];
console.log(longestConsecutiveSubseq(inputList))