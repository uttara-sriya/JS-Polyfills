//function returns Array, filter will have callbackfunction
Array.prototype.customFilter = function (callbackFunction) {
  const arr = [];

  for (let i = 0; i <= this.length; i++) {

    (callbackFunction(this[i], i, this)) ? arr.push(this[i])  : null;
  }
  return arr;
};

//usecase 1

const anime = ['one piece', 'detective conan', 'naruto', 'dbz', 'slime', 'spyxkid'];

const result = anime.customFilter((ele, index, arr) => {
  arr.pop();
  return ele;
});
console.log(result);

//usecase2
const array = [-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

function isPrime(num) {
  for (let i = 2; num > i; i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return num > 1;
}

console.log(array.filter(isPrime)); 

//usecase3
const fruits = ['apple', 'banana', 'grapes', 'mango', 'orange'];

/**
 * Filter array items based on search criteria (query)
 */
function filterItems(arr, query) {
  return arr.filter((el) => el.toLowerCase().includes(query.toLowerCase()));
}

console.log(filterItems(fruits, 'ap')); // ['apple', 'grapes']
console.log(filterItems(fruits, 'an')); // ['banana', 'mango', 'orange']