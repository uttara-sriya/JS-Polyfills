
// Promise: The Promise object represents the eventual completion (or failure) of an asynchronous operation and its resulting value
//The Promise.allSettled polyfill maps over the array of promises and returns a new array of promises that resolve with an object indicating the status(fulfilled or rejected) and the value or reason of each promise.
//The Promise.any polyfill returns a new Promise that resolves with the value of the first resolved promise in the array.If all promises in the array are rejected, the new Promise will be rejected with an error indicating that all promises were rejected.
/**
   * @param {Function} Promise
   * @param {executor} takes 2 func resolve and reject
   */
  //If no promise in window
if (!window.Promise) {
  //custom Promise function
  window.Promise = function (executor) {
    var me = this;
    me.status = 'pending'; //initial state of promise
    me.value = undefined;
    me.reason = undefined;
    //callbacks for resolve and reject
    me.onResolvedCallbacks = [];
    me.onRejectedCallbacks = [];

    // resolve function
    function resolve(value) {
      //update the status to resolved status and provide the value after resovle and execute all the callback functions provided
      if (me.status === 'pending') { 
        me.status = 'resolved';
        me.value = value;
        me.onResolvedCallbacks.forEach(function (fn) {
          //execute each callback function
          fn();
        });
      }
    }
    // reject function
    function reject(reason) {
      //update the status to rejected staus and provide the reason for the reject and execute all the callback functions provided
      if (me.status === 'pending') {
        me.status = 'rejected';
        me.reason = reason;
        me.onRejectedCallbacks.forEach(function (fn) {
          //execute each callback function
          fn();
        });
      }
    }

    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  };

  //Custom resolve function - resolves a given value to a Promise
  window.Promise.resolve = function (value) {
    return new Promise(function (resolve) {
      //resolve value
      resolve(value);
    });
  };
 //Custom reject function - returns a Promise object that is rejected with a given reason
  window.Promise.reject = function (reason) {
    return new Promise(function (resolve, reject) {
      //reject with reason
      reject(reason);
    });
  };
  //Custom all function to resolve or reject multiple promises
  //all is a static method takes an iterable of promises as input and returns a single Promise.
  window.Promise.all = function (promises) {
    return new Promise(function (resolve, reject) {
      var results = [];
      var count = 0;
      for (var i = 0; i < promises.length; i++) {
        promises[i].then(function (result) {
          results[i] = result;
          count++;
          if (count === promises.length) {
            resolve(results);
          }
        }, function (error) {
          reject(error);
        });
      }
    });
  };
   //Custom race function - takes an iterable of promises as input and returns a single Promise. This returned promise settles with the eventual state of the first promise that settles
  window.Promise.race = function (promises) {
    return new Promise(function (resolve, reject) {
      for (var i = 0; i < promises.length; i++) {
        promises[i].then(function (result) {
          resolve(result);
        }, function (error) {
          reject(error);
        });
      }
    });
  };
   //Custom then function - immediately returns an equivalent Promise object
  window.Promise.prototype.then = function (onFulfilled, onRejected) {
    var me = this;
    var promise2 = null;
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function (v) {
      return v;
    };
    onRejected = typeof onRejected === 'function' ? onRejected : function (r) {
      throw r;
    };
    if (me.status === 'resolved') {
      return promise2 = new Promise(function (resolve, reject) {
        try {
          var x = onFulfilled(me.value);
          if (x instanceof Promise) {
            x.then(resolve, reject);
          }
          resolve(x);
        } catch (e) {
          reject(e);
        }
      });
    }
    if (me.status === 'rejected') {
      return promise2 = new Promise(function (resolve, reject) {
        try {
          var x = onRejected(me.reason);
          if (x instanceof Promise) {
            x.then(resolve, reject);
          }
        } catch (e) {
          reject(e);
        }
      });
    }
    if (me.status === 'pending') {
      return promise2 = new Promise(function (resolve, reject) {
        me.onResolvedCallbacks.push(function () {
          try {
            var x = onFulfilled(me.value);
            if (x instanceof Promise) {
              x.then(resolve, reject);
            }
            resolve(x);
          } catch (e) {
            reject(e);
          }
        });
        me.onRejectedCallbacks.push(function () {
          try {
            var x = onRejected(me.reason);
            if (x instanceof Promise) {

              x.then(resolve, reject);
            }
          } catch (e) {
            reject(e);
          }
        });
      });
    }
  };
 //Custom catch function - object schedules a function to be called when the promise is rejected.
  window.Promise.prototype.catch = function (onRejected) {
    return this.then(null, onRejected);
  };
}

if (!Promise.allSettled) {
   //allSettled function - takes an iterable of promises as input and returns a single Promise
   Promise.allSettled = function (promises) {
    return Promise.all(promises.map(function (promise) {
      return promise.then(function (value) {
        return { status: 'fulfilled', value: value };
      }, function (reason) {
        return { status: 'rejected', reason: reason };
      });
    }));
  };
}

if (!Promise.any) {
  //any function - returns a single Promise
  Promise.any = function (promises) {
    return new Promise(function (resolve, reject) {
      var resolved = false;
      promises.forEach(function (promise) {
        promise.then(function (value) {
          if (!resolved) {
            resolved = true;
            resolve(value);
          }
        }, function (reason) {
          // do nothing
        });
      });
      if (!resolved) {
        reject(new Error('All promises were rejected'));
      }
    });
  };
}

// Example
function getData(url) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function () {
      if (xhr.status === 200) {
        resolve(xhr.response);
      } else {
        reject(new Error(xhr.statusText));
      }
    };
    xhr.onerror = function () {
      reject(new Error("Network Error"));
    };
    xhr.send();
  });
}

// Example usage of Promise.allSettled
var urls = [
  'https://jsonplaceholder.typicode.com/posts/1',
  'https://jsonplaceholder.typicode.com/posts/2',
  'https://jsonplaceholder.typicode.com/posts/3'
];
Promise.allSettled(urls.map(getData)).then(function (results) {
  results.forEach(function (result) {
    if (result.status === 'fulfilled') {
      console.log(result.value);
    } else {
      console.error(result.reason);
    }
  });
});

// Example usage of Promise.any
var urls = [
  'https://jsonplaceholder.typicode.com/posts/1',
  'https://jsonplaceholder.typicode.com/posts/2',
  'https://jsonplaceholder.typicode.com/posts/3'
];
Promise.any(urls.map(getData)).then(function (result) {
  console.log(result);
}).catch(function (error) {
  console.error(error);
});

