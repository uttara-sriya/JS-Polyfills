//function returns Array, Map will have callbackfunction
Array.prototype.customMap = function (callbackFunction) {
  const arr = [];

  for (let i = 1; i <= this.length; i++) {
    arr.push(callbackFunction.call(this[i], i, this));
  }
  return arr;
};

//use case 1
const array1 = [1, 4, 9, 16];

// pass a function to map
const map1 = array1.map(x => x * 2);

console.log(map1);

//use case 2
const kvArray = [
  { key: 1, value: 10 },
  { key: 2, value: 20 },
  { key: 3, value: 30 },
];

const reformattedArray = kvArray.map(({ key, value }) => ({ [key]: value }));
console.log(reformattedArray)


//use case 3
const arrayLike = {
  length: 3,
  0: 2,
  1: 3,
  2: 4,
};
console.log(Array.prototype.map.call(arrayLike, (x) => x ** 2));
