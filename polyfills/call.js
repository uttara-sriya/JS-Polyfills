Function.prototype.customCall = function (currentThis = {}, ...args) {
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
  
  onePieceOP.customCall(Person, "Hi", "Where have you reached?");
  