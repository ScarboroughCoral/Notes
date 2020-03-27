/**
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function (n) {
  let result = Array(n).fill(0).map(x => Array(n).fill(0));
  let up = 0, bottom = n - 1, left = 0, right = n - 1;
  let cnt = 1;
  while (true) {
    for (let i = left; i <= right; i++) result[up][i] = cnt++;
    if (++up > bottom) break;
    for (let i = up; i <= bottom; i++) result[i][right] = cnt++;
    if (--right < left) break;
    for (let i = right; i >= left; i--) result[bottom][i] = cnt++;
    if (--bottom < up) break;
    for (let i = bottom; i >= up; i--) result[i][left] = cnt++;
    if (++left > right) break;
  }
  return result;
};