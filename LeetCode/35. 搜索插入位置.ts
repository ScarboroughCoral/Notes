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

function searchInsert1(nums: number[], target: number): number {
    let l = 0, r = nums.length - 1;
    while(l <= r) {
        let mid = l + Math.floor((r - l) / 2);
        const midVal = nums[mid];
        if (midVal >= target && mid === 0) return mid;
        if (midVal < target && mid === nums.length - 1) return nums.length;
        const midLastVal = nums[mid - 1];
        if (midVal >= target && midLastVal < target) return mid;
        if (midVal >= target) r = mid;
        else l = mid + 1;
    }
    return -1;
};
