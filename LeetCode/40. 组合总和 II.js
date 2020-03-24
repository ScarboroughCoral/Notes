/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function (candidates, target) {
  candidates.sort((a, b) => a - b);
  let result = new Set();
  function helper(cur, idx, n) {
    if (n < 0) return;
    if (n === 0) {
      result.add(cur);
      return;
    }
    if (idx < candidates.length) {
      helper(`${cur + (cur ? '+' : '')}${candidates[idx]}`, idx + 1, n - candidates[idx]);
      helper(cur, idx + 1, n);
    }
  }
  helper('', 0, target)
  return [...result].map(x => x.split('+').map(t => +t));
};