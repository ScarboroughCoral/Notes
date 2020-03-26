/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  let r = 0;
  let sum = 0, max = Number.MIN_SAFE_INTEGER;
  while (r < nums.length) {
    sum += nums[r];
    max = max > sum ? max : sum;
    if (sum < 0) sum = 0;
    r++;
  }
  return max;
};