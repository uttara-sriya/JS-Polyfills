Function.prototype.customBind = function (...args) {
    const currContext = this;
    // Get all arguments except 1st as 1st is context 
    let params = args.slice(1);
    //Bind returns copy of the function & can have new args passed to the invoking function
    return function (...arguments) {
      //args[0] is the new context and new arguments provided while binding and invoking
      currContext.apply(args[0], [...params, ...arguments]);
    };
  }
  
  const Person = {
    fname: "Luffy",
    lname: "Monkey D.",
    role: 'pirate'
  };
  
  function onePieceOP(salutation, message) {
    console.log(`${salutation} ${this.lname} ${this.fname} the ${this.role}!!! ${message}`);
  }
  
  const pirateDetails = onePieceOP.customBind(Person, "Hi", "Where have you reached?");
  pirateDetails();