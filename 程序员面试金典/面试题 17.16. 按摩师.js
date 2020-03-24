/**
 * @param {number[]} nums
 * @return {number}
 */
var massage = function (nums) {
  //dp[i]是以i作为最后元素的最长时间，dp[i]=max(dp[i-1],dp[i-2]+n[i],dp[i-3]+n[i]);
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];
  if (nums.length === 2) return Math.max(nums[0], nums[1]);
  let dp = Array(nums.length);
  dp[0] = nums[0];
  dp[1] = nums[1];
  dp[2] = nums[2] + nums[0];
  for (let i = 3; i < nums.length; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i], dp[i - 3] + nums[i]);
  }
  return Math.max(dp[dp.length - 1], dp[dp.length - 2]);
};