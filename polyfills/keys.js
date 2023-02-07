//function returns Array Iterator
Array.prototype.customKeys = function () {
  let keys = [];
  if (Array.isArray(this)) {
    for (let i = 0; i < this.length; i++) {
      keys.push(i);
    }
    // A generator function which returns a generator object( basically follows iterator protocol)
    // Why we use here? because the keys return array iterator
    // A yield will pause and resume the function (Basically will return the keys one by one until done becomes true)
    function* iterator() {
      yield* keys;
    }

    return iterator();
  }
};


const anime = ['one piece', 'detective conan', 'naruto', 'dbz', 'slime', 'spyxkid'];

let [...arr] = anime.customKeys();
console.log(...arr);