/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  if (nums.length === 0) return 0;
  function findIndex() {
    let l = 0, r = nums.length - 1;
    while (l <= r) {
      let mid = l + (r - l) / 2 | 0;
      if (nums[mid] === target) return mid;
      else if (nums[mid] > target) r = mid - 1;
      else l = mid + 1;
    }
    return -1;
  }
  let idx = findIndex();
  if (idx === -1) return 0;
  let cnt = 1;
  for (let i = idx - 1; i >= 0; i--) nums[i] === target && cnt++;
  for (let i = idx + 1; i < nums.length; i++) nums[i] === target && cnt++;
  return cnt;
};