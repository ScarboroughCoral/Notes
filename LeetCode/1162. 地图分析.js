/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxDistance = function (grid) {
  const N = grid.length;
  let directions = [[1, 0], [0, 1], [-1, 0], [0, -1]];
  function isInGrid(i, j) {
    return i >= 0 && j >= 0 && i < N && j < N;
  }
  let q = [];
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (grid[i][j] === 1) q.push({ i, j });
    }
  }
  if (q.length === 0 || q.length === N * N) return -1;
  let step = -1;
  while (q.length) {
    let size = q.length;
    step++;
    for (let t = 0; t < size; t++) {
      let { i, j } = q.shift();
      for (let [dx, dy] of directions) {
        let r = dx + i, c = dy + j;
        if (isInGrid(r, c) && grid[r][c] === 0) {
          q.push({ i: r, j: c });
          grid[r][c] = 1;;
        }
      }
    }
  }
  return step;
};