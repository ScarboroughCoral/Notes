/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function (nums) {
  let result = nums[0];
  let min = nums[0],
    max = nums[0];
  for (let i = 1; i < nums.length; i++) {
    let tMax = max * nums[i],
      tMin = min * nums[i];
    max = Math.max(tMax, tMin, nums[i]);
    min = Math.min(tMin, tMax, nums[i]);
    result = Math.max(max, result);
  }
  return result;
};
