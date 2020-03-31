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
  return x;
};