/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function (matrix) {
  let N = matrix.length;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < i; j++) {
      let t = matrix[i][j];
      matrix[i][j] = matrix[j][i];
      matrix[j][i] = t;
    }
  }
  let hMid = N / 2 | 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < hMid; j++) {
      let t = matrix[i][j];
      matrix[i][j] = matrix[i][N - j - 1];
      matrix[i][N - j - 1] = t;
    }
  }
  return matrix;
};