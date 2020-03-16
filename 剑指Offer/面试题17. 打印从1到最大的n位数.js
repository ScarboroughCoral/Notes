/**
 * @param {number} n
 * @return {number[]}
 */
var printNumbers = function (n) {
  return Array.from({ length: 10 ** n - 1 }, (x, i) => i + 1);
};