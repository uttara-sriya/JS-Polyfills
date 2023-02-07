/**
   * @param {Function} func
   * @param {number} delay
   * @param {boolean} option.leading
   * @param {boolean} option.trailing
   */
//What are we doing here? 
//1. Set the context, timer and trailing arguments
//2. if timer called within cooldown period, update context and save the trailing args for later execution
//3. If leading, execute the function
//4. If trailing, update context and save last args for later execution
//5. set cooldown period
//6. if trailing and the trailing args exist, invoke the timer, reset the cooldown period

const advThrottle = (func, delay, options = { leading: true, trailing: false }) => {
  let timer = null,
    lastRan = null,
    trailingArgs = null;

  return function (...args) {

    if (timer) { //called within cooldown period
      lastRan = this; //update context
      trailingArgs = args; //save for later
      return;
    } 

    if (options.leading) {// if leading
      func.call(this, ...args) //call the 1st instance
    } else { // else it's trailing
      lastRan = this; //update context
      trailingArgs = args; //save for later
    }

    const coolDownPeriodComplete = () => {
      if (options.trailing && trailingArgs) { // if trailing and the trailing args exist
        func.call(lastRan, ...trailingArgs); //invoke the instance with stored context "lastRan"
        lastRan = null; //reset the status of lastRan
        trailingArgs = null; //reset trailing arguments
        timer = setTimeout(coolDownPeriodComplete, delay) //clear the timout
      } else {
        timer = null; // reset timer
      }
    }

    timer = setTimeout(coolDownPeriodComplete, delay);
  }
}

//usecase 1
let i = 0;
function displayLeadingData() {
  document.getElementById('leading_val').value = ++i;
  console.log("Leading " + i);
}
const leadingEvent = advThrottle(() => displayLeadingData(), 400, option = { leading: true, trailing: false });


//usecase 2
let j = 0;
function displayTrailingData() {
  document.getElementById('trailing_val').value = ++j;
  console.log("Trailing " + j);
}
const trailingEvent = advThrottle(() => displayTrailingData(), 400, option = { leading: false, trailing: true });