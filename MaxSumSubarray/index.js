function maxSumSubarray(arr) {
   // You have been given an array containing numbers. 
   // Find and return the largest sum in a contiguous subarray within the input array.

   let currentSum = arr[0];
   let maxSum = arr[0];

   for(let i = 1; i < arr.length; i++) {
      let element = arr[i];
      
      currentSum = Math.max(currentSum + element, element);
      maxSum = Math.max(currentSum, maxSum);
   }

   return maxSum;
}

module.exports = {
   maxSumSubarray    
}