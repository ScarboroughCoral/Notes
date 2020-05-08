/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalSquare = function (matrix) {
  if (matrix.length === 0) return 0;
  let m = matrix.length,
    n = matrix[0].length;
  let dp = Array(m)
    .fill(null)
    .map((x) => Array(n).fill(0));
  function isInGrid(i, j) {
    return i >= 0 && j >= 0 && i < m && j < n;
  }
  function updateDP() {
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        if (matrix[i][j] === "0") continue;
        dp[i][j] = 1;
        if (!isInGrid(i - 1, j) || !isInGrid(i, j - 1)) continue;
        dp[i][j] += Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  function maxDP() {
    let max = 0;
    for (let sub of dp) {
      for (let x of sub) {
        max = Math.max(max, x);
      }
    }
    return max;
  }
  updateDP();
  return maxDP() ** 2;
};
