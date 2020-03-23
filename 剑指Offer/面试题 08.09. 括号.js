/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  let res = [];
  function dfs(cur, cntL, cntR) {
    if (cntR < cntL) return;
    if (cur.length === n << 1) {
      res.push(cur);
      return;
    }
    if (cntL > 0) dfs(cur + '(', cntL - 1, cntR);
    if (cntR > 0) dfs(cur + ')', cntL, cntR - 1);
  }
  dfs('', n, n);
  return res;
};