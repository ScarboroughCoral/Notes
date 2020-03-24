/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
  let result = [];
  function helper(cur, idx, n) {
    if (n < 0) return;
    if (n === 0) {
      result.push(cur);
      return;
    }
    for (let i = idx; i < candidates.length; i++) {
      helper([...cur, candidates[i]], i, n - candidates[i]);
    }
  }
  helper([], 0, target);
  return result;
};