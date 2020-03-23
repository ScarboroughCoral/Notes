/**
 * @param {string} S
 * @return {string[]}
 */
var permutation = function (S) {
  let res = [];
  function dfs(cur, c) {
    if (cur.length === S.length) {
      res.push(cur);
      return;
    }
    for (let i = 0; i < S.length; i++) {
      if (c.has(i)) continue;
      dfs(cur + S[i], new Set(c).add(i));
    }

  }
  dfs('', new Set());
  return [...new Set(res)];
};