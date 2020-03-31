/**==============================堆排
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function (nums) {
  function ajust(parent, len) {
    let tmp = nums[parent];
    let child = 2 * parent + 1;
    while (child < len) {
      if (child + 1 < len && nums[child + 1] > nums[child]) child++;
      if (nums[child] <= tmp) break;
      nums[parent] = nums[child];
      parent = child;
      child = 2 * parent + 1;
    }
    nums[parent] = tmp;
  }

  for (let i = (nums.length - 2) / 2 | 0; i >= 0; i--) ajust(i, nums.length);

  for (let i = nums.length - 1; i >= 0; i--) {
    let tmp = nums[0];
    nums[0] = nums[i];
    nums[i] = tmp;
    ajust(0, i);
  }
  return nums;
};