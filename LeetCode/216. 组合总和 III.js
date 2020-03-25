/**
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
var combinationSum3 = function (k, n) {
  let result = [];
  function helper(cur, s, idx) {
    if (s < 0) return;
    if (cur.length === k) {
      if (s === 0) result.push(cur);
      return;
    }
    if (idx <= 9) {
      helper([...cur, idx], s - idx, idx + 1);
      helper([...cur], s, idx + 1);
    }
  }
  helper([], n, 1);
  return result;
};