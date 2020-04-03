/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxValue = function (grid) {
  let m = grid.length, n = grid[0].length;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      let x = grid[i][j];
      grid[i][j] = Math.max(i > 0 ? grid[i - 1][j] : 0, j > 0 ? grid[i][j - 1] : 0) + x;
    }
  }
  return grid[m - 1][n - 1];
};