/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfTwo = function (n) {
  return n <= 0 ? false : n.toString(2).match(/1/g).length === 1;
};