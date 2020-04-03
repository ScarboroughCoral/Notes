/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function (grid) {
  let m = grid.length, n = grid[0].length;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i === 0 && j === 0) continue;
      let x = grid[i][j];
      grid[i][j] = Math.min(i > 0 ? grid[i - 1][j] : Number.MAX_SAFE_INTEGER, j > 0 ? grid[i][j - 1] : Number.MAX_SAFE_INTEGER) + x;
    }
  }
  return grid[m - 1][n - 1];
};