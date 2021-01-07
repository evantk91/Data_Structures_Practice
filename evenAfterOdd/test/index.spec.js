const assert = require('assert');
const { LinkedList, ListNode, createLinkedList, evenAfterOdd } = require('../index');

describe('Even After Odd test cases', () => {
   it('test case #1 - numbers in order', () => {
      let arr = [1, 2, 3, 4, 5, 6];
      let solution = [1, 3, 5, 2, 4, 6];
      let list = createLinkedList(arr);
      let output = evenAfterOdd(list);
      assert.deepEqual(solution, output.toArray());
   });
   
   it('test case #2 - odd numbers', () => {
      let arr = [1, 3, 5, 7];
      let solution = [1, 3, 5, 7];
      let list = createLinkedList(arr);
      let output = evenAfterOdd(list);
      assert.deepEqual(solution, output.toArray());
   });

   it('test case #3 - even numbers', () => {
      let arr = [2, 4, 6, 8];
      let solution = [2, 4, 6, 8];
      let list = createLinkedList(arr);
      let output = evenAfterOdd(list);
      assert.deepEqual(solution, output.toArray());
   });
});