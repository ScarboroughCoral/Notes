/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function (n, k) {
  let result = [];
  function helper(cur, idx, cnt) {
    if (cnt === 0) {
      result.push(cur);
      return;
    }
    if (idx <= n) {
      helper([...cur, idx], idx + 1, cnt - 1);
      helper([...cur], idx + 1, cnt);
    }
  }
  helper([], 1, k);
  return result;
};