//function returns Array Iterator
Array.prototype.customEntries = function () {
  let entries = [];
    for (let i = 0; i < this.length; i++) {
      entries.push(i, this[i]);
    }
    // A generator function which returns a generator object( basically follows iterator protocol)
    // Why we use here? because the entries return array iterator
    // A yield will pause and resume the function (Basically will return the entries one by one until done becomes true)
    function* iterator() {
      yield* entries;
    }

    return iterator();
};


const anime = ['one piece', 'detective conan', 'naruto', 'dbz', 'slime', 'spyxkid'];

const entries = anime.customEntries();
for (let entry of entries) {
  console.log(entry);
}