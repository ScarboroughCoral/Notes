/**
 * @param {number} num
 * @return {number[]}
 */
var countBits = function (num) {
  let dp = Array(num + 1);
  dp[0] = 0;
  for (let i = 1; i <= num; i++) {
    if (i % 2 === 1) {
      dp[i] = 1 + dp[i / 2 | 0];
      continue;
    }
    dp[i] = dp[i / 2 | 0];
  }
  return dp;
};