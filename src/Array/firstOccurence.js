// import { search } from '../Algorithm/binarySearch';
const mid = (...val) => Math.floor(val.reduce((sum = 0, curr) => sum + curr) / val.length);

export const firstOccurence = (array, key, start = 0, end = array.length - 1) => {
  while (start <= end) {
    const middle = mid(start, end);
    const middleValue = array[middle];

    if (middleValue === key) {
      if (array[middle - 1] === key) end = middle;
      else return middle;
    } else if (key < middleValue) end = middle - 1;
    else start = middle + 1;
  }
  return -1;
};

console.log(firstOccurence([5, 10, 10, 10, 20, 30], 5));
