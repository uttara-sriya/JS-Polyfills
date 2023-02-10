//This polyfill checks if the Symbol.iterator property is a function. If it's not, it defines the GeneratorFunction constructor, which is the constructor of a generator function, and sets its Symbol.iterator property to a function that returns an object with a next method. This next method simply returns an object with value set to undefined and done set to true, which is the expected behavior for an iterator that has completed.
(function () {
  if (typeof Symbol.iterator !== 'function') {
    let GeneratorFunction = (function* () { }).constructor;
    GeneratorFunction.prototype[Symbol.iterator] = function () {
      return {
        next: function () {
          return { value: void 0, done: true };
        }
      };
    };
  }
})();


