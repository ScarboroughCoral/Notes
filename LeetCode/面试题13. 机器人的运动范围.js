/**
 * @param {number} m
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var movingCount = function (m, n, k) {
  let s = new Set();
  let count = 0;
  function dfs(i, j) {
    if (i < 0 || j < 0 || i >= m || j >= n) return 0;
    let cur = `${i}+${j}`;
    let curStr = `${i}${j}`
    if (s.has(cur)) return 0;
    s.add(cur)
    if (curStr.split('').reduce((s, x) => (+x) + s, 0) > k) return 0;
    return dfs(i - 1, j) + dfs(i, j - 1) + dfs(i + 1, j) + dfs(i, j + 1) + 1;
  }
  return dfs(0, 0);
};