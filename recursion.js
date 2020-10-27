function factorial(n) {
    if(n === 0) {
        return 1;
    }

    return n * factorial(n - 1);
}

function reverseStr(input) {
   if(input.length === 0) {
      return ''    
   } else {
      let firstChar = input[0];
      let subStr = input.slice(1);
      
      return reverseStr(subStr) + firstChar;
   }
}

console.log(factorial(4))
console.log(reverseStr('abc'))