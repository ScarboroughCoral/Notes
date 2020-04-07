/**
 * @param {number} left
 * @param {number} right
 * @return {number[]}
 */
var selfDividingNumbers = function (left, right) {
  return Array.from({ length: right - left + 1 }, (x, i) => i + left).filter(x => x.toString().split('').every(y => y == 0 ? false : x % y === 0));
};