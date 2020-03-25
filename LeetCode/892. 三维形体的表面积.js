/**
 * @param {number[][]} grid
 * @return {number}
 */
var surfaceArea = function (grid) {
  let di = [1, 0, -1, 0];
  let dj = [0, 1, 0, -1];
  let N = grid.length;
  let surfaceArea = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      let x = grid[i][j];
      if (x > 0) {
        surfaceArea += 2;
        for (let k = 0; k < 4; k++) {
          let r = i + di[k];
          let c = j + dj[k];
          let y = 0;
          if (r < N && c < N && r >= 0 && c >= 0) {
            y = grid[r][c];
          }
          surfaceArea += Math.max(x - y, 0);
        }
      }
    }
  }
  return surfaceArea;
};