/**
   * @param {Function} func
   * @param {number} delay
   * @param {boolean} option.leading
   * @param {boolean} option.trailing
   */
//What are we doing here? 
//1. Set the context and trailing arguments
//2. If not leading/trailing, return null
//3. If timer is done but leading is true, invoke the func execution
//4. If not, save the context for later execution
//5. clear the timer to avoid multiple timer instances 
//6. call the timer if trailing is true n trailing args exists
//7. Reset the timer and args
function customAdvancedDebounce(func, delay, option = { leading: false, trailing: true }) {

  let timer = null; // same like basic debounce
  let trailingArgs = null; // as we require last arguments for trailing 

  if (!option.leading && !option.trailing) return () => null; //if both false, return null

  return function debounced(...args) { //returns a debounced function

    if (!timer && option.leading) { // timer done but leading true
      func.apply(this, args); //call func
    } else {
      trailingArgs = args; // arguments will be the last args
    }

    clearTimeout(timer); //clear timer for avoiding multiple timer instances

    timer = setTimeout(() => {
      if (option.trailing && trailingArgs) func.apply(this, trailingArgs);  // trailingArgs is present and trailing is true

      trailingArgs = null; //reset last arguments
      timer = null; // reset timer
    }, delay);
  }
}


//usecase 1
let i = 0;
function displayLeadingData() {
  document.getElementById('leading_val').value = ++i;
  console.log("Leading " + i);
}
const leadingEvent = customAdvancedDebounce(() => displayLeadingData(), 400, option = { leading: true, trailing: false });


//usecase 2
let j = 0;
function displayTrailingData() {
  document.getElementById('trailing_val').value = ++j;
  console.log("Trailing " + j);
}
const trailingEvent = customAdvancedDebounce(() => displayTrailingData(), 400, option = { leading: false, trailing: true });