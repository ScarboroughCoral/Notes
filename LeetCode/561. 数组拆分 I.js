/**
 * @param {number[]} nums
 * @return {number}
 */
var arrayPairSum = function (nums) {
  return nums.sort((a, b) => b - a).reduce((s, x, i) => i % 2 ? s + x : s, 0);
};