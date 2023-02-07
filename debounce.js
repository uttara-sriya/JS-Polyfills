/**
   * @param {Function} customBasicDebounce
   * @param {Function} func
   * @param {number} millisec delay
   */

//What are we doing here? 
//1. Set the context
//2. If the timer exist, then clear the timer before calling the function
//3. If not, call the function
function customBasicDebounce(func, delay = 400) {
  //initalizing timer here - closure 
  let timer;
  return ((...args) => {
    //clearing timer before calling again for restricting multiple instances of timer
    clearTimeout(timer);
    //calls the function after delay
    timer = setTimeout(() => func.apply(this, ...args), delay);
  });
}

//usecase
let i = 0;
function displayData() {
  document.getElementById('basic_debounce').value = ++i;
  console.log("Basic/Leading Debounce " + i);
}
const incrementValue = customBasicDebounce(() => displayData(), 400);


