/**
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal = function (triangle) {
  let dp = Array(triangle.length).fill(Number.MAX_SAFE_INTEGER);
  dp[0] = triangle[0][0];
  for (let i = 1; i < triangle.length; i++) {
    for (let j = i; j >= 0; j--) {
      if (j !== 0 && j != i) {
        dp[j] = Math.min(dp[j], dp[j - 1]) + triangle[i][j];
        continue;
      }
      if (j === 0) {
        dp[j] = dp[j] + triangle[i][j];
      } else {
        dp[j] = dp[j - 1] + triangle[i][j];
      }
    }
  }
  return Math.min(...dp);
};