/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
  let result = [];
  function helper(cur, idx) {
    if (idx === nums.length) {
      result.push(cur);
      return;
    }
    helper([...cur, nums[idx]], idx + 1);
    helper([...cur], idx + 1);
  }
  helper([], 0);
  return result;
};