/**
 * @param {number[]} nums
 * @return {number[]}
 */
var smallerNumbersThanCurrent = function (nums) {
  let copy = [...nums];
  let m = new Map();
  copy.sort((a, b) => a - b).forEach((x, i) => m.set(x, m.has(x) ? m.get(x) : i));
  return nums.map(x => m.get(x));
};