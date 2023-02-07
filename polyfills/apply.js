Function.prototype.customApply = function (currentThis = {}, args = []) {
    // check if provided arguments is an array
    if (!Array.isArray(args)) {
      throw new Error(this + 'Invalid argument type')
    }
    // check if current context is pointing to a function
    if (typeof this !== 'function') {
      throw new Error(this + 'cannot call')
    }
    currentThis.fnName = this;
    currentThis.fnName(...args);
  };
  
  const Person = {
    fname: "Luffy",
    lname: "Monkey D.",
    role: 'pirate'
  };
  
  function onePieceOP(salutation, message) {
    console.log(`${salutation} ${this.lname} ${this.fname} the ${this.role}!!! ${message}`);
  }
  
  onePieceOP.customApply(Person, ["Hi", "Where have you reached?"]);