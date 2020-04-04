/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  let res = Number.MIN_SAFE_INTEGER;
  let sum = 0;
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
    res = Math.max(res, sum);
    if (sum < 0) sum = 0;
  }
  return res;
};