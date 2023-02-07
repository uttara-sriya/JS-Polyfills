//function returns undefined
Function.prototype.customForEach = function (callback) {
  //this should point to array
  if(Array.isArray(this)) {
    for (let i = 0; i < this.length; i++) {
      //check if each element exists
      if(typeof this[i] !== 'undefined') {
        //callback will take element, index and array as parameters
        callback(this[i], i, this);
      }
    }
  }
};


const anime = ['one piece', 'detective conan', 'naruto', 'dbz', 'slime', 'spyxkid'];

anime.forEach((element, index, arr) => console.log(element));