var sum_to_n_a = function (n) {
  // your code here
  if (n == 0) {
    return 0;
  }
  return sum_to_n_a(n - 1) + n;
};

var sum_to_n_b = function (n) {
  // your code here
  return [...Array(n + 1).keys()].reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    0
  );
};

var sum_to_n_c = function (n) {
  // your code here
  let sum = 0;
  while (n) {
    sum += n;
    n -= 1;
  }
  return sum;
};

console.log(sum_to_n_a(10));
console.log(sum_to_n_b(10));
console.log(sum_to_n_c(10));
