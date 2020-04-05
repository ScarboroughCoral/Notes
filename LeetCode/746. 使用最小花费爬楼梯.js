/**
 * @param {number[]} cost
 * @return {number}
 */
var minCostClimbingStairs = function (cost) {
  //dp[i]=Math.min(dp[i-1],dp[i-2])+cost[i]
  let dp = Array(cost.length);
  [dp[0], dp[1]] = cost;
  for (let i = 2; i < dp.length; i++) {
    dp[i] = Math.min(dp[i - 1], dp[i - 2]) + cost[i];
  }
  return Math.min(dp[dp.length - 1], dp[dp.length - 2])
};