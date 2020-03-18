/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {
  let result = [];
  if (matrix.length === 0) return result;
  let l = 0, r = matrix[0].length - 1, u = 0, b = matrix.length - 1;
  while (true) {
    for (let i = l; i <= r; i++) result.push(matrix[u][i]);
    u++;
    if (u > b) return result;
    for (let i = u; i <= b; i++) result.push(matrix[i][r]);
    r--;
    if (r < l) return result;
    for (let i = r; i >= l; i--) result.push(matrix[b][i]);
    b--;
    if (b < u) return result;
    for (let i = b; i >= u; i--) result.push(matrix[i][l]);
    l++;
    if (l > r) return result;
  }
};