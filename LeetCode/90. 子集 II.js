/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup = function (nums) {
  let result = [];
  nums.sort((a, b) => a - b);
  function helper(cur, idx) {
    if (idx === nums.length) {
      result.push(cur);
      return;
    }
    let n = idx + 1;
    while (n < nums.length && nums[n] === nums[idx]) n++;
    helper([...cur], n);
    helper([...cur, nums[idx]], idx + 1);
  }
  helper([], 0);
  return result;
};