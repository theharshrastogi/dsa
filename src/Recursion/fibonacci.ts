const fibonacci = (num: number): number => {
  if (num === 0) return 0;
  if (num === 1) return 1;
  return fibonacci(num - 1) + fibonacci(num - 2);
};

console.time('Time');
console.log(fibonacci(30));
console.timeEnd('Time');
