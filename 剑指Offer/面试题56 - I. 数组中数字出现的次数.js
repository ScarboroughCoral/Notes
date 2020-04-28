/**
 * @param {number[]} nums
 * @return {number[]}
 */
var singleNumbers = function (nums) {
  let r = nums.reduce((s, x) => s ^ x, 0);
  let d = 1;
  while ((d & r) === 0) d <<= 1;
  let a = 0, b = 0;
  for (let x of nums) {
    if (x & d) a ^= x;
    else b ^= x;
  }
  return [a, b];
};