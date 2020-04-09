/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var combinationSum4 = function (nums, target) {
  let dp = Array(target + 1).fill(0);
  dp[0] = 1;
  //dp[i]=sum(dp[i-x]),x belongs to nums
  for (let i = 1; i <= target; i++) {
    for (let x of nums) {
      if (x <= i) {
        dp[i] += dp[i - x];
      }
    }
  }
  return dp[target];
};