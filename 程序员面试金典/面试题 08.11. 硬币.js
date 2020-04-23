/**
 * @param {number} n
 * @return {number}
 */
var waysToChange = function (n) {
  const coins = [25, 10, 5, 1];
  let dp = Array(n + 1).fill(0);
  dp[0] = 1;
  for (let x of coins) {
    for (let i = x; i <= n; i++) {
      dp[i] = (dp[i] + dp[i - x]) % 1000000007;
    }
  }
  return dp[n];
};