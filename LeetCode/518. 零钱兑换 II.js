/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
var change = function (amount, coins) {
  let dp = Array(amount + 1).fill(0);
  dp[0] = 1;
  for (let x of coins) {
    for (let i = x; i <= amount; i++) {
      dp[i] += dp[i - x];
    }
  }
  return dp[amount];
};