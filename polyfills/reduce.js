// expects callback function called reducer and initial value
//Parameters - (function(previousValue, currentValue, currentIndex, array) { /* … */ }, initialValue)
// reducer call back is executed on every element of the array and reduces it to a single value.
Array.prototype.customReduce = function (reducerCallback, initial) {
  //previous value also called as accumulator will be either provided initial value or undefined if no previous value exists
  let previousValue = initial || undefined;
  for (let i = 0; i < this.length; i++) {
    //if accumulator exists and is not undefined then reducer callback is called otherwise previous value is set as current value
    (previousValue) ? reducerCallback.call(previousValue, this[i], i, this) : (previousValue = this[i]);
  }
  return previousValue;
}


//Testing Eg1
const objects = [{ x: 1 }, { x: 2 }, { x: 3 }];
const sum = objects.reduce(
  (previousValue, currentValue) => previousValue + currentValue.x,
  0,
);

console.log(sum); // logs 6


//Testing Eg2
const flattened = [
  [0, 1],
  [2, 3],
  [4, 5],
].reduce(
  (previousValue, currentValue) => previousValue.concat(currentValue),
  [],
);
console.log(flattened)

//Tesing Eg3
const names = ["Alice", "Bob", "Tiff", "Bruce", "Alice"];

const countedNames = names.reduce((allNames, name) => {
  const currCount = allNames[name] ?? 0;
  return {
    ...allNames,
    [name]: currCount + 1,
  };
}, {});
console.log(countedNames);


//Testing Eg4
const people = [
  { name: "Alice", age: 21 },
  { name: "Max", age: 20 },
  { name: "Jane", age: 20 },
];

function groupBy(objectArray, property) {
  return objectArray.reduce((acc, obj) => {
    const key = obj[property];
    const curGroup = acc[key] ?? [];

    return { ...acc, [key]: [...curGroup, obj] };
  }, {});
}

const groupedPeople = groupBy(people, "age");
console.log(groupedPeople)


//Testing Eg5

const myArray = ["a", "b", "a", "b", "c", "e", "e", "c", "d", "d", "d", "d"];
const myArrayWithNoDuplicates = myArray.reduce(
  (previousValue, currentValue) => {
    if (!previousValue.includes(currentValue)) {
      return [...previousValue, currentValue];
    }
    return previousValue;
  },
  [],
);
console.log(myArrayWithNoDuplicates);


//Testing Eg6
//Replacing filter and map with reduce - Effeciency
const numbers = [-5, 6, 2, 0];

const doubledPositiveNumbers = numbers.reduce((previousValue, currentValue) => {
  if (currentValue > 0) {
    const doubled = currentValue * 2;
    return [...previousValue, doubled];
  }
  return previousValue;
}, []);

console.log(doubledPositiveNumbers); 
