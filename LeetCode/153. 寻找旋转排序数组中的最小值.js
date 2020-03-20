/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function (nums) {
  if (nums[0] < nums[nums.length - 1]) return nums[0];//not rotate
  let l = 0, r = nums.length - 1;
  while (l < r) {
    let mid = l + (r - l) / 2 | 0;
    if (nums[mid] > nums[r]) l = mid + 1;
    else if (nums[mid] < nums[r]) r = mid;
    else r--;
  }
  return nums[l];
};