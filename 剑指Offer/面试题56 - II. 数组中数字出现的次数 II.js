/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {
  let m = new Map();
  nums.forEach(x => m.has(x) ? m.set(x, m.get(x) + 1) : m.set(x, 1));
  for (let [k, v] of m) {
    if (v === 1) return k;
  }
};