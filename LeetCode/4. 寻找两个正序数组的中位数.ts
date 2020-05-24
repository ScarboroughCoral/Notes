var findMedianSortedArrays = function (
  nums1: number[],
  nums2: number[]
): number {
  if (nums1.length > nums2.length) {
    let t = nums1;
    nums1 = nums2;
    nums2 = t;
  }
  let m = nums1.length,
    n = nums2.length;
  let leftCount = ((m + n + 1) / 2) | 0;
  let left = 0,
    right = m;
  while (left < right) {
    let i = ((right + left) / 2) | 0;
    let j = leftCount - i;
    if (nums2[j - 1] > nums1[i]) {
      left = i + 1;
    } else {
      right = i;
    }
  }
  let i = left;
  let j = leftCount - i;
  let leftMax1 = i === 0 ? Number.MIN_SAFE_INTEGER : nums1[i - 1];
  let leftMax2 = j === 0 ? Number.MIN_SAFE_INTEGER : nums2[j - 1];
  let rightMin1 = i === m ? Number.MAX_SAFE_INTEGER : nums1[i];
  let rightMin2 = j === n ? Number.MAX_SAFE_INTEGER : nums2[j];
  return (m + n) % 2 === 0
    ? (Math.max(leftMax1, leftMax2) + Math.min(rightMin1, rightMin2)) / 2
    : Math.max(leftMax2, leftMax1);
};
