/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  let result = [];
  function helper(cur, visited) {
    if (cur.length === nums.length) {
      result.push(cur);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (visited.has(i)) continue;
      visited.add(i);
      helper([...cur, nums[i]], visited);
      visited.delete(i);
    }
  }
  helper([], new Set());
  return result;
};