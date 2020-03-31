/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
  let votes = 0, x;
  for (let i of nums) {
    if (votes === 0) x = i;
    votes += (x === i ? 1 : -1);
  }
  let count = 0, n = nums.length / 2 | 0 + 1;
  for (let i of nums) {
    if (i === x) count++;
    if (count === n) return x;
  }
  return -1;
};