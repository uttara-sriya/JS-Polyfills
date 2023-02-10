//A functional programming technique for transforming multiple parameter function to a multiple single parameter functions.
//In this example, the curry function takes a function fn as an argument and returns a new curried function curried. The curried function takes a variable number of arguments, stored in the args array. If the number of arguments passed to curried is equal to or greater than the number of arguments expected by fn, fn is called with the apply method, passing in the args array. If the number of arguments passed to curried is less than the number of arguments expected by fn, the curried function returns a new function that takes the remaining arguments and concatenates them to the args array. This allows us to partially apply the arguments to the function and return a new function that takes the remaining arguments. The returned function can be called multiple times until all the arguments have been provided, at which point fn is finally executed.
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return function (...args2) {
      return curried.apply(this, args.concat(args2));
    };
  };
}

// Usage example
function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(add);
const add5 = curriedAdd(5);

console.log(add5(10)(15));
// Output: 30
