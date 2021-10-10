function searchInsert(nums: number[], target: number): number {
  let l = 0,
    r = nums.length - 1;
  let result = 0;
  while (l <= r) {
    let mid = (l + (r - l) / 2) | 0;
    if (nums[mid] === target) return mid;
    if (nums[mid] > target) r = mid - 1;
    else (l = mid + 1), (result = l);
  }
  return result;
}
