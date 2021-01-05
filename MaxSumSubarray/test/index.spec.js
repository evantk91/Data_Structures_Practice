let assert = require('assert');
let { maxSumSubarray } = require('../index');

describe('max sum subarray function tests', () => {
   it('test case #1 - sum of entire array', () => {
      let arr = [1, 2, 3, -4, 6];
      let solution = 8;
      assert.strictEqual(solution, maxSumSubarray(arr));
   });
   
   it('test case #2 - sum of last two elements', () => {
      let arr = [1, 2, -5, -4, 1, 6];
      let solution = 7;
      assert.strictEqual(solution, maxSumSubarray(arr)); 
   });
   
   it('test case #3 - sum of subarray', () => {
      let arr = [-12, 15, -13, 14, -1, 2, 1, -5, 4];
      let solution = 18;
      assert.strictEqual(solution, maxSumSubarray(arr));
   });
});