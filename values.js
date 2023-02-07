//function returns Array Iterator
Array.prototype.customValues = function () {
  let values = [];
  if (Array.isArray(this)) {
    for (let i = 0; i < this.length; i++) {
      values.push(this[i]);
    }
    // A generator function which returns a generator object( basically follows iterator protocol)
    // Why we use here? because the values return array iterator
    // A yield will pause and resume the function (Basically will return the values one by one until done becomes true)
    function* iterator() {
      yield* values;
    }

    return iterator();
  }
};


const anime = ['one piece', 'detective conan', 'naruto', 'dbz', 'slime', 'spyxkid'];

let [...arr] = anime.customValues();
console.log(...arr);