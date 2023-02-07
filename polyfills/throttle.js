/**
   * @param {Function} customBasicThrottle
   * @param {Function} func
   * @param {number} millisec delay
   */
//What are we doing here? 
//1. Set the context and trailing arguments
//2. If not executed before, execute now and update the context
//3. during exe, update the context and if trailing args exist, execute the function
//and reset the context and last args
//4. If executed, save the context for later execution

function customBasicThrottle(func, delay) {
  let lastRan = false, //last time the function got ex ecuted
      trailingArgs = null; //last arguments

  return function (...args) { //returns function
    if (!lastRan) { //if the function didnt get executed before
      func.apply(this, args) // call the function
      lastRan = true; //update the flag
      let timer = () => setTimeout(() => { //while executing 
        lastRan = false; //update the flag
        if (trailingArgs) { // if last arguments exist
          func.apply(this, trailingArgs); //invoke the function with those last arguments
          lastRan = true; //update the flag
          trailingArgs = null; //reset the arguments
          timer(); 
        }
      }, delay);
      timer(); 
    }
    else // if function got executed before
      trailingArgs = args //else update the last arguments with passed arguments
  }
}

//usecase
let i = 0;
function displayData() {
  document.getElementById('basic_throttle').value = ++i;
  console.log("Basic throttle " + i);
}
const incrementValue = customBasicThrottle(() => displayData(), 500);


