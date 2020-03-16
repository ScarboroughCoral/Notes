/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  let s = new Set();
  for (let i = 0; i < nums.length; i++) {
    if (!s.has(target - nums[i])) {
      s.add(nums[i]);
    } else {
      return [nums[i], target - nums[i]];
    }
  }
};